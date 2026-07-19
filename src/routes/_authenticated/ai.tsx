import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { AIChat } from "@/components/ui/AIChat";

const searchSchema = z.object({
  folderId: z.string(),
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
});

export const Route = createFileRoute("/_authenticated/ai")({
  validateSearch: searchSchema,
  component: AIChatPage,
});

function AIChatPage() {
  const { folderId, docId } = Route.useSearch();
  return <AIChat folderId={folderId} docId={docId} />;
}
