import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { FileText, Users, Search, ChevronDown } from "lucide-react";
import { useSharedDocuments } from "@/lib/queries";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SharedDocumentActionsMenu } from "@/components/shared-document-actions-menu";
import { formatBytes, formatRelativeTime } from "@/lib/utils";
import type { SharedDocument } from "@/lib/types";

export const Route = createFileRoute("/_authenticated/shared")({
  component: SharedPage,
});

type TabId = "all" | "with-me" | "by-me";

const TABS: { id: TabId; label: string }[] = [
  { id: "all", label: "Tất cả" },
  { id: "with-me", label: "Được chia sẻ với tôi" },
  { id: "by-me", label: "Tôi đã chia sẻ" },
];

function SharedPage() {
  const [tab, setTab] = useState<TabId>("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("newest");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display font-bold text-[24px]">Chia sẻ</h1>
        <p className="text-muted-foreground text-[14px] mt-1">
          Quản lý tài liệu bạn được chia sẻ và những tài liệu bạn đã chia sẻ
        </p>
      </div>

      {/* Search + sort */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm kiếm theo thư mục, người dùng..."
            className="w-full h-11 rounded-xl border border-border/70 bg-white pl-10 pr-3 text-[14px] outline-none focus:border-primary"
          />
        </div>
        <div className="relative">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="h-11 rounded-xl border border-border/70 bg-white pl-4 pr-9 text-[13px] font-medium outline-none focus:border-primary appearance-none cursor-pointer"
          >
            <option value="newest">Sắp xếp : Mới nhất</option>
            <option value="oldest">Sắp xếp : Cũ nhất</option>
          </select>
          <ChevronDown className="h-4 w-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      <Tabs value={tab} onValueChange={(v) => setTab(v as TabId)}>
        <TabsList className="h-auto w-full justify-start rounded-none border-b border-border bg-transparent p-0">
          {TABS.map((t) => (
            <TabsTrigger
              key={t.id}
              value={t.id}
              className="rounded-none border-b-2 border-transparent px-4 py-2.5 text-sm font-medium text-muted-foreground shadow-none data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none"
            >
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="mt-6 space-y-8">
          <SharedWithMeSection query={query} />
          <SharedByMeSection />
        </TabsContent>
        <TabsContent value="with-me" className="mt-6">
          <SharedWithMeSection query={query} />
        </TabsContent>
        <TabsContent value="by-me" className="mt-6">
          <SharedByMeSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Section — Được chia sẻ với tôi
// ---------------------------------------------------------------------------

function SharedWithMeSection({ query = "" }: { query?: string }) {
  const { data, isLoading } = useSharedDocuments();
  const items = (data ?? []).filter((d) =>
    d.title.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <section className="space-y-3">
      <SectionTitle label="Được chia sẻ với tôi" count={items.length} />

      {isLoading ? (
        <EmptyState text="Đang tải…" />
      ) : items.length === 0 ? (
        <EmptyState text="Chưa có tài liệu được chia sẻ với bạn" />
      ) : (
        <div className="rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead>Tên tài liệu</TableHead>
                <TableHead>Được chia sẻ bởi</TableHead>
                <TableHead>Thời gian</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((d) => (
                <SharedWithMeRow key={d.id} doc={d} />
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </section>
  );
}

function SharedWithMeRow({ doc }: { doc: SharedDocument }) {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <FileText className="h-4 w-4 text-primary" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-medium truncate">{doc.title}</div>
            <div className="text-xs text-muted-foreground truncate">
              {formatBytes(doc.fileSize)}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarFallback className="text-[10px]">
              {initials(doc.sharedBy)}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm">{doc.sharedBy}</span>
        </div>
      </TableCell>
      <TableCell className="text-sm text-muted-foreground">
        {formatRelativeTime(doc.sharedAt)}
      </TableCell>
      <TableCell>
        <SharedDocumentActionsMenu
          sharedId={doc.shareId}
          title={doc.title}
          description={doc.description ?? undefined}
          iconClassName="h-4 w-4"
        />
      </TableCell>
    </TableRow>
  );
}

// ---------------------------------------------------------------------------
// Section — Tôi đã chia sẻ
// ---------------------------------------------------------------------------
// ⚠️ BE chưa có endpoint tổng hợp "danh sách tài liệu tôi đã chia sẻ +
//    người nhận" (xem INTEGRATION_GUIDE.md — share API mới định nghĩa theo
//    convention, chưa confirm với BE). Khi có GET /api/documents/shared-by-me
//    (trả về { document, recipients[] }[]), thay useState rỗng dưới đây
//    bằng hook query thật — phần UI (bảng + avatar stack) đã sẵn sàng dùng.

function SharedByMeSection() {
  const items: never[] = [];
  const isLoading = false;

  return (
    <section className="space-y-3">
      <SectionTitle label="Tôi đã chia sẻ" count={items.length} />

      {isLoading ? (
        <EmptyState text="Đang tải…" />
      ) : items.length === 0 ? (
        <EmptyState text="Bạn chưa chia sẻ tài liệu nào với người khác" />
      ) : (
        <div className="rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead>Tên tài liệu</TableHead>
                <TableHead>Chia sẻ với</TableHead>
                <TableHead>Thời gian</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody />
          </Table>
        </div>
      )}
    </section>
  );
}

// ---------------------------------------------------------------------------
// Shared bits
// ---------------------------------------------------------------------------

function SectionTitle({ label, count }: { label: string; count: number }) {
  return (
    <div className="flex items-center gap-2">
      <h2 className="text-lg font-semibold">{label}</h2>
      <span className="h-5 min-w-5 px-1.5 rounded-full bg-muted text-xs font-medium text-muted-foreground flex items-center justify-center">
        {count}
      </span>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-dashed border-border py-10 text-center">
      <Users className="h-8 w-8 mx-auto text-muted-foreground/50" />
      <p className="mt-3 text-sm text-muted-foreground">{text}</p>
    </div>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(-2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}
