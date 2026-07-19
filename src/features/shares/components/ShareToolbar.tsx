// src/features/shares/components/ShareToolbar.tsx
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
<<<<<<< HEAD
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
=======
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
>>>>>>> origin/Flashcars
} from "@/components/ui/select";
import type { ShareSort } from "../types/share.types";

export type ShareTabKey = "all" | "with-me" | "by-me";

interface Props {
<<<<<<< HEAD
  q: string; onQ: (v: string) => void;
  sort: ShareSort; onSort: (v: ShareSort) => void;
  tab: ShareTabKey; onTab: (v: ShareTabKey) => void;
=======
  q: string;
  onQ: (v: string) => void;
  sort: ShareSort;
  onSort: (v: ShareSort) => void;
  tab: ShareTabKey;
  onTab: (v: ShareTabKey) => void;
>>>>>>> origin/Flashcars
}

export function ShareToolbar({ q, onQ, sort, onSort, tab, onTab }: Props) {
  return (
    <>
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
<<<<<<< HEAD
          <Input value={q} onChange={(e) => onQ(e.target.value)} placeholder="Tìm kiếm theo thư mục, người dùng…" className="pl-9" />
        </div>
        <Select value={sort} onValueChange={(v) => onSort(v as ShareSort)}>
          <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
=======
          <Input
            value={q}
            onChange={(e) => onQ(e.target.value)}
            placeholder="Tìm kiếm theo thư mục, người dùng…"
            className="pl-9"
          />
        </div>
        <Select value={sort} onValueChange={(v) => onSort(v as ShareSort)}>
          <SelectTrigger className="w-[160px]">
            <SelectValue />
          </SelectTrigger>
>>>>>>> origin/Flashcars
          <SelectContent>
            <SelectItem value="oldest">Sắp xếp: Cũ nhất</SelectItem>
            <SelectItem value="newest">Sắp xếp: Mới nhất</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs value={tab} onValueChange={(v) => onTab(v as ShareTabKey)}>
        <TabsList>
          <TabsTrigger value="all">Tất cả</TabsTrigger>
          <TabsTrigger value="with-me">Được chia sẻ với tôi</TabsTrigger>
          <TabsTrigger value="by-me">Tôi đã chia sẻ</TabsTrigger>
        </TabsList>
      </Tabs>
    </>
  );
}
