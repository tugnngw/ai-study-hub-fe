import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { FolderKanban, Plus, Search, Trash2, Pencil } from "lucide-react";
=======
import { FolderKanban, Plus, Search, Trash2, Pencil, FileText } from "lucide-react";
>>>>>>> origin/test/share-document-cloudinary
=======
import { FolderKanban, Plus, Search, Trash2, Pencil, FileText } from "lucide-react";
>>>>>>> origin/uichange
=======
import { FolderKanban, Plus, Search, Trash2, Pencil } from "lucide-react";
>>>>>>> origin/admin-added
=======
import { FolderKanban, Plus, Search, Trash2, Pencil } from "lucide-react";
>>>>>>> origin/update/feature/share
=======
import { FolderKanban, Plus, Search, Trash2, Pencil } from "lucide-react";
>>>>>>> origin/update/feature/AI/Quiz
=======
import { FolderKanban, Plus, Search, Star } from "lucide-react";
>>>>>>> origin/Flashcards-fix
import { toast } from "sonner";
import {
  useCreateFolder,
  useDeleteFolder,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
  useDocuments,
>>>>>>> origin/test/share-document-cloudinary
=======
  useDocuments,
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
  useFolders,
  useUpdateFolder,
} from "@/lib/queries";
=======
  useFolders,
  useUpdateFolder,
  useReportFolder,
} from "@/lib/queries";
import { useStarredFolders } from "@/lib/preferences";
>>>>>>> origin/Flashcards-fix
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
<<<<<<< HEAD
=======
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
>>>>>>> origin/Flashcards-fix
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
<<<<<<< HEAD
import type { Folder } from "@/lib/types";
=======
import { ShareDocumentDialog } from "@/components/share-document-dialog";
import { FolderActionsMenu } from "@/components/folder-actions-menu";
import type { Folder } from "@/lib/types";
import { cn } from "@/lib/utils";
>>>>>>> origin/Flashcards-fix

export const Route = createFileRoute("/_authenticated/folders")({
  component: FoldersPage,
});

function FoldersPage() {
  const { data, isLoading } = useFolders();
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
  const { data: allDocs } = useDocuments();
>>>>>>> origin/test/share-document-cloudinary
=======
  const { data: allDocs } = useDocuments();
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Folder | null>(null);
  const [deleting, setDeleting] = useState<Folder | null>(null);
<<<<<<< HEAD

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> origin/uichange
  const countByFolder = (allDocs ?? []).reduce<Record<string, number>>(
    (acc, d) => {
      if (d.folderId) acc[d.folderId] = (acc[d.folderId] ?? 0) + 1;
      return acc;
    },
    {},
  );

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
  const filtered = (data ?? []).filter((f) =>
    f.name.toLowerCase().includes(query.toLowerCase()),
  );
=======
  const [sharing, setSharing] = useState<Folder | null>(null);
  const [reporting, setReporting] = useState<Folder | null>(null);
  const { isMarked: isStarred, toggle: toggleStar } = useStarredFolders();

  const filtered = (data ?? [])
    .filter((f) => f.name.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => Number(isStarred(b.id)) - Number(isStarred(a.id)));
>>>>>>> origin/Flashcards-fix

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Folders</h1>
          <p className="text-muted-foreground mt-1">Organize your documents</p>
        </div>
        <Button
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" /> New folder
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search folders..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <FolderKanban className="h-10 w-10 mx-auto text-muted-foreground/50" />
            <p className="mt-4 text-sm text-muted-foreground">
              No folders found.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((f) => (
            <Card
              key={f.id}
<<<<<<< HEAD
              className="group hover:border-primary/40 transition-colors"
            >
=======
              className={cn(
                "group hover:border-primary/40 transition-colors relative",
                isStarred(f.id) && "border-amber-400/60 bg-amber-50/40 dark:bg-amber-400/5",
              )}
            >
              {isStarred(f.id) && (
                <Star className="h-3.5 w-3.5 absolute top-3 right-10 fill-amber-400 text-amber-400" />
              )}
              <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <FolderActionsMenu
                  folderId={f.id}
                  starred={isStarred(f.id)}
                  onToggleStar={() => toggleStar(f.id)}
                  onRename={() => {
                    setEditing(f);
                    setOpen(true);
                  }}
                  onShare={() => setSharing(f)}
                  onReport={() => setReporting(f)}
                  onDelete={() => setDeleting(f)}
                />
              </div>
>>>>>>> origin/Flashcards-fix
              <CardContent className="p-5">
                <Link to="/ai" search={{ folderId: f.id }} className="block">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FolderKanban className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
<<<<<<< HEAD
                      <div className="font-medium truncate">{f.name}</div>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> origin/uichange
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                        <FileText className="h-3 w-3" />
                        <span>{countByFolder[f.id] ?? 0} tài liệu</span>
                      </div>
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
                      <div className="font-medium truncate pr-9">{f.name}</div>
>>>>>>> origin/Flashcards-fix
                      <div className="text-xs text-muted-foreground line-clamp-2 mt-1">
                        {f.aiSummary || "No summary"}
                      </div>
                    </div>
                  </div>
                </Link>
<<<<<<< HEAD
                <div className="flex justify-end gap-1 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setEditing(f);
                      setOpen(true);
                    }}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setDeleting(f)}
                  >
                    <Trash2 className="h-3.5 w-3.5 text-destructive" />
                  </Button>
                </div>
