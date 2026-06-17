import React, { useState, useEffect } from 'react';

// Định nghĩa kiểu dữ liệu nghiêm ngặt cho các màn hình điều hướng trong hệ thống
type AdminPage = 'adminDashboard' | 'adminUserManager' | 'adminFileManager' | 'adminHistoryApproval' | 'adminTrashManager' | 'welcome';

interface AdminFileManagerProps {
  onNavigate: (page: AdminPage) => void;
}

// Cấu trúc kiểu dữ liệu cho từng tài liệu bị báo cáo
interface ReportedFileItem {
  id: number;
  name: string;
  uploader: string;
  size: string;
  reports: number;
}

// Kiểu dữ liệu cho quyết định xử lý báo cáo
type HandlingDecisionType = 'remove' | 'reject';

const AdminFileManager: React.FC<AdminFileManagerProps> = ({ onNavigate }) => {
  // Dữ liệu mẫu danh sách tài liệu bị báo cáo định kiểu ReportedFileItem
  const [files, setFiles] = useState<ReportedFileItem[]>([
    { id: 1, name: "Software_Engineering.pdf", uploader: "Nguyễn Văn A", size: "2.4mb", reports: 2 },
    { id: 2, name: "Database_System.pdf", uploader: "Trần Thị B", size: "36mb", reports: 1 },
    { id: 3, name: "XXX_XX.docx", uploader: "A Thị B", size: "11.2mb", reports: 4 },
  ]);

  // Quản lý trạng thái các thành phần tương tác UI
  const [activeDropdownId, setActiveDropdownId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<ReportedFileItem | null>(null);
  const [handlingDecision, setHandlingDecision] = useState<HandlingDecisionType>('remove');
  const [adminNote, setAdminNote] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);

  // Xử lý đóng Dropdown khi click ra ngoài màn hình
  useEffect(() => {
    const handleClickOutside = () => setActiveDropdownId(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const toggleDropdown = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveDropdownId(activeDropdownId === id ? null : id);
  };

  const openManageModal = (file: ReportedFileItem) => {
    setSelectedFile(file);
    setIsModalOpen(true);
    setActiveDropdownId(null); 
  };

  const closeManageModal = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
    setAdminNote('');
  };

  // Xác nhận hành động từ Modal Popup
  const handleConfirmDecision = () => {
    if (handlingDecision === 'remove' && selectedFile) {
      // Xóa tạm thời file khỏi danh sách hiển thị trên Front-End
      setFiles(files.filter(f => f.id !== selectedFile.id));
    }
    
    setIsModalOpen(false); // Đóng Modal
    setShowToast(true);    // Bật Toast thông báo thành công
    
    // Tự động ẩn Toast sau 3 giây
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <div className="w-full min-h-screen bg-[#FAFAFA] flex font-sans text-black antialiased relative overflow-hidden">
      
      {/* ==================== 1. SIDEBAR (LeftBar) ==================== */}
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
            <button className="w-full h-[48px] bg-white/10 rounded-[16px] flex items-center gap-3 px-4 text-[18px] font-semibold text-white cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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
            <button
             onClick={() => onNavigate('adminTrashManager')}
             className="w-full h-[48px] hover:bg-white/5 rounded-[16px] flex items-center gap-3 px-4 text-[18px] font-semibold text-white/60 hover:text-white transition-all cursor-pointer group">
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
        {/* HeadBar */}
        <header className="w-full h-[90px] bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm">
          <div className="w-full max-w-[700px] h-[42px] border border-black/10 rounded-[8px] flex items-center px-4 bg-white focus-within:border-blue-500 transition-colors">
            <span className="text-gray-400 mr-2">🔍</span>
            <input type="text" placeholder="Tìm kiếm..." className="w-full h-full bg-transparent outline-none font-semibold text-black placeholder-black/40 text-[16px]" />
          </div>
          <span className="text-[20px] font-bold text-black tracking-tight">AI STUDY HUB</span>
        </header>

        {/* WORKSPACE BANNER TABLE */}
        <main className="flex-1 p-8 flex flex-col justify-between">
          <div className="w-full bg-white border border-black/10 rounded-[15px] shadow-sm overflow-visible">
            <div className="h-[69px] border-b border-black/10 flex items-center px-6">
              <h2 className="text-[24px] font-bold text-black">Quản lý Tài liệu</h2>
            </div>

            <div className="w-full">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100/60 h-[69px] text-[18px] md:text-[20px] font-bold text-black/60 border-b border-black/10">
                    <th className="px-6 w-[35%]">Tên File</th>
                    <th className="px-6 w-[25%]">Người đăng</th>
                    <th className="px-6 w-[20%]">Kích thước</th>
                    <th className="px-6 w-[12%] text-center">Báo cáo</th>
                    <th className="px-6 w-[8%] text-center"></th>
                  </tr>
                </thead>
                <tbody>
                  {files.map((file) => (
                    <tr key={file.id} className="h-[69px] border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 text-[15px] font-semibold text-black flex items-center gap-2 h-[69px]">
                        📄 <span className="truncate max-w-[200px]">{file.name}</span>
                      </td>
                      <td className="px-6 text-[18px] font-semibold text-black/60">{file.uploader}</td>
                      <td className="px-6 text-[18px] font-semibold text-black/60">{file.size}</td>
                      
                      {/* Cột số lượt báo cáo vi phạm kèm icon tam giác vàng/đỏ */}
                      <td className="px-6">
                        <div className="flex items-center justify-center gap-1 text-red-500 font-semibold text-[18px]">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          <span>{file.reports}</span>
                        </div>
                      </td>
                      
                      {/* Nút Hành động Ba chấm dọc có Menu thả xuống Dropdown */}
                      <td className="px-6 text-center relative overflow-visible">
                        <button 
                          onClick={(e) => toggleDropdown(file.id, e)}
                          className="w-[36px] h-[36px] bg-gray-200/30 hover:bg-gray-200 rounded-[8px] flex items-center justify-center text-gray-700 font-bold text-lg transition-colors cursor-pointer mx-auto"
                        >
                          ⋮
                        </button>

                        {/* DROPDOWN MENU CHOICE CHUẨN FIGMA */}
                        {activeDropdownId === file.id && (
                          <div className="absolute right-4 top-[55px] w-[110px] bg-white border border-gray-200 rounded-[8px] shadow-xl py-2 z-40">
                            <button className="w-full px-4 py-1.5 text-left text-[15px] text-black hover:bg-gray-100 cursor-pointer">
                              Mở
                            </button>
                            <button 
                              onClick={() => openManageModal(file)}
                              className="w-full px-4 py-1.5 text-left text-[15px] text-black hover:bg-gray-100 cursor-pointer"
                            >
                              Quản lý
                            </button>
                            <button className="w-full px-4 py-1.5 text-left text-[15px] text-[#E81B1E] font-semibold hover:bg-red-50 cursor-pointer border-t border-gray-100 mt-1 pt-1.5">
                              Xóa
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Phân trang dưới đáy bảng */}
          <div className="flex justify-center gap-2 pt-4">
            <button className="px-3 py-1 border rounded-[15px] text-gray-400">◀</button>
            <button className="w-8 h-8 bg-[#8E51FF] text-white rounded-[15px] font-semibold flex items-center justify-center shadow-sm">1</button>
            <button className="px-3 py-1 border rounded-[15px] text-gray-400">▶</button>
          </div>
        </main>
      </div>

      {/* ==================== 2. POPUP MODAL XỬ LÝ BÁO CÁO (ReportFeedBack) ==================== */}
      {isModalOpen && selectedFile && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-[566px] bg-white rounded-[15px] border border-black/20 p-6 md:p-8 shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-150">
            
            {/* Header Tiêu đề */}
            <div className="flex items-center gap-3 text-red-500 border-b border-gray-100 pb-4">
              <span className="text-3xl">⚠️</span>
              <h2 className="text-[32px] font-bold text-black">Báo cáo tài liệu</h2>
            </div>

            {/* Khối File tài liệu gốc (LocalFile) */}
            <div className="w-full bg-gray-100 rounded-[15px] border border-black/10 p-4 flex items-center gap-3">
              <span className="text-3xl">📄</span>
              <div>
                <h4 className="text-[16px] font-bold text-black">{selectedFile.name}</h4>
                <p className="text-[14px] text-black/60">Tải lên bởi {selectedFile.uploader}</p>
              </div>
            </div>

            {/* Chi tiết người gửi báo cáo & Lý do vi phạm */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[14px] text-black">
                <span>Báo cáo bởi:</span>
                <div className="w-6 h-6 bg-[#8E51FF] text-white text-[12px] rounded-full flex items-center justify-center font-bold">A</div>
                <span className="font-medium">Trần Văn A</span>
              </div>
              <div className="w-full border border-black/10 rounded-[15px] p-4 bg-white space-y-1">
                <h5 className="text-[16px] font-bold text-red-500">Lý do báo cáo:</h5>
                <p className="text-[13px] text-black/60 leading-relaxed font-medium">Tài liệu này sao chép nguyên văn từ giáo trình có bản quyền mà không có sự cho phép.</p>
              </div>
            </div>

            {/* Nhóm Radio quyết định xử lý (Choice1) */}
            <div className="space-y-3">
              <label className="text-[16px] font-bold text-black/60 block">Quyết định xử lý *</label>
              <div className="space-y-2">
                <label className={`w-full h-[55px] border rounded-[8px] flex items-center px-4 cursor-pointer transition-all ${handlingDecision === 'remove' ? 'border-blue-500 bg-blue-50/30' : 'border-black/10 bg-white'}`}>
                  <input type="radio" name="decision" checked={handlingDecision === 'remove'} onChange={() => setHandlingDecision('remove')} className="w-4 h-4 text-blue-600 mr-3 cursor-pointer" />
                  <div>
                    <p className="text-[14px] font-bold text-black">Gỡ tài liệu xuống</p>
                    <p className="text-[12px] text-black/60">Xóa tài liệu và thông báo người tải</p>
                  </div>
                </label>
                <label className={`w-full h-[55px] border rounded-[8px] flex items-center px-4 cursor-pointer transition-all ${handlingDecision === 'reject' ? 'border-blue-500 bg-blue-50/30' : 'border-black/10 bg-white'}`}>
                  <input type="radio" name="decision" checked={handlingDecision === 'reject'} onChange={() => setHandlingDecision('reject')} className="w-4 h-4 text-blue-600 mr-3 cursor-pointer" />
                  <div>
                    <p className="text-[14px] font-bold text-black">Từ chối báo cáo</p>
                    <p className="text-[12px] text-black/60">Tài liệu không vi phạm</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Ô nhập Phản hồi phản hồi */}
            <div className="space-y-2">
              <label className="text-[16px] font-bold text-black/60 block">GHI CHÚ (TÙY CHỌN)</label>
              <textarea rows={2} placeholder="Nội dung thông báo gửi tới người báo cáo và người tải...." value={adminNote} onChange={(e) => setAdminNote(e.target.value)} className="w-full border border-black/10 rounded-[15px] p-3 text-[14px] text-black outline-none focus:border-blue-500 bg-white resize-none" />
            </div>

            {/* Nút bấm hành động cuối Modal */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <button onClick={closeManageModal} className="w-full h-[42px] bg-white border border-black/10 hover:bg-gray-50 rounded-[15px] text-[14px] font-bold text-black cursor-pointer">Hủy</button>
              <button onClick={handleConfirmDecision} className="w-full h-[42px] bg-gray-800 text-white hover:bg-black rounded-[15px] text-[14px] font-bold cursor-pointer">Xác nhận xử lý</button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== 3. TOAST THÔNG BÁO THÀNH CÔNG (Sau khi click Xác nhận xử lý) ==================== */}
      {showToast && (
        <div className="fixed top-6 right-6 z-50 bg-white border border-gray-100 rounded-[12px] px-5 py-4 shadow-[0_4px_20px_rgba(0,0,0,0.15)] flex items-center gap-3 animate-in slide-in-from-right duration-200">
          <div className="w-8 h-8 bg-emerald-500/10 rounded-full flex items-center justify-center text-[#14AE5C]">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-[15px] font-bold text-black">Xử lý thành công</span>
            <span className="text-[13px] font-medium text-black/60">Tài liệu đã được gỡ thành công. Đã gửi thông báo tới người dùng</span>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminFileManager;