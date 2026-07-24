import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { z } from "zod";
import { useEffect } from "react";
import { FolderX } from "lucide-react";
import { useDocument, useFolder } from "@/lib/queries";
import { DocumentWorkspace } from "@/components/document-workspace";
import { Button } from "@/components/ui/button";

const searchSchema = z.object({
  docId: z.string().optional(),
});

export const Route = createFileRoute("/_authenticated/folders/$id")({
  validateSearch: searchSchema,
  component: FolderDetail,
});

function FolderDetail() {
  const { id } = Route.useParams();
  const { docId } = Route.useSearch();
  const folder = useFolder(id);
  const doc = useDocument(docId || "");
  const navigate = useNavigate();

  useEffect(() => {
    if (doc.data?.status?.toUpperCase() === "BANNED") {
        navigate({ to: "/folders/$id", params: { id }, search: {} });
    }
  }, [doc.data, id, navigate]);

  if (folder.isLoading) return null;
  if (folder.error || !folder.data) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4 text-center">
        <FolderX className="h-16 w-16 text-muted-foreground/50" />
        <h2 className="text-xl font-semibold">Thư mục không tồn tại hoặc đã bị xoá</h2>
        <p className="text-sm text-muted-foreground max-w-sm">
          Thư mục này có thể đã bị xoá hoặc bạn không có quyền truy cập.
          Hãy khôi phục từ thùng rác nếu bạn muốn sử dụng lại.
        </p>
        <div className="flex gap-3 mt-2">
          <Button variant="outline" onClick={() => navigate({ to: "/folders" })}>
            Quay lại thư mục
          </Button>
          <Button variant="outline" onClick={() => navigate({ to: "/trash" })}>
            Mở thùng rác
          </Button>
        </div>
      </div>
    );
  }

  return <DocumentWorkspace folderId={id} docId={docId || ""} />;
}
