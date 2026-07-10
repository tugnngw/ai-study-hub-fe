import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  useFolders,
  useSubjects,
  useUpdateDocument,
} from "@/lib/queries";
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

/**
 * Dialog chỉnh sửa thông tin tài liệu: tiêu đề, mô tả, kỳ, môn, thư mục.
 */
export function EditDocumentDialog({
  open,
  onOpenChange,
  documentId,
  initial,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  documentId: string;
  initial: {
    title: string;
    description?: string;
    folderId?: string;
    subjectId?: number;
  };
}) {
  const folders = useFolders();
  const subjects = useSubjects();
  const update = useUpdateDocument();

  const [title, setTitle] = useState(initial.title);
  const [description, setDescription] = useState(initial.description ?? "");
  const [folderId, setFolderId] = useState(initial.folderId ?? "");
  const [semester, setSemester] = useState<string>("");
  const [subjectId, setSubjectId] = useState<string>(
    initial.subjectId != null ? String(initial.subjectId) : "",
  );

  // Khi mở dialog, nạp lại giá trị ban đầu + suy ra kỳ từ môn hiện tại.
  useEffect(() => {
    if (!open) return;
    setTitle(initial.title);
    setDescription(initial.description ?? "");
    setFolderId(initial.folderId ?? "");
    setSubjectId(initial.subjectId != null ? String(initial.subjectId) : "");
    const subj = (subjects.data ?? []).find((s) => s.id === initial.subjectId);
    setSemester(subj ? String(subj.semester) : "");
  }, [open, initial, subjects.data]);

  const semesters = SEMESTERS;

  const subjectsInSemester = useMemo(
    () => (subjects.data ?? []).filter((s) => String(s.semester) === semester),
    [subjects.data, semester],
  );

  const submit = async () => {
    if (!title.trim()) return toast.error("Nhập tiêu đề");
    try {
      await update.mutateAsync({
        id: documentId,
        title,
        description,
        folderId: folderId || undefined,
        subjectId: subjectId ? Number(subjectId) : undefined,
      });
      toast.success("Đã cập nhật tài liệu");
      onOpenChange(false);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Cập nhật thất bại");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chỉnh sửa tài liệu</DialogTitle>
          <DialogDescription>
            Cập nhật tiêu đề, mô tả, kỳ, môn và thư mục của tài liệu.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
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
          <Button onClick={submit} disabled={update.isPending}>
            {update.isPending ? "Đang lưu…" : "Lưu thay đổi"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
