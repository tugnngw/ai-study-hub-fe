import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { SharedWorkspace } from "@/components/shared-workspace/SharedWorkspace";

const searchSchema = z.object({
  docId: z.string().optional(),
});

export const Route = createFileRoute("/_authenticated/shared/$shareId")({
  validateSearch: searchSchema,
  component: SharedRoute,
});

function SharedRoute() {
  const { shareId } = Route.useParams();
  const { docId } = Route.useSearch();

  return <SharedWorkspace shareToken={shareId} docId={docId} />;
}
