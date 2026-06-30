// src/components/app-shell.tsx
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Database,
  User as UserIcon,
  LogOut,
  Trash2,
  Users,
  Cloud,
  Sparkles,
  Crown,
  Receipt,
  Search,
  PanelLeftClose,
  PanelLeft,
  Settings,
  Sun,
  Moon,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useDocuments, useDocument } from "@/lib/queries";
import { useTheme } from "@/lib/theme";
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

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/folders", label: "Thư mục", icon: FolderKanban },
  { to: "/documents", label: "Tài liệu", icon: FileText },
  { to: "/shared", label: "Được chia sẻ", icon: Users },
  { to: "/trash", label: "Thùng rác", icon: Trash2 },
  { to: "/cloud", label: "Lưu trữ Cloud", icon: Cloud },
  { to: "/premium", label: "Nâng cấp Premium", icon: Crown },
  { to: "/transactions", label: "Lịch sử giao dịch", icon: Receipt },
] as const;

function formatBytes(n: number) {
  if (!n) return "0 B";
  if (n < 1024) return `${n} B`;
  if (n < 1024 ** 2) return `${(n / 1024).toFixed(1)} KB`;
  if (n < 1024 ** 3) return `${(n / 1024 ** 2).toFixed(1)} MB`;
  return `${(n / 1024 ** 3).toFixed(2)} GB`;
}

const SIDEBAR_COLLAPSED_KEY = "ai-study-hub:sidebar-collapsed";

function getInitialCollapsed(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === "1";
  } catch {
    return false;
  }
}

export function AppShell({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const search = useRouterState({ select: (s) => s.location.search }) as { docId?: number | string };
  const { data: documents } = useDocuments();
  const [collapsed, setCollapsedState] = useState(getInitialCollapsed);
  const { theme, toggleTheme } = useTheme();

  const setCollapsed = (value: boolean) => {
    setCollapsedState(value);
    try {
      window.localStorage.setItem(SIDEBAR_COLLAPSED_KEY, value ? "1" : "0");
    } catch {
      // ignore quota / SSR errors
    }
  };

  const openDocId = search?.docId ? String(search.docId) : undefined;
  const openDoc = useDocument(openDocId || "");

  const used = documents?.reduce((sum, doc) => sum + (doc.fileSize || 0), 0) || 0;
  const total = 15 * 1024 * 1024 * 1024;
  const pct = Math.min(100, (used / total) * 100);

  const handleLogout = async () => {
    await logout();
    navigate({ to: "/auth/login" });
  };

  const initial = user?.fullName?.[0]?.toUpperCase() ?? "U";

  // Detect if current page is a folder detail (needs full-bleed layout)
  const isFolderDetail = pathname.startsWith("/folders/") || pathname.startsWith("/documents/");

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className={cn(
        "hidden md:flex md:flex-col shrink-0 border-r border-border bg-sidebar/80 backdrop-blur-xl sticky top-0 h-screen transition-all duration-300",
        collapsed ? "md:w-16" : "md:w-64",
      )}>
        {/* Logo area with collapase toggle */}
        <div className={cn("px-5 py-5 border-b border-border flex items-center gap-2", collapsed ? "justify-center px-0" : "")}>
          <Link to="/dashboard" className="flex items-center gap-2.5 group min-w-0">
            <div className="h-9 w-9 rounded-xl bg-gradient-brand flex items-center justify-center shadow-brand group-hover:scale-105 transition-transform shrink-0">
              <Sparkles className="h-4.5 w-4.5 text-white" strokeWidth={2.5} />
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <div className="font-display font-bold text-base leading-tight truncate">AI Study Hub</div>
                <div className="text-[10px] text-muted-foreground tracking-wider uppercase">Learn smarter</div>
              </div>
            )}
          </Link>
          {!collapsed && (
            <button onClick={() => setCollapsed(true)} className="p-1 hover:bg-accent rounded-lg ml-auto shrink-0">
              <PanelLeftClose className="h-4 w-4" />
            </button>
          )}
          {collapsed && (
            <button onClick={() => setCollapsed(false)} className="p-1 hover:bg-accent rounded-lg">
              <PanelLeft className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {!collapsed && (
            <div className="text-[10px] font-semibold tracking-wider text-muted-foreground px-3 pt-2 pb-1.5">WORKSPACE</div>
          )}
          {nav.map((item) => {
            const active = pathname.startsWith(item.to);
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
                <item.icon className={cn("h-4 w-4 shrink-0", active && "drop-shadow-sm")} strokeWidth={active ? 2.5 : 2} />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Storage */}
        {!collapsed && (
          <div className="p-3">
            <div className="rounded-xl border border-sidebar-border bg-card/60 p-3.5 space-y-2.5">
              <div className="flex items-center gap-2">
                <Database className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-semibold">Dung lượng</span>
              </div>
              <Progress value={pct} className="h-1.5" />
              <div className="text-[11px] text-muted-foreground">
                <span className="font-medium text-foreground">{formatBytes(used)}</span> / {formatBytes(total)}
              </div>
            </div>
          </div>
        )}
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

          {/* Mobile sidebar toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex p-1.5 hover:bg-accent rounded-lg"
            title={collapsed ? "Mở rộng sidebar" : "Thu gọn sidebar"}
          >
            <PanelLeft className="h-5 w-5" />
          </button>

          <div className="hidden sm:flex items-center gap-2 flex-1 max-w-md">
            {isFolderDetail && openDoc.data ? (
              <div className="flex items-center gap-2 min-w-0 text-sm font-medium">
                <FileText className="h-4 w-4 text-primary shrink-0" />
                <span className="truncate">{openDoc.data.title}</span>
              </div>
            ) : (
              <div className="relative w-full">
                <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Tìm tài liệu, thư mục…"
                  className="pl-9 h-9 bg-muted/50 border-transparent focus-visible:bg-card focus-visible:border-input"
                />
              </div>
            )}
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="h-9 w-9 flex items-center justify-center hover:bg-accent rounded-full transition-colors"
              title={theme === "dark" ? "Chuyển sang Light Mode" : "Chuyển sang Dark Mode"}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 hover:bg-accent rounded-full pr-3 pl-1 py-1 transition-colors">
                  <div className="h-8 w-8 rounded-full bg-gradient-brand text-white flex items-center justify-center text-sm font-semibold shadow-soft">
                    {initial}
                  </div>
                  <div className="hidden sm:flex flex-col items-start leading-tight">
                    <span className="text-xs font-medium">{user?.fullName ?? "User"}</span>
                    <span className="text-[10px] text-muted-foreground">@{user?.username ?? "user"}</span>
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
                  <Link to="/admin" className="cursor-pointer"><Settings className="h-4 w-4 mr-2" /> Cài đặt</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
                  <LogOut className="h-4 w-4 mr-2" /> Đăng xuất
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Mobile bottom nav */}
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
                    active ? "bg-gradient-brand text-white" : "text-muted-foreground hover:bg-accent",
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
          {isFolderDetail ? (
            children
          ) : (
            <div className="p-6 md:p-8 max-w-7xl mx-auto">{children}</div>
          )}
        </main>
      </div>
    </div>
  );
}
