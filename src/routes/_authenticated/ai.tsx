import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { AIChat } from "@/components/ui/AIChat";

const searchSchema = z.object({
  folderId: z.string(),
<<<<<<< HEAD
  docId: z.coerce.number().optional(),
=======
  docId: z.string().optional(),
>>>>>>> origin/AI-Study-fix
});

export const Route = createFileRoute("/_authenticated/ai")({
  validateSearch: searchSchema,
  component: AIChatPage,
});

function AIChatPage() {
  const { folderId, docId } = Route.useSearch();
  return <AIChat folderId={folderId} docId={docId} />;
}
