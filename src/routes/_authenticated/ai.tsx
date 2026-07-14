import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { AIChat } from "@/components/ui/AIChat";
import { useDocument } from "@/lib/queries";
import { useEffect } from "react";

const searchSchema = z.object({
  folderId: z.string(),
  docId: z.string().optional(),
});

export const Route = createFileRoute("/_authenticated/ai")({
  validateSearch: searchSchema,
  component: AIChatPage,
});

function AIChatPage() {
  const { folderId, docId } = Route.useSearch();
  const navigate = useNavigate();
  const doc = useDocument(docId ?? "");

  useEffect(() => {
    if (doc.data?.status?.toUpperCase() === "BANNED") {
      navigate({ to: "/documents" });
    }
  }, [doc.data, navigate]);

  return <AIChat folderId={folderId} docId={docId} />;
}
