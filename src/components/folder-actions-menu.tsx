import { useNavigate } from "@tanstack/react-router";
import { FolderOpen, Pencil, Flag, Trash2, Star, StarOff, Share2, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function FolderActionsMenu({
  folderId,
  starred,
  onToggleStar,
  onRename,
  onShare,
  onReport,
  onDelete,
  className,
  iconClassName,
}: {
  folderId: string;
  starred: boolean;
  onToggleStar: () => void;
  onRename: () => void;
  onShare: () => void;
  onReport: () => void;
  onDelete: () => void;
  className?: string;
  iconClassName?: string;
}) {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          onClick={(e) => e.stopPropagation()}
          className={
            className ??
            "h-7 w-7 rounded-md hover:bg-accent flex items-center justify-center text-muted-foreground shrink-0"
          }
          title="Tùy chọn"
        >
          <MoreVertical className={cn("h-4 w-4", iconClassName)} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
        <DropdownMenuItem
          onClick={() => navigate({ to: "/ai", search: { folderId } })}
        >
          <FolderOpen className="h-3.5 w-3.5 mr-2" /> Mở
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onRename}>
          <Pencil className="h-3.5 w-3.5 mr-2" /> Đổi tên
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onShare}>
          <Share2 className="h-3.5 w-3.5 mr-2" /> Chia sẻ
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onReport}>
          <Flag className="h-3.5 w-3.5 mr-2" /> Báo cáo
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onDelete}
          className="text-destructive focus:text-destructive"
        >
          <Trash2 className="h-3.5 w-3.5 mr-2" /> Xóa
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onToggleStar}>
          {starred ? (
            <StarOff className="h-3.5 w-3.5 mr-2" />
          ) : (
            <Star className="h-3.5 w-3.5 mr-2" />
          )}
          {starred ? "Bỏ gắn sao" : "Gắn sao"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
