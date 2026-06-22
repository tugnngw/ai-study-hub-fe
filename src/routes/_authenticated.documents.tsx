import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Folder as FolderIcon, Search, Upload, MoreHorizontal,
  ChevronDown, ChevronLeft, ChevronRight, FolderPlus, Pencil, Trash2,
} from "lucide-react";
import { useFolders, useDocuments, useCreateFolder, useUpdateFolder, useDeleteFolder } from "@/lib/queries";
import { UploadDocumentDialog } from "@/components/upload-document-dialog";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Folder } from "@/lib/types";

export const Route = createFileRoute("/_authenticated/documents")({
  component: DocumentsPage,
});

const PER_PAGE = 9;
type SortKey = "newest" | "oldest" | "name";

function DocumentsPage() {
  const navigate = useNavigate();
  const folders = useFolders();
  const docs = useDocuments();

  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("newest");
  const [page, setPage] = useState(1);
  const [createOpen, setCreateOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [editing, setEditing] = useState<Folder | null>(null);
  const [deleting, setDeleting] = useState<Folder | null>(null);

  // Đếm số tài liệu trong mỗi thư mục từ dữ liệu thật
  const countByFolder = useMemo(() => {
    const m = new Map<string, number>();
    (docs.data ?? []).forEach((d) => {
      if (d.folderId) m.set(d.folderId, (m.get(d.folderId) ?? 0) + 1);
    });
    return m;
  }, [docs.data]);

  const list = useMemo(() => {
    let arr = (folders.data ?? []).filter((f) => f.name.toLowerCase().includes(query.toLowerCase()));
    arr = arr.slice().sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      const av = a.createdAt ?? "", bv = b.createdAt ?? "";
      return sort === "newest" ? bv.localeCompare(av) : av.localeCompare(bv);
    });
    return arr;
  }, [folders.data, query, sort]);

  const totalPages = Math.max(1, Math.ceil(list.length / PER_PAGE));
  const paged = list.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <h1 className="font-display font-bold text-[22px]">Tài liệu của tôi</h1>
      </div>

      {/* Search + actions */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
            placeholder="Tìm kiếm thư mục..."
            className="w-full h-11 rounded-xl border border-border/70 bg-white pl-10 pr-3 text-[14px] outline-none focus:border-primary"
          />
        </div>
        <button
          type="button"
          onClick={() => setCreateOpen(true)}
          className="h-11 px-4 rounded-xl bg-primary text-primary-foreground text-[14px] font-semibold flex items-center gap-2 hover:opacity-90"
        >
          <FolderPlus className="h-4 w-4" /> Mới
        </button>
        <button
          type="button"
          onClick={() => setUploadOpen(true)}
          className="h-11 px-4 rounded-xl bg-gradient-brand text-white text-[14px] font-semibold flex items-center gap-2 hover:opacity-90"
        >
          <Upload className="h-4 w-4" /> Upload
        </button>
      </div>

      {/* Grid thư mục */}
      {folders.isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-[78px] rounded-2xl border border-border/70 bg-white animate-pulse" />
          ))}
        </div>
      ) : list.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border py-16 text-center">
          <FolderIcon className="h-9 w-9 mx-auto text-muted-foreground/40" />
          <p className="mt-3 text-[14px] text-muted-foreground">Chưa có thư mục. Nhấn “Mới” để tạo.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {paged.map((f) => (
            <div
              key={f.id}
              onClick={() => navigate({ to: "/folders/$id", params: { id: f.id } })}
              className="group flex items-center gap-3 rounded-2xl border border-border/70 bg-white px-4 py-4 hover:border-primary/40 hover:shadow-soft transition-all cursor-pointer"
            >
              <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                <FolderIcon className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-[14px] truncate">{f.name}</p>
                <p className="text-muted-foreground text-[12px]">
                  {f.documentCount ?? countByFolder.get(f.id) ?? 0} mục
                </p>
              </div>
              <div onClick={(e) => e.stopPropagation()}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-secondary opacity-60 group-hover:opacity-100">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => navigate({ to: "/folders/$id", params: { id: f.id } })}>
                      <FolderIcon className="h-4 w-4 mr-2" /> Mở
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setEditing(f)}>
                      <Pencil className="h-4 w-4 mr-2" /> Đổi tên
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDeleting(f)} className="text-destructive focus:text-destructive">
                      <Trash2 className="h-4 w-4 mr-2" /> Xóa
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination + sort */}
      <div className="flex items-center justify-between">
        {totalPages > 1 ? (
          <div className="flex items-center gap-2">
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
        ) : <div />}

        <div className="relative">
          <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)}
            className="h-10 rounded-xl border border-border/70 bg-white pl-4 pr-9 text-[13px] font-medium outline-none focus:border-primary appearance-none cursor-pointer">
            <option value="newest">Sắp xếp : Mới nhất</option>
            <option value="oldest">Sắp xếp : Cũ nhất</option>
            <option value="name">Sắp xếp : Tên A-Z</option>
          </select>
          <ChevronDown className="h-4 w-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      {/* Dialogs */}
      {createOpen && <CreateFolderDialog onClose={() => setCreateOpen(false)} />}
      {editing && <CreateFolderDialog folder={editing} onClose={() => setEditing(null)} />}
      {deleting && <DeleteFolderDialog folder={deleting} onClose={() => setDeleting(null)} />}
      <UploadDocumentDialog open={uploadOpen} onOpenChange={setUploadOpen} />
    </div>
  );
}

