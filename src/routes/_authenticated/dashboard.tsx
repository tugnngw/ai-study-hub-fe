import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  FileText,
  Plus,
  MoreHorizontal,
  FolderKanban,
} from "lucide-react";
import { useDashboard } from "@/lib/queries";
import { SEMESTERS } from "@/lib/config";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: Dashboard,
});

// Palette gradient cho các thẻ ghi chú gần đây (theo ảnh thiết kế).
const NOTE_GRADIENTS = [
  "from-violet-400 to-violet-600",
  "from-indigo-400 to-violet-500",
  "from-purple-400 to-fuchsia-500",
];

// Màu icon thư mục môn học luân phiên (theo ảnh: xanh dương / xanh lá / tím).
const SUBJECT_TONES = [
  "bg-blue-50 text-blue-500",
  "bg-emerald-50 text-emerald-500",
  "bg-violet-50 text-violet-500",
];

function relativeTime(iso?: string) {
  if (!iso) return "";
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${Math.max(1, mins)} phút trước`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} giờ trước`;
  const days = Math.floor(hrs / 24);
  return `${days} ngày trước`;
}

function fmtSize(bytes?: number | null) {
  if (!bytes) return "";
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)}kb`;
  return `${(bytes / 1024 / 1024).toFixed(1)}mb`;
}

function Dashboard() {
  const dashboard = useDashboard();
  const { user } = useAuth();
  const navigate = useNavigate();

  const isAdmin = user?.role === "ADMIN";
  useEffect(() => {
    if (isAdmin) navigate({ to: "/admin_panel", replace: true });
  }, [isAdmin, navigate]);

  const data = dashboard.data;
  const loading = dashboard.isLoading;

  const allSubjects = data?.subjects ?? [];

  // Số kỳ lấy từ cấu hình trong code (src/lib/config.ts).
  const semesters = SEMESTERS;

  const [activeSem, setActiveSem] = useState<number>(1);
  useEffect(() => {
    if (semesters.length && !semesters.includes(activeSem)) {
      setActiveSem(semesters[0]);
    }
  }, [semesters, activeSem]);

  const subjectsInSem = useMemo(
    () => allSubjects.filter((s) => s.semester === activeSem),
    [allSubjects, activeSem],
  );

  const docCountBySubject = data?.docCountBySubject ?? {};
  const recentNotes = data?.recentNotes ?? [];
  const recentDocs = (data?.recentDocuments ?? []).slice(0, 3);

  return (
    <div className="space-y-9">
      {/* Lời chào */}
      <div>
        <h1 className="font-display font-bold text-2xl text-foreground">
          Chào mừng trở lại
        </h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          Truy cập nhanh vào tài liệu của bạn
        </p>
      </div>

      {/* Sổ ghi chú gần đây */}
      <section className="space-y-4">
        <h2 className="font-display font-semibold text-lg">Sổ ghi chú gần đây</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-36 rounded-2xl" />
              ))
            : recentNotes.length === 0
              ? (
                <div className="col-span-full text-sm text-muted-foreground py-8 text-center border border-dashed rounded-2xl">
                  Chưa có sổ ghi chú nào.
                </div>
              )
              : recentNotes.map((f, i) => (
                  <Link
                    key={f.id}
                    to="/ai"
                    search={{ folderId: f.id }}
                    className={cn(
                      "relative h-36 rounded-2xl p-5 text-white overflow-hidden bg-gradient-to-br shadow-soft transition-transform hover:-translate-y-0.5",
                      NOTE_GRADIENTS[i % NOTE_GRADIENTS.length],
                    )}
                  >
                    <div className="absolute -bottom-8 -right-6 h-28 w-28 rounded-full bg-white/10 blur-2xl" />
                    <div className="flex items-start justify-between">
                      <div className="h-9 w-9 rounded-lg bg-white/20 flex items-center justify-center">
                        <FolderKanban className="h-4.5 w-4.5" />
                      </div>
                      <span className="text-[11px] font-medium bg-white/20 rounded-full px-2 py-0.5">
                        {f.documentCount ?? 0} tài liệu
                      </span>
                    </div>
                    <div className="absolute bottom-5 left-5 right-5">
                      <div className="font-semibold truncate">{f.name}</div>
                      <div className="text-white/75 text-xs mt-0.5 truncate">
                        {f.description || f.aiSummary || relativeTime(f.updatedAt ?? f.createdAt)}
                      </div>
                    </div>
                  </Link>
                ))}
        </div>
      </section>

      {/* Tài liệu gần đây */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-semibold text-lg">Tài liệu gần đây</h2>
          <Link
            to="/documents"
            className="text-primary text-sm font-medium hover:underline flex items-center gap-1"
          >
            <Plus className="h-4 w-4" /> Tạo mới
          </Link>
        </div>
        <div className="rounded-2xl border border-border/60 divide-y divide-border/60 overflow-hidden bg-card">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="p-4">
                <Skeleton className="h-8 w-full" />
              </div>
            ))
          ) : recentDocs.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">
              Chưa có tài liệu.
            </div>
          ) : (
            recentDocs.map((d) => (
              <Link
                key={d.id}
                to="/ai"
                search={{ folderId: d.folderId ?? "", docId: d.id }}
                className="flex items-center gap-3 p-4 hover:bg-accent/40 transition-colors"
              >
                <div className="h-9 w-9 rounded-lg bg-violet-50 text-violet-500 flex items-center justify-center shrink-0">
                  <FileText className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold truncate">{d.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {(d.mimeType?.split("/").pop() ?? "FILE").toUpperCase()}
                    {fmtSize(d.fileSize) ? ` · ${fmtSize(d.fileSize)}` : ""} ·{" "}
                    {relativeTime(d.createdAt)}
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>

      {/* Môn học theo kỳ */}
      <section className="space-y-4">
        <h2 className="font-display font-semibold text-lg">Môn học theo kỳ</h2>
        <div className="flex flex-wrap gap-2">
          {semesters.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setActiveSem(s)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium border transition-colors",
                activeSem === s
                  ? "bg-gradient-brand text-white border-transparent shadow-soft"
                  : "bg-card text-muted-foreground border-border hover:border-primary/40",
              )}
            >
              Kỳ {s}
            </button>
          ))}
        </div>
      </section>

      {/* Danh sách môn của kỳ đang chọn */}
      <section className="space-y-4">
        <h2 className="font-display font-semibold text-lg">Môn học kỳ {activeSem}</h2>
        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-20 rounded-2xl" />
            ))}
          </div>
        ) : subjectsInSem.length === 0 ? (
          <div className="text-sm text-muted-foreground py-8 text-center border border-dashed rounded-2xl">
            Chưa có môn học nào trong kỳ này.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {subjectsInSem.map((s, i) => (
              <Link
                key={s.id}
                to="/documents"
                className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card p-4 hover:border-primary/40 hover:shadow-soft transition-all group"
              >
                <div
                  className={cn(
                    "h-11 w-11 rounded-xl flex items-center justify-center shrink-0",
                    SUBJECT_TONES[i % SUBJECT_TONES.length],
                  )}
                >
                  <FolderKanban className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold truncate">
                    {s.code} - {s.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {docCountBySubject[s.id] ?? 0} tài liệu
                  </div>
                </div>
                <MoreHorizontal className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
