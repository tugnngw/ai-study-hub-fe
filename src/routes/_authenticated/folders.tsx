import { createFileRoute, Link } from "@tanstack/react-router";
<<<<<<< HEAD
import { useState } from "react";
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
import { FolderKanban, Plus, Search, Star } from "lucide-react";
>>>>>>> origin/admin-added-fix
=======
import { useMutation } from "@tanstack/react-query";
import { FolderKanban, Plus, Search, Trash2, Pencil, Star, MoreVertical, Share2 } from "lucide-react";
>>>>>>> origin/Flashcars
=======
import { useState, useMemo } from "react";
import { FolderKanban, Plus, Search, Trash2, Pencil, Star, MoreVertical, Share2, BookOpen, GraduationCap, Loader2, BadgeCheck } from "lucide-react";
>>>>>>> origin/final/demo-v1
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
=======
>>>>>>> origin/admin-added-fix
  useFolders,
  useUpdateFolder,
  useReportFolder,
} from "@/lib/queries";
import { useStarredFolders } from "@/lib/preferences";
<<<<<<< HEAD
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
=======
  useFolders,
  useUpdateFolder,
} from "@/lib/queries";
import { shareApi } from "@/lib/realApi";
import type { ShareRequest } from "@/lib/types";
import { useStarredFolders } from "@/lib/preferences";
>>>>>>> origin/Flashcars
=======
  useDocuments,
  useFolders,
  useUpdateFolder,
  useSemesters,
  useSubjectsBySemester,
} from "@/lib/queries";
import { useStarredFolders } from "@/lib/preferences";
import { ShareEntityDialog } from "@/components/share-entity-dialog";
>>>>>>> origin/final/demo-v1
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
<<<<<<< HEAD
import { Skeleton } from "@/components/ui/skeleton";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
>>>>>>> origin/Flashcards-fix
=======
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
>>>>>>> origin/admin-added-fix
=======
=======
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
>>>>>>> origin/final/demo-v1
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
<<<<<<< HEAD
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
<<<<<<< HEAD
=======
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
>>>>>>> origin/final/demo-v1
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import type { Folder } from "@/lib/types";
=======
=======
>>>>>>> origin/admin-added-fix
import { ShareDocumentDialog } from "@/components/share-document-dialog";
import { FolderActionsMenu } from "@/components/folder-actions-menu";
import type { Folder } from "@/lib/types";
import { cn } from "@/lib/utils";
<<<<<<< HEAD
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
=======
import type { Folder } from "@/lib/types";
import { cn } from "@/lib/utils";
>>>>>>> origin/Flashcars
=======
import type { Folder, Subject } from "@/lib/types";
import { cn } from "@/lib/utils";
>>>>>>> origin/final/demo-v1

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
=======
>>>>>>> origin/admin-added-fix
=======
>>>>>>> origin/Flashcars
=======
  const { data: docs } = useDocuments();
>>>>>>> origin/final/demo-v1
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
=======
>>>>>>> origin/admin-added-fix
  const [sharing, setSharing] = useState<Folder | null>(null);
  const [reporting, setReporting] = useState<Folder | null>(null);
=======
  const [sharing, setSharing] = useState<Folder | null>(null);
>>>>>>> origin/Flashcars
  const { isMarked: isStarred, toggle: toggleStar } = useStarredFolders();

  const filtered = (data ?? [])
    .filter((f) => f.name.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => Number(isStarred(b.id)) - Number(isStarred(a.id)));
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
=======
>>>>>>> origin/Flashcars

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
<<<<<<< HEAD
<<<<<<< HEAD
              className="group hover:border-primary/40 transition-colors"
            >
=======
=======
>>>>>>> origin/admin-added-fix
=======
>>>>>>> origin/Flashcars
              className={cn(
                "group hover:border-primary/40 transition-colors relative",
                isStarred(f.id) && "border-amber-400/60 bg-amber-50/40 dark:bg-amber-400/5",
              )}
            >
              {isStarred(f.id) && (
<<<<<<< HEAD
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
<<<<<<< HEAD
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
=======
                <Star className="h-3.5 w-3.5 absolute top-3 right-3 fill-amber-400 text-amber-400" />
              )}
