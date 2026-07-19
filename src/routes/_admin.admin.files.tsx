
import { useEffect, useState } from "react";
import AdminPagination from "@/components/admin/admin-pagination";
import { fileApi, type ReportedFileItem } from "@/lib/adminApi";

const PER_PAGE = 5;

export function AdminFileManager() {
  const [files, setFiles] = useState<ReportedFileItem[]>([]);
  const [actId, setActId] = useState<number | null>(null);
  const [selected, setSelected] = useState<ReportedFileItem | null>(null);
  const [decision, setDecision] = useState<"remove" | "reject" | null>(null);
  const [note, setNote] = useState("");
  const [success, setSuccess] = useState(false);
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(files.length / PER_PAGE));
  useEffect(() => { if (page > totalPages) setPage(totalPages); }, [page, totalPages]);
  const pagedFiles = files.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const fetchFiles = () => fileApi.getReportedFiles().then(setFiles).catch(() => setFiles([]));
  useEffect(() => { fetchFiles(); const h = () => setActId(null); document.addEventListener("click", h); return () => document.removeEventListener("click", h); }, []);

  const openModal = (file: ReportedFileItem) => { setSelected(file); setDecision(null); setNote(""); setActId(null); };

  const confirmDecision = async () => {
    if (!selected || !decision) return;
    await fileApi.handleReportDecision(selected.id, decision);
    await fetchFiles();
    setSelected(null);
    setSuccess(true);
  };

  return (
    <>
      <div className="w-full bg-white border border-gray-100 rounded-[14px] shadow-sm">
        <div className="px-6 py-5 border-b border-gray-100"><h2 className="text-[18px] font-bold">Quản lý Tài liệu</h2></div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[14px] font-semibold text-gray-500 border-b border-gray-100">
              <th className="px-6 py-3 w-[34%] font-semibold">Tên File</th>
              <th className="px-6 py-3 w-[24%] font-semibold">Người đăng</th>
              <th className="px-6 py-3 w-[18%] font-semibold">Kích thước</th>
              <th className="px-6 py-3 w-[14%] font-semibold">Báo cáo</th>
              <th className="px-6 py-3 w-[10%]"></th>
            </tr>
          </thead>
          <tbody>
            {pagedFiles.map((file) => (
              <tr key={file.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                <td className="px-6 py-4 font-bold text-[13px]">{file.name}</td>
                <td className="px-6 py-4 text-gray-600 text-[14px]">{file.uploader}</td>
                <td className="px-6 py-4 text-gray-600 text-[14px]">{file.size}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 text-red-500 font-bold text-[14px]">
                    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={2}>
                      <circle cx="12" cy="12" r="9" /><path strokeLinecap="round" d="M12 8v5M12 16h.01" />
                    </svg>
                    {file.reports}
                  </span>
                </td>
                <td className="px-6 py-4 relative text-right">
                  <button type="button" onClick={(e) => { e.stopPropagation(); setActId(actId === file.id ? null : file.id); }} className="w-8 h-8 hover:bg-gray-100 rounded-[8px] text-gray-500 flex items-center justify-center cursor-pointer ml-auto">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><circle cx="12" cy="5" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="12" cy="19" r="1.6" /></svg>
                  </button>
                  {actId === file.id && (
                    <div className="absolute right-6 top-[52px] bg-white border border-gray-200 rounded-[10px] shadow-xl py-1 w-[130px] z-40 text-left">
                      <button type="button" className="w-full px-4 py-2 text-left text-[13px] hover:bg-gray-50 cursor-pointer">Mở</button>
                      <button type="button" onClick={() => openModal(file)} className="w-full px-4 py-2 text-left text-[13px] hover:bg-gray-50 cursor-pointer">Quản lý</button>
                      <button type="button" onClick={() => openModal(file)} className="w-full px-4 py-2 text-left text-[13px] text-red-500 hover:bg-red-50 cursor-pointer">Xóa</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <AdminPagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </div>

      {/* Modal: Báo cáo tài liệu */}
      {selected && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[16px] p-6 w-full max-w-[440px] shadow-2xl">
            <div className="flex items-center gap-2 mb-4">
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-red-500" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
              <h3 className="text-[20px] font-bold">Báo cáo tài liệu</h3>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-[10px] p-3 flex items-center gap-3 mb-4">
              <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-gray-400" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" /><path strokeLinecap="round" strokeLinejoin="round" d="M14 2v6h6" />
              </svg>
              <div>
                <p className="font-bold text-[14px]">{selected.name}</p>
                <p className="text-[12px] text-gray-400">Tải lên bởi {selected.uploader}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[13px] mb-1">
              <span className="text-gray-500">Báo cáo bởi</span>
              <span className="w-5 h-5 rounded-full bg-violet-500 text-white text-[10px] flex items-center justify-center font-bold">{selected.reportedBy.name.charAt(0)}</span>
              <span className="font-semibold">{selected.reportedBy.name}</span>
            </div>
            <p className="text-[12px] text-red-500 font-semibold mb-2">Lý do báo cáo</p>
            <div className="bg-gray-50 border border-gray-100 rounded-[10px] p-3 mb-4">
              <p className="font-bold text-[14px] mb-1">{selected.reportedBy.reason}</p>
              <p className="text-[12px] text-gray-500 leading-relaxed">{selected.reportedBy.detail}</p>
            </div>

            <p className="text-[14px] font-semibold mb-2">Quyết định xử lý <span className="text-red-500">*</span></p>
            <div className="space-y-2 mb-4">
              <button type="button" onClick={() => setDecision("remove")} className={`w-full text-left px-4 py-2.5 rounded-[10px] border transition-colors cursor-pointer ${decision === "remove" ? "border-red-400 bg-red-50" : "border-gray-200 hover:bg-gray-50"}`}>
                <p className="font-semibold text-[14px]">Gỡ tài liệu xuống</p>
                <p className="text-[12px] text-gray-400">Xóa tài liệu và thông báo người tải</p>
              </button>
              <button type="button" onClick={() => setDecision("reject")} className={`w-full text-left px-4 py-2.5 rounded-[10px] border transition-colors cursor-pointer ${decision === "reject" ? "border-violet-400 bg-violet-50" : "border-gray-200 hover:bg-gray-50"}`}>
                <p className="font-semibold text-[14px]">Từ chối báo cáo</p>
                <p className="text-[12px] text-gray-400">Tài liệu không vi phạm</p>
              </button>
            </div>

            <p className="text-[13px] font-semibold text-gray-500 mb-2">GHI CHÚ ( TÙY CHỌN)</p>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Nội dung thông báo gửi tới người báo cáo và người tải..." className="w-full h-[70px] border border-gray-200 rounded-[10px] p-3 text-[13px] outline-none focus:border-violet-400 resize-none mb-4" />

            <div className="flex justify-end items-center gap-3">
              <button type="button" onClick={() => setSelected(null)} className="px-5 py-2 text-gray-500 font-medium text-[14px] cursor-pointer">Hủy</button>
              <button type="button" disabled={!decision} onClick={confirmDecision} className={`px-5 py-2 rounded-[10px] font-semibold text-[14px] ${decision ? "bg-[#5B5BF5] text-white cursor-pointer" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>Xác nhận xử lý</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Đã giải quyết */}
      {success && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[16px] p-7 w-full max-w-[380px] shadow-2xl text-center">
            <div className="flex items-center gap-2 mb-5">
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-red-500" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
              <h3 className="text-[18px] font-bold">Giải quyết báo cáo</h3>
            </div>
            <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
              <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-emerald-500" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h4 className="text-[18px] font-bold mb-1">Đã giải quyết báo cáo</h4>
            <p className="text-[13px] text-gray-400 mb-5">Tài liệu đã được gỡ xuống và người dùng đã được thông báo.</p>
            <button type="button" onClick={() => setSuccess(false)} className="px-6 py-2 bg-[#3B5BF5] text-white rounded-full font-semibold text-[14px] cursor-pointer">Đóng</button>
          </div>
        </div>
      )}
    </>
  );
}
