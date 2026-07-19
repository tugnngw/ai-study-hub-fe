import { useEffect, useState } from "react";
import { toast } from "sonner";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { useFolders, useUploadDocument } from "@/lib/queries";
=======
import { useFolders, useUploadDocument, useProcessRagPipeline } from "@/lib/queries";
>>>>>>> origin/AI-Study-fix
=======
import { CheckCircle2, Loader2, X, XCircle, FileText } from "lucide-react";
import { useFolders, useUploadDocument } from "@/lib/queries";
>>>>>>> origin/test/share-document-cloudinary
=======
import { CheckCircle2, Loader2, X, XCircle, FileText } from "lucide-react";
import { useFolders, useUploadDocument } from "@/lib/queries";
>>>>>>> origin/uichange
=======
import { useFolders, useUploadDocument } from "@/lib/queries";
>>>>>>> origin/admin-added
=======
import { useFolders, useUploadDocument } from "@/lib/queries";
>>>>>>> origin/update/feature/share
=======
import { useFolders, useUploadDocument } from "@/lib/queries";
>>>>>>> origin/update/feature/AI/Quiz
=======
import { useFolders, useUploadDocument } from "@/lib/queries";
>>>>>>> origin/Flashcards-fix
=======
import { useFolders, useUploadDocument } from "@/lib/queries";
>>>>>>> origin/admin-added-fix
=======
import { useFolders, useUploadDocument } from "@/lib/queries";
>>>>>>> origin/Flashcars
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> origin/uichange
type UploadStatus = "pending" | "uploading" | "done" | "error";

interface UploadItem {
  id: string;
  name: string;
  status: UploadStatus;
  error?: string;
}

