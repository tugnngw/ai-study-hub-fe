import { createFileRoute } from "@tanstack/react-router";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
import { Cloud, Database, HardDrive } from "lucide-react";
import { useDocuments } from "@/lib/queries";
// import { mockStorage } from "@/lib/mock-data"; // removed mock storage
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { useMemo } from "react";
import { useDocuments, useFolders } from "@/lib/queries";
>>>>>>> origin/test/share-document-cloudinary
=======
import { useMemo } from "react";
import { useDocuments, useFolders } from "@/lib/queries";
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz

export const Route = createFileRoute("/_authenticated/cloud")({
  component: CloudPage,
});

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
function formatBytes(n: number) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 ** 2) return `${(n / 1024).toFixed(2)} KB`;
  if (n < 1024 ** 3) return `${(n / 1024 ** 2).toFixed(2)} MB`;
  return `${(n / 1024 ** 3).toFixed(2)} GB`;
}

function CloudPage() {
  const docs = useDocuments();
  // Calculate storage from actual document sizes
  const used = docs.data?.reduce((sum, d) => sum + (d.fileSize ?? 0), 0) ?? 0;
  const total = 15 * 1024 * 1024 * 1024; // 15 GB limit (or fetch from backend if available)
  const pct = (used / total) * 100;

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Cloud đã sài</h1>
        <p className="text-muted-foreground mt-1">
          Theo dõi dung lượng lưu trữ của bạn
        </p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Cloud className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">
                Tổng dung lượng đã dùng
              </div>
              <div className="text-2xl font-semibold">
                {formatBytes(used)}{" "}
                <span className="text-base text-muted-foreground">
                  / {formatBytes(total)}
                </span>
              </div>
            </div>
          </div>
          <Progress value={pct} className="h-2" />
          <div className="text-xs text-muted-foreground">
            {pct.toFixed(4)}% đã sử dụng
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-5 flex items-center gap-3">
            <Database className="h-8 w-8 text-violet-500" />
            <div>
              <div className="text-sm text-muted-foreground">Số tài liệu</div>
              <div className="text-2xl font-semibold">
                {docs.data?.length ?? 0}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center gap-3">
            <HardDrive className="h-8 w-8 text-emerald-500" />
            <div>
              <div className="text-sm text-muted-foreground">Còn trống</div>
              <div className="text-2xl font-semibold">
                {formatBytes(total - used)}
              </div>
            </div>
          </CardContent>
        </Card>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> origin/uichange
function formatGB(bytes: number) {
  const gb = bytes / 1024 ** 3;
  if (gb >= 1) return `${gb.toFixed(1)}gb`;
  const mb = bytes / 1024 ** 2;
  return `${mb.toFixed(1)}mb`;
}

const TYPE_META: Record<string, { label: string; color: string }> = {
  pdf: { label: "PDF", color: "#ef4444" },
  docx: { label: "DOCx", color: "#3b82f6" },
  doc: { label: "DOCx", color: "#3b82f6" },
  pptx: { label: "PPTX", color: "#eab308" },
  ppt: { label: "PPTX", color: "#eab308" },
};
const OTHER_META = { label: "Khác", color: "#1f2937" };

function typeKeyFromMime(mime?: string | null, title?: string) {
  const m = (mime ?? "").toLowerCase();
  const t = (title ?? "").toLowerCase();
  if (m.includes("pdf") || t.endsWith(".pdf")) return "pdf";
  if (m.includes("word") || t.endsWith(".docx") || t.endsWith(".doc"))
    return "docx";
  if (
    m.includes("presentation") ||
    t.endsWith(".pptx") ||
    t.endsWith(".ppt")
  )
    return "pptx";
  return "other";
}

const FOLDER_BAR_COLORS = ["#3b82f6", "#6366f1", "#8b5cf6", "#06b6d4"];

function CloudPage() {
  const docs = useDocuments();
  const folders = useFolders();

  const total = 1 * 1024 * 1024 * 1024; // 1 GB
  const used = useMemo(
    () => (docs.data ?? []).reduce((s, d) => s + (d.fileSize ?? 0), 0),
    [docs.data],
  );
  const pct = total > 0 ? (used / total) * 100 : 0;
  const free = Math.max(0, total - used);

  // Per-folder usage
  const folderUsage = useMemo(() => {
    const map = new Map<string, number>();
    for (const d of docs.data ?? []) {
      if (!d.folderId) continue;
      map.set(d.folderId, (map.get(d.folderId) ?? 0) + (d.fileSize ?? 0));
    }
    const rows = (folders.data ?? [])
      .map((f) => ({ name: f.name, bytes: map.get(f.id) ?? 0 }))
      .filter((r) => r.bytes > 0)
      .sort((a, b) => b.bytes - a.bytes);
    const max = Math.max(1, ...rows.map((r) => r.bytes));
    return { rows, max };
  }, [docs.data, folders.data]);

  // File-type breakdown
  const typeBreakdown = useMemo(() => {
    const map = new Map<string, number>();
    for (const d of docs.data ?? []) {
      const key = typeKeyFromMime(d.mimeType, d.title);
      map.set(key, (map.get(key) ?? 0) + (d.fileSize ?? 0));
    }
    const sum = Array.from(map.values()).reduce((a, b) => a + b, 0) || 1;
    const order = ["pdf", "docx", "pptx", "other"];
    return order
      .filter((k) => map.has(k))
      .map((k) => {
        const meta = k === "other" ? OTHER_META : TYPE_META[k];
        const bytes = map.get(k) ?? 0;
        return {
          label: meta.label,
          color: meta.color,
          bytes,
          percent: Math.round((bytes / sum) * 100),
        };
      });
  }, [docs.data]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display">Bộ Nhớ</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Xem và Quản lý dung lượng bộ nhớ của bạn
        </p>
      </div>

      {/* Big usage card */}
      <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-soft">
        <div className="text-lg font-semibold font-display">
          Dung lượng đã dùng gần đây
        </div>
        <div className="mt-1 text-3xl font-bold">
          {used >= 1024 ** 3
            ? `${(used / 1024 ** 3).toFixed(2)} GB`
            : `${(used / 1024 ** 2).toFixed(1)} MB`}{" "}
          <span className="text-xl text-muted-foreground font-semibold">
            / 1 GB
          </span>
        </div>
        <div className="mt-4 h-4 w-full rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-brand transition-all"
            style={{ width: `${Math.min(100, pct)}%` }}
          />
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <span>Bạn đã sử dụng {pct.toFixed(0)}% dung lượng</span>
          <span>Còn trống {formatGB(free)}</span>
        </div>
      </div>

      {/* Two breakdown cards */}
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* By folder */}
        <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-soft">
          <div className="text-sm font-semibold mb-4">
            Dung lượng theo thư mục
          </div>
          <div className="space-y-3">
            {folderUsage.rows.length === 0 && (
              <div className="text-sm text-muted-foreground py-4 text-center">
                Chưa có dữ liệu.
              </div>
            )}
            {folderUsage.rows.map((r, i) => (
              <div key={r.name + i} className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 w-28 shrink-0 text-xs text-foreground/80 truncate">
                  <span className="truncate">{r.name}</span>
                </div>
                <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(r.bytes / folderUsage.max) * 100}%`,
                      backgroundColor:
                        FOLDER_BAR_COLORS[i % FOLDER_BAR_COLORS.length],
                    }}
                  />
                </div>
                <div className="w-12 text-right text-xs text-muted-foreground shrink-0">
                  {formatGB(r.bytes)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* By file type */}
        <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-soft">
          <div className="text-sm font-semibold mb-4">Loại tệp</div>
          <div className="space-y-3">
            {typeBreakdown.length === 0 && (
              <div className="text-sm text-muted-foreground py-4 text-center">
                Chưa có dữ liệu.
              </div>
            )}
            {typeBreakdown.map((t) => (
              <div key={t.label} className="flex items-center gap-3 text-sm">
                <span
                  className="h-2.5 w-2.5 rounded-sm shrink-0"
                  style={{ backgroundColor: t.color }}
                />
                <span className="font-medium w-14 shrink-0">{t.label}</span>
                <span className="text-xs text-muted-foreground flex-1">
                  {formatGB(t.bytes)}
                </span>
                <span className="font-semibold">{t.percent}%</span>
              </div>
            ))}
          </div>
        </div>
<<<<<<< HEAD
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
      </div>
    </div>
  );
}