>>>>>>> origin/Flashcars
              <CardContent className="p-5">
                <Link to="/ai" search={{ folderId: f.id }} className="block">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FolderKanban className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
                      <div className="font-medium truncate pr-9">{f.name}</div>
>>>>>>> origin/admin-added-fix
=======
                      <div className="font-medium truncate pr-5">{f.name}</div>
>>>>>>> origin/Flashcars
                      <div className="text-xs text-muted-foreground line-clamp-2 mt-1">
                        {f.aiSummary || "No summary"}
                      </div>
                    </div>
                  </div>
                </Link>
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
>>>>>>> origin/admin-added-fix
=======
                 <div className="flex justify-end mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                   <DropdownMenu>
                     <DropdownMenuTrigger asChild>
                       <Button size="sm" variant="ghost">
                         <MoreVertical className="h-3.5 w-3.5" />
                       </Button>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent align="end">
                       <DropdownMenuItem onClick={() => setSharing(f)}>
                         <Share2 className="h-3.5 w-3.5 mr-2" />
                         Share
                       </DropdownMenuItem>
                       <DropdownMenuItem onClick={() => toggleStar(f.id)}>
                         <Star
                           className={cn(
                             "h-3.5 w-3.5 mr-2",
                             isStarred(f.id) && "fill-amber-400 text-amber-400",
                           )}
                         />
                         Star
                       </DropdownMenuItem>
                       <DropdownMenuItem onClick={() => {
                         setEditing(f);
                         setOpen(true);
                       }}>
                         <Pencil className="h-3.5 w-3.5 mr-2" />
                         Edit
                       </DropdownMenuItem>
                       <DropdownMenuSeparator />
                       <DropdownMenuItem 
                         onClick={() => setDeleting(f)}
                         className="text-destructive focus:text-destructive"
                       >
                         <Trash2 className="h-3.5 w-3.5 mr-2" />
                         Delete
                       </DropdownMenuItem>
                     </DropdownMenuContent>
                   </DropdownMenu>
                 </div>
>>>>>>> origin/Flashcars
              </CardContent>
            </Card>
          ))}
        </div>
      )}

<<<<<<< HEAD
      <FolderFormDialog open={open} onOpenChange={setOpen} folder={editing} />
      <DeleteFolderDialog folder={deleting} onClose={() => setDeleting(null)} />
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> origin/admin-added-fix
      <ShareDocumentDialog
        open={!!sharing}
        onOpenChange={(v) => !v && setSharing(null)}
        documentTitle={sharing?.name ?? ""}
        folderId={sharing?.id ?? ""}
      />
      <ReportFolderDialog folder={reporting} onClose={() => setReporting(null)} />
<<<<<<< HEAD
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
    </div>
=======
       <FolderFormDialog open={open} onOpenChange={setOpen} folder={editing} />
       <DeleteFolderDialog folder={deleting} onClose={() => setDeleting(null)} />
       <ShareFolderDialog folder={sharing} onClose={() => setSharing(null)} />
     </div>
