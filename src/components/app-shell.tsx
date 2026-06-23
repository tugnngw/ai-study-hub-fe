// src/components/app-shell.tsx
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Database,
  User as UserIcon,
  Settings as SettingsIcon,
  LogOut,
  Trash2,
  Users,
  Cloud,
  Sparkles,
  Search,
  Upload,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useDocuments } from "@/lib/queries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { UploadDocumentDialog } from "@/components/upload-document-dialog";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/folders", label: "Thư mục", icon: FolderKanban },
  { to: "/documents", label: "Tài liệu", icon: FileText },
  { to: "/shared", label: "Được chia sẻ", icon: Users },
  { to: "/trash", label: "Thùng rác", icon: Trash2 },
  { to: "/cloud", label: "Cloud", icon: Cloud },
] as const;

function formatBytes(n: number) {
  if (!n) return "0 B";
  if (n < 1024) return `${n} B`;
  if (n < 1024 ** 2) return `${(n / 1024).toFixed(1)} KB`;
  if (n < 1024 ** 3) return `${(n / 1024 ** 2).toFixed(1)} MB`;
  return `${(n / 1024 ** 3).toFixed(2)} GB`;
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { data: documents } = useDocuments();

  // Calculate storage used from actual documents
  const used =
    documents?.reduce((sum, doc) => sum + (doc.fileSize || 0), 0) || 0;
  const total = 1 * 1024 * 1024 * 1024; // 1GB
  const pct = Math.min(100, (used / total) * 100);

  const handleLogout = async () => {
    await logout();
    navigate({ to: "/auth/login" });
  };

  const initial = user?.fullName?.[0]?.toUpperCase() ?? "U";
  const [uploadOpen, setUploadOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "hidden md:flex md:flex-col shrink-0 border-r border-sidebar-border bg-sidebar/80 backdrop-blur-xl sticky top-0 h-screen transition-[width] duration-200",
          collapsed ? "md:w-[68px]" : "md:w-64",
        )}
      >
        <div
          className={cn(
            "px-5 py-5 border-b border-sidebar-border flex items-center",
            collapsed ? "justify-center px-0" : "justify-between",
          )}
        >
          <Link to="/dashboard" className="flex items-center gap-2.5 group">
            <div className="h-9 w-9 rounded-xl bg-gradient-brand flex items-center justify-center shadow-brand group-hover:scale-105 transition-transform shrink-0">
              <Sparkles className="h-4.5 w-4.5 text-white" strokeWidth={2.5} />
            </div>
            {!collapsed && (
              <div>
                <div className="font-display font-bold text-base leading-tight">
                  AI Study Hub
                </div>
                <div className="text-[10px] text-muted-foreground tracking-wider uppercase">
                  Learn smarter
                </div>
              </div>
            )}
          </Link>
          {!collapsed && (
            <button
              type="button"
              onClick={() => setCollapsed(true)}
              className="h-7 w-7 rounded-md hover:bg-sidebar-accent flex items-center justify-center text-muted-foreground shrink-0"
              title="Thu gọn"
            >
              <PanelLeftClose className="h-4 w-4" />
            </button>
          )}
        </div>

        {collapsed && (
          <div className="flex justify-center py-2 border-b border-sidebar-border">
            <button
              type="button"
              onClick={() => setCollapsed(false)}
              className="h-8 w-8 rounded-md hover:bg-sidebar-accent flex items-center justify-center text-muted-foreground"
              title="Mở rộng"
            >
              <PanelLeft className="h-4 w-4" />
            </button>
          </div>
        )}

        <nav className="p-3 space-y-0.5 overflow-y-auto overflow-x-hidden">
          {!collapsed && (
            <div className="text-[10px] font-semibold tracking-wider text-muted-foreground px-3 pt-2 pb-1.5">
              WORKSPACE
            </div>
          )}
          {nav.map((item) => {
            const active = pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                title={collapsed ? item.label : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all group relative",
                  collapsed && "justify-center px-0",
                  active
                    ? "bg-gradient-brand text-white shadow-brand font-medium"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                )}
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

        {/* Storage card */}
        {!collapsed && (
          <div className="px-3 pt-2">
            <div className="rounded-xl border border-sidebar-border bg-card/60 p-3.5 space-y-2.5">
              <div className="flex items-center gap-2">
                <Database className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-semibold">Dung lượng</span>
              </div>
              <Progress value={pct} className="h-1.5" />
              <div className="text-[11px] text-muted-foreground">
                <span className="font-medium text-foreground">
                  {formatBytes(used)}
                </span>{" "}
                / {formatBytes(total)}
              </div>
            </div>
          </div>
        )}

        {/* Spacer pushes upload button to the bottom */}
        <div className="flex-1" />

        {/* Upload button */}
        <div className="p-3">
          <Button
            onClick={() => setUploadOpen(true)}
            title={collapsed ? "Tải lên tài liệu" : undefined}
            className={cn(
              "w-full bg-gradient-brand text-white hover:opacity-90 shadow-brand",
              collapsed ? "justify-center px-0" : "justify-start",
            )}
          >
            <Upload className={cn("h-4 w-4", !collapsed && "mr-2")} />{" "}
            {!collapsed && "Tải lên tài liệu"}
          </Button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top bar */}
        <header className="h-16 border-b border-border/60 bg-background/70 backdrop-blur-xl flex items-center px-4 md:px-6 gap-3 sticky top-0 z-30">
          <Link to="/dashboard" className="md:hidden flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-brand flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
          </Link>

          <div className="hidden sm:flex items-center gap-2 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Tìm tài liệu, thư mục…"
                className="pl-9 h-9 bg-muted/50 border-transparent focus-visible:bg-card focus-visible:border-input"
              />
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 hover:bg-accent rounded-full pr-3 pl-1 py-1 transition-colors">
                  <div className="h-8 w-8 rounded-full bg-gradient-brand text-white flex items-center justify-center text-sm font-semibold shadow-soft">
                    {initial}
                  </div>
                  <div className="hidden sm:flex flex-col items-start leading-tight">
                    <span className="text-xs font-medium">
                      {user?.fullName ?? "User"}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      @{user?.username ?? "user"}
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
                        {user?.fullName}
                      </div>
                      <div className="text-xs text-muted-foreground font-normal truncate">
                        {user?.email}
                      </div>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer">
                    <UserIcon className="h-4 w-4 mr-2" /> Hồ sơ
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="cursor-pointer">
                    <SettingsIcon className="h-4 w-4 mr-2" /> Cài đặt
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

        {/* Mobile nav */}
        <div className="md:hidden border-b border-border bg-card/60 backdrop-blur-md">
          <nav className="flex overflow-x-auto px-2 py-2 gap-1">
            {nav.map((item) => {
              const active = pathname.startsWith(item.to);
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

        <main className="flex-1 min-w-0">
          <div className="p-4 md:p-5 max-w-[1600px] mx-auto">{children}</div>
        </main>
      </div>

      <UploadDocumentDialog open={uploadOpen} onOpenChange={setUploadOpen} />
    </div>
  );
}
