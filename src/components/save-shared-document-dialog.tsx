<<<<<<< HEAD
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
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
<<<<<<< HEAD
import { useCreateFolder, useFolders, useSaveSharedDocument } from "@/lib/queries";
=======
=======
>>>>>>> origin/AI-Study-fix
=======
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
=======
import { useEffect, useMemo, useState } from "react";
import { Plus, Loader2, GraduationCap, BookOpen, FolderKanban } from "lucide-react";
import { toast } from "sonner";
>>>>>>> origin/final/demo-v1
import {
  useCreateFolder,
  useFolders,
  useSaveSharedDocument,
<<<<<<< HEAD
} from "@/lib/queries";
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
  useSemesters,
  useSubjectsBySemester,
} from "@/lib/queries";
>>>>>>> origin/final/demo-v1
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
=======
import { Badge } from "@/components/ui/badge";
>>>>>>> origin/final/demo-v1

const NEW_FOLDER_VALUE = "__new__";

export function SaveSharedDocumentDialog({
  open,
  onOpenChange,
  sharedId,
  defaultTitle,
  defaultDescription,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
<<<<<<< HEAD
<<<<<<< HEAD
  sharedId: number;
=======
  sharedId: string;
>>>>>>> origin/Flashcars
=======
  sharedId: string;
>>>>>>> origin/final/demo-v1
  defaultTitle: string;
  defaultDescription?: string;
}) {
  const folders = useFolders();
<<<<<<< HEAD
=======
  const semesters = useSemesters();
>>>>>>> origin/final/demo-v1
  const createFolder = useCreateFolder();
  const save = useSaveSharedDocument();

  const [folderId, setFolderId] = useState<string>("");
<<<<<<< HEAD
=======
  const [semesterId, setSemesterId] = useState("");
  const [subjectId, setSubjectId] = useState("");
>>>>>>> origin/final/demo-v1
  const [newFolderName, setNewFolderName] = useState("");
  const [title, setTitle] = useState(defaultTitle);
  const [description, setDescription] = useState(defaultDescription ?? "");

<<<<<<< HEAD
=======
  const subjects = useSubjectsBySemester(semesterId);
  const foldersInSubject = useMemo(
    () => (folders.data ?? []).filter((f) => f.subjectId === subjectId),
    [folders.data, subjectId],
  );

>>>>>>> origin/final/demo-v1
  useEffect(() => {
    if (open) {
      setTitle(defaultTitle);
      setDescription(defaultDescription ?? "");
      setFolderId("");
<<<<<<< HEAD
=======
      setSemesterId("");
      setSubjectId("");
>>>>>>> origin/final/demo-v1
      setNewFolderName("");
    }
  }, [open, defaultTitle, defaultDescription]);

  const submit = async () => {
    if (!title.trim()) {
<<<<<<< HEAD
      toast.error("Vui lòng nhập tiêu đề");
      return;
    }

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    let targetFolderId: number | null = null;
=======
    let targetFolderId: string | null = null;
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
    let targetFolderId: string | null = null;
>>>>>>> origin/AI-Study-fix
=======
    let targetFolderId: string | null = null;
>>>>>>> origin/test/share-document-cloudinary
=======
    let targetFolderId: string | null = null;
>>>>>>> origin/uichange
=======
    let targetFolderId: string | null = null;
>>>>>>> origin/admin-added
=======
    let targetFolderId: string | null = null;
>>>>>>> origin/update/feature/share
=======
    let targetFolderId: string | null = null;
>>>>>>> origin/update/feature/AI/Quiz
=======
    let targetFolderId: string | null = null;
>>>>>>> origin/Flashcards-fix
=======
    let targetFolderId: string | null = null;
>>>>>>> origin/admin-added-fix
=======
    let targetFolderId: string | null = null;
>>>>>>> origin/Flashcars

    try {
      if (folderId === NEW_FOLDER_VALUE) {
        if (!newFolderName.trim()) {
          toast.error("Vui lòng nhập tên thư mục mới");
          return;
        }
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        const created = await createFolder.mutateAsync({ name: newFolderName.trim() });
        targetFolderId = created.id;
      } else if (folderId) {
        targetFolderId = Number(folderId);
=======
=======
>>>>>>> origin/AI-Study-fix
=======
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
        const created = await createFolder.mutateAsync({
          name: newFolderName.trim(),
=======
      toast.error("Please enter a title");
      return;
    }

    let targetFolderId: string | null = null;

    try {
      if (folderId === NEW_FOLDER_VALUE) {
        if (!semesterId) {
          toast.error("Please select a semester");
          return;
        }
        if (!subjectId) {
          toast.error("Please select a subject");
          return;
        }
        if (!newFolderName.trim()) {
          toast.error("Please enter the new folder name");
          return;
        }
        const created = await createFolder.mutateAsync({
          name: newFolderName.trim(),
          subjectId,
          description: "",
>>>>>>> origin/final/demo-v1
        });
        targetFolderId = created.id;
      } else if (folderId) {
        targetFolderId = folderId;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
      } else {
        toast.error("Vui lòng chọn thư mục lưu trữ");
=======
      } else {
        toast.error("Please select a folder");
>>>>>>> origin/final/demo-v1
        return;
      }

      await save.mutateAsync({
        sharedId,
        folderId: targetFolderId,
        title: title.trim(),
        description: description.trim() || undefined,
      });
<<<<<<< HEAD
      toast.success("Đã lưu tài liệu vào thư mục");
      onOpenChange(false);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Lưu thất bại");
=======
      toast.success("Document saved to folder");
      onOpenChange(false);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
>>>>>>> origin/final/demo-v1
    }
  };

  const isPending = createFolder.isPending || save.isPending;
<<<<<<< HEAD
=======
  const isNewFolder = folderId === NEW_FOLDER_VALUE;
>>>>>>> origin/final/demo-v1

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
<<<<<<< HEAD
          <DialogTitle>Lưu tài liệu</DialogTitle>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
          <DialogDescription>Lưu tài liệu được chia sẻ vào thư mục của bạn.</DialogDescription>
=======
          <DialogDescription>
            Lưu tài liệu được chia sẻ vào thư mục của bạn.
          </DialogDescription>
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
          <DialogDescription>
            Lưu tài liệu được chia sẻ vào thư mục của bạn.
          </DialogDescription>
>>>>>>> origin/AI-Study-fix
=======
          <DialogDescription>
            Lưu tài liệu được chia sẻ vào thư mục của bạn.
          </DialogDescription>
>>>>>>> origin/test/share-document-cloudinary
=======
          <DialogDescription>
            Lưu tài liệu được chia sẻ vào thư mục của bạn.
          </DialogDescription>
>>>>>>> origin/uichange
=======
          <DialogDescription>
            Lưu tài liệu được chia sẻ vào thư mục của bạn.
          </DialogDescription>
>>>>>>> origin/admin-added
=======
          <DialogDescription>
            Lưu tài liệu được chia sẻ vào thư mục của bạn.
          </DialogDescription>
>>>>>>> origin/update/feature/share
=======
          <DialogDescription>
            Lưu tài liệu được chia sẻ vào thư mục của bạn.
          </DialogDescription>
>>>>>>> origin/update/feature/AI/Quiz
=======
          <DialogDescription>
            Lưu tài liệu được chia sẻ vào thư mục của bạn.
          </DialogDescription>
>>>>>>> origin/Flashcards-fix
=======
          <DialogDescription>
            Lưu tài liệu được chia sẻ vào thư mục của bạn.
          </DialogDescription>
>>>>>>> origin/admin-added-fix
=======
          <DialogDescription>
            Lưu tài liệu được chia sẻ vào thư mục của bạn.
          </DialogDescription>
>>>>>>> origin/Flashcars
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Thư mục lưu trữ</Label>
            <Select value={folderId} onValueChange={setFolderId}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn thư mục" />
=======
          <DialogTitle className="flex items-center gap-2">
            <FolderKanban className="h-5 w-5 text-primary" />
            Save document
          </DialogTitle>
          <DialogDescription>
            Save the shared document to one of your folders.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Folder selector */}
          <div className="space-y-2">
            <Label>Destination folder</Label>
            <Select value={folderId} onValueChange={setFolderId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a folder" />
>>>>>>> origin/final/demo-v1
              </SelectTrigger>
              <SelectContent>
                {(folders.data ?? []).map((f) => (
                  <SelectItem key={f.id} value={String(f.id)}>
                    {f.name}
                  </SelectItem>
                ))}
                <SelectItem value={NEW_FOLDER_VALUE}>
                  <span className="flex items-center gap-1.5">
<<<<<<< HEAD
                    <Plus className="h-3.5 w-3.5" /> Tạo thư mục mới
=======
                    <Plus className="h-3.5 w-3.5" /> Create new folder
>>>>>>> origin/final/demo-v1
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
<<<<<<< HEAD
            {folderId === NEW_FOLDER_VALUE && (
              <Input
                placeholder="Tên thư mục mới"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                className="mt-2"
              />
            )}
          </div>

          <div className="space-y-2">
            <Label>Tiêu đề</Label>
=======
          </div>

          {/* New folder creation sub-form */}
          {isNewFolder && (
            <div className="space-y-4 pl-0 border-l-2 border-primary/20 pl-3">
              <div className="space-y-2">
                <Label className="flex items-center gap-1.5">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  Semester
                </Label>
                <Select
                  value={semesterId}
                  onValueChange={(v) => {
                    setSemesterId(v);
                    setSubjectId("");
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a semester" />
                  </SelectTrigger>
                  <SelectContent>
                    {(semesters.data ?? []).map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  Subject
                </Label>
                <Select
                  value={subjectId}
                  onValueChange={setSubjectId}
                  disabled={!semesterId}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        !semesterId
                          ? "Select a semester first"
                          : "Select a subject"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {(subjects.data ?? []).map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        <span className="flex items-center gap-2">
                          {s.code && <span className="font-mono text-xs text-muted-foreground">{s.code}</span>}
                          <span>{s.name}</span>
                          {s.defaultSubject && (
                            <Badge variant="outline" className="ml-auto text-[10px] px-1.5 py-0 h-auto border-primary/30 text-primary">
                              Default
                            </Badge>
                          )}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Input
                placeholder="New folder name"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label>Title</Label>
>>>>>>> origin/final/demo-v1
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className="space-y-2">
<<<<<<< HEAD
            <Label>Mô tả</Label>
=======
            <Label>Description</Label>
>>>>>>> origin/final/demo-v1
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
<<<<<<< HEAD
            Hủy
          </Button>
          <Button onClick={submit} disabled={isPending}>
            {isPending ? "Đang lưu..." : "Lưu"}
=======
            Cancel
          </Button>
          <Button onClick={submit} disabled={isPending}>
            {isPending ? (
              <><Loader2 className="h-4 w-4 mr-1 animate-spin" />Saving...</>
            ) : (
              "Save"
            )}
>>>>>>> origin/final/demo-v1
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
