import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { FolderKanban, Plus, Search, Trash2, Pencil, Star, MoreVertical, Share2, BookOpen, GraduationCap, Loader2, BadgeCheck } from "lucide-react";
import { toast } from "sonner";
import {
  useCreateFolder,
  useDeleteFolder,
  useDocuments,
  useFolders,
  useUpdateFolder,
  useSemesters,
  useSubjectsBySemester,
  useSubjects,
} from "@/lib/queries";
import { useStarredFolders } from "@/lib/preferences";
import { ShareEntityDialog } from "@/components/share-entity-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
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
import type { Folder, Subject } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/folders")({
  component: FoldersPage,
});

function FoldersPage() {
  const { data, isLoading } = useFolders();
  const { data: docs } = useDocuments();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Folder | null>(null);
  const [deleting, setDeleting] = useState<Folder | null>(null);
  const [sharing, setSharing] = useState<Folder | null>(null);
  const { isMarked: isStarred, toggle: toggleStar } = useStarredFolders();
  const folders = useFolders();
  const semesters = useSemesters();
  const allSubjects = useSubjects();

  const subjectMap = useMemo(() => {
    const map = new Map();
    (allSubjects.data ?? []).forEach((s) => map.set(s.id, s));
    return map;
  }, [allSubjects.data]);

  const getSemesterName = (subjectId?: string | null) => {
    if (!subjectId) return null;
    const subject = subjectMap.get(subjectId);
    if (!subject) return null;
    return semesters.data?.find(sem => sem.id === subject.semesterId)?.name || null;
  };

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
    console.log("DEBUG DOCUMENT COUNT MAP:", Object.fromEntries(m));
    return m;
  }, [docs]);

  const folderCount = (f: Folder) => {
    const count = f.documentCount ?? countByFolder.get(String(f.id)) ?? 0;
    console.log(`DEBUG FOLDER ${f.name} (ID: ${f.id}) COUNT:`, count);
    return count;
  };

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
                      <Link to="/ai" search={{ f: f.id }} className="block">
                        <div className="flex items-start gap-3">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <FolderKanban className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                             <div className="font-medium truncate pr-5">{f.name}</div>
                             <div className="text-xs text-muted-foreground line-clamp-2 mt-1">
                               {f.description || f.aiSummary || "No summary"}
                             </div>
                             <div className="flex flex-wrap gap-2 mt-2">
                               {getSemesterName(f.subjectId) && (
                                 <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                                   {getSemesterName(f.subjectId)}
                                 </Badge>
                               )}
                               {f.subjectId && subjectMap.get(f.subjectId) && (
                                 <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                                   {subjectMap.get(f.subjectId).code}
                                 </Badge>
                               )}
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
  );
}

function FolderFormDialog({
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
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    }
  };

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
