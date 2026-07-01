import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { FolderKanban, Plus, Search, Trash2, Pencil, Star, MoreVertical, Share2 } from "lucide-react";
import { toast } from "sonner";
import {
  useCreateFolder,
  useDeleteFolder,
  useFolders,
  useUpdateFolder,
} from "@/lib/queries";
import { shareApi } from "@/lib/realApi";
import type { ShareRequest } from "@/lib/types";
import { useStarredFolders } from "@/lib/preferences";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { Folder } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/folders")({
  component: FoldersPage,
});

function FoldersPage() {
  const { data, isLoading } = useFolders();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Folder | null>(null);
  const [deleting, setDeleting] = useState<Folder | null>(null);
  const [sharing, setSharing] = useState<Folder | null>(null);
  const { isMarked: isStarred, toggle: toggleStar } = useStarredFolders();

  const filtered = (data ?? [])
      .filter((f) => f.name.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => Number(isStarred(b.id)) - Number(isStarred(a.id)));

  return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Folders</h1>
            <p className="text-muted-foreground mt-1">Organize your documents</p>
          </div>
          <Button
              onClick={() => {
                setEditing(null);
                setOpen(true);
              }}
          >
            <Plus className="h-4 w-4 mr-2" /> New folder
          </Button>
        </div>

        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
              placeholder="Search folders..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9"
          />
        </div>

        {isLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-32" />
              ))}
            </div>
        ) : filtered.length === 0 ? (
            <Card>
              <CardContent className="py-16 text-center">
                <FolderKanban className="h-10 w-10 mx-auto text-muted-foreground/50" />
                <p className="mt-4 text-sm text-muted-foreground">
                  No folders found.
                </p>
              </CardContent>
            </Card>
        ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((f) => (
                  <Card
                      key={f.id}
                      className={cn(
                          "group hover:border-primary/40 transition-colors relative",
                          isStarred(f.id) && "border-amber-400/60 bg-amber-50/40 dark:bg-amber-400/5",
                      )}
                  >
                    {isStarred(f.id) && (
                        <Star className="h-3.5 w-3.5 absolute top-3 right-3 fill-amber-400 text-amber-400" />
                    )}
                    <CardContent className="p-5">
                      <Link to="/ai" search={{ folderId: f.id }} className="block">
                        <div className="flex items-start gap-3">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <FolderKanban className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium truncate pr-5">{f.name}</div>
                            <div className="text-xs text-muted-foreground line-clamp-2 mt-1">
                              {f.aiSummary || "No summary"}
                            </div>
                          </div>
                        </div>
                      </Link>
                      <div className="flex justify-end mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="ghost">
                              <MoreVertical className="h-3.5 w-3.5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSharing(f)}>
                              <Share2 className="h-3.5 w-3.5 mr-2" />
                              Share
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toggleStar(f.id)}>
                              <Star
                                  className={cn(
                                      "h-3.5 w-3.5 mr-2",
                                      isStarred(f.id) && "fill-amber-400 text-amber-400",
                                  )}
                              />
                              Star
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {
                              setEditing(f);
                              setOpen(true);
                            }}>
                              <Pencil className="h-3.5 w-3.5 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => setDeleting(f)}
                                className="text-destructive focus:text-destructive"
                            >
                              <Trash2 className="h-3.5 w-3.5 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
              ))}
            </div>
        )}

        <FolderFormDialog open={open} onOpenChange={setOpen} folder={editing} />
        <DeleteFolderDialog folder={deleting} onClose={() => setDeleting(null)} />
        <ShareFolderDialog folder={sharing} onClose={() => setSharing(null)} />
      </div>
  );
}

function FolderFormDialog({
                            open,
                            onOpenChange,
                            folder,
                          }: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  folder: Folder | null;
}) {
  const create = useCreateFolder();
  const update = useUpdateFolder();
  const [name, setName] = useState(folder?.name ?? "");

  // sync when folder changes
  if (open && folder && folder.name !== name && name === "") {
    setName(folder.name);
  }

  const submit = async () => {
    if (!name.trim()) return toast.error("Name is required");
    try {
      if (folder) {
        await update.mutateAsync({ id: folder.id, name });
        toast.success("Folder updated");
      } else {
        await create.mutateAsync({ name });
        toast.success("Folder created");
      }
      onOpenChange(false);
      setName("");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    }
  };

  return (
      <Dialog
          open={open}
          onOpenChange={(v) => {
            onOpenChange(v);
            if (!v) {
              setName("");
            }
          }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{folder ? "Edit folder" : "New folder"}</DialogTitle>
            <DialogDescription>
              Organize related documents together.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Contracts"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
                onClick={submit}
                disabled={create.isPending || update.isPending}
            >
              {folder ? "Save" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  );
}

function DeleteFolderDialog({
                              folder,
                              onClose,
                            }: {
  folder: Folder | null;
  onClose: () => void;
}) {
  const del = useDeleteFolder();
  return (
      <AlertDialog
          open={!!folder}
          onOpenChange={(v) => {
            if (!v) onClose();
          }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete folder?</AlertDialogTitle>
            <AlertDialogDescription>
              This will delete &ldquo;{folder?.name}&rdquo;. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
                onClick={async () => {
                  if (!folder) return;
                  try {
                    await del.mutateAsync(folder.id);
                    toast.success("Folder deleted");
                    onClose();
                  } catch (e) {
                    toast.error(e instanceof Error ? e.message : "Failed");
                  }
                }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
  );
}

function ShareFolderDialog({
                             folder,
                             onClose,
                           }: {
  folder: Folder | null;
  onClose: () => void;
}) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const shareMutation = useMutation({
    mutationFn: (data: ShareRequest) => shareApi.shareFolder(data),
    onSuccess: () => {
      toast.success("Folder shared successfully");
      onClose();
      setEmail("");
      setUsername("");
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Failed to share folder");
    },
  });

  const handleShare = async () => {
    if (!folder) return;

    if (!email.trim() && !username.trim()) {
      toast.error("Please enter email or username");
      return;
    }

    const request: ShareRequest = {
      folderId: folder.id,
      visibility: "private",
    };

    if (email.trim()) {
      request.email = email.trim();
    }
    if (username.trim()) {
      request.username = username.trim();
    }

    await shareMutation.mutateAsync(request);
  };

  return (
      <Dialog
          open={!!folder}
          onOpenChange={(v) => {
            if (!v) onClose();
          }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share folder</DialogTitle>
            <DialogDescription>
              Share &ldquo;{folder?.name}&rdquo; with another user
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="username"
              />
            </div>
            <div className="text-xs text-muted-foreground">
              Enter either email or username of the user you want to share with.
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
                onClick={handleShare}
                disabled={shareMutation.isPending}
            >
              Share
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  );
}
