import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
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
import {
  useCreateFolder,
  useFolders,
  useSaveSharedDocument,
} from "@/lib/queries";
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
  sharedId: number;
  defaultTitle: string;
  defaultDescription?: string;
}) {
  const folders = useFolders();
  const createFolder = useCreateFolder();
  const save = useSaveSharedDocument();

  const [folderId, setFolderId] = useState<string>("");
  const [newFolderName, setNewFolderName] = useState("");
  const [title, setTitle] = useState(defaultTitle);
  const [description, setDescription] = useState(defaultDescription ?? "");

  useEffect(() => {
    if (open) {
      setTitle(defaultTitle);
      setDescription(defaultDescription ?? "");
      setFolderId("");
      setNewFolderName("");
    }
  }, [open, defaultTitle, defaultDescription]);

  const submit = async () => {
    if (!title.trim()) {
      toast.error("Vui lòng nhập tiêu đề");
      return;
    }

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
        const created = await createFolder.mutateAsync({
          name: newFolderName.trim(),
        });
        targetFolderId = created.id;
      } else if (folderId) {
        targetFolderId = folderId;
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
      } else {
        toast.error("Vui lòng chọn thư mục lưu trữ");
        return;
      }

      await save.mutateAsync({
        sharedId,
        folderId: targetFolderId,
        title: title.trim(),
        description: description.trim() || undefined,
      });
      toast.success("Đã lưu tài liệu vào thư mục");
      onOpenChange(false);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Lưu thất bại");
    }
  };

  const isPending = createFolder.isPending || save.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Lưu tài liệu</DialogTitle>
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
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Thư mục lưu trữ</Label>
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
                <SelectItem value={NEW_FOLDER_VALUE}>
                  <span className="flex items-center gap-1.5">
                    <Plus className="h-3.5 w-3.5" /> Tạo thư mục mới
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
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
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Mô tả</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button onClick={submit} disabled={isPending}>
            {isPending ? "Đang lưu..." : "Lưu"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
