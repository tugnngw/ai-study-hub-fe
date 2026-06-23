import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  FileText,
  Plus,
  FolderKanban,
  MoreHorizontal,
} from "lucide-react";
import { useFolders, useDocuments } from "@/lib/queries";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { UploadDocumentDialog } from "@/components/upload-document-dialog";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: Dashboard,
});

function formatBytes(n?: number | null) {
  if (!n) return "—";
  if (n < 1024) return `${n} B`;
  if (n < 1024 ** 2) return `${(n / 1024).toFixed(1)} KB`;
  if (n < 1024 ** 2 * 1000) return `${(n / 1024 ** 2).toFixed(1)} MB`;
  return `${(n / 1024 ** 3).toFixed(2)} GB`;
}

function timeAgo(iso?: string | null) {
  if (!iso) return "—";
  const diff = Date.now() - new Date(iso).getTime();
  if (Number.isNaN(diff)) return "—";
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "vừa xong";
  if (mins < 60) return `${mins} phút trước`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} giờ trước`;
  const days = Math.floor(hrs / 24);
  return `${days} ngày trước`;
}

const NOTE_GRADIENTS = [
  "from-indigo-400 to-violet-400",
  "from-violet-500 to-purple-500",
  "from-purple-400 to-fuchsia-400",
];

const FOLDER_ICON_COLORS = [
  "bg-blue-50 text-blue-500",
  "bg-emerald-50 text-emerald-500",
  "bg-violet-50 text-violet-500",
  "bg-amber-50 text-amber-500",
  "bg-rose-50 text-rose-500",
];

const SEMESTERS = Array.from({ length: 9 }, (_, i) => i + 1);

function Dashboard() {
  const folders = useFolders();
  const docs = useDocuments();
  const { user } = useAuth();
  const [semester, setSemester] = useState(1);
  const [uploadOpen, setUploadOpen] = useState(false);

  const recent = useMemo(
    () =>
      (docs.data ?? [])
        .slice()
        .sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? "")),
    [docs.data],
  );

  // Recent "notes" — top 3 recent documents shown as gradient cards
  const noteCards = recent.slice(0, 3);
  const recentDocs = recent.slice(0, 5);

  // Group folders into semesters deterministically (no subject API available)
  const allFolders = folders.data ?? [];
  const semesterFolders = useMemo(
    () => allFolders.filter((_, i) => (i % 9) + 1 === semester),
    [allFolders, semester],
  );

  // count docs per folder
  const docsByFolder = useMemo(() => {
    const map = new Map<string, number>();
    for (const d of docs.data ?? []) {
      if (d.folderId) map.set(d.folderId, (map.get(d.folderId) ?? 0) + 1);
    }
    return map;
  }, [docs.data]);

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold font-display">Chào mừng trở lại</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Truy cập nhanh vào tài liệu của bạn
        </p>
      </div>

      {/* Sổ ghi chú gần đây */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold font-display">
          Sổ ghi chú gần đây
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {docs.isLoading &&
            Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-36 rounded-2xl" />
            ))}
          {!docs.isLoading && noteCards.length === 0 && (
            <div className="text-sm text-muted-foreground py-6">
              Chưa có ghi chú.
            </div>
          )}
          {noteCards.map((d, i) => (
            <Link
              key={d.id}
              to="/documents/$id"
              params={{ id: String(d.id) }}
              className={cn(
                "relative overflow-hidden rounded-2xl p-5 h-36 flex flex-col justify-between text-white bg-gradient-to-br transition-transform hover:-translate-y-0.5 shadow-soft",
                NOTE_GRADIENTS[i % NOTE_GRADIENTS.length],
              )}
            >
              <div className="flex items-start justify-between">
                <div className="h-9 w-9 rounded-lg bg-white/20 flex items-center justify-center">
                  <FileText className="h-4.5 w-4.5" />
                </div>
                <MoreHorizontal className="h-5 w-5 text-white/80" />
              </div>
              <div>
                <div className="font-semibold truncate">{d.title}</div>
                <div className="text-xs text-white/80 mt-0.5">
                  {timeAgo(d.createdAt)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Tài liệu gần đây */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold font-display">
            Tài liệu gần đây
          </h2>
          <button
            onClick={() => setUploadOpen(true)}
            className="flex items-center gap-1 text-sm font-medium text-primary hover:opacity-80 transition-opacity"
          >
            <Plus className="h-4 w-4" /> Tạo mới
          </button>
        </div>
        <div className="rounded-2xl border border-border/60 bg-card divide-y divide-border/60 overflow-hidden shadow-soft">
          {docs.isLoading &&
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="p-4">
                <Skeleton className="h-10 rounded-lg" />
              </div>
            ))}
          {!docs.isLoading && recentDocs.length === 0 && (
            <div className="text-sm text-muted-foreground py-8 text-center">
              Chưa có tài liệu.
            </div>
          )}
          {recentDocs.map((d) => (
            <Link
              key={d.id}
              to="/documents/$id"
              params={{ id: String(d.id) }}
              className="flex items-center gap-3 p-4 hover:bg-accent transition-colors"
            >
              <div className="h-9 w-9 rounded-lg bg-brand-soft flex items-center justify-center shrink-0">
                <FileText className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold truncate">{d.title}</div>
                <div className="text-xs text-muted-foreground truncate">
                  {(d.mimeType?.split("/").pop()?.toUpperCase() ?? "FILE")} ·{" "}
                  {formatBytes(d.fileSize)} · {timeAgo(d.createdAt)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Môn học theo kỳ */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold font-display">Môn học theo kỳ</h2>
        <div className="flex flex-wrap gap-2">
          {SEMESTERS.map((s) => (
            <button
              key={s}
              onClick={() => setSemester(s)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium border transition-colors",
                semester === s
                  ? "bg-gradient-brand text-white border-transparent shadow-soft"
                  : "bg-card text-foreground/80 border-border hover:border-primary/40",
              )}
            >
              Kỳ {s}
            </button>
          ))}
        </div>
      </section>

      {/* Môn học kỳ N */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold font-display">
          Môn học kỳ {semester}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {folders.isLoading &&
            Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-20 rounded-2xl" />
            ))}
          {!folders.isLoading && semesterFolders.length === 0 && (
            <div className="col-span-full text-sm text-muted-foreground py-6">
              Chưa có môn học cho kỳ này.
            </div>
          )}
          {semesterFolders.map((f, i) => (
            <Link
              key={f.id}
              to="/folders/$id"
              params={{ id: String(f.id) }}
              className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card p-4 hover:border-primary/40 hover:shadow-soft transition-all group"
            >
              <div
                className={cn(
                  "h-11 w-11 rounded-xl flex items-center justify-center shrink-0",
                  FOLDER_ICON_COLORS[i % FOLDER_ICON_COLORS.length],
                )}
              >
                <FolderKanban className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold truncate">{f.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {docsByFolder.get(f.id) ?? 0} tài liệu
                </div>
              </div>
              <MoreHorizontal className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>
      </section>

      <UploadDocumentDialog open={uploadOpen} onOpenChange={setUploadOpen} />
    </div>
  );
}

