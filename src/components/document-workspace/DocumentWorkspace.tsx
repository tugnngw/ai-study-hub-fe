// src/components/document-workspace/DocumentWorkspace.tsx
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import { useNavigate } from "@tanstack/react-router";
import { FolderPanel } from "./FolderPanel";
import { ContentPanel } from "./ContentPanel";
import { ChatPanel } from "./ChatPanel";

interface DocumentWorkspaceProps {
  folderId: string;
  docId?: number;
}

export function DocumentWorkspace({ folderId, docId }: DocumentWorkspaceProps) {
  const navigate = useNavigate();
  const search = navigate.location.search as { docId?: string };
  const currentDocId = docId || (search.docId ? Number(search.docId) : undefined);
  const title = currentDocId ? `Document ${currentDocId}` : "";

  return (
    <div className="h-full w-full overflow-hidden">
      <PanelGroup direction="horizontal">
        {/* Panel 1: Folder - default 18%, min 12%, max 35% */}
        <Panel defaultSize={18} minSize={12} maxSize={35} order={1}>
          <FolderPanel folderId={folderId} docId={currentDocId} />
        </Panel>

        <PanelResizeHandle className="w-[3px] bg-border hover:bg-primary transition-colors rounded-full mx-[2px]" />

        {/* Panel 2: Content - default 55%, min 30% */}
        <Panel defaultSize={55} minSize={30} order={2}>
          <ContentPanel folderId={folderId} docId={currentDocId} />
        </Panel>

        <PanelResizeHandle className="w-[3px] bg-border hover:bg-primary transition-colors rounded-full mx-[2px]" />

        {/* Panel 3: Chat - default 27%, min 15%, max 40% */}
        <Panel defaultSize={27} minSize={15} maxSize={40} order={3}>
          <ChatPanel docId={currentDocId} docTitle={title} />
        </Panel>
      </PanelGroup>
    </div>
  );
}
