import { useEffect, useState } from "react";
import { Check, Copy, Users, FolderKanban, FileText } from "lucide-react";
import { toast } from "sonner";
import { useShareFolder, useOwnedShares } from "@/lib/queries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

/**
 * Dialog chia sẻ dùng chung cho CẢ folder lẫn file (document).
 * Truyền đúng 1 trong 2: folderId hoặc documentId.
 */
export function ShareEntityDialog({
  open,
  onOpenChange,
  title,
  folderId,
  documentId,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
  folderId?: string;
  documentId?: string;
}) {
  const share = useShareFolder();
  const { data: shares, isLoading } = useOwnedShares();
  const [value, setValue] = useState("");
  const [copied, setCopied] = useState(false);

  const isFolder = !!folderId;
  const targetId = folderId ?? documentId ?? "";

  useEffect(() => {
    if (!open) {
      setValue("");
      setCopied(false);
    }
  }, [open]);

  // Lấy shareToken từ kết quả chia sẻ gần nhất (ưu tiên) hoặc danh sách shares
  const matchingShare = (shares ?? []).find((s) =>
    isFolder ? s.folderId === targetId : s.documentId === targetId,
  );
  const shareToken = share.data?.shareToken ?? matchingShare?.shareToken ?? "";
  // Liên kết chia sẻ trỏ tới frontend route /shared/{shareToken}
  const link = shareToken
    ? `${window.location.origin}/shared/${shareToken}`
    : "";

  // Lọc danh sách người đã được chia sẻ đúng tài nguyên đang thao tác.
  const relevantShares = (shares ?? []).filter((s) =>
    isFolder ? s.folderId === targetId : s.documentId === targetId,
  );

  const handleInvite = async () => {
    const v = value.trim();
    if (!v) return;
    const isEmail = /^\S+@\S+\.\S+$/.test(v);
    try {
      await share.mutateAsync({
        folderId: isFolder ? targetId : undefined,
        documentId: isFolder ? undefined : targetId,
        email: isEmail ? v : undefined,
        username: isEmail ? undefined : v,
      });
      setValue("");
      toast.success(`Đã mời ${v}`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Mời thất bại");
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      toast.success("Đã sao chép liên kết");
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("Không thể sao chép liên kết");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="truncate flex items-center gap-2">
            {isFolder ? (
              <FolderKanban className="h-4 w-4 text-primary shrink-0" />
            ) : (
              <FileText className="h-4 w-4 text-primary shrink-0" />
            )}
            Chia sẻ {isFolder ? "thư mục" : "tài liệu"} "{title}"
          </DialogTitle>
          <DialogDescription>
            Mời người khác xem hoặc sao chép liên kết chia sẻ.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Mời người dùng</Label>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="email@example.com hoặc username"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    void handleInvite();
                  }
                }}
              />
              <Button
                onClick={handleInvite}
                disabled={share.isPending || !value.trim()}
              >
                {share.isPending ? "Đang mời..." : "Mời"}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-sm font-medium">
              <Users className="h-4 w-4 text-muted-foreground" />
              Đã chia sẻ ({isLoading ? "..." : relevantShares.length})
            </div>
            {relevantShares.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Chưa chia sẻ với ai.
              </p>
            ) : (
              <ul className="space-y-1 max-h-32 overflow-y-auto">
                {relevantShares.map((s) => (
                  <li
                    key={s.id}
                    className="text-sm rounded-md bg-muted/50 px-2.5 py-1.5 truncate"
                  >
                    {s.sharedUsername ?? s.sharedEmail ?? "Unknown"}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="space-y-2">
            <Label>Liên kết chia sẻ</Label>
            <div className="flex gap-2">
              <Input value={link} readOnly className="text-muted-foreground" />
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopy}
                title="Sao chép liên kết"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-primary" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
