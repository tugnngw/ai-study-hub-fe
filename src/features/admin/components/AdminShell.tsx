// src/features/admin/components/AdminShell.tsx
// Layout khu quản trị — dựng lại y theo AppShell của user (cùng sidebar
// thu gọn được, cùng top bar + dropdown, cùng design tokens), chỉ thay
// danh sách menu sang các mục admin. Không sửa AppShell gốc.

import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  LayoutDashboard,
  Users,
  FileText,
  ClipboardCheck,
  History,
  Crown,
  ShieldCheck,
  Trash2,
  User as UserIcon,
  LogOut,
  Search,
  PanelLeftClose,
  PanelLeft,
  Sun,
  Moon,
  GraduationCap,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useTheme } from "@/lib/theme";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

// ❌ ĐÃ XÓA item "Thùng rác"
const nav = [
  {
    to: "/admin_panel",
    label: "Dashboard",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    to: "/admin_panel/users",
    label: "Quản lý Users",
    icon: Users,
    exact: false,
  },
  {
    to: "/admin_panel/files",
    label: "Quản lý tài liệu",
    icon: FileText,
    exact: false,
  },
  {
    to: "/admin_panel/approvals",
    label: "Báo cáo file",
    icon: ClipboardCheck,
    exact: false,
  },
  {
    to: "/admin_panel/report_history",
    label: "Lịch sử báo cáo",
    icon: History,
    exact: false,
  },
  { to: "/admin_panel/trash", label: "Thùng rác", icon: Trash2, exact: false },
  { to: "/admin_panel/semesters", label: "Kỳ học & Môn học", icon: GraduationCap, exact: false },
  { to: "/admin_panel/premium", label: "Premium", icon: Crown, exact: false },
  { to: "/admin_panel/profile", label: "Hồ sơ", icon: UserIcon, exact: false },
] as const;

const isActivePath = (pathname: string, to: string, exact: boolean) =>
    exact ? pathname === to || pathname === `${to}/` : pathname.startsWith(to);