=======
>>>>>>> origin/Flashcards-fix
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <FolderFormDialog open={open} onOpenChange={setOpen} folder={editing} />
      <DeleteFolderDialog folder={deleting} onClose={() => setDeleting(null)} />
<<<<<<< HEAD
=======
      <ShareDocumentDialog
        open={!!sharing}
        onOpenChange={(v) => !v && setSharing(null)}
        documentTitle={sharing?.name ?? ""}
        folderId={sharing?.id ?? ""}
      />
      <ReportFolderDialog folder={reporting} onClose={() => setReporting(null)} />
>>>>>>> origin/Flashcards-fix
    </div>
  );
}

function FolderFormDialog({
  open,
  onOpenChange,
  folder,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  folder: Folder | null;
}) {
  const create = useCreateFolder();
  const update = useUpdateFolder();
  const [name, setName] = useState(folder?.name ?? "");

  // sync when folder changes
  if (open && folder && folder.name !== name && name === "") {
    setName(folder.name);
  }

  const submit = async () => {
    if (!name.trim()) return toast.error("Name is required");
    try {
      if (folder) {
        await update.mutateAsync({ id: folder.id, name });
        toast.success("Folder updated");
      } else {
        await create.mutateAsync({ name });
        toast.success("Folder created");
      }
      onOpenChange(false);
      setName("");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) {
          setName("");
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{folder ? "Edit folder" : "New folder"}</DialogTitle>
          <DialogDescription>
            Organize related documents together.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Contracts"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={submit}
            disabled={create.isPending || update.isPending}
          >
            {folder ? "Save" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

<<<<<<< HEAD
=======
function ReportFolderDialog({
  folder,
  onClose,
}: {
  folder: Folder | null;
  onClose: () => void;
}) {
  const report = useReportFolder();
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");

  const reset = () => {
    setReason("");
    setDescription("");
  };

  const submit = async () => {
    if (!folder) return;
    if (!reason) {
      toast.error("Vui lòng chọn lý do báo cáo");
      return;
    }
    try {
      await report.mutateAsync({
        folderId: folder.id,
        reason,
        description: description.trim() || undefined,
      });
      toast.success("Đã gửi báo cáo, cảm ơn bạn!");
      reset();
      onClose();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Gửi báo cáo thất bại");
    }
  };

  return (
    <Dialog
      open={!!folder}
      onOpenChange={(v) => {
        if (!v) {
          reset();
          onClose();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="truncate">
            Báo cáo &ldquo;{folder?.name}&rdquo;
          </DialogTitle>
          <DialogDescription>
            Cho chúng tôi biết vấn đề bạn gặp phải với thư mục này.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Lý do báo cáo</Label>
            <RadioGroup value={reason} onValueChange={setReason} className="space-y-2">
              {[
                { value: "copyright", label: "Nội dung vi phạm bản quyền" },
                { value: "misinformation", label: "Thông tin sai lệch / gây hiểu lầm" },
                { value: "inappropriate", label: "Nội dung không phù hợp / phản cảm" },
                { value: "privacy", label: "Vi phạm quyền riêng tư" },
                { value: "other", label: "Lý do khác" },
              ].map((r) => (
                <label
                  key={r.value}
                  className="flex items-center gap-2 text-sm rounded-md border border-border/60 px-3 py-2 cursor-pointer hover:bg-accent/40"
                >
                  <RadioGroupItem value={r.value} />
                  {r.label}
                </label>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Mô tả thêm (tùy chọn)</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Cung cấp chi tiết để chúng tôi xử lý nhanh hơn..."
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              reset();
              onClose();
            }}
          >
            Hủy
          </Button>
          <Button variant="destructive" onClick={submit} disabled={report.isPending}>
            {report.isPending ? "Đang gửi..." : "Gửi báo cáo"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

>>>>>>> origin/Flashcards-fix
function DeleteFolderDialog({
  folder,
  onClose,
}: {
  folder: Folder | null;
  onClose: () => void;
}) {
  const del = useDeleteFolder();
  return (
    <AlertDialog
      open={!!folder}
      onOpenChange={(v) => {
        if (!v) onClose();
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete folder?</AlertDialogTitle>
          <AlertDialogDescription>
            This will delete &ldquo;{folder?.name}&rdquo;. This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              if (!folder) return;
              try {
                await del.mutateAsync(folder.id);
                toast.success("Folder deleted");
                onClose();
              } catch (e) {
                toast.error(e instanceof Error ? e.message : "Failed");
              }
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
