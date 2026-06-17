import React from 'react';

// Định nghĩa kiểu dữ liệu nghiêm ngặt cho các màn hình điều hướng trong hệ thống
type AdminPage = 'adminDashboard' | 'adminUserManager' | 'adminFileManager' | 'adminHistoryApproval' | 'adminTrashManager' | 'welcome';

interface AdminHistoryApprovalProps {
  onNavigate: (page: AdminPage) => void;
}

// Cấu trúc kiểu dữ liệu cho từng tài liệu trong lịch sử duyệt
interface ApprovalHistoryItem {
  id: number;
  name: string;
  uploader: string;
  size: string;
  result: 'approved' | 'rejected';
}

const AdminHistoryApproval: React.FC<AdminHistoryApprovalProps> = ({ onNavigate }) => {
  // Dữ liệu mẫu lịch sử duyệt tài liệu kèm định kiểu mảng ApprovalHistoryItem[]
  const historyData: ApprovalHistoryItem[] = [
    { id: 1, name: "Software_Engineering.pdf", uploader: "Nguyễn Văn A", size: "2.4mb", result: "approved" },
    { id: 2, name: "Database_System.pdf", uploader: "Tần Thị B", size: "36mb", result: "rejected" },
    { id: 3, name: "XX.XXX.doc", uploader: "A Thị B", size: "11.2mb", result: "rejected" },
  ];

  return (
    <div className="w-full min-h-screen bg-[#FAFAFA] flex font-sans text-black antialiased relative overflow-hidden">
      
      {/* ==================== 1. SIDEBAR (LeftBar) - Đồng bộ 100% AdminFileManager ==================== */}
      <aside className="w-[240px] bg-[#2431eb]/85 text-white flex flex-col justify-between p-5 shrink-0 min-h-screen">
        <div>
          {/* Khung Thông tin Admin */}
          <div className="flex flex-col items-start gap-2 mb-10 mt-2">
            <div className="w-[52px] h-[52px] bg-white/20 rounded-full flex items-center justify-center border border-white/40 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-[24px] font-bold tracking-tight">Admin</h3>
              <p className="text-[16px] text-white/60">Nguyen Van A</p>
            </div>
          </div>

          {/* Menu Điều hướng Sidebar */}
          <nav className="space-y-3">
            <button onClick={() => onNavigate('adminDashboard')} className="w-full h-[48px] hover:bg-white/5 rounded-[16px] flex items-center gap-3 px-4 text-[18px] font-semibold text-white/60 hover:text-white transition-all cursor-pointer group">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 opacity-60 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
              </svg>
              Dashboard
            </button>
            <button onClick={() => onNavigate('adminUserManager')} className="w-full h-[48px] hover:bg-white/5 rounded-[16px] flex items-center gap-3 px-4 text-[18px] font-semibold text-white/60 hover:text-white transition-all cursor-pointer group">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 opacity-60 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Quản lý Users
            </button>
            <button onClick={() => onNavigate('adminFileManager')} className="w-full h-[48px] hover:bg-white/5 rounded-[16px] flex items-center gap-3 px-4 text-[18px] font-semibold text-white/60 hover:text-white transition-all cursor-pointer group">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 opacity-60 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Quản lý tài liệu
            </button>
            
            {/* Tab Phê duyệt đang Active */}
            <button className="w-full h-[48px] bg-white/10 rounded-[16px] flex items-center gap-3 px-4 text-[18px] font-semibold text-white cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Phê duyệt
            </button>

            <button onClick={() => onNavigate('adminTrashManager')} className="w-full h-[48px] hover:bg-white/5 rounded-[16px] flex items-center gap-3 px-4 text-[18px] font-semibold text-white/60 hover:text-white transition-all cursor-pointer group">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 opacity-60 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Thùng rác
            </button>
          </nav>
        </div>
        <button onClick={() => onNavigate('welcome')} className="w-full h-[48px] hover:bg-white/5 rounded-[16px] flex items-center gap-3 px-4 text-[18px] font-semibold text-white/80 hover:text-white transition-all cursor-pointer mt-auto">
          🚪 Đăng xuất
        </button>
      </aside>

      {/* ==================== CONTENT AREA ==================== */}
      <div className="flex-1 flex flex-col">
        {/* HeadBar - Đồng bộ cấu trúc */}
        <header className="w-full h-[90px] bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm">
          <div className="w-full max-w-[700px] h-[42px] border border-black/10 rounded-[8px] flex items-center px-4 bg-white focus-within:border-blue-500 transition-colors">
            <span className="text-gray-400 mr-2">🔍</span>
            <input type="text" placeholder="Tìm kiếm..." className="w-full h-full bg-transparent outline-none font-semibold text-black placeholder-black/40 text-[16px]" />
          </div>
          <span className="text-[20px] font-bold text-black tracking-tight">AI STUDY HUB</span>
        </header>

        {/* WORKSPACE BẢNG LỊCH SỬ DUYỆT */}
        <main className="flex-1 p-8 flex flex-col justify-between">
          <div className="w-full bg-white border border-black/10 rounded-[15px] shadow-sm overflow-visible">
            <div className="h-[69px] border-b border-black/10 flex items-center px-6">
              <h2 className="text-[24px] font-bold text-black">Lịch sử Phê Duyệt</h2>
            </div>

            <div className="w-full">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100/60 h-[69px] text-[18px] md:text-[20px] font-bold text-black/60 border-b border-black/10">
                    <th className="px-6 w-[35%]">Tên File</th>
                    <th className="px-6 w-[25%]">Người đăng</th>
                    <th className="px-6 w-[20%]">Kích thước</th>
                    <th className="px-6 w-[20%] text-center">Kết quả</th>
                  </tr>
                </thead>
                <tbody>
                  {historyData.map((item) => (
                    <tr key={item.id} className="h-[69px] border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 text-[15px] font-semibold text-black flex items-center gap-2 h-[69px]">
                        📄 <span className="truncate max-w-[200px]">{item.name}</span>
                      </td>
                      <td className="px-6 text-[18px] font-semibold text-black/60">{item.uploader}</td>
                      <td className="px-6 text-[18px] font-semibold text-black/60">{item.size}</td>
                      
                      {/* Cột Kết quả hiển thị Icon Động đồng bộ định dạng */}
                      <td className="px-6">
                        <div className="flex items-center justify-center">
                          {item.result === 'approved' ? (
                            /* Icon Tích Xanh Lục (Check) */
                            <div className="w-9 h-9 border-2 border-[#06FF0B] rounded-md flex items-center justify-center text-[#06FF0B] font-bold shadow-xs">
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          ) : (
                            /* Icon Dấu X Đỏ (Rejected) */
                            <div className="w-9 h-9 border-2 border-[#E81B1E] rounded-md flex items-center justify-center text-[#E81B1E] font-bold shadow-xs">
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Phân trang dưới đáy bảng đồng bộ */}
          <div className="flex justify-center gap-2 pt-4">
            <button className="px-3 py-1 border rounded-[15px] text-gray-400 hover:bg-gray-50 transition-colors cursor-pointer">◀</button>
            <button className="w-8 h-8 bg-[#8E51FF] text-white rounded-[15px] font-semibold flex items-center justify-center shadow-sm">1</button>
            <button className="px-3 py-1 border rounded-[15px] text-gray-400 hover:bg-gray-50 transition-colors cursor-pointer">▶</button>
          </div>
        </main>
      </div>

    </div>
  );
};

export default AdminHistoryApproval;