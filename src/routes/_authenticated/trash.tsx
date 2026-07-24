import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import {
  FileText,
  Folder,
  RotateCcw,
  Trash2,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import {
  useTrash,
  useRestoreFromTrash,
  useEmptyTrash,
  useFolderTrash,
  useRestoreFolderFromTrash,
  usePermanentDeleteFolder,
  useFolders,
  useSubjects,
  useSemesters,
} from "@/lib/queries";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_authenticated/trash")({
  component: TrashPage,
});

function TrashPage() {
  const docs = useTrash();
  const folders = useFolderTrash();
  const restore = useRestoreFromTrash();
  const erase = useEmptyTrash();
  const restoreFolder = useRestoreFolderFromTrash();
  const eraseFolder = usePermanentDeleteFolder();
  const activeFolders = useFolders();
  const subjects = useSubjects();
  const semesters = useSemesters();

  const subjectMap = useMemo(() => {
    const map = new Map();
    (subjects.data ?? []).forEach((s: any) => map.set(s.id, s));
    return map;
  }, [subjects.data]);

  const semesterMap = useMemo(() => {
    const map = new Map();
    (semesters.data ?? []).forEach((s: any) => map.set(s.id, s));
    return map;
  }, [semesters.data]);

  const activeFolderMap = useMemo(() => {
    const map = new Map();
    (activeFolders.data ?? []).forEach((f: any) => map.set(f.id, f));
    // Also index trashed folders so we can look up names of deleted parent folders
    (folders.data ?? []).forEach((f: any) => {
      if (!map.has(f.id)) map.set(f.id, f);
    });
    return map;
  }, [activeFolders.data, folders.data]);

  const isLoading = docs.isLoading || folders.isLoading;
  const items = [
    ...(folders.data ?? []).map((f: any) => ({ ...f, _type: "folder" as const })),
    ...(docs.data ?? []).map((d: any) => ({ ...d, _type: "document" as const })),
  ];

  const getFolderInfo = (folderId?: string) => {
    if (!folderId) return { folder: null, subject: null, semester: null };
    const folder = activeFolderMap.get(folderId);
    if (!folder) return { folder: null, subject: null, semester: null };
    const subject = folder.subjectId ? subjectMap.get(folder.subjectId) : null;
    const semester = subject?.semesterId ? semesterMap.get(subject.semesterId) : null;
    return { folder: folder.name, subject: subject?.name, semester: semester?.name };
  };

  const getSubjectSemester = (subjectId?: string) => {
    if (!subjectId) return { folder: null, subject: null, semester: null };
    const subject = subjectMap.get(subjectId);
    const semester = subject?.semesterId ? semesterMap.get(subject.semesterId) : null;
    return { folder: null, subject: (subject?.name ?? subject?.code) || null, semester: semester?.name ?? null };
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Thùng rác</h1>
        <p className="text-muted-foreground mt-1">
          Các tài liệu và thư mục đã xoá sẽ ở đây. Bạn có thể khôi phục hoặc xoá vĩnh viễn.
        </p>
      </div>

      {isLoading ? (
        <Card>
          <CardContent className="py-12 text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" /> Đang tải…
          </CardContent>
        </Card>
      ) : items.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <Trash2 className="h-10 w-10 mx-auto text-muted-foreground/50" />
            <p className="mt-4 text-sm text-muted-foreground">
              Thùng rác trống
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="border border-border rounded-lg overflow-hidden">
          {items.map((d) => {
            const info = d._type === "folder"
              ? getSubjectSemester(d.subjectId)
              : getFolderInfo(d.folderId);
            return (
              <div
                key={d.id}
                className="flex items-center gap-3 px-4 py-3 border-b border-border last:border-0"
              >
                {d._type === "folder" ? (
                  <Folder className="h-4 w-4 text-primary shrink-0" />
                ) : (
                  <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">
                    {d.name || d.title}
                    <span className="ml-2 text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full">
                      {d._type === "folder" ? "Thư mục" : "Tài liệu"}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-0.5">
                    {d._type === "folder" && info?.semester && (
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-auto">
                        {info.semester}
                      </Badge>
                    )}
                    {d._type === "folder" && info?.subject && (
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-auto">
                        {info.subject}
                      </Badge>
                    )}
                    {d._type !== "folder" && info?.folder && (
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-auto">
                        {info.folder}
                      </Badge>
                    )}
                    {d._type !== "folder" && info?.subject && (
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-auto">
                        {info.subject}
                      </Badge>
                    )}
                    {d._type !== "folder" && info?.semester && (
                      <span className="text-[10px] text-muted-foreground">
                        {info.semester}
                      </span>
                    )}
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    d._type === "folder"
                      ? restoreFolder.mutate(d.id)
                      : restore.mutate(d.id)
                  }
                  disabled={restore.isPending || restoreFolder.isPending}
                >
                  <RotateCcw className="h-3.5 w-3.5 mr-2" /> Khôi phục
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-destructive"
                  onClick={() => {
                    if (confirm(`Xoá vĩnh viễn ${d.name || d.title}?`))
                      d._type === "folder"
                        ? eraseFolder.mutate(d.id)
                        : erase.mutate(d.id);
                  }}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
