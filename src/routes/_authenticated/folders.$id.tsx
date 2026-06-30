import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
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
  return <DocumentWorkspace folderId={id} docId={docId} />;
}
