import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  useRagChat,
  useDeleteDocument,
  useDocument,
  useDocumentsByFolder,
  useDownloadDocument,
  useFolder,
  useUploadDocument,
} from "@/lib/queries";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { FolderPanel } from "./FolderPanel";
import { ContentPanel } from "./ContentPanel";
import { ChatPanel } from "./ChatPanel";

type Tab = "original" | "notes" | "summary" | "flashcards" | "quizzes";

export function DocumentWorkspace({
                                    folderId,
                                    docId,
                                  }: {
  folderId: string;
  docId?: string;
}) {
  const folder = useFolder(folderId);
  const folderDocs = useDocumentsByFolder(folderId);
  const doc = useDocument(docId ?? "");
  const del = useDeleteDocument();
  const chat = useRagChat();
  const download = useDownloadDocument();
  const navigate = useNavigate();

  const [tab, setTab] = useState<Tab>("original");
  const [notes, setNotes] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [uploadOpen, setUploadOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const submitChat = async () => {
    if (!input.trim() || !docId) return;
    const q = input.trim();
    setInput("");
    setMessages((m) => [...m, { role: "user", content: q }]);
    try {
      const res = await chat.mutateAsync({ folderId, documentId: docId, question: q });
      setMessages((m) => [...m, { role: "assistant", content: res.answer }]);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    }
  };

  return (
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr_320px] gap-4 h-[calc(100vh-7rem)] min-h-[480px]">
        <FolderPanel
            folderId={folderId}
            docId={docId}
            folder={folder}
            folderDocs={folderDocs}
        />

        <ContentPanel
            folderId={folderId}
            docId={docId}
            tab={tab}
            setTab={setTab}
            notes={notes}
            setNotes={setNotes}
            folder={folder}
            folderDocs={folderDocs}
            doc={doc}
            uploadOpen={uploadOpen}
            setUploadOpen={setUploadOpen}
            download={download}
            del={del}
        />

        <ChatPanel
            ref={scrollRef}
            docTitle={doc.data?.title || ""}
            messages={messages}
            input={input}
            setInput={setInput}
            submitChat={submitChat}
            isPending={chat.isPending}
            isDocSelected={Boolean(docId)}
        />
      </div>
  );
}

export function UploadDialog({
                               open,
                               onOpenChange,
                               folderId,
                             }: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  folderId: string;
}) {
  const upload = useUploadDocument();
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submit = async () => {
    if (!file) return toast.error("Chọn file");
    if (!title.trim()) return toast.error("Nhập tiêu đề");
    try {
      await upload.mutateAsync({ file, folderId, title, description });
      toast.success("Đã tải lên");
      onOpenChange(false);
      setFile(null);
      setTitle("");
      setDescription("");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed");
    }
  };

  return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tải lên tài liệu</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>File</Label>
              <Input
                  type="file"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
            </div>
            <div className="space-y-2">
              <Label>Tiêu đề</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Mô tả</Label>
              <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Huỷ
            </Button>
            <Button onClick={submit} disabled={upload.isPending}>
              {upload.isPending ? "Đang tải…" : "Tải lên"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  );
}