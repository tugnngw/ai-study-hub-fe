import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { FileText, X } from "lucide-react";
import { useFolders, useSubjects, useUploadDocument } from "@/lib/queries";
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
import { SEMESTERS } from "@/lib/config";

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
  const subjects = useSubjects();
  const upload = useUploadDocument();
  const [files, setFiles] = useState<File[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [folderId, setFolderId] = useState<string>(
    defaultFolderId ? String(defaultFolderId) : "",
  );
  const [semester, setSemester] = useState<string>("");
  const [subjectId, setSubjectId] = useState<string>("");

  useEffect(() => {
    if (open && defaultFolderId) setFolderId(String(defaultFolderId));
  }, [open, defaultFolderId]);

  const semesters = SEMESTERS;

  const subjectsInSemester = useMemo(
    () => (subjects.data ?? []).filter((s) => String(s.semester) === semester),
    [subjects.data, semester],
  );

  const multiple = files.length > 1;

  const reset = () => {
    setFiles([]);
    setTitle("");
    setDescription("");
    setFolderId(defaultFolderId ? String(defaultFolderId) : "");
    setSemester("");
    setSubjectId("");
  };

  const removeFile = (idx: number) =>
    setFiles((prev) => prev.filter((_, i) => i !== idx));

  const submit = async () => {
    if (files.length === 0) return toast.error("Chọn ít nhất một file");
    if (!multiple && !title.trim()) return toast.error("Nhập tiêu đề");
    if (!folderId) return toast.error("Chọn thư mục");
    if (!semester) return toast.error("Chọn kỳ học");
    if (!subjectId) return toast.error("Chọn môn học");
    try {
      await upload.mutateAsync({
        files,
        title: multiple ? files[0].name : title,
        description,
        folderId,
        subjectId: Number(subjectId),
      });
      toast.success(
        multiple ? `Đã tải lên ${files.length} tài liệu` : "Đã tải lên tài liệu",
      );
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
          <DialogDescription>
            Chọn một hoặc nhiều tệp, kèm kỳ và môn học tương ứng.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>File (có thể chọn nhiều)</Label>
            <Input
              type="file"
              multiple
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
                      <span className="truncate">{f.name}</span>
                      <span className="text-xs text-muted-foreground shrink-0">
                        ({(f.size / 1024 / 1024).toFixed(1)} MB)
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

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Kỳ học</Label>
              <Select
                value={semester}
                onValueChange={(v) => {
                  setSemester(v);
                  setSubjectId("");
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn kỳ" />
                </SelectTrigger>
                <SelectContent>
                  {semesters.map((s) => (
                    <SelectItem key={s} value={String(s)}>
                      Kỳ {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Môn học</Label>
              <Select
                value={subjectId}
                onValueChange={setSubjectId}
                disabled={!semester}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={semester ? "Chọn môn" : "Chọn kỳ trước"}
                  />
                </SelectTrigger>
                <SelectContent>
                  {subjectsInSemester.length === 0 ? (
                    <div className="px-3 py-2 text-sm text-muted-foreground">
                      Không có môn trong kỳ này
                    </div>
                  ) : (
                    subjectsInSemester.map((s) => (
                      <SelectItem key={s.id} value={String(s.id)}>
                        {s.code} – {s.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
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
