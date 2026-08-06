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
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText, X } from "lucide-react";
import { documentApi } from "@/lib/realApi";
import { formatBytes } from "@/lib/utils";

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
  const doc = useDocument(docId || "");
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
      const res = await chat.mutateAsync({ documentId: docId, question: q });
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
  const [uploadConfig, setUploadConfig] = useState<{ allowedExtensions: string[]; maxFileSize: number } | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Upload config từ backend (endpoint /api/documents/upload-config)
  useEffect(() => {
    if (!open) return;
    documentApi.getUploadConfig().then(setUploadConfig).catch(() => setUploadConfig(null));
  }, [open]);

  const multiple = files.length > 1;

  const reset = () => {
    setFiles([]);
    setTitle("");
    setDescription("");
  };

  const removeFile = (idx: number) =>
    setFiles((prev) => prev.filter((_, i) => i !== idx));

  const submit = async () => {
    if (files.length === 0) return toast.error("Chọn ít nhất một file");
    if (!multiple && !title.trim()) return toast.error("Nhập tiêu đề");
    try {
      await upload.mutateAsync({
        files,
        title: multiple ? files[0].name : title,
        description,
        folderId,
      });
      toast.success(multiple ? `Đã tải lên ${files.length} tài liệu` : "Đã tải lên tài liệu");
      onOpenChange(false);
      reset();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Tải lên thất bại");
    }
  };

  return (
      <Dialog
          open={open}
          onOpenChange={(v) => {
            onOpenChange(v);
            if (!v) reset();
          }}
      >
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Tải lên tài liệu</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {uploadConfig && (
                <div className="rounded-lg border border-border/60 bg-muted/40 px-3 py-2 text-xs text-muted-foreground space-y-0.5">
                  <p>
                    Định dạng hỗ trợ:{" "}
                    <span className="font-medium">
                      {uploadConfig.allowedExtensions.join(", ")}
                    </span>
                  </p>
                  <p>
                    Dung lượng tối đa mỗi tệp:{" "}
                    <span className="font-medium">{formatBytes(uploadConfig.maxFileSize)}</span>
                  </p>
                </div>
            )}
            <div className="space-y-2">
              <Label>File (có thể chọn nhiều)</Label>
              <Input
                  type="file"
                  multiple
                  accept={uploadConfig?.allowedExtensions.join(",") ?? ".pdf,.txt"}
                  onChange={(e) => {
                    const picked = Array.from(e.target.files ?? []);
                    if (picked.length) setFiles((prev) => [...prev, ...picked]);
                    e.target.value = "";
                  }}
              />
              {files.length > 0 && (
                  <ul className="space-y-1 max-h-40 overflow-y-auto rounded-md border border-border/60 p-2">
                    {files.map((f, i) => (
                        <li
                            key={`${f.name}-${i}`}
                            className="flex items-center justify-between gap-2 text-sm px-2 py-1 rounded hover:bg-accent/40"
                        >
                          <span className="truncate flex items-center gap-2 min-w-0">
                            <FileText className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                            <span className="truncate max-w-[300px] sm:max-w-[400px]">{f.name}</span>
                            <span className="text-xs text-muted-foreground shrink-0">
                              ({formatBytes(f.size)})
                            </span>
                          </span>
                          <button
                              type="button"
                              onClick={() => removeFile(i)}
                              className="text-muted-foreground hover:text-destructive shrink-0"
                              title="Bỏ file này"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </li>
                    ))}
                  </ul>
              )}
            </div>

            {!multiple && (
                <div className="space-y-2">
                  <Label>Tiêu đề</Label>
                  <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Tên tài liệu"
                  />
                </div>
            )}
            {multiple && (
                <p className="text-xs text-muted-foreground">
                  Đang tải {files.length} tệp — mỗi tệp sẽ tạo một tài liệu riêng, lấy tên theo tên tệp.
                </p>
            )}
            <div className="space-y-2">
              <Label>Mô tả (tuỳ chọn)</Label>
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
              {upload.isPending ? "Đang tải lên…" : "Tải lên"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  );
}