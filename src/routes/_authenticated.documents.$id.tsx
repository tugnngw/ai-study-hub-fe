import { useParams } from "react-router-dom";
import { useDocument } from "@/lib/queries";
import { Skeleton } from "@/components/ui/skeleton";
import { DocumentWorkspace } from "@/components/document-workspace";

export function DocumentDetail() {
  const { id } = useParams();
  const docId = Number(id);
  const doc = useDocument(docId);

  if (doc.isLoading) {
    return <Skeleton className="h-[calc(100vh-8rem)] w-full" />;
  }
  if (!doc.data) {
    return <div className="text-sm text-muted-foreground">Không tìm thấy tài liệu.</div>;
  }
  return <DocumentWorkspace folderId={doc.data.folderId ?? 0} docId={docId} />;
}
