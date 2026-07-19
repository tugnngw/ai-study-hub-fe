import { useEffect, useState } from "react";
import { toast } from "sonner";
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
          <DialogDescription>Thêm tệp mới vào không gian làm việc của bạn.</DialogDescription>
=======
          <DialogDescription>
            Thêm tệp mới vào không gian làm việc của bạn.
          </DialogDescription>
>>>>>>> origin/Ai-Study-fix-folder-refactor
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>File</Label>
<<<<<<< HEAD
            <Input type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
=======
            <Input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
>>>>>>> origin/Ai-Study-fix-folder-refactor
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
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
=======
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
>>>>>>> origin/Ai-Study-fix-folder-refactor
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
            {upload.isPending ? "Đang tải lên…" : "Tải lên"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
