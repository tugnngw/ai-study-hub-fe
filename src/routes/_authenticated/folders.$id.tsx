import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { useEffect } from "react";
import { useDocument } from "@/lib/queries";
import { DocumentWorkspace } from "@/components/document-workspace";

const searchSchema = z.object({
  docId: z.string().optional(),
});

export const Route = createFileRoute("/_authenticated/folders/$id")({
  validateSearch: searchSchema,
  component: FolderDetail,
});

function FolderDetail() {
  const { id } = Route.useParams();
  const { docId } = Route.useSearch();
  const doc = useDocument(docId ?? "");
  const navigate = useNavigate();

  useEffect(() => {
    if (doc.data?.status?.toUpperCase() === "BANNED") {
        navigate({ to: "/folders/$id", params: { id }, search: {} });
    }
  }, [doc.data, id, navigate]);

  return <DocumentWorkspace folderId={id} docId={docId} />;
}
