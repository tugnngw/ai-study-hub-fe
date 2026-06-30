import { createFileRoute } from "@tanstack/react-router";
import { useDocument } from "@/lib/queries";
import { Skeleton } from "@/components/ui/skeleton";
import { DocumentWorkspace } from "@/components/document-workspace";

export const Route = createFileRoute("/_authenticated/documents/$id")({
  component: DocumentDetail,
});

function DocumentDetail() {
  const { id } = Route.useParams();
  console.log('[TRACE-1] Route param id:', id, 'type:', typeof id);
  const docId = id; // UUID, no number conversion
  console.log('[TRACE-2] Converted docId:', docId, 'isNaN:', isNaN(docId));
  const doc = useDocument(docId);

  if (doc.isLoading) {
    return <Skeleton className="h-[calc(100vh-8rem)] w-full" />;
  }
  if (!doc.data) {
    return (
      <div className="text-sm text-muted-foreground">Document not found.</div>
    );
  }
  return <DocumentWorkspace folderId={doc.data.folderId || ""} docId={docId} />;
}
