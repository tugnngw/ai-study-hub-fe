import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { FolderKanban, BookOpen, ChevronLeft, GraduationCap, MoreHorizontal, Loader2 } from "lucide-react";
import { useFolders, useSemesters } from "@/lib/queries";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { Subject } from "@/lib/types";

export const Route = createFileRoute("/_authenticated/subjects/$id")({
  component: SubjectDetailPage,
});

function SubjectDetailPage() {
  const { id: subjectId } = Route.useParams();
  const { data: semesters = [], isLoading: semLoading } = useSemesters();
  const { data: allFolders = [], isLoading: foldersLoading } = useFolders();

  // Need subjects — fetch from all semesters
  const allSubjects: Subject[] = useMemo(() => {
    // Semesters don't have subjects embedded. We need to find the subject
    // from the stored dashboard data or re-fetch.
    // For now, we display folders filtered by subjectId.
    // The subject info is not directly available without a subjects API.
    return [];
  }, [semesters]);

  const folders = useMemo(
    () => allFolders.filter((f) => f.subjectId === subjectId),
    [allFolders, subjectId],
  );

  // Find which semester this subject belongs to
  // Since we don't have subject details directly, we check folders
  const semesterName = "Subjects";

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground transition-colors">
          Dashboard
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium truncate">
          Subject folders
        </span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="h-8 w-8 rounded-lg border border-border flex items-center justify-center hover:bg-accent transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </Link>
            <div className="h-10 w-10 rounded-xl bg-violet-50 text-violet-500 flex items-center justify-center">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">
                Subject
              </h1>
              <p className="text-xs text-muted-foreground">
                ID: {subjectId.slice(0, 8)}...
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Folder grid */}
      <section className="space-y-4">
        <h2 className="font-display font-semibold text-lg">
          Folders ({folders.length})
        </h2>

        {foldersLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-28 rounded-2xl" />
            ))}
          </div>
        ) : folders.length === 0 ? (
          <div className="text-sm text-muted-foreground py-12 text-center border border-dashed rounded-2xl">
            <FolderKanban className="h-10 w-10 mx-auto text-muted-foreground/50 mb-3" />
            <p>Chưa có thư mục nào trong môn này.</p>
            <Link
              to="/folders"
              className="text-primary font-medium hover:underline mt-2 inline-block"
            >
              Tạo thư mục mới
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {folders.map((f, i) => (
              <Link
                key={f.id}
                to="/ai"
                search={{ folderId: f.id }}
                className={cn(
                  "group rounded-2xl border border-border/60 bg-card p-5 hover:border-primary/40 hover:shadow-soft transition-all",
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/5 text-primary flex items-center justify-center shrink-0">
                    <FolderKanban className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold truncate group-hover:text-primary transition-colors">
                      {f.name}
                    </div>
                    {f.description && (
                      <div className="text-xs text-muted-foreground truncate mt-0.5">
                        {f.description}
                      </div>
                    )}
                    <div className="text-xs font-medium text-primary mt-2">
                      {f.documentCount ?? 0} tài liệu
                    </div>
                  </div>
                  <MoreHorizontal className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
