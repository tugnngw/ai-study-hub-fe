import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  FileText,
  Plus,
  MoreHorizontal,
  FolderKanban,
  GraduationCap,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { useDashboard, useFolders, useSemesters } from "@/lib/queries";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import type { Subject, Folder } from "@/lib/types";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: Dashboard,
});

const NOTE_GRADIENTS = [
  "from-violet-400 to-violet-600",
  "from-indigo-400 to-violet-500",
  "from-purple-400 to-fuchsia-500",
];

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
  const { data: semesters = [], isLoading: semLoading } = useSemesters();
  const { data: allFolders = [] } = useFolders();
  const { user } = useAuth();
  const navigate = useNavigate();

  const isAdmin = user?.role === "ADMIN";
  useEffect(() => {
    if (isAdmin) navigate({ to: "/admin_panel", replace: true });
  }, [isAdmin, navigate]);

  const data = dashboard.data;
  const loading = dashboard.isLoading;

  const [activeSemId, setActiveSemId] = useState<string>("");
  // Auto-select first semester when data loads
  useEffect(() => {
    if (!activeSemId && semesters.length > 0) {
      setActiveSemId(semesters[0].id);
    }
  }, [semesters, activeSemId]);

  // Derive subjects for active semester from useDashboard data
  const subjectsInSem = useMemo(
    () => (data?.subjects ?? []).filter((s) => s.semesterId === activeSemId),
    [data?.subjects, activeSemId],
  );

  // Track which subject is expanded to show folders
  const [expandedSubjectId, setExpandedSubjectId] = useState<string | null>(null);

  // Build folder map: subjectId -> folders
  const foldersBySubject = useMemo(() => {
    const map = new Map<string, Folder[]>();
    allFolders.forEach((f) => {
      if (f.subjectId) {
        const list = map.get(f.subjectId) ?? [];
        list.push(f);
        map.set(f.subjectId, list);
      }
    });
    return map;
  }, [allFolders]);

  const recentNotes = data?.recentNotes ?? [];
  const recentDocs = (data?.recentDocuments ?? []).slice(0, 3);

  const activeSem = semesters.find((s) => s.id === activeSemId);

  return (
    <div className="space-y-9">
      {/* Greeting */}
      <div>
        <h1 className="font-display font-bold text-2xl text-foreground">
          Chào mừng trở lại
        </h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          Truy cập nhanh vào tài liệu của bạn
        </p>
      </div>

      {/* Recent notebooks */}
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

      {/* Recent documents */}
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

      {/* Semesters / Subjects / Folders */}
      <section className="space-y-4">
        <h2 className="font-display font-semibold text-lg">Môn học theo kỳ</h2>

        {/* Semester tabs */}
        <div className="flex flex-wrap gap-2">
          {semLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-20 rounded-full" />
              ))
            : semesters.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setActiveSemId(s.id);
                    setExpandedSubjectId(null);
                  }}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-sm font-medium border transition-colors",
                    activeSemId === s.id
                      ? "bg-gradient-brand text-white border-transparent shadow-soft"
                      : "bg-card text-muted-foreground border-border hover:border-primary/40",
                  )}
                >
                  {s.name}
                </button>
              ))}
        </div>

        {/* Subjects in semester */}
        {activeSem && (
          <section className="space-y-3">
            <h3 className="font-display font-semibold text-base text-foreground/80">
              Môn học {activeSem.name}
            </h3>
            {subjectsInSem.length === 0 ? (
              <div className="text-sm text-muted-foreground py-8 text-center border border-dashed rounded-2xl">
                Chưa có môn học nào trong kỳ này.
              </div>
            ) : (
              <div className="space-y-2">
                {subjectsInSem.map((s, i) => {
                  const folders = foldersBySubject.get(s.id) ?? [];
                  const isExpanded = expandedSubjectId === s.id;
                  return (
                    <div key={s.id} className="rounded-2xl border border-border/60 bg-card overflow-hidden">
                      {/* Subject header */}
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedSubjectId(isExpanded ? null : s.id)
                        }
                        className="flex items-center gap-3 w-full p-4 hover:bg-accent/30 transition-colors text-left"
                      >
                        <div
                          className={cn(
                            "h-11 w-11 rounded-xl flex items-center justify-center shrink-0",
                            SUBJECT_TONES[i % SUBJECT_TONES.length],
                          )}
                        >
                          <BookOpen className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-semibold truncate flex items-center gap-2">
                            {s.code && (
                              <span className="text-xs font-mono text-muted-foreground">
                                {s.code}
                              </span>
                            )}
                            <span>{s.name}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {folders.length} thư mục
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Link
                            to="/subjects/$id"
                            params={{ id: s.id }}
                            className="text-xs text-primary font-medium hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Xem tất cả
                          </Link>
                          {isExpanded ? (
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                      </button>

                      {/* Expanded folders */}
                      {isExpanded && (
                        <div className="border-t border-border/60 divide-y divide-border/40">
                          {folders.length === 0 ? (
                            <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                              Chưa có thư mục nào trong môn này.
                            </div>
                          ) : (
                            folders.map((f) => (
                              <Link
                                key={f.id}
                                to="/ai"
                                search={{ folderId: f.id }}
                                className="flex items-center gap-3 px-4 py-3 hover:bg-accent/20 transition-colors group"
                              >
                                <div className="h-8 w-8 rounded-lg bg-primary/5 text-primary flex items-center justify-center shrink-0">
                                  <FolderKanban className="h-4 w-4" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="text-sm font-medium truncate">
                                    {f.name}
                                  </div>
                                  {f.description && (
                                    <div className="text-xs text-muted-foreground truncate">
                                      {f.description}
                                    </div>
                                  )}
                                </div>
                                <div className="text-xs text-muted-foreground shrink-0">
                                  {f.documentCount ?? 0} tài liệu
                                </div>
                                <MoreHorizontal className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                              </Link>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}
      </section>
    </div>
  );
}