export function AdminShell({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate({ to: "/auth/login" });
  };

  const initial = (user?.fullName?.[0] ?? "A").toUpperCase();

  return (
      <div className="min-h-screen flex">
        {/* Sidebar */}
        <aside
            className={cn(
                "hidden md:flex md:flex-col shrink-0 border-r border-border bg-sidebar/80 backdrop-blur-xl sticky top-0 h-screen transition-all duration-300",
                collapsed ? "md:w-16" : "md:w-64",
            )}
        >
          <div
              className={cn(
                  "px-5 py-5 border-b border-border flex items-center gap-2",
                  collapsed ? "justify-center px-0" : "",
              )}
          >
            <Link
                to="/admin_panel"
                className="flex items-center gap-2.5 group min-w-0"
            >
              <div className="h-9 w-9 rounded-xl bg-gradient-brand flex items-center justify-center shadow-brand group-hover:scale-105 transition-transform shrink-0">
                <ShieldCheck
                    className="h-4.5 w-4.5 text-white"
                    strokeWidth={2.5}
                />
              </div>
              {!collapsed && (
                  <div className="min-w-0">
                    <div className="font-display font-bold text-base leading-tight truncate">
                      AI Study Hub
                    </div>
                    <div className="text-[10px] text-muted-foreground tracking-wider uppercase">
                      Quản trị
                    </div>
                  </div>
              )}
            </Link>
            {!collapsed && (
                <button
                    onClick={() => setCollapsed(true)}
                    className="p-1 hover:bg-accent rounded-lg ml-auto shrink-0"
                >
                  <PanelLeftClose className="h-4 w-4" />
                </button>
            )}
            {collapsed && (
                <button
                    onClick={() => setCollapsed(false)}
                    className="p-1 hover:bg-accent rounded-lg"
                >
                  <PanelLeft className="h-4 w-4" />
                </button>
            )}
          </div>

          <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
            {!collapsed && (
                <div className="text-[10px] font-semibold tracking-wider text-muted-foreground px-3 pt-2 pb-1.5">
                  QUẢN TRỊ HỆ THỐNG
                </div>
            )}
            {nav.map((item) => {
              const active = isActivePath(pathname, item.to, item.exact);
              return (
                  <Link
                      key={item.to}
                      to={item.to}
                      className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all group relative",
                          collapsed && "justify-center px-0",
                          active
                              ? "bg-gradient-brand text-white shadow-brand font-medium"
                              : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                      )}
                      title={collapsed ? item.label : undefined}
                  >
                    <item.icon
                        className={cn("h-4 w-4 shrink-0", active && "drop-shadow-sm")}
                        strokeWidth={active ? 2.5 : 2}
                    />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                  </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Top bar */}
          <header className="h-16 border-b border-border/60 bg-background/70 backdrop-blur-xl flex items-center px-4 md:px-6 gap-3 sticky top-0 z-30">
            <Link to="/admin_panel" className="md:hidden flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-brand flex items-center justify-center">
                <ShieldCheck className="h-4 w-4 text-white" />
              </div>
            </Link>

            <button
                onClick={() => setCollapsed(!collapsed)}
                className="hidden md:flex p-1.5 hover:bg-accent rounded-lg"
            >
              <PanelLeft className="h-5 w-5" />
            </button>

            <div className="hidden sm:flex items-center gap-2 flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                    placeholder="Tìm kiếm…"
                    className="pl-9 h-9 bg-muted/50 border-transparent focus-visible:bg-card focus-visible:border-input"
                />
              </div>
            </div>

            <div className="ml-auto flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 hover:bg-accent rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                title={theme === "dark" ? "Chuyển nền sáng" : "Chuyển nền tối"}
                aria-label="Đổi giao diện sáng/tối"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 hover:bg-accent rounded-full pr-3 pl-1 py-1 transition-colors">
                    <div className="h-8 w-8 rounded-full bg-gradient-brand text-white flex items-center justify-center text-sm font-semibold shadow-soft">
                      {initial}
                    </div>
                    <div className="hidden sm:flex flex-col items-start leading-tight">
                    <span className="text-xs font-medium">
                      {user?.fullName ?? "Admin"}
                    </span>
                      <span className="text-[10px] text-muted-foreground">
                      @{user?.username ?? "admin"}
                    </span>
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-60">
                  <DropdownMenuLabel className="pb-2">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-brand text-white flex items-center justify-center font-semibold">
                        {initial}
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold truncate">
                          {user?.fullName ?? "Quản trị viên"}
                        </div>
                        <div className="text-xs text-muted-foreground font-normal truncate">
                          {user?.email ?? "admin"}
                        </div>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/admin_panel/profile" className="cursor-pointer">
                      <UserIcon className="h-4 w-4 mr-2" /> Hồ sơ
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer text-destructive focus:text-destructive"
                  >
                    <LogOut className="h-4 w-4 mr-2" /> Đăng xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Mobile bottom nav - cũng xóa Thùng rác ở đây */}
          <div className="md:hidden border-b border-border bg-card/60 backdrop-blur-md">
            <nav className="flex overflow-x-auto px-2 py-2 gap-1">
              {nav.map((item) => {
                const active = isActivePath(pathname, item.to, item.exact);
                return (
                    <Link
                        key={item.to}
                        to={item.to}
                        className={cn(
                            "flex items-center gap-2 rounded-md px-3 py-1.5 text-xs whitespace-nowrap",
                            active
                                ? "bg-gradient-brand text-white"
                                : "text-muted-foreground hover:bg-accent",
                        )}
                    >
                      <item.icon className="h-3.5 w-3.5" />
                      {item.label}
                    </Link>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <main className="flex-1 min-w-0">
            <div className="p-6 md:p-8">{children}</div>
          </main>
        </div>
      </div>
  );
}