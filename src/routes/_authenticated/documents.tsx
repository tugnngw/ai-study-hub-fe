import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { FileText, Plus, Search, Upload, Pin } from "lucide-react";
import { toast } from "sonner";
import { useDocuments, useFolders, useUploadDocument } from "@/lib/queries";
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
                <th className="px-4 py-3 font-medium hidden md:table-cell">
                  Description
                </th>
                <th className="px-4 py-3 font-medium hidden sm:table-cell">Status</th>
                <th className="px-4 py-3 font-medium w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d) => (
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
              ))}
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
  id: number;
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
  const upload = useUploadDocument();
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [folderId, setFolderId] = useState<string>("");

  const submit = async () => {
    if (!file) return toast.error("Select a file");
    if (!title.trim()) return toast.error("Title required");
    if (!folderId) return toast.error("Select a folder");
    try {
      await upload.mutateAsync({
        file,
        folderId,
        title,
        description,
      });
      toast.success("Uploaded");
      onOpenChange(false);
      setFile(null);
      setTitle("");
      setDescription("");
      setFolderId("");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload document</DialogTitle>
          <DialogDescription>
            Add a new file to your workspace.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>File</Label>
            <Input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </div>
          <div className="space-y-2">
            <Label>Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Folder</Label>
            <Select value={folderId} onValueChange={setFolderId}>
              <SelectTrigger>
                <SelectValue placeholder="Choose folder" />
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
            Cancel
          </Button>
          <Button onClick={submit} disabled={upload.isPending}>
            {upload.isPending ? "Uploading..." : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
