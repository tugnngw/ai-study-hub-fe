import React, { useState } from 'react';

// Định nghĩa kiểu dữ liệu cho các màn hình điều hướng trong hệ thống
type AdminPage = 'adminDashboard' | 'adminUserManager' | 'adminFileManager' | 'adminHistoryApproval' | 'adminTrashManager' | 'welcome';

// Định nghĩa kiểu dữ liệu cho danh mục Tab phụ
type SubTabType = 'file' | 'account';

interface AdminTrashManagerProps {
  onNavigate: (page: AdminPage) => void;
}

// Định nghĩa cấu trúc dữ liệu cho File bị xóa
interface DeletedFileItem {
  id: number;
  name: string;
  deletedDate: string;
  remainingDays: number;
}

// Định nghĩa cấu trúc dữ liệu cho Tài khoản bị xóa
interface DeletedAccountItem {
  id: number;
  name: string;
  email: string;
  deletedDate: string;
}

const AdminTrashManager: React.FC<AdminTrashManagerProps> = ({ onNavigate }) => {
  // Quản lý tab phụ (Sub-tab con): 'file' hoặc 'account'
  const [subTab, setSubTab] = useState<SubTabType>('file');

  // Dữ liệu mẫu cho danh sách File bị xóa kèm Type định rõ
  const [deletedFiles, setDeletedFiles] = useState<DeletedFileItem[]>([
    { id: 1, name: "Software_Engineering.pdf", deletedDate: "15/06/2026", remainingDays: 29 },
    { id: 2, name: "Database_Design.xlsx", deletedDate: "14/06/2026", remainingDays: 28 },
  ]);

  // Dữ liệu mẫu cho danh sách Tài khoản bị xóa kèm Type định rõ
  const [deletedAccounts, setDeletedAccounts] = useState<DeletedAccountItem[]>([
    { id: 101, name: "Nguyễn Văn Học Sinh", email: "hocsinh99@student.edu.vn", deletedDate: "10/06/2026" }
  ]);

  // Hàm xử lý xóa vĩnh viễn một mục
  const handlePermanentDelete = (id: number, type: SubTabType): void => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa vĩnh viễn mục này không?");
    if (confirmDelete) {
      if (type === 'file') {
        setDeletedFiles(deletedFiles.filter(item => item.id !== id));
      } else {
        setDeletedAccounts(deletedAccounts.filter(item => item.id !== id));
      }
    }
  };

  // Hàm xử lý khôi phục mục
  const handleRestore = (id: number, type: SubTabType): void => {
    alert("Đã khôi phục thành công mục này!");
    if (type === 'file') {
      setDeletedFiles(deletedFiles.filter(item => item.id !== id));
    } else {
      setDeletedAccounts(deletedAccounts.filter(item => item.id !== id));
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
            
            {/* Tab Thùng rác đang Active */}
            <button className="w-full h-[48px] bg-white/10 rounded-[16px] flex items-center gap-3 px-4 text-[18px] font-semibold text-white cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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
            <input type="text" placeholder="Tìm kiếm mục đã xóa..." className="w-full h-full bg-transparent outline-none font-semibold text-black placeholder-black/40 text-[16px]" />
          </div>
          <span className="text-[20px] font-bold text-black tracking-tight">AI STUDY HUB</span>
        </header>

        {/* WORKSPACE MAIN BANNER */}
        <main className="flex-1 p-8 flex flex-col justify-between">
          <div className="w-full bg-white border border-black/10 rounded-[15px] shadow-sm overflow-visible">
            
            {/* Thanh tiêu đề con kết hợp Sub-tabs chuyển danh mục */}
            <div className="h-[69px] border-b border-black/10 flex items-center justify-between px-6 bg-white">
              <h2 className="text-[24px] font-bold text-black">Thùng rác</h2>
              
              <div className="flex items-center gap-3">
                {/* Nút lọc danh sách File */}
                <button 
                  onClick={() => setSubTab('file')}
                  className={`h-[40px] px-5 font-semibold text-[15px] rounded-[10px] transition-all cursor-pointer ${subTab === 'file' ? 'bg-[#8E51FF] text-white shadow-sm' : 'bg-gray-200/60 text-black/80 hover:bg-gray-200'}`}
                >
                  File
                </button>
                {/* Nút lọc danh sách Tài khoản */}
                <button 
                  onClick={() => setSubTab('account')}
                  className={`h-[40px] px-4 font-semibold text-[15px] rounded-[10px] border transition-all cursor-pointer ${subTab === 'account' ? 'bg-[#8E51FF] text-white shadow-sm' : 'bg-white border-black/10 text-black hover:bg-gray-50'}`}
                >
                  Tài khoản
                </button>
              </div>
            </div>

            {/* BẢNG HIỂN THỊ DỮ LIỆU ĐỘNG */}
            <div className="w-full">
              <table className="w-full text-left border-collapse">
                <thead>
                  {subTab === 'file' ? (
                    <tr className="bg-gray-100/60 h-[69px] text-[18px] md:text-[20px] font-bold text-black/60 border-b border-black/10">
                      <th className="px-6 w-[40%]">Tên File</th>
                      <th className="px-6 w-[25%]">Ngày xóa</th>
                      <th className="px-6 w-[20%]">Thời gian</th>
                      <th className="px-6 w-[15%] text-center">Hành động</th>
                    </tr>
                  ) : (
                    <tr className="bg-gray-100/60 h-[69px] text-[18px] md:text-[20px] font-bold text-black/60 border-b border-black/10">
                      <th className="px-6 w-[35%]">Tên chủ tài khoản</th>
                      <th className="px-6 w-[35%]">Email</th>
                      <th className="px-6 w-[15%]">Ngày xóa</th>
                      <th className="px-6 w-[15%] text-center">Hành động</th>
                    </tr>
                  )}
                </thead>
                <tbody>
                  {subTab === 'file' ? (
                    deletedFiles.map((file) => (
                      <tr key={file.id} className="h-[69px] border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 text-[15px] font-semibold text-black flex items-center gap-2 h-[69px]">
                          📄 <span className="truncate max-w-[200px]">{file.name}</span>
                        </td>
                        <td className="px-6 text-[18px] font-semibold text-black/60">{file.deletedDate}</td>
                        <td className="px-6 text-[18px] font-semibold text-[#FF9500]">Còn {file.remainingDays} ngày</td>
                        <td className="px-6">
                          <div className="flex items-center justify-center gap-3">
                            <button onClick={() => handleRestore(file.id, 'file')} className="w-9 h-9 border border-black/10 rounded-[8px] bg-white hover:bg-gray-50 flex items-center justify-center transition-colors cursor-pointer text-sm" title="Khôi phục file">
                              ↩️
                            </button>
                            <button onClick={() => handlePermanentDelete(file.id, 'file')} className="w-9 h-9 border border-red-500/10 rounded-[8px] text-red-500 bg-red-500/5 hover:bg-red-500/10 flex items-center justify-center transition-colors cursor-pointer text-xs" title="Xóa vĩnh viễn">
                              ❌
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    deletedAccounts.map((acc) => (
                      <tr key={acc.id} className="h-[69px] border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 text-[18px] font-semibold text-black flex items-center gap-2 h-[69px]">
                          👤 <span className="truncate max-w-[200px]">{acc.name}</span>
                        </td>
                        <td className="px-6 text-[18px] font-semibold text-black/60">{acc.email}</td>
                        <td className="px-6 text-[18px] font-semibold text-black/60">{acc.deletedDate}</td>
                        <td className="px-6">
                          <div className="flex items-center justify-center gap-3">
                            <button onClick={() => handleRestore(acc.id, 'account')} className="w-9 h-9 border border-black/10 rounded-[8px] bg-white hover:bg-gray-50 flex items-center justify-center transition-colors cursor-pointer text-sm" title="Khôi phục tài khoản">
                              ↩️
                            </button>
                            <button onClick={() => handlePermanentDelete(acc.id, 'account')} className="w-9 h-9 border border-red-500/10 rounded-[8px] text-red-500 bg-red-500/5 hover:bg-red-500/10 flex items-center justify-center transition-colors cursor-pointer text-xs" title="Xóa vĩnh viễn">
                              ❌
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}

                  {/* Trạng thái trống danh sách */}
                  {((subTab === 'file' && deletedFiles.length === 0) || (subTab === 'account' && deletedAccounts.length === 0)) && (
                    <tr>
                      <td colSpan={4} className="text-center py-8 text-black/40 font-medium text-[16px]">
                        Thùng rác trống rỗng
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Khối phân trang và dòng chú thích lưu ý chân bảng */}
          <div className="flex flex-col items-center gap-4 mt-6">
            <div className="flex justify-center gap-2">
              <button className="px-3 py-1 border rounded-[15px] text-gray-400 hover:bg-gray-50 transition-colors cursor-pointer">◀</button>
              <button className="w-8 h-8 bg-[#8E51FF] text-white rounded-[15px] font-semibold flex items-center justify-center shadow-sm">1</button>
              <button className="px-3 py-1 border rounded-[15px] text-gray-400 hover:bg-gray-50 transition-colors cursor-pointer">▶</button>
            </div>
            <p className="text-[14px] md:text-[16px] text-black/40 font-medium text-center max-w-[900px]">
              Lưu ý : Bạn có thể khôi phục hoặc xóa vĩnh viễn các mục trong thùng rác. Các mục sẽ được xóa vĩnh viễn sau 30 ngày.
            </p>
          </div>

        </main>
      </div>

    </div>
  );
};

export default AdminTrashManager;