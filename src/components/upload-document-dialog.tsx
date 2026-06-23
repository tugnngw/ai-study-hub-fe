import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CheckCircle2, Loader2, X, XCircle, FileText } from "lucide-react";
import { useFolders, useUploadDocument } from "@/lib/queries";
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
  const [files, setFiles] = useState<File[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [folderId, setFolderId] = useState<string>(
    defaultFolderId ? String(defaultFolderId) : "",
  );

  // Bottom progress popup state (lives outside the dialog so it persists)
  const [items, setItems] = useState<UploadItem[]>([]);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    if (open && defaultFolderId) setFolderId(String(defaultFolderId));
  }, [open, defaultFolderId]);

  const reset = () => {
    setFiles([]);
    setTitle("");
    setDescription("");
    setFolderId(defaultFolderId ? String(defaultFolderId) : "");
  };

  const submit = async () => {
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
  );
}
