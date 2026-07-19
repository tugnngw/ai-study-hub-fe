
import { useEffect, useState } from "react";
import AdminPagination from "@/components/admin/admin-pagination";
import { approvalApi, type ApprovalItem } from "@/lib/adminApi";

const PER_PAGE = 5;

export function AdminHistoryApproval() {
  const [list, setList] = useState<ApprovalItem[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => { approvalApi.getPendingList().then(setList).catch(() => setList([])); }, []);

  const totalPages = Math.max(1, Math.ceil(list.length / PER_PAGE));
  useEffect(() => { if (page > totalPages) setPage(totalPages); }, [page, totalPages]);
  const pagedList = list.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="w-full bg-white border border-gray-100 rounded-[14px] shadow-sm">
      <div className="px-6 py-5 border-b border-gray-100"><h2 className="text-[18px] font-bold">Lịch sử Phê Duyệt</h2></div>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-[14px] font-semibold text-gray-500 border-b border-gray-100">
            <th className="px-6 py-3 w-[34%] font-semibold">Tên File</th>
            <th className="px-6 py-3 w-[28%] font-semibold">Người đăng</th>
            <th className="px-6 py-3 w-[24%] font-semibold">Kích thước</th>
            <th className="px-6 py-3 w-[14%] font-semibold">Kết quả</th>
          </tr>
        </thead>
        <tbody>
          {pagedList.map((item) => (
            <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/50">
              <td className="px-6 py-4 font-bold text-[13px]">{item.title}</td>
              <td className="px-6 py-4 text-gray-700 font-semibold text-[14px]">{item.uploader}</td>
              <td className="px-6 py-4 text-gray-700 text-[14px]">{item.size}</td>
              <td className="px-6 py-4">
                {item.result === "approved" ? (
                  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-emerald-500" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-red-500" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AdminPagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
