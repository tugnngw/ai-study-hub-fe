import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { FileText, X, Loader2, GraduationCap, BookOpen, FolderKanban, Upload } from "lucide-react";
import { cn, formatBytes } from "@/lib/utils";
import {
  useFolders,
  useSubjectsBySemester,
  useSemesters,
  useUploadDocument,
  useSubjects,
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
import type { Subject } from "@/lib/types";

export function UploadDocumentDialog({
  open,
  onOpenChange,
  defaultFolderId,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  defaultFolderId?: string;
}) {
  const semesters = useSemesters();
  const upload = useUploadDocument();
  const allSubjects = useSubjects();
  const [files, setFiles] = useState<File[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [semesterId, setSemesterId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [folderId, setFolderId] = useState("");

  const subjects = useSubjectsBySemester(semesterId);
  const allFolders = useFolders();

  // Filter folders: nếu chưa chọn subject thì hiện tất cả, nếu đã chọn thì filter
  const foldersInSubject = useMemo(() => {
    if (!subjectId) return allFolders.data ?? [];
    return (allFolders.data ?? []).filter((f) => f.subjectId === subjectId);
  }, [allFolders.data, subjectId]);

  // Sync subject and semester when folder changes
  useEffect(() => {
    if (folderId) {
      const folder = (allFolders.data ?? []).find(f => f.id === folderId);
      console.log('[DEBUG] Selected folder:', folder);
      if (folder) {
        if (folder.subjectId && folder.subjectId !== subjectId) {
          console.log('[DEBUG] Setting subjectId:', folder.subjectId);
          setSubjectId(folder.subjectId);
        }
        if (folder.semesterId && folder.semesterId !== semesterId) {
          console.log('[DEBUG] Setting semesterId:', folder.semesterId);
          setSemesterId(folder.semesterId);
        }
      }
    }
  }, [folderId, allFolders.data, subjectId, semesterId]);

  // Initial sync for defaultFolderId
  useEffect(() => {
    if (open && defaultFolderId) {
      setFolderId(defaultFolderId);
    }
  }, [open, defaultFolderId]);

  // Reset folder when subject changes
  useEffect(() => {
    if (folderId) {
      const folder = (allFolders.data ?? []).find(f => f.id === folderId);
      if (folder && folder.subjectId !== subjectId) {
        setFolderId("");
      }
    }
  }, [subjectId, folderId, allFolders.data]);

  const multiple = files.length > 1;

  const reset = () => {
    setFiles([]);
    setTitle("");
    setDescription("");
    setFolderId("");
    setSemesterId("");
    setSubjectId("");
  };

  const removeFile = (idx: number) =>
    setFiles((prev) => prev.filter((_, i) => i !== idx));

  const handleSemesterChange = useCallback((v: string) => {
    if (folderId) return;
    setSemesterId(v);
    setSubjectId("");
    setFolderId("");
  }, [folderId]);

  const handleSubjectChange = useCallback((v: string) => {
    if (folderId) return;
    setSubjectId(v);
    setFolderId("");
  }, [folderId]);

  const submit = async () => {
    if (files.length === 0) return toast.error("Select at least one file");
    if (!multiple && !title.trim()) return toast.error("Enter a title");
    if (!semesterId) return toast.error("Select a semester");
    if (!subjectId) return toast.error("Select a subject");
    if (!folderId) return toast.error("Select a folder");
    try {
      await upload.mutateAsync({
        files,
        title: multiple ? files[0].name : title,
        description,
        folderId,
      });
      toast.success(
        multiple ? `Uploaded ${files.length} documents` : "Document uploaded",
      );
      onOpenChange(false);
      reset();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed");
    }
  };

  const canSubmit = files.length > 0 && (multiple || title.trim()) && folderId && subjectId;

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
            <Upload className="h-5 w-5 text-primary" />
            Upload document
          </DialogTitle>
          <DialogDescription>
            Select semester, subject, and folder before uploading.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          {/* Files */}
          <div className="space-y-2">
            <Label>Files (can select multiple)</Label>
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
                        ({formatBytes(f.size)})
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFile(i)}
                      className="text-muted-foreground hover:text-destructive shrink-0"
                      title="Remove file"
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
              <Label>Title</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={!subjectId}
                placeholder={!subjectId ? !semesterId ? "Select a semester first" : "Select a subject first" : "Document title"}
              />
            </div>
          )}
          {multiple && (
            <p className="text-xs text-muted-foreground -mt-3">
              Each file becomes its own document, named after the filename.
            </p>
          )}

          <div className="space-y-2">
            <Label>Description (optional)</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={!subjectId}
              placeholder={!subjectId ? "Select a subject first" : "Brief description..."}
              rows={2}
            />
          </div>

          <div className="border-t border-border pt-4 space-y-4">
            {/* Semester */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-1.5">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  Semester
                </Label>
                {folderId && (
                  <span className="text-xs text-muted-foreground">
                    Auto-set from folder
                  </span>
                )}
              </div>
              <Select
                value={semesterId}
                onValueChange={handleSemesterChange}
                disabled={!!folderId}
              >
                <SelectTrigger className={cn(!!folderId && "cursor-not-allowed opacity-50")}>
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

            {/* Subject */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  Subject
                </Label>
                {folderId && (
                  <span className="text-xs text-muted-foreground">
                    Auto-set from folder
                  </span>
                )}
              </div>
              <Select
                value={subjectId}
                onValueChange={handleSubjectChange}
                disabled={!semesterId || !!folderId}
              >
                <SelectTrigger className={cn(!!folderId && "cursor-not-allowed opacity-50")}>
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  {(subjects.data ?? []).map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Folder */}
            <div className="space-y-2">
              <Label className="flex items-center gap-1.5">
                <FolderKanban className="h-4 w-4 text-muted-foreground" />
                Folder
              </Label>
              <div className="flex gap-2">
                <Select
                  value={folderId}
                  onValueChange={(v) => setFolderId(v === "__none" ? "" : v)}
                  className="flex-1"
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue
                      placeholder={
                        !subjectId
                          ? "Chọn thư mục (tự động nhập kì & môn)"
                          : "Chọn thư mục"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {folderId && (
                      <SelectItem value="__none">
                        <span className="text-muted-foreground">Không chọn thư mục</span>
                      </SelectItem>
                    )}
                    {foldersInSubject.length === 0 && !folderId ? (
                      <div className="px-3 py-2 text-sm text-muted-foreground">
                        Không có thư mục
                      </div>
                    ) : (
                      foldersInSubject.map((f) => {
                        const subj = subjectId ? null : allSubjects.data?.find((s) => s.id === f.subjectId);
                        const sem = semesters.data?.find((s) => s.id === f.semesterId);
                        const label = subjectId || !subj
                          ? f.name
                          : `${f.name} (${subj.code ?? subj.name} - ${sem?.name ?? ""})`;
                        return (
                          <SelectItem key={f.id} value={f.id}>
                            {label}
                          </SelectItem>
                        );
                      })
                    )}
                  </SelectContent>
                </Select>
              </div>
              {subjectId && foldersInSubject.length === 0 && (
                <p className="text-xs text-amber-600 dark:text-amber-400">
                  No folders found for this subject. <a href="/folders" className="underline">Create one</a> first.
                </p>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={submit} disabled={upload.isPending || !canSubmit}>
            {upload.isPending ? (
              <><Loader2 className="h-4 w-4 mr-1 animate-spin" />Uploading...</>
            ) : (
              <><Upload className="h-4 w-4 mr-1" /> Upload</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
