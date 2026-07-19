import { useParams, useSearchParams } from "react-router-dom";
import { DocumentWorkspace } from "@/components/document-workspace";

export function FolderDetail() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const docIdRaw = params.get("docId");
  const docId = docIdRaw ? Number(docIdRaw) : undefined;
  return <DocumentWorkspace folderId={Number(id)} docId={docId} />;
}
