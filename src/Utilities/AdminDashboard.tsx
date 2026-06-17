import React from 'react';

// Định nghĩa kiểu dữ liệu nghiêm ngặt cho các màn hình điều hướng trong hệ thống
type AdminPage = 'adminDashboard' | 'adminUserManager' | 'adminFileManager' | 'adminHistoryApproval' | 'adminTrashManager' | 'welcome';

interface AdminDashboardProps {
  onNavigate: (page: AdminPage) => void;
}

// Cấu trúc kiểu dữ liệu cho từng mục hoạt động gần đây
interface ActivityItem {
  id: number;
  action: string;
  user: string;
  time: string;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const activities: ActivityItem[] = [
    { id: 1, action: "User mới đăng ký", user: "Nguyễn Văn F", time: "5 phút trước" },
    { id: 2, action: "Upload tài liệu", user: "Nguyễn Thị Thị B", time: "5 phút trước" },
    { id: 3, action: "Báo cáo vi phạm", user: "Lê Văn C", time: "5 phút trước" },
    { id: 4, action: "Xóa tài liệu", user: "Admin Accounts", time: "5 phút trước" },
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
            {/* Tab Dashboard đang Active */}
            <button className="w-full h-[48px] bg-white/10 rounded-[16px] flex items-center gap-3 px-4 text-[18px] font-semibold text-white cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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
            <button onClick={() => onNavigate('adminHistoryApproval')} className="w-full h-[48px] hover:bg-white/5 rounded-[16px] flex items-center gap-3 px-4 text-[18px] font-semibold text-white/60 hover:text-white transition-all cursor-pointer group">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 opacity-60 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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

        {/* WORKSPACE MAIN DASHBOARD */}
        <main className="flex-1 p-8 space-y-8">
          {/* Thẻ thống kê Grid 3 cột */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-black/10 rounded-[15px] p-6 flex justify-between items-center shadow-sm">
              <div><p className="text-black/60 font-semibold">Tổng Users</p><h4 className="text-[24px] font-bold mt-1">1,248</h4></div>
              <span className="text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded text-xs font-bold">+12%</span>
            </div>
            <div className="bg-white border border-black/10 rounded-[15px] p-6 flex justify-between items-center shadow-sm">
              <div><p className="text-black/60 font-semibold">Tổng Tài liệu</p><h4 className="text-[24px] font-bold mt-1">15,432</h4></div>
              <span className="text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded text-xs font-bold">+8%</span>
            </div>
            <div className="bg-white border border-black/10 rounded-[15px] p-6 flex justify-between items-center shadow-sm">
              <div><p className="text-black/60 font-semibold">Download</p><h4 className="text-[24px] font-bold mt-1">8,912</h4></div>
              <span className="text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded text-xs font-bold">+23%</span>
            </div>
          </div>

          {/* Khối Hoạt động gần đây */}
          <div className="bg-white border border-black/10 rounded-[15px] p-6 shadow-sm min-h-[400px] flex flex-col justify-between">
            <div>
              <h2 className="text-[24px] font-bold mb-6 text-black">Hoạt động gần đây</h2>
              <div className="flex flex-col">
                {activities.map((item) => (
                  <div key={item.id} className="flex justify-between py-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50/30 px-2 rounded-sm transition-colors">
                    <div>
                      <p className="font-semibold text-black text-[16px]">{item.action}</p>
                      <p className="text-sm text-black/60 font-medium mt-0.5">{item.user}</p>
                    </div>
                    <span className="text-sm text-black/60 font-medium">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Thanh phân trang dưới đáy bảng đồng bộ */}
            <div className="flex justify-center gap-2 pt-4 border-t border-gray-100">
              <button className="px-3 py-1 border rounded-[15px] text-gray-400 hover:bg-gray-50 transition-colors cursor-pointer">◀</button>
              <button className="w-8 h-8 bg-[#8E51FF] text-white rounded-[15px] font-semibold flex items-center justify-center shadow-sm">1</button>
              <button className="px-3 py-1 border rounded-[15px] text-gray-400 hover:bg-gray-50 transition-colors cursor-pointer">▶</button>
            </div>
          </div>
        </main>
      </div>

    </div>
  );
};

export default AdminDashboard;