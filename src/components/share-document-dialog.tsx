import { useEffect, useState } from "react";
import { Check, Copy, Users } from "lucide-react";
import { toast } from "sonner";
<<<<<<< HEAD
<<<<<<< HEAD
import { useShareDocument, useShareInfo } from "@/lib/queries";
=======
import { useShareFolder, useOwnedShares } from "@/lib/queries";
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
import { useShareFolder, useOwnedShares } from "@/lib/queries";
>>>>>>> origin/AI-Study-fix
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
import type { ShareRecipient } from "@/lib/types";
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
import type { ShareRecipient } from "@/lib/types";
>>>>>>> origin/AI-Study-fix

export function ShareDocumentDialog({
  open,
  onOpenChange,
<<<<<<< HEAD
<<<<<<< HEAD
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
  const [recipients, setRecipients] = useState<string[]>([]);

  useEffect(() => {
    if (info.data) setRecipients(info.data.recipients);
  }, [info.data]);

  useEffect(() => {
    if (!open) {
      setEmail("");
=======
=======
>>>>>>> origin/AI-Study-fix
  documentTitle,
  folderId,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  documentTitle: string;
  folderId: string;
}) {
  const share = useShareFolder();
  const { data: shares, isLoading } = useOwnedShares();
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) {
      setEmailOrUsername("");
<<<<<<< HEAD
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
>>>>>>> origin/AI-Study-fix
      setCopied(false);
    }
  }, [open]);

<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> origin/AI-Study-fix
  const link = `http://localhost:5174/shared/${folderId}`;

  const handleInvite = async () => {
    const value = emailOrUsername.trim();
    if (!value) return;
    // Check if input is email or username
    const isEmail = /^\S+@\S+\.\S+$/.test(value);
    try {
      await share.mutateAsync({
        folderId,
        email: isEmail ? value : undefined,
        username: isEmail ? undefined : value,
      });
      setEmailOrUsername("");
<<<<<<< HEAD
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
>>>>>>> origin/AI-Study-fix
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
<<<<<<< HEAD
<<<<<<< HEAD
          <DialogTitle className="truncate">Chia sẻ "{documentTitle}"</DialogTitle>
          <DialogDescription>Mời người khác xem hoặc sao chép liên kết chia sẻ.</DialogDescription>
=======
=======
>>>>>>> origin/AI-Study-fix
          <DialogTitle className="truncate">
            Chia sẻ "{documentTitle}"
          </DialogTitle>
          <DialogDescription>
            Mời người khác xem hoặc sao chép liên kết chia sẻ.
          </DialogDescription>
<<<<<<< HEAD
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
>>>>>>> origin/AI-Study-fix
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Mời người dùng</Label>
            <div className="flex gap-2">
              <Input
<<<<<<< HEAD
<<<<<<< HEAD
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
=======
=======
>>>>>>> origin/AI-Study-fix
                type="text"
                placeholder="email@example.com hoặc username"
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
<<<<<<< HEAD
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
>>>>>>> origin/AI-Study-fix
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    void handleInvite();
                  }
                }}
              />
<<<<<<< HEAD
<<<<<<< HEAD
              <Button onClick={handleInvite} disabled={share.isPending || !email.trim()}>
=======
=======
>>>>>>> origin/AI-Study-fix
              <Button
                onClick={handleInvite}
                disabled={share.isPending || !emailOrUsername.trim()}
              >
<<<<<<< HEAD
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
>>>>>>> origin/AI-Study-fix
                {share.isPending ? "Đang mời..." : "Mời"}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-sm font-medium">
              <Users className="h-4 w-4 text-muted-foreground" />
<<<<<<< HEAD
<<<<<<< HEAD
              Đã chia sẻ với ({recipients.length})
            </div>
            {recipients.length === 0 ? (
              <p className="text-sm text-muted-foreground">Chưa chia sẻ với ai.</p>
            ) : (
              <ul className="space-y-1 max-h-32 overflow-y-auto">
                {recipients.map((r) => (
                  <li
                    key={r}
                    className="text-sm rounded-md bg-muted/50 px-2.5 py-1.5 truncate"
                  >
                    {r}
=======
=======
>>>>>>> origin/AI-Study-fix
              Đã chia sẻ ({isLoading ? "..." : (shares?.length ?? 0)})
            </div>
            {!shares || shares.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Chưa chia sẻ với ai.
              </p>
            ) : (
              <ul className="space-y-1 max-h-32 overflow-y-auto">
                {shares.map((s) => (
                  <li
                    key={s.id}
                    className="text-sm rounded-md bg-muted/50 px-2.5 py-1.5 truncate"
                  >
                    {s.sharedUsername ?? s.sharedEmail ?? "Unknown"}
<<<<<<< HEAD
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
>>>>>>> origin/AI-Study-fix
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="space-y-2">
            <Label>Liên kết chia sẻ</Label>
            <div className="flex gap-2">
              <Input value={link} readOnly className="text-muted-foreground" />
<<<<<<< HEAD
<<<<<<< HEAD
              <Button variant="outline" size="icon" onClick={handleCopy} title="Sao chép liên kết">
                {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
=======
=======
>>>>>>> origin/AI-Study-fix
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
<<<<<<< HEAD
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
>>>>>>> origin/AI-Study-fix
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
