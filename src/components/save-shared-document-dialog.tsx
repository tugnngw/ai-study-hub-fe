import { useEffect, useMemo, useState } from "react";
import { Plus, Loader2, GraduationCap, BookOpen, FolderKanban } from "lucide-react";
import { toast } from "sonner";
import {
  useCreateFolder,
  useFolders,
  useSaveSharedDocument,
  useSemesters,
  useSubjectsBySemester,
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
import { Badge } from "@/components/ui/badge";

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
  sharedId: string;
  defaultTitle: string;
  defaultDescription?: string;
}) {
  const folders = useFolders();
  const semesters = useSemesters();
  const createFolder = useCreateFolder();
  const save = useSaveSharedDocument();

  const [folderId, setFolderId] = useState<string>("");
  const [semesterId, setSemesterId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [newFolderName, setNewFolderName] = useState("");
  const [title, setTitle] = useState(defaultTitle);
  const [description, setDescription] = useState(defaultDescription ?? "");

  const subjects = useSubjectsBySemester(semesterId);
  const foldersInSubject = useMemo(
    () => (folders.data ?? []).filter((f) => f.subjectId === subjectId),
    [folders.data, subjectId],
  );

  useEffect(() => {
    if (open) {
      setTitle(defaultTitle);
      setDescription(defaultDescription ?? "");
      setFolderId("");
      setSemesterId("");
      setSubjectId("");
      setNewFolderName("");
    }
  }, [open, defaultTitle, defaultDescription]);

  const submit = async () => {
    if (!title.trim()) {
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
        });
        targetFolderId = created.id;
      } else if (folderId) {
        targetFolderId = folderId;
      } else {
        toast.error("Please select a folder");
        return;
      }

      await save.mutateAsync({
        sharedId,
        folderId: targetFolderId,
        title: title.trim(),
        description: description.trim() || undefined,
      });
      toast.success("Document saved to folder");
      onOpenChange(false);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    }
  };

  const isPending = createFolder.isPending || save.isPending;
  const isNewFolder = folderId === NEW_FOLDER_VALUE;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
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
              </SelectTrigger>
              <SelectContent>
                {(folders.data ?? []).map((f) => (
                  <SelectItem key={f.id} value={String(f.id)}>
                    {f.name}
                  </SelectItem>
                ))}
                <SelectItem value={NEW_FOLDER_VALUE}>
                  <span className="flex items-center gap-1.5">
                    <Plus className="h-3.5 w-3.5" /> Create new folder
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
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
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={submit} disabled={isPending}>
            {isPending ? (
              <><Loader2 className="h-4 w-4 mr-1 animate-spin" />Saving...</>
            ) : (
              "Save"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
