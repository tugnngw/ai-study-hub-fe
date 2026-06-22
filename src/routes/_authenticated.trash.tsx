import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { FileText, Folder, Search, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useTrash, useRestoreDocument, usePermanentDeleteDocument } from "@/lib/queries";
import { formatBytes, formatDate, formatRelativeTime } from "@/lib/utils";
import type { Document } from "@/lib/types";

export const Route = createFileRoute("/_authenticated/trash")({
  component: TrashPage,
});

const PER_PAGE = 8;
type SortKey = "newest" | "oldest";

function TrashPage() {
  const { data, isLoading } = useTrash();
  const restore = useRestoreDocument();
  const erase = usePermanentDeleteDocument();

  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("oldest");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const items = useMemo(() => {
    let arr = (data ?? []).filter((d) => d.title.toLowerCase().includes(query.toLowerCase()));
    arr = arr.sort((a, b) => {
      const av = a.deletedAt ?? "", bv = b.deletedAt ?? "";
      return sort === "newest" ? bv.localeCompare(av) : av.localeCompare(bv);
    });
    return arr;
  }, [data, query, sort]);

  const totalPages = Math.max(1, Math.ceil(items.length / PER_PAGE));
  const paged = items.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const toggle = (id: number) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  const allChecked = paged.length > 0 && paged.every((d) => selected.has(d.id));
  const toggleAll = () =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (allChecked) paged.forEach((d) => next.delete(d.id));
      else paged.forEach((d) => next.add(d.id));
      return next;
    });

  const onRestore = (id: number) =>
    restore.mutate(id, {
      onSuccess: () => { toast.success("Đã khôi phục"); setSelected((p) => { const n = new Set(p); n.delete(id); return n; }); },
    });
  const onErase = (id: number) => {
    if (!confirm("Xóa vĩnh viễn mục này?")) return;
    erase.mutate(id, {
      onSuccess: () => { toast.success("Đã xóa vĩnh viễn"); setSelected((p) => { const n = new Set(p); n.delete(id); return n; }); },
    });
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display font-bold text-[24px]">Thùng rác</h1>
        <p className="text-muted-foreground text-[14px] mt-1">
          Các tài liệu và thư mục đã xóa sẽ nằm ở đây và mất trong 30 ngày
        </p>
      </div>

      {/* Search + sort */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
            placeholder="Tìm kiếm theo thư mục, người dùng..."
            className="w-full h-11 rounded-xl border border-border/70 bg-white pl-10 pr-3 text-[14px] outline-none focus:border-primary"
          />
        </div>
        <div className="relative">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="h-11 rounded-xl border border-border/70 bg-white pl-4 pr-9 text-[13px] font-medium outline-none focus:border-primary appearance-none cursor-pointer"
          >
            <option value="oldest">Sắp xếp : Cũ nhất</option>
            <option value="newest">Sắp xếp : Mới nhất</option>
          </select>
          <ChevronDown className="h-4 w-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      <p className="text-[13px] text-muted-foreground">{selected.size} / {items.length} Đã chọn</p>

      {/* Bảng */}
      <div className="rounded-xl border border-border/70 bg-white overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-secondary/50 text-[13px] font-semibold text-muted-foreground">
              <th className="w-12 px-4 py-3">
                <input type="checkbox" checked={allChecked} onChange={toggleAll} className="h-4 w-4 rounded accent-primary cursor-pointer" />
              </th>
              <th className="px-4 py-3 font-semibold">Tên tài liệu</th>
              <th className="px-4 py-3 font-semibold">Ngày Tháng</th>
              <th className="px-4 py-3 font-semibold">Thời gian</th>
              <th className="px-4 py-3 w-[140px]"></th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={5} className="py-12 text-center text-[14px] text-muted-foreground">Đang tải…</td></tr>
            ) : paged.length === 0 ? (
              <tr><td colSpan={5} className="py-12 text-center text-[14px] text-muted-foreground">Thùng rác trống</td></tr>
            ) : (
              paged.map((d) => (
                <TrashRow key={d.id} doc={d} checked={selected.has(d.id)} onToggle={() => toggle(d.id)} onRestore={() => onRestore(d.id)} onErase={() => onErase(d.id)} />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <button type="button" disabled={page === 1} onClick={() => setPage((p) => p - 1)}
            className={`w-8 h-8 rounded-lg border border-border/70 flex items-center justify-center ${page === 1 ? "text-gray-300" : "text-muted-foreground hover:bg-secondary/60"}`}>
            <ChevronLeft className="h-4 w-4" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button key={p} type="button" onClick={() => setPage(p)}
              className={`w-8 h-8 rounded-lg text-[13px] font-semibold ${p === page ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary/60"}`}>{p}</button>
          ))}
          <button type="button" disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}
            className={`w-8 h-8 rounded-lg border border-border/70 flex items-center justify-center ${page === totalPages ? "text-gray-300" : "text-muted-foreground hover:bg-secondary/60"}`}>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      <p className="text-center text-[12px] text-muted-foreground">
        Lưu ý : Bạn có thể khôi phục hoặc xóa vĩnh viễn các mục trong thùng rác. Các mục sẽ được xóa vĩnh viễn sau 30 ngày.
      </p>
    </div>
  );
}

function TrashRow({ doc, checked, onToggle, onRestore, onErase }: {
  doc: Document; checked: boolean; onToggle: () => void; onRestore: () => void; onErase: () => void;
}) {
  const isFolder = !doc.mimeType && !doc.cloudinaryUrl;
  return (
    <tr className="border-t border-border/60 hover:bg-secondary/30 transition-colors">
      <td className="px-4 py-3">
        <input type="checkbox" checked={checked} onChange={onToggle} className="h-4 w-4 rounded accent-primary cursor-pointer" />
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center shrink-0">
            {isFolder ? <Folder className="h-4 w-4 text-primary" /> : <FileText className="h-4 w-4 text-primary" />}
          </div>
          <div className="min-w-0">
            <div className="text-[13px] font-semibold truncate">{doc.title}</div>
            <div className="text-[11px] text-muted-foreground">{formatBytes(doc.fileSize)}</div>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-[13px] text-muted-foreground">{formatDate(doc.deletedAt)}</td>
      <td className="px-4 py-3 text-[13px] text-amber-500 font-medium">{formatRelativeTime(doc.deletedAt)}</td>
      <td className="px-4 py-3">
        <div className="flex items-center justify-end gap-4">
          <button type="button" onClick={onRestore} className="text-[13px] text-muted-foreground hover:text-primary font-medium">Khôi phục</button>
          <button type="button" onClick={onErase} className="text-[13px] text-red-500 hover:text-red-600 font-medium">Xóa</button>
        </div>
      </td>
    </tr>
  );
}
