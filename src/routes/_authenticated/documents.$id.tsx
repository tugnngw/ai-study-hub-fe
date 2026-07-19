import { createFileRoute } from "@tanstack/react-router";
import { useDocument } from "@/lib/queries";
import { Skeleton } from "@/components/ui/skeleton";
import { DocumentWorkspace } from "@/components/document-workspace";

export const Route = createFileRoute("/_authenticated/documents/$id")({
  component: DocumentDetail,
});

function DocumentDetail() {
  const { id } = Route.useParams();
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  console.log('[TRACE-1] Route param id:', id, 'type:', typeof id);
<<<<<<< HEAD
  const docId = Number(id);
  console.log('[TRACE-2] Converted docId:', docId, 'isNaN:', isNaN(docId));
  const doc = useDocument(docId);
=======
  const doc = useDocument(id);
>>>>>>> origin/AI-Study-fix
=======
  const docId = id;
  const doc = useDocument(docId);
>>>>>>> origin/test/share-document-cloudinary
=======
  const docId = id;
  const doc = useDocument(docId);
>>>>>>> origin/uichange
=======
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
  console.log('[TRACE-1] Route param id:', id, 'type:', typeof id);
  const docId = Number(id);
  console.log('[TRACE-2] Converted docId:', docId, 'isNaN:', isNaN(docId));
  const doc = useDocument(docId);
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

  if (doc.isLoading) {
    return <Skeleton className="h-[calc(100vh-8rem)] w-full" />;
  }
  if (!doc.data) {
    return (
      <div className="text-sm text-muted-foreground">Document not found.</div>
    );
  }
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  return <DocumentWorkspace folderId={doc.data.folderId || ""} docId={docId} />;
=======
  return <DocumentWorkspace folderId={doc.data.folderId || ""} docId={id} />;
>>>>>>> origin/AI-Study-fix
=======
  return <DocumentWorkspace folderId={doc.data.folderId || ""} docId={docId} />;
>>>>>>> origin/test/share-document-cloudinary
=======
  return <DocumentWorkspace folderId={doc.data.folderId || ""} docId={docId} />;
>>>>>>> origin/uichange
=======
  return <DocumentWorkspace folderId={doc.data.folderId || ""} docId={docId} />;
>>>>>>> origin/admin-added
=======
  return <DocumentWorkspace folderId={doc.data.folderId || ""} docId={docId} />;
>>>>>>> origin/update/feature/share
=======
  return <DocumentWorkspace folderId={doc.data.folderId || ""} docId={docId} />;
>>>>>>> origin/update/feature/AI/Quiz
=======
  return <DocumentWorkspace folderId={doc.data.folderId || ""} docId={docId} />;
>>>>>>> origin/Flashcards-fix
}
