import { createFileRoute } from "@tanstack/react-router";
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
} from "@/lib/queries";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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

  const isLoading = docs.isLoading || folders.isLoading;
  const items = [
    ...(folders.data ?? []).map((f: any) => ({ ...f, _type: "folder" as const })),
    ...(docs.data ?? []).map((d: any) => ({ ...d, _type: "document" as const })),
  ];

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
          {items.map((d) => (
            <div
              key={d.id}
              className="flex items-center gap-3 px-4 py-3 border-b border-border last:border-0"
            >
              {d._type === "folder" ? (
                <Folder className="h-4 w-4 text-primary" />
              ) : (
                <FileText className="h-4 w-4 text-muted-foreground" />
              )}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">
                  {d.name || d.title}
                  {d._type === "folder" && (
                    <span className="ml-2 text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full">Thư mục</span>
                  )}
                </div>
                <div className="text-xs text-muted-foreground truncate">
                  {d.description || d.name || ""}
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
          ))}
        </div>
      )}
    </div>
  );
}