>>>>>>> origin/Flashcars
=======
  const [sharing, setSharing] = useState<Folder | null>(null);
  const { isMarked: isStarred, toggle: toggleStar } = useStarredFolders();
  const folders = useFolders();
  const semesters = useSemesters();

  // Find subject for editing folder
  const editingSubjectId = useMemo(() => {
    if (!editing || !semesters.data || !folders.data) return "";
    const folder = folders.data.find(f => f.id === editing.id);
    return folder?.subjectId ?? "";
  }, [editing, semesters.data, folders.data]);

  const countByFolder = useMemo(() => {
    const m = new Map<string, number>();
    (docs ?? []).forEach((d) => {
      if (d.folderId != null)
        m.set(String(d.folderId), (m.get(String(d.folderId)) ?? 0) + 1);
    });
    return m;
  }, [docs]);

  const folderCount = (f: Folder) =>
    f.documentCount ?? countByFolder.get(String(f.id)) ?? 0;

  const filtered = (data ?? [])
      .filter((f) => f.name.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => Number(isStarred(b.id)) - Number(isStarred(a.id)));

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
                      className={cn(
                          "group hover:border-primary/40 transition-colors relative",
                          isStarred(f.id) && "border-amber-400/60 bg-amber-50/40 dark:bg-amber-400/5",
                      )}
                  >
                    {isStarred(f.id) && (
                        <Star className="h-3.5 w-3.5 absolute top-3 right-3 fill-amber-400 text-amber-400" />
                    )}
                    <CardContent className="p-5">
                      <Link to="/ai" search={{ folderId: f.id }} className="block">
                        <div className="flex items-start gap-3">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <FolderKanban className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium truncate pr-5">{f.name}</div>
                            <div className="text-xs text-muted-foreground line-clamp-2 mt-1">
                              {f.description || f.aiSummary || "No summary"}
                            </div>
                            <div className="text-xs font-medium text-primary mt-1.5">
                              {folderCount(f)} tài liệu
                            </div>
                          </div>
                        </div>
                      </Link>
                      <div className="flex justify-end mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="ghost">
                              <MoreVertical className="h-3.5 w-3.5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSharing(f)}>
                              <Share2 className="h-3.5 w-3.5 mr-2" />
                              Share
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toggleStar(f.id)}>
                              <Star
                                  className={cn(
                                      "h-3.5 w-3.5 mr-2",
                                      isStarred(f.id) && "fill-amber-400 text-amber-400",
                                  )}
                              />
                              Star
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {
                              setEditing(f);
                              setOpen(true);
                            }}>
                              <Pencil className="h-3.5 w-3.5 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => setDeleting(f)}
                                className="text-destructive focus:text-destructive"
                            >
                              <Trash2 className="h-3.5 w-3.5 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
              ))}
            </div>
        )}

        <FolderFormDialog
            open={open}
            onOpenChange={setOpen}
            folder={editing}
            initialSubjectId={editingSubjectId}
        />

        <DeleteFolderDialog folder={deleting} onClose={() => setDeleting(null)} />
        <ShareEntityDialog
            open={!!sharing}
            onOpenChange={(v) => {
              if (!v) setSharing(null);
            }}
            title={sharing?.name ?? ""}
            folderId={sharing?.id}
        />
      </div>
>>>>>>> origin/final/demo-v1
  );
}

