import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { AIChat } from "@/components/ui/AIChat";

export const Route = createFileRoute("/_authenticated/ai")({
  validateSearch: z.object({
    f: z.string().optional(),
    d: z.string().optional(),
  }),
  component: AIChatPage,
});

function AIChatPage() {
  const { f, d } = Route.useSearch();
  const folderId = f || "";
  const docId = d || "";

  return <AIChat folderId={folderId} docId={docId || undefined} />;
}
