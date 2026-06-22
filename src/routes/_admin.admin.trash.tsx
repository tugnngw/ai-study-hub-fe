import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import AdminPagination from "@/components/admin/admin-pagination";
import SubTabFilter from "@/components/admin/sub-tab-filter";
import { fileApi, type DeletedFileItem, type DeletedAccountItem } from "@/lib/adminApi";

const PER_PAGE = 5;
const dayColor = (d: number) => (d <= 7 ? "text-red-500" : "text-amber-500");

export const Route = createFileRoute("/_admin/admin/trash")({
  component: AdminTrashManager,
});

function RestoreBtn({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} title="Khôi phục" className="w-8 h-8 rounded-[8px] bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center cursor-pointer">
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v6h6M20 20v-6h-6" /><path strokeLinecap="round" strokeLinejoin="round" d="M20 9a8 8 0 00-14.32-3.36L4 8m0 7a8 8 0 0014.32 3.36L20 16" />
      </svg>
    </button>
  );
}
function DeleteBtn({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} title="Xóa vĩnh viễn" className="w-8 h-8 rounded-[8px] bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center cursor-pointer">
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </button>
  );
}

function AdminTrashManager() {
  const [subTab, setSubTab] = useState<"file" | "account">("file");
  const [delFiles, setDelFiles] = useState<DeletedFileItem[]>([]);
  const [delAccs, setDelAccs] = useState<DeletedAccountItem[]>([]);
  const [page, setPage] = useState(1);

  const activeList = subTab === "file" ? delFiles : delAccs;
  const totalPages = Math.max(1, Math.ceil(activeList.length / PER_PAGE));
  useEffect(() => { if (page > totalPages) setPage(totalPages); }, [page, totalPages]);
  useEffect(() => { setPage(1); }, [subTab]);
  const start = (page - 1) * PER_PAGE;
  const pagedFiles = delFiles.slice(start, start + PER_PAGE);
  const pagedAccs = delAccs.slice(start, start + PER_PAGE);

  const fetchTrash = () => {
    fileApi.getDeletedFiles().then(setDelFiles).catch(() => setDelFiles([]));
    fileApi.getDeletedAccounts().then(setDelAccs).catch(() => setDelAccs([]));
  };
  useEffect(() => { fetchTrash(); }, []);

  const handleAction = async (id: number, type: "file" | "account", action: "restore" | "delete") => {
    if (action === "delete" && !window.confirm("Xóa vĩnh viễn mục này?")) return;
    if (action === "delete") await fileApi.permanentDelete(id, type);
    else await fileApi.restoreItem(id, type);
    fetchTrash();
  };

  return (
    <div className="w-full bg-white border border-gray-100 rounded-[14px] shadow-sm">
      <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-[18px] font-bold">Thùng rác</h2>
        <SubTabFilter tabs={[{ id: "file", label: "File" }, { id: "account", label: "Tài khoản" }]} activeTab={subTab} onChange={setSubTab} />
      </div>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-[14px] font-semibold text-gray-500 border-b border-gray-100">
            <th className="px-6 py-3 w-[32%] font-semibold">{subTab === "file" ? "Tên File" : "Tên Tài Khoản"}</th>
            <th className="px-6 py-3 w-[24%] font-semibold">Ngày xóa</th>
            <th className="px-6 py-3 w-[28%] font-semibold">Thời gian</th>
            <th className="px-6 py-3 w-[16%]"></th>
          </tr>
        </thead>
        <tbody>
          {subTab === "file" ? pagedFiles.map((f) => (
            <tr key={f.id} className="border-b border-gray-50 hover:bg-gray-50/50">
              <td className="px-6 py-4 font-bold text-[13px]">{f.name}</td>
              <td className="px-6 py-4 text-gray-600 text-[14px]">{f.deletedDate}</td>
              <td className={`px-6 py-4 font-semibold text-[14px] ${dayColor(f.remainingDays)}`}>{f.remainingDays} ngày</td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2">
                  <RestoreBtn onClick={() => handleAction(f.id, "file", "restore")} />
                  <DeleteBtn onClick={() => handleAction(f.id, "file", "delete")} />
                </div>
              </td>
            </tr>
          )) : pagedAccs.map((a) => (
            <tr key={a.id} className="border-b border-gray-50 hover:bg-gray-50/50">
              <td className="px-6 py-4 font-bold text-[13px]">{a.name}</td>
              <td className="px-6 py-4 text-gray-600 text-[14px]">{a.deletedDate}</td>
              <td className={`px-6 py-4 font-semibold text-[14px] ${dayColor(a.remainingDays)}`}>{a.remainingDays} ngày</td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2">
                  <RestoreBtn onClick={() => handleAction(a.id, "account", "restore")} />
                  <DeleteBtn onClick={() => handleAction(a.id, "account", "delete")} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AdminPagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      <p className="text-center text-[12px] text-gray-400 pt-4 pb-5 px-6">Lưu ý : Bạn có thể khôi phục hoặc xóa vĩnh viễn các mục trong thùng rác. Các mục sẽ được xóa vĩnh viễn sau 30 ngày.</p>
    </div>
  );
}
