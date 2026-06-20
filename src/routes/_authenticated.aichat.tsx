import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { AIChat } from "@/components/ui/AIChat";

const searchSchema = z.object({
  folderId: z.coerce.number(),
  docId: z.coerce.number().optional(),
});

export const Route = createFileRoute("/_authenticated/aichat")({
  validateSearch: searchSchema,
  component: AIChatPage,
});

function AIChatPage() {
  const { folderId, docId } = Route.useSearch();
  return <AIChat folderId={folderId} docId={docId} />;
}
