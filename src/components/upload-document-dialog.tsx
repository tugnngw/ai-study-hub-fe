import { useEffect, useState } from "react";
import { toast } from "sonner";
<<<<<<< HEAD
import { useFolders, useUploadDocument } from "@/lib/queries";
=======
import { useFolders, useUploadDocument, useProcessRagPipeline } from "@/lib/queries";
>>>>>>> origin/AI-Study-fix
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
=======
  const processRag = useProcessRagPipeline();
>>>>>>> origin/AI-Study-fix
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [folderId, setFolderId] = useState<string>(
    defaultFolderId ? String(defaultFolderId) : "",
  );

  useEffect(() => {
    if (open && defaultFolderId) setFolderId(String(defaultFolderId));
  }, [open, defaultFolderId]);

  const reset = () => {
    setFile(null);
    setTitle("");
    setDescription("");
    setFolderId(defaultFolderId ? String(defaultFolderId) : "");
  };

  const submit = async () => {
    if (!file) return toast.error("Chọn một file");
    if (!title.trim()) return toast.error("Nhập tiêu đề");
    if (!folderId) return toast.error("Chọn thư mục");
    try {
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
      await upload.mutateAsync({
        file,
        folderId,

        title,
        description,
      });
      toast.success("Đã tải lên tài liệu");
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
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>File</Label>
<<<<<<< HEAD
<<<<<<< HEAD
            <Input type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
=======
=======
>>>>>>> origin/AI-Study-fix
            <Input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
<<<<<<< HEAD
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
>>>>>>> origin/AI-Study-fix
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
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
=======
=======
>>>>>>> origin/AI-Study-fix
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
<<<<<<< HEAD
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
>>>>>>> origin/AI-Study-fix
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
          <Button onClick={submit} disabled={upload.isPending}>
            {upload.isPending ? "Đang tải lên…" : "Tải lên"}
=======
          <Button onClick={submit} disabled={upload.isPending || processRag.isPending}>
            {upload.isPending || processRag.isPending ? "Đang xử lý…" : "Tải lên"}
>>>>>>> origin/AI-Study-fix
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
