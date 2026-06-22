import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import AdminPagination from "@/components/admin/admin-pagination";
import { userApi, type UserItem } from "@/lib/adminApi";

const PER_PAGE = 5;

export const Route = createFileRoute("/_admin/admin/users")({
  component: AdminUserManager,
});

function AdminUserManager() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [page, setPage] = useState(1);

  const fetchUsers = () => userApi.getUsers().then(setUsers).catch(() => setUsers([]));
  useEffect(() => { fetchUsers(); }, []);

  const totalPages = Math.max(1, Math.ceil(users.length / PER_PAGE));
  useEffect(() => { if (page > totalPages) setPage(totalPages); }, [page, totalPages]);
  const pagedUsers = users.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="w-full bg-white border border-gray-100 rounded-[14px] shadow-sm">
      <div className="px-6 py-5 border-b border-gray-100"><h2 className="text-[18px] font-bold">Quản lý Users</h2></div>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-[14px] font-semibold text-gray-500 border-b border-gray-100">
            <th className="px-6 py-3 w-[32%] font-semibold">Tên</th>
            <th className="px-6 py-3 w-[36%] font-semibold">Email</th>
            <th className="px-6 py-3 w-[18%] font-semibold">Trạng Thái</th>
            <th className="px-6 py-3 w-[14%]"></th>
          </tr>
        </thead>
        <tbody>
          {pagedUsers.map((u) => (
            <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
              <td className="px-6 py-4 font-bold text-[14px]">{u.name}</td>
              <td className="px-6 py-4 text-gray-500 text-[14px]">{u.email}</td>
              <td className="px-6 py-4">
                <span className={`inline-block px-3 py-1 text-center font-semibold text-[12px] rounded-full ${u.status === "Hoạt động" ? "bg-emerald-50 text-emerald-500" : "bg-red-50 text-red-400"}`}>{u.status}</span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-3">
                  <button type="button" title={u.status === "Hoạt động" ? "Khóa" : "Mở khóa"} onClick={async () => { await userApi.toggleStatus(u.id); fetchUsers(); }} className="text-gray-400 hover:text-gray-700 cursor-pointer">
                    <svg viewBox="0 0 24 24" fill="none" className="w-[18px] h-[18px]" stroke="currentColor" strokeWidth={2}>
                      <rect x="5" y="11" width="14" height="10" rx="2" /><path strokeLinecap="round" d="M8 11V7a4 4 0 018 0v4" />
                    </svg>
                  </button>
                  <button type="button" title="Xóa" onClick={async () => { if (window.confirm("Xóa thành viên?")) { await userApi.deleteUser(u.id); fetchUsers(); } }} className="w-8 h-8 rounded-[8px] bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center cursor-pointer">
                    <svg viewBox="0 0 24 24" fill="none" className="w-[16px] h-[16px]" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AdminPagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
