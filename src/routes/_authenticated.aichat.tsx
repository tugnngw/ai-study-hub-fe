import { useSearchParams } from "react-router-dom";
import { AIChat } from "@/components/ui/AIChat";

export function AIChatPage() {
  const [params] = useSearchParams();
  const folderId = Number(params.get("folderId") ?? 0);
  const docIdRaw = params.get("docId");
  const docId = docIdRaw ? Number(docIdRaw) : undefined;
  return <AIChat folderId={folderId} docId={docId} />;
}