function formatBytes(n: number) {
  if (!n) return "0 B";
  if (n < 1024) return `${n} B`;
  if (n < 1024 ** 2) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 ** 2).toFixed(1)} MB`;
}

<<<<<<< HEAD
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
=======
>>>>>>> origin/Flashcars
export function UploadDocumentDialog({
  open,
  onOpenChange,
  defaultFolderId,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  defaultFolderId?: number;
}) {
  const folders = useFolders();
  const upload = useUploadDocument();
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
  const processRag = useProcessRagPipeline();
>>>>>>> origin/AI-Study-fix
  const [file, setFile] = useState<File | null>(null);
=======
  const [files, setFiles] = useState<File[]>([]);
>>>>>>> origin/test/share-document-cloudinary
=======
  const [files, setFiles] = useState<File[]>([]);
>>>>>>> origin/uichange
=======
  const [file, setFile] = useState<File | null>(null);
>>>>>>> origin/admin-added
=======
  const [file, setFile] = useState<File | null>(null);
>>>>>>> origin/update/feature/share
=======
  const [file, setFile] = useState<File | null>(null);
>>>>>>> origin/update/feature/AI/Quiz
=======
  const [file, setFile] = useState<File | null>(null);
>>>>>>> origin/Flashcards-fix
=======
  const [file, setFile] = useState<File | null>(null);
>>>>>>> origin/admin-added-fix
=======
  const [file, setFile] = useState<File | null>(null);
>>>>>>> origin/Flashcars
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [folderId, setFolderId] = useState<string>(
    defaultFolderId ? String(defaultFolderId) : "",
  );

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> origin/uichange
  // Bottom progress popup state (lives outside the dialog so it persists)
  const [items, setItems] = useState<UploadItem[]>([]);
  const [popupOpen, setPopupOpen] = useState(false);

<<<<<<< HEAD
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
=======
>>>>>>> origin/Flashcars
  useEffect(() => {
    if (open && defaultFolderId) setFolderId(String(defaultFolderId));
  }, [open, defaultFolderId]);

  const reset = () => {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    setFile(null);
=======
    setFiles([]);
>>>>>>> origin/test/share-document-cloudinary
=======
    setFiles([]);
>>>>>>> origin/uichange
=======
    setFile(null);
>>>>>>> origin/admin-added
=======
    setFile(null);
>>>>>>> origin/update/feature/share
=======
    setFile(null);
>>>>>>> origin/update/feature/AI/Quiz
=======
    setFile(null);
>>>>>>> origin/Flashcards-fix
=======
    setFile(null);
>>>>>>> origin/admin-added-fix
=======
    setFile(null);
>>>>>>> origin/Flashcars
    setTitle("");
    setDescription("");
    setFolderId(defaultFolderId ? String(defaultFolderId) : "");
  };

  const submit = async () => {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
=======
>>>>>>> origin/Flashcars
    if (!file) return toast.error("Chọn một file");
    if (!title.trim()) return toast.error("Nhập tiêu đề");
    if (!folderId) return toast.error("Chọn thư mục");
    try {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
      const doc = await upload.mutateAsync({
        file,
        folderId: Number(folderId),
        title,
        description,
      });
      if ((doc as { ragUploadFailed?: boolean }).ragUploadFailed) {
        toast.warning("Đã tạo tài liệu nhưng nhúng vector (RAG) thất bại — thử chat lại sau.");
      } else {
        toast.success("Đã tải lên tài liệu");
      }
=======
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
=======
>>>>>>> origin/Flashcars
      await upload.mutateAsync({
        file,
        folderId,

        title,
        description,
      });
      toast.success("Đã tải lên tài liệu");
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
      const docs = await upload.mutateAsync({
        file,
        folderId,
        title,
        description,
      });
      console.log('[RAG] Upload success, docs:', docs);
      if (docs && docs.length > 0) {
        const docId = docs[0].id;
        console.log('[RAG] Calling process with documentId:', docId);
        try {
          await processRag.mutateAsync({ documentId: docId });
          console.log('[RAG] Process pipeline triggered');
          toast.success("Đã tải lên và bắt đầu xử lý RAG");
        } catch (error) {
          console.error('[RAG] Process failed:', error);
          toast.error("RAG processing failed: " + (error as Error).message);
        }
      } else {
        toast.success("Đã tải lên tài liệu");
      }
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
=======
>>>>>>> origin/Flashcars
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tải lên tài liệu</DialogTitle>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
          <DialogDescription>Thêm tệp mới vào không gian làm việc của bạn.</DialogDescription>
=======
          <DialogDescription>
            Thêm tệp mới vào không gian làm việc của bạn.
          </DialogDescription>
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
          <DialogDescription>
            Thêm tệp mới vào không gian làm việc của bạn.
          </DialogDescription>
>>>>>>> origin/AI-Study-fix
=======
          <DialogDescription>
            Thêm tệp mới vào không gian làm việc của bạn.
          </DialogDescription>
>>>>>>> origin/admin-added
=======
          <DialogDescription>
            Thêm tệp mới vào không gian làm việc của bạn.
          </DialogDescription>
>>>>>>> origin/update/feature/share
=======
          <DialogDescription>
            Thêm tệp mới vào không gian làm việc của bạn.
          </DialogDescription>
>>>>>>> origin/update/feature/AI/Quiz
=======
          <DialogDescription>
            Thêm tệp mới vào không gian làm việc của bạn.
          </DialogDescription>
>>>>>>> origin/Flashcards-fix
=======
          <DialogDescription>
            Thêm tệp mới vào không gian làm việc của bạn.
          </DialogDescription>
>>>>>>> origin/admin-added-fix
=======
          <DialogDescription>
            Thêm tệp mới vào không gian làm việc của bạn.
          </DialogDescription>
>>>>>>> origin/Flashcars
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>File</Label>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
            <Input type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
=======
=======
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
=======
>>>>>>> origin/Flashcars
            <Input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
=======
>>>>>>> origin/Flashcars
          </div>
          <div className="space-y-2">
            <Label>Tiêu đề</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Tên tài liệu"
            />
          </div>
          <div className="space-y-2">
            <Label>Mô tả (tuỳ chọn)</Label>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
=======
=======
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
=======
>>>>>>> origin/Flashcars
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
=======
>>>>>>> origin/Flashcars
          </div>
          <div className="space-y-2">
            <Label>Thư mục</Label>
            <Select value={folderId} onValueChange={setFolderId}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn thư mục" />
              </SelectTrigger>
              <SelectContent>
                {(folders.data ?? []).map((f) => (
                  <SelectItem key={f.id} value={String(f.id)}>
                    {f.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Huỷ
          </Button>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
          <Button onClick={submit} disabled={upload.isPending}>
            {upload.isPending ? "Đang tải lên…" : "Tải lên"}
=======
          <Button onClick={submit} disabled={upload.isPending || processRag.isPending}>
            {upload.isPending || processRag.isPending ? "Đang xử lý…" : "Tải lên"}
>>>>>>> origin/AI-Study-fix
=======
          <Button onClick={submit} disabled={upload.isPending}>
            {upload.isPending ? "Đang tải lên…" : "Tải lên"}
>>>>>>> origin/admin-added
=======
          <Button onClick={submit} disabled={upload.isPending}>
            {upload.isPending ? "Đang tải lên…" : "Tải lên"}
>>>>>>> origin/update/feature/share
=======
          <Button onClick={submit} disabled={upload.isPending}>
            {upload.isPending ? "Đang tải lên…" : "Tải lên"}
>>>>>>> origin/update/feature/AI/Quiz
=======
          <Button onClick={submit} disabled={upload.isPending}>
            {upload.isPending ? "Đang tải lên…" : "Tải lên"}
>>>>>>> origin/Flashcards-fix
=======
          <Button onClick={submit} disabled={upload.isPending}>
            {upload.isPending ? "Đang tải lên…" : "Tải lên"}
>>>>>>> origin/admin-added-fix
=======
          <Button onClick={submit} disabled={upload.isPending}>
            {upload.isPending ? "Đang tải lên…" : "Tải lên"}
>>>>>>> origin/Flashcars
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> origin/uichange
    if (files.length === 0) return toast.error("Chọn ít nhất một file");
    if (!folderId) return toast.error("Chọn thư mục");

    // Seed the bottom popup
    const queue: UploadItem[] = files.map((f, i) => ({
      id: `${Date.now()}-${i}-${f.name}`,
      name: f.name,
      status: "pending",
    }));
    setItems(queue);
    setPopupOpen(true);

    const filesToUpload = [...files];
    const sharedTitle = title.trim();
    const sharedDesc = description;
    const targetFolder = folderId;

    // Close dialog immediately; progress shows in bottom popup
    onOpenChange(false);
    reset();

    let okCount = 0;
    for (let i = 0; i < filesToUpload.length; i++) {
      const f = filesToUpload[i];
      const id = queue[i].id;
      setItems((prev) =>
        prev.map((it) => (it.id === id ? { ...it, status: "uploading" } : it)),
      );
      try {
        await upload.mutateAsync({
          file: f,
          folderId: targetFolder,
          // When uploading a single file keep the typed title; otherwise use filename
          title:
            filesToUpload.length === 1 && sharedTitle
              ? sharedTitle
              : f.name.replace(/\.[^.]+$/, ""),
          description: sharedDesc,
        });
        okCount++;
        setItems((prev) =>
          prev.map((it) => (it.id === id ? { ...it, status: "done" } : it)),
        );
      } catch (e) {
        setItems((prev) =>
          prev.map((it) =>
            it.id === id
              ? {
                  ...it,
                  status: "error",
                  error: e instanceof Error ? e.message : "Lỗi",
                }
              : it,
          ),
        );
      }
    }

    if (okCount > 0)
      toast.success(`Đã tải lên ${okCount}/${filesToUpload.length} tài liệu`);
    else toast.error("Tải lên thất bại");
  };

  const inProgress = items.some(
    (it) => it.status === "pending" || it.status === "uploading",
  );
  const doneCount = items.filter((it) => it.status === "done").length;

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(v) => {
          onOpenChange(v);
          if (!v) reset();
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tải lên tài liệu</DialogTitle>
            <DialogDescription>
              Thêm một hoặc nhiều tệp vào không gian làm việc của bạn.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>File (có thể chọn nhiều)</Label>
              <Input
                type="file"
                multiple
                onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
              />
              {files.length > 0 && (
                <div className="rounded-lg border border-border divide-y divide-border/60 max-h-40 overflow-y-auto">
                  {files.map((f, i) => (
                    <div
                      key={`${f.name}-${i}`}
                      className="flex items-center gap-2 px-3 py-2 text-xs"
                    >
                      <FileText className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span className="truncate flex-1">{f.name}</span>
                      <span className="text-muted-foreground shrink-0">
                        {formatBytes(f.size)}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setFiles((prev) => prev.filter((_, j) => j !== i))
                        }
                        className="text-muted-foreground hover:text-destructive shrink-0"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {files.length <= 1 && (
              <div className="space-y-2">
                <Label>Tiêu đề (tuỳ chọn)</Label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Tên tài liệu"
                />
              </div>
            )}
            <div className="space-y-2">
              <Label>Mô tả (tuỳ chọn)</Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Thư mục</Label>
              <Select value={folderId} onValueChange={setFolderId}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn thư mục" />
                </SelectTrigger>
                <SelectContent>
                  {(folders.data ?? []).map((f) => (
                    <SelectItem key={f.id} value={String(f.id)}>
                      {f.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Huỷ
            </Button>
            <Button onClick={submit} disabled={upload.isPending}>
              {files.length > 1 ? `Tải lên ${files.length} tệp` : "Tải lên"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bottom upload progress popup */}
      {popupOpen && items.length > 0 && (
        <div className="fixed bottom-4 right-4 z-[60] w-[320px] max-w-[calc(100vw-2rem)] rounded-xl border border-border bg-card shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-muted/40">
            <span className="text-sm font-semibold">
              {inProgress
                ? `Đang tải lên… (${doneCount}/${items.length})`
                : `Hoàn tất (${doneCount}/${items.length})`}
            </span>
            {!inProgress && (
              <button
                type="button"
                onClick={() => {
                  setPopupOpen(false);
                  setItems([]);
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="max-h-64 overflow-y-auto divide-y divide-border/60">
            {items.map((it) => (
              <div
                key={it.id}
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm"
              >
                <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="truncate flex-1">{it.name}</span>
                {it.status === "uploading" && (
                  <Loader2 className="h-4 w-4 animate-spin text-primary shrink-0" />
                )}
                {it.status === "pending" && (
                  <span className="text-[11px] text-muted-foreground shrink-0">
                    Chờ…
                  </span>
                )}
                {it.status === "done" && (
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                )}
                {it.status === "error" && (
                  <XCircle
                    className="h-4 w-4 text-destructive shrink-0"
                    aria-label={it.error}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
<<<<<<< HEAD
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
=======
>>>>>>> origin/Flashcars
  );
}
