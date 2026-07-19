import { useEffect, useState } from "react";
import { Check, Copy, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useShareDocument, useShareFolder, useShareInfo, useRevokeShare } from "@/lib/queries";
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

type ShareDialogProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  targetId: string; // UUID string
  targetType: "document" | "folder";
  targetTitle: string;
};

export function ShareDialog({
  open,
  onOpenChange,
  targetId,
  targetType,
  targetTitle,
}: ShareDialogProps) {
  // Choose the correct mutation hook based on type
  const shareDoc = useShareDocument();
  const shareFolder = useShareFolder();
  const info = useShareInfo(targetId, targetType, open && !!localStorage.getItem("auth_token"));
  const revoke = useRevokeShare();

  const [inputValue, setInputValue] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [recipients, setRecipients] = useState<ShareRecipient[]>([]);

  // Only fetch share info when dialog is open
  const shouldFetch = open && !!targetId;

  // Reset fields when dialog closes
  useEffect(() => {
    if (!open) {
      setInputValue("");
      setCopied(false);
      // Clear recipients when closing dialog
      setRecipients([]);
    }
  }, [open]);

  // Use share info only if fetch was successful (silently ignore 401)
  useEffect(() => {
    if (shouldFetch && info.data?.recipients) {
      setRecipients(info.data.recipients);
    }
  }, [info.data, shouldFetch]);

  const link = info.data?.shareLink || info.data?.link || "";

  const handleInvite = async () => {
    const value = inputValue.trim();
    if (!value) return;
    try {
      const res = targetType === "document"
        ? await shareDoc.mutateAsync({ id: targetId, value })
        : await shareFolder.mutateAsync({ id: targetId, value });
      if (res.recipients?.length) {
        setRecipients(res.recipients);
      }
      setInputValue("");
      toast.success(`Invited ${value}`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Invite failed");
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      toast.success("Link copied");
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const handleRevoke = async () => {
    try {
      if (info.data?.shareToken) {
        await revoke.mutateAsync(info.data.shareToken);
      } else {
        await revoke.mutateAsync(targetId);
      }
      toast.success("Link revoked");
      onOpenChange(false);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Revoke failed");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="truncate">Share "{targetTitle}"</DialogTitle>
          <DialogDescription>
            Invite others via email or generate a shareable link.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Invite via Email */}
          <div className="space-y-2">
            <Label>Invite by Email or Username</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Enter email or username"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    void handleInvite();
                  }
                }}
              />
              <Button 
                onClick={handleInvite} 
                disabled={shareDoc.isPending || shareFolder.isPending || !inputValue.trim()}
              >
                {(shareDoc.isPending || shareFolder.isPending) ? "Sending..." : "Invite"}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              {inputValue.includes("@") ? "Sending invite via email" : "Sending invite via username"}
            </p>
          </div>

          {/* Recipients list */}
          <div className="space-y-2">
            <Label>Shared With</Label>
            {recipients.length === 0 ? (
              <p className="text-sm text-muted-foreground">No recipients yet.</p>
            ) : (
              <ul className="space-y-1 max-h-32 overflow-y-auto">
                {recipients.map((r) => (
                  <li key={r.accountId} className="text-sm rounded-md bg-muted/50 px-2.5 py-1.5 truncate">
                    {r.fullName || r.email || r.username}
                    <span className="text-xs text-muted-foreground ml-1">
                      ({r.email || r.username})
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Shareable link */}
          <div className="space-y-2">
            <Label>Shareable Link</Label>
            <div className="flex gap-2">
              <Input value={link} readOnly className="text-muted-foreground" />
              <Button variant="outline" size="icon" onClick={handleCopy} title="Copy link">
                {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Revoke link */}
          <div className="space-y-2">
            <Button variant="destructive" onClick={handleRevoke} disabled={revoke.isPending}>
              {revoke.isPending ? "Revoking..." : "Revoke Link"}
              <Trash2 className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}