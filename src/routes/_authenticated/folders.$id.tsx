import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { DocumentWorkspace } from "@/components/document-workspace";

const searchSchema = z.object({
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  docId: z.coerce.number().optional(),
=======
  docId: z.string().optional(),
>>>>>>> origin/AI-Study-fix
=======
  docId: z.string().optional(),
>>>>>>> origin/test/share-document-cloudinary
=======
  docId: z.string().optional(),
>>>>>>> origin/uichange
=======
  docId: z.coerce.number().optional(),
>>>>>>> origin/admin-added
=======
  docId: z.coerce.number().optional(),
>>>>>>> origin/update/feature/share
=======
  docId: z.coerce.number().optional(),
>>>>>>> origin/update/feature/AI/Quiz
=======
  docId: z.coerce.number().optional(),
>>>>>>> origin/Flashcards-fix
});

export const Route = createFileRoute("/_authenticated/folders/$id")({
  validateSearch: searchSchema,
  component: FolderDetail,
});

function FolderDetail() {
  const { id } = Route.useParams();
  const { docId } = Route.useSearch();
  return <DocumentWorkspace folderId={id} docId={docId} />;
}
