// src/features/shares/components/SaveFileDialog.tsx
// Modal "Lưu File" — theo figma. Cho chọn thư mục lưu (hoặc tạo mới),
// nhập Tiêu đề + Mô tả. Mock: chỉ toast + đóng (chưa nối backend lưu thật).

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Save, FolderPlus, Folder } from "lucide-react";
import {
<<<<<<< HEAD
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
=======
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
>>>>>>> origin/Flashcars
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
<<<<<<< HEAD
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
=======
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
>>>>>>> origin/Flashcars
} from "@/components/ui/select";
import { api } from "@/lib/api";
import { sharesApi } from "../services";

<<<<<<< HEAD
interface FolderOpt { id: string; name: string }

export interface SaveTarget {
  id: number;            // id mục được chia sẻ
=======
interface FolderOpt {
  id: string;
  name: string;
}

export interface SaveTarget {
  id: number; // id mục được chia sẻ
>>>>>>> origin/Flashcars
  kind: "folder" | "file";
  name: string;
}

export function SaveFileDialog({
<<<<<<< HEAD
  open, onOpenChange, target,
=======
  open,
  onOpenChange,
  target,
>>>>>>> origin/Flashcars
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  target: SaveTarget | null;
}) {
  const [folders, setFolders] = useState<FolderOpt[]>([]);
  const [folderId, setFolderId] = useState<string>("");
  const [creatingNew, setCreatingNew] = useState(false);
  const [newFolder, setNewFolder] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  // nạp danh sách thư mục khi mở
  useEffect(() => {
    if (!open) return;
    let alive = true;
    api<FolderOpt[]>("/api/folder/getall")
<<<<<<< HEAD
      .then((d) => { if (alive) { setFolders(d); setFolderId(d[0]?.id ?? ""); } })
      .catch(() => { if (alive) setFolders([]); });
=======
      .then((d) => {
        if (alive) {
          setFolders(d);
          setFolderId(d[0]?.id ?? "");
        }
      })
      .catch(() => {
        if (alive) setFolders([]);
      });
>>>>>>> origin/Flashcars
    // điền sẵn tiêu đề theo tên item đang lưu
    setTitle(target?.name ?? "");
    setDesc("");
    setCreatingNew(false);
    setNewFolder("");
<<<<<<< HEAD
    return () => { alive = false; };
  }, [open, target]);

  const onSave = async () => {
    if (!title.trim()) { toast.error("Vui lòng nhập tiêu đề"); return; }
    const useNew = creatingNew && newFolder.trim().length > 0;
    if (!useNew && !folderId) { toast.error("Vui lòng chọn hoặc tạo thư mục"); return; }
    if (!target) return;
    const destName = useNew ? newFolder.trim() : (folders.find((f) => f.id === folderId)?.name ?? "");
=======
    return () => {
      alive = false;
    };
  }, [open, target]);

  const onSave = async () => {
    if (!title.trim()) {
      toast.error("Vui lòng nhập tiêu đề");
      return;
    }
    const useNew = creatingNew && newFolder.trim().length > 0;
    if (!useNew && !folderId) {
      toast.error("Vui lòng chọn hoặc tạo thư mục");
      return;
    }
    if (!target) return;
    const destName = useNew
      ? newFolder.trim()
      : (folders.find((f) => f.id === folderId)?.name ?? "");
>>>>>>> origin/Flashcars
    try {
      await sharesApi.saveShared({
        shareId: target.id,
        kind: target.kind,
        folderId: useNew ? undefined : folderId,
        newFolderName: useNew ? newFolder.trim() : undefined,
        title: title.trim(),
        description: desc.trim() || undefined,
      });
      toast.success(`Đã lưu "${title}" vào "${destName}"`);
      onOpenChange(false);
    } catch {
      toast.error("Lưu thất bại");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Save className="h-5 w-5 text-primary" /> Lưu File
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Chọn thư mục */}
          <div className="space-y-2">
            <Label>Chọn thư mục lưu trữ</Label>
            {!creatingNew ? (
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <Select value={folderId} onValueChange={setFolderId}>
                  <SelectTrigger className="flex-1 min-w-0">
                    <SelectValue placeholder="Chọn thư mục" />
                  </SelectTrigger>
                  <SelectContent>
                    {folders.map((f) => (
                      <SelectItem key={f.id} value={f.id}>
<<<<<<< HEAD
                        <span className="inline-flex items-center gap-2"><Folder className="h-3.5 w-3.5" /> {f.name}</span>
=======
                        <span className="inline-flex items-center gap-2">
                          <Folder className="h-3.5 w-3.5" /> {f.name}
                        </span>
>>>>>>> origin/Flashcars
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
<<<<<<< HEAD
                <span className="text-xs text-muted-foreground text-center shrink-0">Hoặc</span>
                <Button type="button" variant="outline" size="sm" className="shrink-0 whitespace-nowrap" onClick={() => setCreatingNew(true)}>
=======
                <span className="text-xs text-muted-foreground text-center shrink-0">
                  Hoặc
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="shrink-0 whitespace-nowrap"
                  onClick={() => setCreatingNew(true)}
                >
>>>>>>> origin/Flashcars
                  <FolderPlus className="h-4 w-4 mr-1.5" /> Tạo thư mục mới
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
<<<<<<< HEAD
                <Input autoFocus value={newFolder} onChange={(e) => setNewFolder(e.target.value)} placeholder="Tên thư mục mới" className="flex-1 min-w-0" />
                <Button type="button" variant="ghost" size="sm" className="shrink-0" onClick={() => setCreatingNew(false)}>Quay lại</Button>
=======
                <Input
                  autoFocus
                  value={newFolder}
                  onChange={(e) => setNewFolder(e.target.value)}
                  placeholder="Tên thư mục mới"
                  className="flex-1 min-w-0"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="shrink-0"
                  onClick={() => setCreatingNew(false)}
                >
                  Quay lại
                </Button>
>>>>>>> origin/Flashcars
              </div>
            )}
          </div>

          {/* Tiêu đề */}
          <div className="space-y-2">
            <Label htmlFor="save-title">Tiêu đề</Label>
<<<<<<< HEAD
            <Input id="save-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="eg: Môn học, bài tập,..." />
=======
            <Input
              id="save-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="eg: Môn học, bài tập,..."
            />
>>>>>>> origin/Flashcars
          </div>

          {/* Mô tả */}
          <div className="space-y-2">
            <Label htmlFor="save-desc">Mô tả</Label>
<<<<<<< HEAD
            <Textarea id="save-desc" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="eg: Lý thuyết về môn...." rows={3} />
=======
            <Textarea
              id="save-desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="eg: Lý thuyết về môn...."
              rows={3}
            />
>>>>>>> origin/Flashcars
          </div>
        </div>

        <DialogFooter>
<<<<<<< HEAD
          <Button variant="outline" onClick={() => onOpenChange(false)}>Hủy</Button>
          <Button onClick={onSave} className="bg-gradient-brand shadow-brand hover:opacity-90">Lưu</Button>
=======
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button
            onClick={onSave}
            className="bg-gradient-brand shadow-brand hover:opacity-90"
          >
            Lưu
          </Button>
>>>>>>> origin/Flashcars
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