// Dialog tạo / đổi tên thư mục — bám mockup "Tạo Thư Mục Mới"
function CreateFolderDialog({ folder, onClose }: { folder?: Folder; onClose: () => void }) {
  const create = useCreateFolder();
  const update = useUpdateFolder();
  const [name, setName] = useState(folder?.name ?? "");
  const isEdit = !!folder;

  const onSubmit = async () => {
    if (!name.trim()) return toast.error("Vui lòng nhập tên thư mục");
    try {
      if (isEdit) await update.mutateAsync({ id: folder!.id, name: name.trim() });
      else await create.mutateAsync({ name: name.trim() });
      toast.success(isEdit ? "Đã đổi tên" : "Đã tạo thư mục");
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Thao tác thất bại");
    }
  };

  const pending = create.isPending || update.isPending;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-[400px] shadow-2xl">
        <div className="flex items-center gap-2 mb-5">
          <FolderPlus className="h-5 w-5 text-primary" />
          <h3 className="font-display font-bold text-[18px]">{isEdit ? "Đổi tên thư mục" : "Tạo Thư Mục Mới"}</h3>
        </div>
        <label className="block text-[13px] font-medium mb-1.5">Tên thư mục</label>
        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSubmit()}
          placeholder="eg: Môn học, bài tập,..."
          className="w-full h-11 rounded-xl border border-input px-3.5 text-[14px] outline-none focus:border-primary"
        />
        <div className="flex justify-end items-center gap-3 mt-6">
          <button type="button" onClick={onClose} className="px-5 py-2 rounded-lg border border-border text-[14px] font-medium hover:bg-secondary/60">Hủy</button>
          <button type="button" onClick={onSubmit} disabled={pending}
            className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-[14px] font-semibold hover:opacity-90 disabled:opacity-60">
            {pending ? "Đang lưu..." : isEdit ? "Lưu" : "Tạo"}
          </button>
        </div>
      </div>
    </div>
  );
}

function DeleteFolderDialog({ folder, onClose }: { folder: Folder; onClose: () => void }) {
  const del = useDeleteFolder();
  const onConfirm = async () => {
    try {
      await del.mutateAsync(folder.id);
      toast.success("Đã xóa thư mục");
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Xóa thất bại");
    }
  };
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-[380px] shadow-2xl">
        <h3 className="font-display font-bold text-[18px] mb-2">Xóa thư mục?</h3>
        <p className="text-[14px] text-muted-foreground mb-6">
          Thư mục “{folder.name}” sẽ được chuyển vào thùng rác.
        </p>
        <div className="flex justify-end items-center gap-3">
          <button type="button" onClick={onClose} className="px-5 py-2 rounded-lg border border-border text-[14px] font-medium hover:bg-secondary/60">Hủy</button>
          <button type="button" onClick={onConfirm} disabled={del.isPending}
            className="px-5 py-2 rounded-lg bg-destructive text-white text-[14px] font-semibold hover:opacity-90 disabled:opacity-60">
            {del.isPending ? "Đang xóa..." : "Xóa"}
          </button>
        </div>
      </div>
    </div>
  );
}