function FolderFormDialog({
<<<<<<< HEAD
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
=======
                            open,
                            onOpenChange,
                            folder,
                            initialSubjectId,
                          }: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  folder: Folder | null;
  initialSubjectId?: string;
}) {
  const create = useCreateFolder();
  const update = useUpdateFolder();
  const semesters = useSemesters();

  const [name, setName] = useState(folder?.name ?? "");
  const [semesterId, setSemesterId] = useState("");
  const [subjectId, setSubjectId] = useState(initialSubjectId ?? "");
  const subjects = useSubjectsBySemester(semesterId);
  const [description, setDescription] = useState("");

  const selectedSubject = useMemo(
      () => (subjects.data ?? []).find((s) => s.id === subjectId),
      [subjects.data, subjectId],
  );

  // Reset form when dialog opens
  const reset = () => {
    setName(folder?.name ?? "");
    setSemesterId("");
    setSubjectId(initialSubjectId ?? "");
    setDescription("");
  };

  const submit = async () => {
    if (!name.trim()) return toast.error("Name is required");
    if (!semesterId) return toast.error("Select a semester");
    if (!subjectId) return toast.error("Select a subject");
    try {
      if (folder) {
        await update.mutateAsync({
          id: folder.id,
          name: name.trim(),
          subjectId,
          description: description.trim() || undefined,
        });
        toast.success("Folder updated");
      } else {
        await create.mutateAsync({
          name: name.trim(),
          subjectId,
          description: description.trim() || undefined,
        });
        toast.success("Folder created");
      }
      onOpenChange(false);
      reset();
>>>>>>> origin/final/demo-v1
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    }
  };

<<<<<<< HEAD
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> origin/admin-added-fix
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

<<<<<<< HEAD
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
=======
>>>>>>> origin/Flashcars
function DeleteFolderDialog({
  folder,
  onClose,
}: {
=======
  const isPending = create.isPending || update.isPending;
  const canSubmit = name.trim() && semesterId && subjectId;

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
            <DialogTitle className="flex items-center gap-2">
              <FolderKanban className="h-5 w-5 text-primary" />
              {folder ? "Edit folder" : "New folder"}
            </DialogTitle>
            <DialogDescription>
              {folder ? "Update the folder details." : "Create a new folder to organize your documents."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5">
            {/* Semester */}
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
                  disabled={semesters.isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a semester" />
                </SelectTrigger>
                <SelectContent>
                  {semesters.isLoading ? (
                      <div className="flex items-center justify-center p-3">
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </div>
                  ) : (
                      (semesters.data ?? []).map((s) => (
                          <SelectItem key={s.id} value={s.id}>
                            {s.name}
                          </SelectItem>
                      ))
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <Label className="flex items-center gap-1.5">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                Subject
              </Label>
              <Select
                  value={subjectId}
                  onValueChange={setSubjectId}
                  disabled={!semesterId || subjects.isLoading}
              >
                <SelectTrigger>
                  <SelectValue
                      placeholder={
                        !semesterId
                            ? "Select a semester first"
                            : subjects.isLoading
                                ? "Loading subjects..."
                                : "Select a subject"
                      }
                  />
                </SelectTrigger>
                <SelectContent>
                  {subjects.isLoading ? (
                      <div className="flex items-center justify-center p-3">
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </div>
                  ) : (subjects.data ?? []).length === 0 ? (
                      <div className="px-3 py-2 text-sm text-muted-foreground">
                        No subjects available
                      </div>
                  ) : (
                      (subjects.data ?? []).map((s) => (
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
                      ))
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Folder Name */}
            <div className="space-y-2">
              <Label className="flex items-center gap-1.5">
                <FolderKanban className="h-4 w-4 text-muted-foreground" />
                Folder name
              </Label>
              <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={!subjectId}
                  placeholder={!subjectId ? !semesterId ? "Select a semester first" : "Select a subject first" : "e.g. Week 1 – Introduction"}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label>Description (optional)</Label>
              <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={!subjectId}
                  placeholder={!subjectId ? "Select a subject first" : "Brief description of this folder..."}
                  rows={2}
              />
            </div>

            {selectedSubject?.defaultSubject && (
                <div className="flex items-center gap-2 rounded-lg bg-primary/5 border border-primary/10 px-3 py-2 text-xs text-muted-foreground">
                  <BadgeCheck className="h-3.5 w-3.5 text-primary" />
                  This folder belongs to the default subject of{" "}
                  {(semesters.data ?? []).find((s) => s.id === semesterId)?.name ?? ""}
                </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
                onClick={submit}
                disabled={isPending || !canSubmit}
            >
              {isPending ? (
                  <><Loader2 className="h-4 w-4 mr-1 animate-spin" />{folder ? "Saving..." : "Creating..."}</>
              ) : (
                  folder ? "Save" : "Create folder"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  );
}

function DeleteFolderDialog({
                              folder,
                              onClose,
                            }: {
>>>>>>> origin/final/demo-v1
  folder: Folder | null;
  onClose: () => void;
}) {
  const del = useDeleteFolder();
  return (
<<<<<<< HEAD
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
<<<<<<< HEAD
=======

function ShareFolderDialog({
  folder,
  onClose,
}: {
  folder: Folder | null;
  onClose: () => void;
}) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const shareMutation = useMutation({
    mutationFn: (data: ShareRequest) => shareApi.shareFolder(data),
    onSuccess: () => {
      toast.success("Folder shared successfully");
      onClose();
      setEmail("");
      setUsername("");
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Failed to share folder");
    },
  });

  const handleShare = async () => {
    if (!folder) return;
    
    if (!email.trim() && !username.trim()) {
      toast.error("Please enter email or username");
      return;
    }

    const request: ShareRequest = {
      folderId: folder.id,
      visibility: "private",
    };

    if (email.trim()) {
      request.email = email.trim();
    }
    if (username.trim()) {
      request.username = username.trim();
    }

    await shareMutation.mutateAsync(request);
  };

  return (
    <Dialog
      open={!!folder}
      onOpenChange={(v) => {
        if (!v) onClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share folder</DialogTitle>
          <DialogDescription>
            Share &ldquo;{folder?.name}&rdquo; with another user
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
            />
          </div>
          <div className="text-xs text-muted-foreground">
            Enter either email or username of the user you want to share with.
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleShare}
            disabled={shareMutation.isPending}
          >
            Share
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
>>>>>>> origin/Flashcars
=======
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
>>>>>>> origin/final/demo-v1
