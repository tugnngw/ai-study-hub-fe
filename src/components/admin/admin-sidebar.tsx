import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "@/lib/auth";

const items = [
  { to: "/admin/dashboard", label: "Dashboard", icon: (
    <svg viewBox="0 0 24 24" fill="none" className="w-[18px] h-[18px]" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  ) },
  { to: "/admin/users", label: "Quản lý Users", icon: (
    <svg viewBox="0 0 24 24" fill="none" className="w-[18px] h-[18px]" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-1a4 4 0 00-4-4M9 20H4v-1a4 4 0 014-4h2m4-7a3 3 0 11-6 0 3 3 0 016 0zm5 1a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
    </svg>
  ) },
  { to: "/admin/files", label: "Quản lý tài liệu", icon: (
    <svg viewBox="0 0 24 24" fill="none" className="w-[18px] h-[18px]" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 4H7a2 2 0 01-2-2V6a2 2 0 012-2h6l4 4v12a2 2 0 01-2 2z" />
    </svg>
  ) },
  { to: "/admin/approvals", label: "Phê duyệt", icon: (
    <svg viewBox="0 0 24 24" fill="none" className="w-[18px] h-[18px]" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="9" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
    </svg>
  ) },
  { to: "/admin/trash", label: "Thùng rác", icon: (
    <svg viewBox="0 0 24 24" fill="none" className="w-[18px] h-[18px]" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ) },
] as const;

export function AdminSidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try { await logout(); } catch { /* ignore */ }
    navigate("/admin/login");
  };

  return (
    <div className="w-[210px] bg-[#5B5BF5] text-white flex flex-col justify-between py-6 px-4 shrink-0 min-h-screen">
      <div>
        <div className="flex flex-col items-start gap-2 mb-8 px-2">
          <div className="w-[44px] h-[44px] bg-white/20 rounded-full flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div className="leading-tight">
            <h3 className="text-[17px] font-bold">Admin</h3>
            <p className="text-[12px] text-white/60">{user?.fullName ?? user?.username ?? "Quản trị viên"}</p>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive
                  ? "w-full h-[42px] rounded-[10px] flex items-center gap-3 px-3 text-[14px] font-semibold transition-all cursor-pointer select-none bg-white/15 text-white"
                  : "w-full h-[42px] rounded-[10px] flex items-center gap-3 px-3 text-[14px] font-medium transition-all cursor-pointer select-none text-white/70 hover:bg-white/10 hover:text-white"
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={handleLogout}
        className="w-full h-[42px] hover:bg-white/10 rounded-[10px] flex items-center gap-3 px-3 text-[14px] font-medium text-white/80 hover:text-white transition-all cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Đăng xuất
      </button>
    </div>
  );
}
