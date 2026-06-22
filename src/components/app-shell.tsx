import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import {
  Home,
  FileText,
  Share2,
  Trash2,
  Cloud,
  Database,
  LogOut,
  Upload,
  User as UserIcon,
  Settings as SettingsIcon,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useDocuments } from "@/lib/queries";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UploadDocumentDialog } from "@/components/upload-document-dialog";

// Sidebar điều hướng — bám sát mockup: nhãn ngắn gọn, icon outline.
const nav = [
  { to: "/dashboard", label: "Trang chủ", icon: Home },
  { to: "/documents", label: "Tài liệu của tôi", icon: FileText },
  { to: "/shared", label: "Chia sẻ", icon: Share2 },
  { to: "/trash", label: "Thùng rác", icon: Trash2 },
  { to: "/cloud", label: "Bộ nhớ", icon: Database },
] as const;

// DB chưa có cột storage quota theo user → hạn mức tạm hardcode (khớp mockup: 15 GB).
const QUOTA_GB = 15;

function gb(bytes: number) {
  return bytes / 1024 ** 3;
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const docs = useDocuments();
  const [uploadOpen, setUploadOpen] = useState(false);

  const usedBytes = (docs.data ?? []).reduce((s, d) => s + (d.fileSize ?? 0), 0);
  const usedGb = gb(usedBytes);
  const pct = Math.min(100, (usedGb / QUOTA_GB) * 100);

  const handleLogout = async () => {
    await logout();
    navigate({ to: "/auth/login" });
  };

  const initial = (user?.fullName ?? user?.username ?? "U")[0]?.toUpperCase();
  const shortName = user?.fullName ?? "Người dùng";

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFE]">
      {/* ── Header full-width trên cùng (chạy ngang qua cả sidebar) ── */}
      <header className="h-16 bg-white border-b border-border/70 flex items-center gap-4 px-5 md:px-7 sticky top-0 z-40">
        <Link to="/dashboard" className="flex items-center gap-2 shrink-0">
          <div className="h-7 w-7 rounded-lg bg-gradient-brand flex items-center justify-center">
            <Cloud className="h-4 w-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-display font-bold text-[15px] tracking-tight">AI Study Hub</span>
        </Link>

        {/* Thanh dung lượng */}
        <div className="hidden sm:flex items-center gap-2.5">
          <Database className="h-4 w-4 text-muted-foreground" />
          <span className="text-[12px] text-muted-foreground font-medium whitespace-nowrap">
            {usedGb.toFixed(1)} GB / {QUOTA_GB} GB
          </span>
          <div className="w-40 h-2 rounded-full bg-secondary overflow-hidden">
            <div className="h-full rounded-full bg-gradient-brand" style={{ width: `${pct}%` }} />
          </div>
        </div>

        {/* Avatar + tên */}
        <div className="ml-auto flex items-center gap-2.5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2.5 hover:bg-secondary/60 rounded-full pl-1 pr-3 py-1 transition-colors">
                <div className="h-8 w-8 rounded-full bg-gradient-brand text-white flex items-center justify-center text-[13px] font-semibold">
                  {initial}
                </div>
                <span className="hidden sm:block text-[13px] font-medium">{shortName}</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60">
              <DropdownMenuLabel className="pb-2">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-brand text-white flex items-center justify-center font-semibold">
                    {initial}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold truncate">{user?.fullName}</div>
                    <div className="text-xs text-muted-foreground font-normal truncate">{user?.email}</div>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="cursor-pointer"><UserIcon className="h-4 w-4 mr-2" /> Hồ sơ</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="cursor-pointer"><SettingsIcon className="h-4 w-4 mr-2" /> Cài đặt & Quyền riêng tư</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
                <LogOut className="h-4 w-4 mr-2" /> Đăng xuất
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* ── Hàng ngang: sidebar | nội dung (đều nằm DƯỚI header) ── */}
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <aside className="hidden md:flex md:flex-col md:w-[230px] shrink-0 bg-white border-r border-border/70 sticky top-16 h-[calc(100vh-4rem)]">
          <nav className="flex-1 px-4 pt-6 space-y-1 overflow-y-auto">
            {nav.map((item) => {
              const active = pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[14px] font-medium transition-colors",
                    active
                      ? "bg-secondary text-primary"
                      : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
                  )}
                >
                  <item.icon className="h-[18px] w-[18px] shrink-0" strokeWidth={active ? 2.4 : 2} />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Tải lên — neo đáy sidebar như mockup */}
          <div className="px-4 pb-6">
            <button
              type="button"
              onClick={() => setUploadOpen(true)}
              className="flex items-center gap-3 text-[14px] font-medium text-muted-foreground hover:text-primary transition-colors px-3.5 py-2.5"
            >
              <Upload className="h-[18px] w-[18px]" /> Tải lên tài liệu
            </button>
          </div>
        </aside>

        {/* Nội dung */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Mobile nav */}
          <div className="md:hidden border-b border-border bg-white">
            <nav className="flex overflow-x-auto px-2 py-2 gap-1">
              {nav.map((item) => {
                const active = pathname.startsWith(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-1.5 text-xs whitespace-nowrap",
                      active ? "bg-secondary text-primary" : "text-muted-foreground hover:bg-secondary/60",
                    )}
                  >
                    <item.icon className="h-3.5 w-3.5" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <main className="flex-1 min-w-0">
            <div className="p-6 md:p-8 max-w-6xl mx-auto">{children}</div>
          </main>
        </div>
      </div>

      <UploadDocumentDialog open={uploadOpen} onOpenChange={setUploadOpen} />
    </div>
  );
}
