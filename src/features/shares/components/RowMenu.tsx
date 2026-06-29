// src/features/shares/components/RowMenu.tsx
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export interface MenuAction {
  icon: React.ReactNode;
  label: string;
  danger?: boolean;
  onClick: () => void;
}

export function RowMenu({ items }: { items: MenuAction[] }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        {items.map((it) => (
          <DropdownMenuItem
            key={it.label}
            onClick={it.onClick}
            className={cn("cursor-pointer", it.danger && "text-destructive focus:text-destructive")}
          >
            {it.icon}<span className="ml-2">{it.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
