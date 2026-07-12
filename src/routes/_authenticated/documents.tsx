import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { FileText, Plus, Search, Upload, Pin } from "lucide-react";
import { toast } from "sonner";
import {
  useDocuments,
  useFolders,
  useUploadDocument,
  useSemesters,
  useSubjectsBySemester,
} from "@/lib/queries";
import { usePinnedDocuments } from "@/lib/preferences";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { DocumentActionsMenu } from "@/components/document-actions-menu";
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

export const Route = createFileRoute("/_authenticated/documents")({
  component: DocumentsPage,
});

function DocumentsPage() {
  const { data, isLoading } = useDocuments();
  const subjects = useSemesters();
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
                <th className="px-4 py-3 font-medium hidden md:table-cell">
                  Description
                </th>
                <th className="px-4 py-3 font-medium hidden sm:table-cell">Status</th>
                <th className="px-4 py-3 font-medium w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d) => {
                return (
                  <DocumentRow
                    key={d.id}
                    id={d.id}
                    folderId={d.folderId ?? ""}
                    title={d.title}
                    description={d.description ?? ""}
                    status={d.status}
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
  title,
  description,
  status,
  pinned,
  onTogglePin,
}: {
  id: string;
  folderId: string;
  title: string;
  description: string;
  status: string;
  pinned: boolean;
  onTogglePin: () => void;
}) {
  const getStatusBadge = () => {
    const statusUpper = status?.toUpperCase();
    if (statusUpper === "COMPLETED") {
      return <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20 hover:bg-yellow-500/20">Chờ duyệt</Badge>;
    }
    if (statusUpper === "READY") {
      return <Badge className="bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/20">Sẵn sàng</Badge>;
    }
    if (statusUpper === "REJECT") {
      return <Badge className="bg-red-500/10 text-red-600 border-red-500/20 hover:bg-red-500/20">Bị từ chối</Badge>;
    }
    return <Badge variant="outline">{status}</Badge>;
  };

  return (
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
            to="/ai"
            search={{ folderId, docId: id }}
            className="flex items-center gap-2 hover:text-primary min-w-0"
          >
            <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="font-medium truncate">{title}</span>
          </Link>
        </div>
      </td>
      <td className="px-4 py-3 hidden lg:table-cell">
        <span className="text-muted-foreground text-xs">—</span>
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
                        ({(f.size / 1024 / 1024).toFixed(1)} MB)
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
              <Label>Kỳ học</Label>
              <Select
                value={semesterId}
                onValueChange={(v) => {
                  setSemesterId(v);
                  setSubjectId("");
                }}
              >
                <SelectTrigger>
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
              <Label>Môn học</Label>
              <Select
                value={subjectId}
                onValueChange={setSubjectId}
                disabled={!semesterId}
              >
                <SelectTrigger>
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
          <Button onClick={submit} disabled={upload.isPending}>
            {upload.isPending ? "Đang tải lên…" : "Tải lên"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
