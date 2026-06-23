import { createFileRoute } from "@tanstack/react-router";
import { FileText, RotateCcw, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useTrash, useRestoreFromTrash, useEmptyTrash } from "@/lib/queries";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/_authenticated/trash")({
  component: TrashPage,
});

function TrashPage() {
  const { data, isLoading } = useTrash();
  const restore = useRestoreFromTrash();
  const erase = useEmptyTrash();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Thùng rác</h1>
        <p className="text-muted-foreground mt-1">
          Các tài liệu đã xoá sẽ ở đây. Bạn có thể khôi phục hoặc xoá vĩnh viễn.
        </p>
      </div>

      {isLoading ? (
        <Card>
          <CardContent className="py-12 text-center text-sm">
            Đang tải…
          </CardContent>
        </Card>
      ) : (data ?? []).length === 0 ? (
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
          {(data ?? []).map((d) => (
            <div
              key={d.id}
              className="flex items-center gap-3 px-4 py-3 border-b border-border last:border-0"
            >
              <FileText className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{d.title}</div>
                <div className="text-xs text-muted-foreground truncate">
                  {d.description}
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => restore.mutate(d.id)}
                disabled={restore.isPending}
              >
                <RotateCcw className="h-3.5 w-3.5 mr-2" /> Khôi phục
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-destructive"
                onClick={() => {
                  if (confirm("Xoá vĩnh viễn?")) erase.mutate(d.id);
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
