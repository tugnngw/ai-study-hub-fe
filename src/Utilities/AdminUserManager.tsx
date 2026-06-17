import React, { useState } from 'react';

// Định nghĩa kiểu dữ liệu nghiêm ngặt cho các màn hình điều hướng trong hệ thống
type AdminPage = 'adminDashboard' | 'adminUserManager' | 'adminFileManager' | 'adminHistoryApproval' | 'adminTrashManager' | 'welcome';

interface AdminUserManagerProps {
  onNavigate: (page: AdminPage) => void;
}

// Định nghĩa kiểu dữ liệu cho trạng thái tài khoản người dùng
type UserStatusType = 'Hoạt động' | 'Khóa';

// Định nghĩa cấu trúc kiểu dữ liệu cho từng người dùng hệ thống
interface UserItem {
  id: number;
  name: string;
  email: string;
  status: UserStatusType;
}

const AdminUserManager: React.FC<AdminUserManagerProps> = ({ onNavigate }) => {
  // Dữ liệu mẫu danh sách người dùng hệ thống kèm định kiểu dữ liệu mảng UserItem[]
  const [users, setUsers] = useState<UserItem[]>([
    { id: 1, name: "Nguyễn Văn A", email: "vana@student.edu.vn", status: "Hoạt động" },
    { id: 2, name: "Trần Thị B", email: "thib@student.edu.vn", status: "Hoạt động" },
    { id: 3, name: "Lê Văn C", email: "vanlec@student.edu.vn", status: "Khóa" },
    { id: 4, name: "Phạm Thị D", email: "phamD@student.edu.vn", status: "Hoạt động" },
    { id: 5, name: "Hoàng Văn E", email: "Ehoang@student.edu.vn", status: "Hoạt động" },
  ]);

  // Trạng thái bật/tắt hành động nhanh kèm định kiểu union number | null
  const [activeActionId, setActiveActionId] = useState<number | null>(null);

  // Thay đổi trạng thái khóa/mở khóa tài khoản nhanh trên Front-End
  const toggleUserStatus = (id: number): void => {
    setUsers(users.map(user => {
      if (user.id === id) {
        return { ...user, status: user.status === 'Hoạt động' ? 'Khóa' : 'Hoạt động' };
      }
      return user;
    }));
  };

  // Xóa tài khoản khỏi danh sách hiển thị
  const handleDeleteUser = (id: number): void => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa tài khoản này không?");
    if (confirmDelete) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

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
            
            {/* Tab Quản lý Users đang Active */}
            <button className="w-full h-[48px] bg-white/10 rounded-[16px] flex items-center gap-3 px-4 text-[18px] font-semibold text-white cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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
            <input type="text" placeholder="Tìm kiếm người dùng..." className="w-full h-full bg-transparent outline-none font-semibold text-black placeholder-black/40 text-[16px]" />
          </div>
          <span className="text-[20px] font-bold text-black tracking-tight">AI STUDY HUB</span>
        </header>

        {/* WORKSPACE MAIN TABLE */}
        <main className="flex-1 p-8 flex flex-col justify-between">
          <div className="w-full bg-white border border-black/10 rounded-[15px] shadow-sm overflow-visible">
            <div className="h-[69px] border-b border-black/10 flex items-center px-6">
              <h2 className="text-[24px] font-bold text-black">Quản lý Users</h2>
            </div>

            <div className="w-full">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100/60 h-[69px] text-[18px] md:text-[20px] font-bold text-black/60 border-b border-black/10">
                    <th className="px-6 w-[30%]">Tên</th>
                    <th className="px-6 w-[35%]">Email</th>
                    <th className="px-6 w-[20%] text-center">Trạng Thái</th>
                    <th className="px-6 w-[15%] text-center">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="h-[69px] border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 text-[18px] font-semibold text-black flex items-center gap-2 h-[69px]">
                        👤 <span className="truncate max-w-[180px]">{user.name}</span>
                      </td>
                      <td className="px-6 text-[18px] font-semibold text-black/60">{user.email}</td>
                      <td className="px-6 text-center">
                        <span className={`inline-block w-[110px] py-1 text-center font-semibold text-[14px] rounded-[8px] ${user.status === 'Hoạt động' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                          {user.status}
                        </span>
                      </td>
                      
                      {/* Cụm nút hành động phẳng đồng bộ */}
                      <td className="px-6">
                        <div className="flex justify-center gap-3">
                          {/* Nút khóa/mở khóa nhanh */}
                          <button 
                            onClick={() => toggleUserStatus(user.id)}
                            className="w-9 h-9 border border-black/10 rounded-[8px] bg-white hover:bg-gray-50 flex items-center justify-center transition-colors cursor-pointer"
                            title={user.status === 'Hoạt động' ? "Khóa tài khoản" : "Mở khóa tài khoản"}
                          >
                            {user.status === 'Hoạt động' ? '🔒' : '🔓'}
                          </button>
                          {/* Nút xóa người dùng */}
                          <button 
                            onClick={() => handleDeleteUser(user.id)}
                            className="w-9 h-9 border border-red-500/10 rounded-[8px] text-red-500 bg-red-500/5 hover:bg-red-500/10 flex items-center justify-center transition-colors cursor-pointer"
                            title="Xóa tài khoản"
                          >
                            🗑️
                          </button>
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
            <button className="px-3 py-1 border rounded-[15px] text-gray-400">◀</button>
            <button className="w-8 h-8 bg-[#8E51FF] text-white rounded-[15px] font-semibold flex items-center justify-center shadow-sm">1</button>
            <button className="px-3 py-1 border rounded-[15px] text-gray-400">▶</button>
          </div>
        </main>
      </div>

    </div>
  );
};

export default AdminUserManager;