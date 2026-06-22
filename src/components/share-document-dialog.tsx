import { useEffect, useState } from "react";
import { Check, Copy, Users } from "lucide-react";
import { toast } from "sonner";
import { useShareDocument, useShareInfo } from "@/lib/queries";
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
import type { ShareRecipient } from "@/lib/types";

export function ShareDocumentDialog({
  open,
  onOpenChange,
  documentId,
  documentTitle,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  documentId: number;
  documentTitle: string;
}) {
  const share = useShareDocument();
  const info = useShareInfo(documentId, open);
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);
  const [recipients, setRecipients] = useState<ShareRecipient[]>([]);

  useEffect(() => {
    if (info.data) setRecipients(info.data.recipients);
  }, [info.data]);

  useEffect(() => {
    if (!open) {
      setEmail("");
      setCopied(false);
    }
  }, [open]);

  const link = info.data?.link ?? "";

  const handleInvite = async () => {
    const value = email.trim();
    if (!value) return;
    if (!/^\S+@\S+\.\S+$/.test(value)) {
      toast.error("Email không hợp lệ");
      return;
    }
    try {
      const res = await share.mutateAsync({ id: documentId, email: value });
      setRecipients(res.recipients);
      setEmail("");
      toast.success(`Đã mời ${value}`);
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
          <DialogTitle className="truncate">
            Chia sẻ "{documentTitle}"
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
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    void handleInvite();
                  }
                }}
              />
              <Button
                onClick={handleInvite}
                disabled={share.isPending || !email.trim()}
              >
                {share.isPending ? "Đang mời..." : "Mời"}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-sm font-medium">
              <Users className="h-4 w-4 text-muted-foreground" />
              Đã chia sẻ với ({recipients.length})
            </div>
            {recipients.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Chưa chia sẻ với ai.
              </p>
            ) : (
              <ul className="space-y-1 max-h-32 overflow-y-auto">
                {recipients.map((r) => (
                  <li
                    key={r.accountId}
                    className="text-sm rounded-md bg-muted/50 px-2.5 py-1.5 truncate"
                  >
                    {r.fullName ?? r.email}
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
