// src/routes/_authenticated/documents.tsx
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useMemo, useEffect, useCallback } from "react";
import { FileText, Plus, Search, Upload, Pin, X } from "lucide-react";
import { toast } from "sonner";
import { encodeId } from "@/lib/id-encoder";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  useDocuments,
  useFolders,
  useUploadDocument,
  useSemesters,
  useSubjectsBySemester,
  useSubjects,
} from "@/lib/queries";
import { usePinnedDocuments } from "@/lib/preferences";
import { cn, formatBytes } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { DocumentActionsMenu } from "@/components/document-actions-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/_authenticated/documents")({
  component: DocumentsPage,
});

function DocumentsPage() {
  const { data, isLoading } = useDocuments();
  const subjects = useSemesters();
  const folders = useFolders();
  const allSubjects = useSubjects();
  const semesterMap = useMemo(() => new Map((subjects.data ?? []).map((s) => [s.id, s.name])), [subjects.data]);
  const subjectNameMap = useMemo(() => new Map((allSubjects.data ?? []).map((s) => [s.id, s.name])), [allSubjects.data]);
  const folderData = folders.data ?? [];
  const folderLookup = useMemo(() => new Map(folderData.map((f) => [f.id, f])), [folderData]);
  const [query, setQuery] = useState("");
  const [uploadOpen, setUploadOpen] = useState(false);
  const { isMarked: isPinned, toggle: togglePin } = usePinnedDocuments();

  const filtered = (data ?? [])
    .filter((d) => d.title.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => Number(isPinned(b.id)) - Number(isPinned(a.id)));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Documents</h1>
          <p className="text-muted-foreground mt-1">All your uploaded files</p>
        </div>
        <Button onClick={() => setUploadOpen(true)}>
          <Plus className="h-4 w-4 mr-2" /> Upload
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search documents..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-14" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <FileText className="h-10 w-10 mx-auto text-muted-foreground/50" />
            <p className="mt-4 text-sm text-muted-foreground">
              No documents found.
            </p>
            <Button className="mt-4" onClick={() => setUploadOpen(true)}>
              <Upload className="h-4 w-4 mr-2" /> Upload your first
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="border border-border/60 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/40">
              <tr className="text-left">
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium hidden lg:table-cell">Folder</th>
                <th className="px-4 py-3 font-medium hidden lg:table-cell">
                  Semester
                </th>
                <th className="px-4 py-3 font-medium hidden lg:table-cell">
                  Subject
                </th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">
                  Description
                </th>
                <th className="px-4 py-3 font-medium hidden sm:table-cell">Status</th>
                <th className="px-4 py-3 font-medium w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
               {filtered.map((d) => {
                const folderInfo = folderLookup.get(d.folderId ?? "");
                const folderName = folderInfo?.name || "-";
                const semesterName = folderInfo?.semesterId ? semesterMap.get(folderInfo.semesterId) : "-";
                const subjectName = folderInfo?.subjectId ? subjectNameMap.get(folderInfo.subjectId) : "-";
                return (
                  <DocumentRow
                    key={d.id}
                    id={d.id}
                    folderId={d.folderId ?? ""}
                    folderName={folderName}
                    semesterName={semesterName}
                    subjectName={subjectName}
                    title={d.title}
                    description={d.description ?? ""}
                    status={d.status}
                    rejectReason={(d as any).rejectReason}
                    pinned={isPinned(d.id)}
                    onTogglePin={() => togglePin(d.id)}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <UploadDialog open={uploadOpen} onOpenChange={setUploadOpen} />
    </div>
  );
}

function DocumentRow({
  id,
  folderId,
  folderName,
  semesterName,
  subjectName,
  title,
  description,
  status,
  rejectReason,
  pinned,
  onTogglePin,
}: {
  id: string;
  folderId: string;
  folderName: string;
  semesterName: string;
  subjectName: string;
  title: string;
  description: string;
  status: string;
  rejectReason?: string;
  pinned: boolean;
  onTogglePin: () => void;
}) {
  const [showDialog, setShowDialog] = useState(false);

  const isRejected = status?.toUpperCase() === "REJECT";
  const isBanned = status?.toUpperCase() === "BANNED";
  const isBlocked = isRejected || isBanned;

  const handleDocumentClick = (e: React.MouseEvent) => {
    if (isBlocked) {
      e.preventDefault();
      setShowDialog(true);
    }
  };

  const proceedToDocument = () => {
    setShowDialog(false);
    navigate({ to: "/ai", search: { f: encodeId(folderId), d: encodeId(id) } });
  };
  const getStatusBadge = () => {
    const statusUpper = status?.toUpperCase();
    if (statusUpper === "COMPLETED") {
      return <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20 hover:bg-yellow-500/20">Chờ duyệt</Badge>;
    }
    if (statusUpper === "READY" || statusUpper === "REPORTED") {
      return <Badge className="bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/20">Sẵn sàng</Badge>;
    }
    if (statusUpper === "REJECT") {
      return <Badge className="bg-red-500/10 text-red-600 border-red-500/20 hover:bg-red-500/20">Bị từ chối</Badge>;
    }
    if (statusUpper === "BANNED") {
      return <Badge className="bg-red-500/10 text-red-600 border-red-500/20 hover:bg-red-500/20">Bị cấm</Badge>;
    }
    return <Badge variant="outline">{status}</Badge>;
  };
  
  return (
    <>
      <tr className={cn("border-t border-border/60 hover:bg-accent/30", pinned && "bg-amber-50/60 dark:bg-amber-400/5")}>
        <td className="px-4 py-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onTogglePin}
              title={pinned ? "Bỏ ghim" : "Ghim tài liệu"}
              className="shrink-0 h-6 w-6 rounded-md hover:bg-accent flex items-center justify-center"
            >
              <Pin className={cn("h-3.5 w-3.5", pinned ? "fill-amber-400 text-amber-500" : "text-muted-foreground")} />
            </button>
            <Link
              to={isBlocked ? "#" : "/ai"}
              search={isBlocked ? {} : { f: folderId, d: id }}
              onClick={handleDocumentClick}
              className="flex items-center gap-2 hover:text-primary min-w-0"
            >
              <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="font-medium truncate">{title}</span>
            </Link>
          </div>
        </td>
        <td className="px-4 py-3 hidden lg:table-cell">
          <span className="text-sm">{folderName}</span>
        </td>
        <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell text-sm">
          {semesterName}
        </td>
        <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell text-sm">
          {subjectName}
        </td>
        <td className="px-4 py-3 text-muted-foreground hidden md:table-cell truncate max-w-md">
          {description}
        </td>
        <td className="px-4 py-3 hidden sm:table-cell">
           {getStatusBadge()}
         </td>
         <td className="px-4 py-3">
           <DocumentActionsMenu
             documentId={id}
             folderId={folderId}
             title={title}
             status={status}
             description={description}
           />
         </td>
       </tr>

       <Dialog open={showDialog} onOpenChange={setShowDialog}>
         <DialogContent>
           <DialogHeader>
             <DialogTitle className={isRejected || isBanned ? "text-red-600" : "text-amber-600"}>
               {isBanned ? "Tài liệu đã bị cấm" : "Tài liệu đã bị từ chối"}
             </DialogTitle>
             <DialogDescription>
               {isBanned
                 ? "Tài liệu này đã bị cấm do vi phạm quy định."
                 : "Tài liệu này không đủ điều kiện để hiển thị."}
             </DialogDescription>
           </DialogHeader>
           {isRejected && (
             <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
               <p className="font-medium text-red-800 dark:text-red-300">Lý do từ chối:</p>
               <p className="text-sm text-red-700 dark:text-red-400 mt-1">
                 {rejectReason || "Không có thông tin lý do cụ thể."}
               </p>
             </div>
           )}
           <DialogFooter>
             <Button variant="outline" onClick={() => setShowDialog(false)}>
               Đóng
             </Button>
             {!isBanned && (
               <Button variant="default" onClick={proceedToDocument}>
                 Vẫn truy cập
               </Button>
             )}
           </DialogFooter>
         </DialogContent>
       </Dialog>
    </>
  );
 }

function UploadDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const folders = useFolders();
  const semesters = useSemesters();
  const upload = useUploadDocument();
  const [files, setFiles] = useState<File[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [folderId, setFolderId] = useState<string>("");
  const [semesterId, setSemesterId] = useState<string>("");
  const [subjectId, setSubjectId] = useState<string>("");

  const subjects = useSubjectsBySemester(semesterId);

  const subjectsInSemester = useMemo(
    () => subjects.data ?? [],
    [subjects.data],
  );

  // Filter folders: nếu chưa chọn subject thì hiện tất cả
  const foldersInSubject = useMemo(() => {
    if (!subjectId) return folders.data ?? [];
    return (folders.data ?? []).filter((f) => f.subjectId === subjectId);
  }, [folders.data, subjectId]);

  // Auto-sync semester/subject khi chọn folder
  useEffect(() => {
    if (folderId) {
      const folder = (folders.data ?? []).find(f => f.id === folderId);
      if (folder) {
        if (folder.subjectId && folder.subjectId !== subjectId) {
          setSubjectId(folder.subjectId);
        }
        if (folder.semesterId && folder.semesterId !== semesterId) {
          setSemesterId(folder.semesterId);
        }
      }
    }
  }, [folderId, folders.data, subjectId, semesterId]);

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

  const submit = async () => {
    if (files.length === 0) return toast.error("Chọn ít nhất một file");
    if (!multiple && !title.trim()) return toast.error("Nhập tiêu đề");
    if (!semesterId) return toast.error("Chọn kỳ học");
    if (!subjectId) return toast.error("Chọn môn học");
    if (!folderId) return toast.error("Chọn thư mục");
    try {
      await upload.mutateAsync({
        files,
        title: multiple ? files[0].name : title,
        description,
        folderId,
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
                        ({formatBytes(f.size)})
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
              <div className="flex items-center justify-between">
                <Label>Kỳ học</Label>
                {folderId && (
                  <span className="text-xs text-muted-foreground">
                    Tự động từ thư mục
                  </span>
                )}
              </div>
              <Select
                value={semesterId}
                onValueChange={(v) => {
                  if (folderId) return;
                  setSemesterId(v);
                  setSubjectId("");
                }}
                disabled={!!folderId}
              >
                <SelectTrigger className={cn(!!folderId && "cursor-not-allowed opacity-50")}>
                  <SelectValue placeholder="Chọn kỳ" />
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
              <div className="flex items-center justify-between">
                <Label>Môn học</Label>
                {folderId && (
                  <span className="text-xs text-muted-foreground">
                    Tự động từ thư mục
                  </span>
                )}
              </div>
              <Select
                value={subjectId}
                onValueChange={setSubjectId}
                disabled={!semesterId || !!folderId}
              >
                <SelectTrigger className={cn(!!folderId && "cursor-not-allowed opacity-50")}>
                  <SelectValue placeholder={semesterId ? "Chọn môn" : "Chọn kỳ trước"} />
                </SelectTrigger>
                <SelectContent>
                  {subjectsInSemester.length === 0 ? (
                    <div className="px-3 py-2 text-sm text-muted-foreground">
                      Không có môn trong kỳ này
                    </div>
                  ) : (
                    subjectsInSemester.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.code ?? s.name} – {s.name}
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
                <SelectValue placeholder={!subjectId ? "Chọn thư mục (sẽ tự nhập kỳ & môn)" : "Chọn thư mục"} />
              </SelectTrigger>
              <SelectContent>
                {foldersInSubject.length === 0 ? (
                  <div className="px-3 py-2 text-sm text-muted-foreground">
                    Không có thư mục
                  </div>
                ) : (
                  foldersInSubject.map((f) => (
                    <SelectItem key={f.id} value={String(f.id)}>
                      {f.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            {subjectId && foldersInSubject.length === 0 && (
              <p className="text-xs text-amber-600 dark:text-amber-400">
                Chưa có thư mục nào cho môn này. <a href="/folders" className="underline">Tạo mới</a>.
              </p>
            )}
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
