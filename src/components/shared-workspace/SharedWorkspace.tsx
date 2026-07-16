// src/components/shared-workspace/SharedWorkspace.tsx
// Read-only workspace for shared content. Independent from DocumentWorkspace.
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  FileText,
  Loader2,
  Save,
  FolderKanban,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { DocumentViewer } from "@/components/document-viewer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useFolders } from "@/lib/queries";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useSharedFolder,
  useSharedDocuments,
  useSaveToMyFolder,
} from "@/features/shares/hooks/useSharedWorkspace";
import type { SaveToFolderResponse } from "@/features/shares/types/share.types";

interface SharedWorkspaceProps {
  shareToken: string;
  docId?: string;
}

export function SharedWorkspace({ shareToken, docId }: SharedWorkspaceProps) {
  const navigate = useNavigate();
  const folderInfo = useSharedFolder(shareToken);
  const folderId = folderInfo.data?.folderId ?? "";
  const folderName = folderInfo.data?.folderName ?? "Tài liệu được chia sẻ";
  const shareDbId = folderInfo.data?.shareDbId ?? shareToken;
  const isDocument = folderInfo.data?.isDocument ?? false;
  const docsQuery = useSharedDocuments(folderId);
  const docs = docsQuery.data ?? [];
  const selectedDoc = docs.find((d: any) => d.id === docId) ?? null;
  const saveMutation = useSaveToMyFolder();
  const myFolders = useFolders();
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [saveFolderId, setSaveFolderId] = useState("");
  const [saveTitle, setSaveTitle] = useState("");
  const [saveDesc, setSaveDesc] = useState("");
  const [saveResult, setSaveResult] = useState<SaveToFolderResponse | null>(null);

  const openDoc = (id: string) => {
    navigate({
      to: "/shared/$shareId",
      params: { shareId: shareToken },
      search: { docId: id },
    });
  };

  const resetSaveDialog = (isDocumentMode: boolean) => {
    setSaveFolderId("");
    if (isDocumentMode) {
      setSaveTitle(selectedDoc?.title ?? "");
      setSaveDesc(selectedDoc?.description ?? "");
    } else {
      setSaveTitle("");
      setSaveDesc("");
    }
    setSaveResult(null);
    setSaveDialogOpen(true);
  };

  const handleSave = async () => {
    if (!saveFolderId) {
      toast.error("Chọn thư mục đích");
      return;
    }
    try {
      const res = await saveMutation.mutateAsync({
        shareId: shareDbId,
        folderId: saveFolderId,
        title: saveTitle.trim() || undefined,
        description: saveDesc.trim() || undefined,
      });
      setSaveResult(res);
    } catch {
      toast.error("Lưu thất bại");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4 h-[calc(100vh-7rem)] min-h-[480px]">
      {/* Folder sidebar */}
      <aside className="hidden lg:flex flex-col bg-card border border-border rounded-2xl p-4 overflow-hidden shadow-soft">
        <div className="rounded-xl bg-gradient-soft p-3 border border-border/50">
          <div className="text-sm font-semibold font-display truncate">
            {folderName}
          </div>
          <div className="text-[11px] text-muted-foreground mt-0.5">
            {docsQuery.data?.length || 0} tài liệu
          </div>
        </div>

        <Button
          variant="default"
          size="sm"
          className="mt-3 w-full bg-gradient-brand shadow-brand hover:opacity-90"
          onClick={() => resetSaveDialog(false)}
          disabled={saveMutation.isPending}
        >
          <Save className="h-4 w-4 mr-1.5" />
          Lưu vào thư mục của tôi
        </Button>

        <div className="mt-5 flex-1 min-h-0 flex flex-col">
          <div className="text-[10px] font-semibold tracking-wider text-muted-foreground mb-2 px-1">
            TÀI LIỆU
          </div>
          <div className="space-y-1 overflow-y-auto flex-1 -mx-1 px-1">
            {docsQuery.isLoading &&
              Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-9 rounded-lg" />
              ))}
            {docs
              .filter((d: any) => d.status?.toUpperCase() !== "BANNED")
              .map((d: any) => {
                const active = d.id === docId;
                return (
                  <button
                    key={d.id}
                    onClick={() => openDoc(d.id)}
                    className={cn(
                      "flex items-center gap-2 text-sm px-2.5 py-2 rounded-lg transition-colors w-full text-left",
                      active
                        ? "bg-gradient-brand text-white font-medium shadow-soft"
                        : "hover:bg-accent text-foreground/90",
                    )}
                  >
                    <FileText className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{d.title}</span>
                  </button>
                );
              })}
            {!docsQuery.isLoading && docs.length === 0 && (
              <div className="text-xs text-muted-foreground px-2">
                Chưa có tài liệu
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Content area */}
      <section className="bg-card border border-border rounded-2xl flex flex-col overflow-hidden shadow-soft">
        {docId && selectedDoc ? (
          <DocumentViewer document={selectedDoc} className="flex-1 w-full h-full" />
        ) : (
          <div className="flex-1 overflow-y-auto p-6">
            {docsQuery.isLoading && docId ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-40 rounded-xl" />
                ))}
              </div>
            ) : docsQuery.isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-40 rounded-xl" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {docs
                  .filter((d: any) => d.status?.toUpperCase() !== "BANNED")
                  .map((d: any) => (
                    <button
                      key={d.id}
                      onClick={() => openDoc(d.id)}
                      className="group flex flex-col items-center text-center rounded-xl border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-soft hover:-translate-y-0.5"
                    >
                      <div className="flex-1 flex items-center justify-center w-full py-4">
                        <div className="h-16 w-16 rounded-xl bg-gradient-soft flex items-center justify-center group-hover:bg-gradient-brand transition-colors">
                          <FileText className="h-8 w-8 text-primary group-hover:text-white" />
                        </div>
                      </div>
                      <div className="text-xs font-medium text-foreground truncate w-full">
                        {d.title}
                      </div>
                    </button>
                  ))}
                {docs.length === 0 && (
                  <div className="col-span-full text-sm text-muted-foreground text-center py-10">
                    Thư mục chia sẻ chưa có tài liệu
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </section>

      {/* Save to My Folder dialog */}
      <Dialog open={saveDialogOpen} onOpenChange={(open) => {
        if (!open) { setSaveResult(null); }
        setSaveDialogOpen(open);
      }}>
        <DialogContent className="sm:max-w-lg">
          {saveResult ? (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  Kết quả lưu
                </DialogTitle>
                <DialogDescription>{saveResult.message}</DialogDescription>
              </DialogHeader>

              <div className="flex gap-4 justify-center py-4">
                <div className="flex flex-col items-center gap-1">
                  <CheckCircle2 className="h-8 w-8 text-green-500" />
                  <span className="text-2xl font-bold">{saveResult.copied}</span>
                  <span className="text-xs text-muted-foreground">Đã sao chép</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <AlertCircle className="h-8 w-8 text-amber-500" />
                  <span className="text-2xl font-bold">{saveResult.skipped}</span>
                  <span className="text-xs text-muted-foreground">Đã bỏ qua</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <XCircle className="h-8 w-8 text-red-500" />
                  <span className="text-2xl font-bold">{saveResult.failed}</span>
                  <span className="text-xs text-muted-foreground">Thất bại</span>
                </div>
              </div>

              <DialogFooter>
                <Button onClick={() => { setSaveResult(null); setSaveDialogOpen(false); }}>
                  Đóng
                </Button>
              </DialogFooter>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Save className="h-5 w-5 text-primary" /> Lưu vào thư mục của tôi
                </DialogTitle>
                <DialogDescription>
                  {isDocument
                    ? "Chọn thư mục đích và tùy chỉnh tiêu đề / mô tả"
                    : "Chọn thư mục đích trong bộ sưu tập của bạn"}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Thư mục đích</Label>
                  <Select value={saveFolderId} onValueChange={setSaveFolderId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn thư mục" />
                    </SelectTrigger>
                    <SelectContent>
                      {(myFolders.data ?? []).map((f: any) => (
                        <SelectItem key={f.id} value={f.id}>
                          <span className="inline-flex items-center gap-2">
                            <FolderKanban className="h-3.5 w-3.5" /> {f.name}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Title/description only for shared documents */}
                {isDocument && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="save-title">Tiêu đề</Label>
                      <Input
                        id="save-title"
                        value={saveTitle}
                        onChange={(e) => setSaveTitle(e.target.value)}
                        placeholder="Tiêu đề (không bắt buộc)"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="save-desc">Mô tả</Label>
                      <Textarea
                        id="save-desc"
                        value={saveDesc}
                        onChange={(e) => setSaveDesc(e.target.value)}
                        placeholder="Mô tả (không bắt buộc)"
                        rows={2}
                      />
                    </div>
                  </>
                )}
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>
                  Hủy
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={saveMutation.isPending}
                  className="bg-gradient-brand shadow-brand hover:opacity-90"
                >
                  {saveMutation.isPending ? (
                    <><Loader2 className="h-4 w-4 mr-1 animate-spin" />Đang lưu...</>
                  ) : (
                    <><Save className="h-4 w-4 mr-1" /> Lưu</>
                  )}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
