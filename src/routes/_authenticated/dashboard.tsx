<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { createFileRoute, Link } from "@tanstack/react-router";
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
>>>>>>> origin/admin-added
=======
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
>>>>>>> origin/update/feature/share
=======
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
>>>>>>> origin/update/feature/AI/Quiz
=======
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
>>>>>>> origin/Flashcards-fix
=======
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
>>>>>>> origin/admin-added-fix
=======
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
>>>>>>> origin/Flashcars
import {
  FolderKanban,
  FileText,
  Upload,
  Clock,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useFolders, useDocuments } from "@/lib/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> origin/uichange
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
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
=======
>>>>>>> origin/Flashcars
=======
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
>>>>>>> origin/final/demo-v1

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: Dashboard,
});

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> origin/uichange
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
=======
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
>>>>>>> origin/final/demo-v1
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} giờ trước`;
  const days = Math.floor(hrs / 24);
  return `${days} ngày trước`;
}

<<<<<<< HEAD
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
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
=======
>>>>>>> origin/Flashcars
function Dashboard() {
  const folders = useFolders();
  const docs = useDocuments();
  const { user } = useAuth();
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
=======
>>>>>>> origin/Flashcars
  const navigate = useNavigate();

  // Nếu là admin (backend trả role ADMIN) thì điều hướng thẳng vào khu
  // quản trị — không cần lối vào riêng.
=======
function fmtSize(bytes?: number | null) {
  if (!bytes) return "";
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)}kb`;
  return `${(bytes / 1024 / 1024).toFixed(1)}mb`;
}

function Dashboard() {
  const dashboard = useDashboard();
  const { user } = useAuth();
  const navigate = useNavigate();

>>>>>>> origin/final/demo-v1
  const isAdmin = user?.role === "ADMIN";
  useEffect(() => {
    if (isAdmin) navigate({ to: "/admin_panel", replace: true });
  }, [isAdmin, navigate]);
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
=======
>>>>>>> origin/Flashcars

  const recent = (docs.data ?? [])
    .slice()
    .sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""))
    .slice(0, 5);

  const stats = [
    {
      label: "Thư mục",
      value: folders.data?.length ?? 0,
      icon: FolderKanban,
      iconBg: "bg-primary/10 text-primary",
    },
    {
      label: "Tài liệu",
      value: docs.data?.length ?? 0,
      icon: FileText,
      iconBg: "bg-violet/10 text-violet",
    },
    {
      label: "Đã tải lên",
      value: recent.length,
      icon: Upload,
      iconBg: "bg-emerald-500/10 text-emerald-600",
    },
    {
      label: "7 ngày qua",
      value: recent.filter((d) => {
        if (!d.createdAt) return false;
        return Date.now() - new Date(d.createdAt).getTime() < 7 * 86400000;
      }).length,
      icon: Clock,
      iconBg: "bg-amber-500/10 text-amber-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-brand p-6 md:p-8 text-white shadow-brand">
        <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-16 -left-8 h-56 w-56 rounded-full bg-white/5 blur-3xl" />
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-white/80 text-xs font-medium">
              <Sparkles className="h-3.5 w-3.5" /> AI STUDY HUB
            </div>
            <h1 className="font-display font-bold text-2xl md:text-3xl mt-2">
              Chào mừng trở lại, {user?.fullName?.split(" ").pop() ?? "bạn"} 👋
            </h1>
            <p className="text-white/80 text-sm mt-1.5 max-w-md">
              Tiếp tục học cùng AI — tóm tắt, flashcards và quizzes từ tài liệu
              của bạn.
            </p>
          </div>
          <Button
            asChild
            variant="secondary"
            className="bg-white text-primary hover:bg-white/90"
          >
            <Link to="/folders">
              Mở thư mục <ArrowRight className="h-4 w-4 ml-1.5" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="border-border/60 shadow-soft">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-muted-foreground font-medium">
                    {s.label}
                  </div>
                  <div className="text-3xl font-bold font-display mt-2">
                    {folders.isLoading || docs.isLoading ? (
                      <Skeleton className="h-8 w-12" />
                    ) : (
                      s.value
                    )}
                  </div>
                </div>
                <div
                  className={`h-11 w-11 rounded-xl flex items-center justify-center ${s.iconBg}`}
                >
                  <s.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-base font-display">
              Tài liệu gần đây
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5">
            {docs.isLoading &&
              Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-14 rounded-xl" />
              ))}
            {!docs.isLoading && recent.length === 0 && (
              <div className="text-sm text-muted-foreground py-6 text-center">
                Chưa có tài liệu.
              </div>
            )}
            {recent.map((d) => (
              <Link
                key={d.id}
                to="/documents/$id"
                params={{ id: String(d.id) }}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent transition-colors group"
              >
                <div className="h-9 w-9 rounded-lg bg-gradient-soft flex items-center justify-center shrink-0 group-hover:bg-gradient-brand transition-colors">
                  <FileText className="h-4 w-4 text-primary group-hover:text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{d.title}</div>
                  <div className="text-xs text-muted-foreground truncate">
                    {d.description}
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-base font-display">
              Thư mục của bạn
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5">
            {folders.isLoading &&
              Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-14 rounded-xl" />
              ))}
            {!folders.isLoading && (folders.data?.length ?? 0) === 0 && (
              <div className="text-sm text-muted-foreground py-6 text-center">
                Chưa có thư mục.
              </div>
            )}
            {(folders.data ?? []).slice(0, 5).map((f) => (
              <Link
                key={f.id}
                to="/folders/$id"
                params={{ id: String(f.id) }}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent transition-colors group"
              >
                <div className="h-9 w-9 rounded-lg bg-gradient-soft flex items-center justify-center shrink-0 group-hover:bg-gradient-brand transition-colors">
                  <FolderKanban className="h-4 w-4 text-primary group-hover:text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{f.name}</div>
                  <div className="text-xs text-muted-foreground truncate">
                    {f.aiSummary || "Chưa có tóm tắt"}
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> origin/uichange
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
=======

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
>>>>>>> origin/final/demo-v1
          Truy cập nhanh vào tài liệu của bạn
        </p>
      </div>

      {/* Sổ ghi chú gần đây */}
      <section className="space-y-4">
<<<<<<< HEAD
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
=======
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
>>>>>>> origin/final/demo-v1
        </div>
      </section>

      {/* Tài liệu gần đây */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
<<<<<<< HEAD
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
=======
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
>>>>>>> origin/final/demo-v1
        </div>
      </section>

      {/* Môn học theo kỳ */}
      <section className="space-y-4">
<<<<<<< HEAD
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
=======
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
>>>>>>> origin/final/demo-v1
              )}
            >
              Kỳ {s}
            </button>
          ))}
        </div>
      </section>

<<<<<<< HEAD
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
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
=======
>>>>>>> origin/Flashcars
=======
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
>>>>>>> origin/final/demo-v1
