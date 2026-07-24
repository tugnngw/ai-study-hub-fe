import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { AIChat } from "@/components/ui/AIChat";
import { useDocument } from "@/lib/queries";
import { useEffect } from "react";

export const Route = createFileRoute("/_authenticated/ai")({
  validateSearch: z.object({
    f: z.string().optional(),
    d: z.string().optional(),
  }),
  component: AIChatPage,
});

function AIChatPage() {
  const { f, d } = Route.useSearch();
  const navigate = useNavigate();
  const folderId = f || "";
  const docId = d || "";
  const doc = useDocument(docId);

  useEffect(() => {
    if (doc.data?.status?.toUpperCase() === "BANNED") {
      navigate({ to: "/documents" });
    }
  }, [doc.data, navigate]);

  return <AIChat folderId={folderId} docId={docId || undefined} />;
}
