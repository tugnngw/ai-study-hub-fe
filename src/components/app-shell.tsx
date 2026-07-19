<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { Link, useNavigate, useLocation } from "react-router-dom";

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
=======
// src/components/app-shell.tsx
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
=======
// src/components/app-shell.tsx
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
>>>>>>> origin/AI-Study-fix
=======
// src/components/app-shell.tsx
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
>>>>>>> origin/test/share-document-cloudinary
=======
// src/components/app-shell.tsx
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
>>>>>>> origin/uichange
=======
// src/components/app-shell.tsx
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
>>>>>>> origin/admin-added
=======
// src/components/app-shell.tsx
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
>>>>>>> origin/update/feature/share
=======
// src/components/app-shell.tsx
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
>>>>>>> origin/update/feature/AI/Quiz
=======
// src/components/app-shell.tsx
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
>>>>>>> origin/Flashcards-fix
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Database,
  User as UserIcon,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
  Settings as SettingsIcon,
>>>>>>> origin/AI-Study-fix
=======
  Settings as SettingsIcon,
>>>>>>> origin/test/share-document-cloudinary
=======
  Settings as SettingsIcon,
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
  LogOut,
  Trash2,
  Users,
  Cloud,
  Sparkles,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  Search,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
  Upload,
>>>>>>> origin/test/share-document-cloudinary
=======
  Upload,
>>>>>>> origin/uichange
=======
  Crown,
  Receipt,
  Search,
>>>>>>> origin/admin-added
  PanelLeftClose,
  PanelLeft,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useDocuments } from "@/lib/queries";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
  Upload,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useDocuments } from "@/lib/queries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
>>>>>>> origin/AI-Study-fix
=======
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
>>>>>>> origin/test/share-document-cloudinary
=======
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
>>>>>>> origin/uichange
=======
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
>>>>>>> origin/admin-added
=======
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
  Crown,
  Receipt,
  Search,
  PanelLeftClose,
  PanelLeft,
  Settings,
<<<<<<< HEAD
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useDocuments } from "@/lib/queries";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
<<<<<<< HEAD
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
  Sun,
  Moon,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useDocuments, useDocument } from "@/lib/queries";
import { useTheme } from "@/lib/theme";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
>>>>>>> origin/Flashcards-fix
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
  const pathname = useLocation().pathname;
  const docs = useDocuments();
  const [uploadOpen, setUploadOpen] = useState(false);

  const usedBytes = (docs.data ?? []).reduce((s, d) => s + (d.fileSize ?? 0), 0);
  const usedGb = gb(usedBytes);
  const pct = Math.min(100, (usedGb / QUOTA_GB) * 100);

  const handleLogout = async () => {
    await logout();
    navigate("/auth/login");
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
=======
import { cn } from "@/lib/utils";
=======
import { cn } from "@/lib/utils";
import { UploadDocumentDialog } from "@/components/upload-document-dialog";
>>>>>>> origin/AI-Study-fix
=======
import { cn } from "@/lib/utils";
import { UploadDocumentDialog } from "@/components/upload-document-dialog";
>>>>>>> origin/test/share-document-cloudinary
=======
import { cn } from "@/lib/utils";
import { UploadDocumentDialog } from "@/components/upload-document-dialog";
>>>>>>> origin/uichange
=======
import { cn } from "@/lib/utils";
>>>>>>> origin/admin-added
=======
import { cn } from "@/lib/utils";
>>>>>>> origin/update/feature/share
=======
import { cn } from "@/lib/utils";
>>>>>>> origin/update/feature/AI/Quiz
=======
import { cn } from "@/lib/utils";
>>>>>>> origin/Flashcards-fix

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/folders", label: "Thư mục", icon: FolderKanban },
  { to: "/documents", label: "Tài liệu", icon: FileText },
  { to: "/shared", label: "Được chia sẻ", icon: Users },
  { to: "/trash", label: "Thùng rác", icon: Trash2 },
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  { to: "/cloud", label: "Lưu trữ Cloud", icon: Cloud },
=======
  { to: "/cloud", label: "Cloud", icon: Cloud },
>>>>>>> origin/test/share-document-cloudinary
=======
  { to: "/cloud", label: "Cloud", icon: Cloud },
>>>>>>> origin/uichange
=======
  { to: "/cloud", label: "Lưu trữ Cloud", icon: Cloud },
  { to: "/premium", label: "Nâng cấp Premium", icon: Crown },
  { to: "/transactions", label: "Lịch sử giao dịch", icon: Receipt },
>>>>>>> origin/admin-added
=======
  { to: "/cloud", label: "Lưu trữ Cloud", icon: Cloud },
  { to: "/premium", label: "Nâng cấp Premium", icon: Crown },
  { to: "/transactions", label: "Lịch sử giao dịch", icon: Receipt },
>>>>>>> origin/update/feature/share
=======
  { to: "/cloud", label: "Lưu trữ Cloud", icon: Cloud },
  { to: "/premium", label: "Nâng cấp Premium", icon: Crown },
  { to: "/transactions", label: "Lịch sử giao dịch", icon: Receipt },
>>>>>>> origin/update/feature/AI/Quiz
=======
  { to: "/cloud", label: "Lưu trữ Cloud", icon: Cloud },
  { to: "/premium", label: "Nâng cấp Premium", icon: Crown },
  { to: "/transactions", label: "Lịch sử giao dịch", icon: Receipt },
>>>>>>> origin/Flashcards-fix
] as const;

function formatBytes(n: number) {
  if (!n) return "0 B";
  if (n < 1024) return `${n} B`;
  if (n < 1024 ** 2) return `${(n / 1024).toFixed(1)} KB`;
  if (n < 1024 ** 3) return `${(n / 1024 ** 2).toFixed(1)} MB`;
  return `${(n / 1024 ** 3).toFixed(2)} GB`;
}

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
export function AppShell({ children }: { children: ReactNode }) {
=======
export function AppShell({ children }: { children: React.ReactNode }) {
>>>>>>> origin/AI-Study-fix
=======
export function AppShell({ children }: { children: React.ReactNode }) {
>>>>>>> origin/test/share-document-cloudinary
=======
export function AppShell({ children }: { children: React.ReactNode }) {
>>>>>>> origin/uichange
=======
export function AppShell({ children }: { children: ReactNode }) {
>>>>>>> origin/admin-added
=======
export function AppShell({ children }: { children: ReactNode }) {
>>>>>>> origin/update/feature/share
=======
export function AppShell({ children }: { children: ReactNode }) {
>>>>>>> origin/update/feature/AI/Quiz
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { data: documents } = useDocuments();
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
  const [collapsed, setCollapsed] = useState(false);

  const used = documents?.reduce((sum, doc) => sum + (doc.fileSize || 0), 0) || 0;
  const total = 15 * 1024 * 1024 * 1024;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange

  // Calculate storage used from actual documents
  const used =
    documents?.reduce((sum, doc) => sum + (doc.fileSize || 0), 0) || 0;
<<<<<<< HEAD
<<<<<<< HEAD
  const total = 15 * 1024 * 1024 * 1024; // 15GB
>>>>>>> origin/AI-Study-fix
=======
  const total = 1 * 1024 * 1024 * 1024; // 1GB
>>>>>>> origin/test/share-document-cloudinary
=======
  const total = 1 * 1024 * 1024 * 1024; // 1GB
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
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

  const openDocId = search?.docId ? Number(search.docId) : undefined;
  const openDoc = useDocument(openDocId && !isNaN(openDocId) ? openDocId : 0);

  const used = documents?.reduce((sum, doc) => sum + (doc.fileSize || 0), 0) || 0;
  const total = 15 * 1024 * 1024 * 1024;
>>>>>>> origin/Flashcards-fix
  const pct = Math.min(100, (used / total) * 100);

  const handleLogout = async () => {
    await logout();
    navigate({ to: "/auth/login" });
  };

  const initial = user?.fullName?.[0]?.toUpperCase() ?? "U";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

  // Detect if current page is a folder detail (needs full-bleed layout)
  const isFolderDetail = pathname.startsWith("/folders/") || pathname.startsWith("/documents/");
=======
  const [uploadOpen, setUploadOpen] = useState(false);
>>>>>>> origin/AI-Study-fix
=======
  const [uploadOpen, setUploadOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
>>>>>>> origin/test/share-document-cloudinary
=======
  const [uploadOpen, setUploadOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
>>>>>>> origin/uichange
=======

  // Detect if current page is a folder detail (needs full-bleed layout)
  const isFolderDetail = pathname.startsWith("/folders/") || pathname.startsWith("/documents/");
>>>>>>> origin/admin-added
=======

  // Detect if current page is a folder detail (needs full-bleed layout)
  const isFolderDetail = pathname.startsWith("/folders/") || pathname.startsWith("/documents/");
>>>>>>> origin/update/feature/share
=======

  // Detect if current page is a folder detail (needs full-bleed layout)
  const isFolderDetail = pathname.startsWith("/folders/") || pathname.startsWith("/documents/");
>>>>>>> origin/update/feature/AI/Quiz
=======

  // Detect if current page is a folder detail (needs full-bleed layout)
  const isFolderDetail = pathname.startsWith("/folders/") || pathname.startsWith("/documents/");
>>>>>>> origin/Flashcards-fix

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
      <aside className={cn(
        "hidden md:flex md:flex-col shrink-0 border-r border-border bg-sidebar/80 backdrop-blur-xl sticky top-0 h-screen transition-all duration-300",
        collapsed ? "md:w-16" : "md:w-64",
      )}>
        {/* Logo area with collapase toggle */}
        <div className={cn("px-5 py-5 border-b border-border flex items-center gap-2", collapsed ? "justify-center px-0" : "")}>
          <Link to="/dashboard" className="flex items-center gap-2.5 group min-w-0">
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> origin/uichange
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
<<<<<<< HEAD
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
            <div className="h-9 w-9 rounded-xl bg-gradient-brand flex items-center justify-center shadow-brand group-hover:scale-105 transition-transform shrink-0">
              <Sparkles className="h-4.5 w-4.5 text-white" strokeWidth={2.5} />
            </div>
            {!collapsed && (
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
              <div className="min-w-0">
                <div className="font-display font-bold text-base leading-tight truncate">AI Study Hub</div>
                <div className="text-[10px] text-muted-foreground tracking-wider uppercase">Learn smarter</div>
=======
=======
>>>>>>> origin/uichange
              <div>
                <div className="font-display font-bold text-base leading-tight">
                  AI Study Hub
                </div>
                <div className="text-[10px] text-muted-foreground tracking-wider uppercase">
                  Learn smarter
                </div>
<<<<<<< HEAD
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
              <div className="min-w-0">
                <div className="font-display font-bold text-base leading-tight truncate">AI Study Hub</div>
                <div className="text-[10px] text-muted-foreground tracking-wider uppercase">Learn smarter</div>
>>>>>>> origin/admin-added
=======
              <div className="min-w-0">
                <div className="font-display font-bold text-base leading-tight truncate">AI Study Hub</div>
                <div className="text-[10px] text-muted-foreground tracking-wider uppercase">Learn smarter</div>
>>>>>>> origin/update/feature/share
=======
              <div className="min-w-0">
                <div className="font-display font-bold text-base leading-tight truncate">AI Study Hub</div>
                <div className="text-[10px] text-muted-foreground tracking-wider uppercase">Learn smarter</div>
>>>>>>> origin/update/feature/AI/Quiz
=======
              <div className="min-w-0">
                <div className="font-display font-bold text-base leading-tight truncate">AI Study Hub</div>
                <div className="text-[10px] text-muted-foreground tracking-wider uppercase">Learn smarter</div>
>>>>>>> origin/Flashcards-fix
              </div>
            )}
          </Link>
          {!collapsed && (
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
      <aside className="hidden md:flex md:flex-col md:w-64 shrink-0 border-r border-sidebar-border bg-sidebar/80 backdrop-blur-xl sticky top-0 h-screen">
        <div className="px-5 py-5 border-b border-sidebar-border">
          <Link to="/dashboard" className="flex items-center gap-2.5 group">
            <div className="h-9 w-9 rounded-xl bg-gradient-brand flex items-center justify-center shadow-brand group-hover:scale-105 transition-transform">
              <Sparkles className="h-4.5 w-4.5 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <div className="font-display font-bold text-base leading-tight">
                AI Study Hub
              </div>
              <div className="text-[10px] text-muted-foreground tracking-wider uppercase">
                Learn smarter
              </div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          <div className="text-[10px] font-semibold tracking-wider text-muted-foreground px-3 pt-2 pb-1.5">
            WORKSPACE
          </div>
>>>>>>> origin/AI-Study-fix
=======
=======
>>>>>>> origin/uichange
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
<<<<<<< HEAD
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
          {nav.map((item) => {
            const active = pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all group relative",
<<<<<<< HEAD
                  collapsed && "justify-center px-0",
=======
>>>>>>> origin/AI-Study-fix
=======
=======
>>>>>>> origin/uichange
                title={collapsed ? item.label : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all group relative",
                  collapsed && "justify-center px-0",
<<<<<<< HEAD
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all group relative",
                  collapsed && "justify-center px-0",
>>>>>>> origin/admin-added
=======
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all group relative",
                  collapsed && "justify-center px-0",
>>>>>>> origin/update/feature/share
=======
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all group relative",
                  collapsed && "justify-center px-0",
>>>>>>> origin/update/feature/AI/Quiz
=======
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all group relative",
                  collapsed && "justify-center px-0",
>>>>>>> origin/Flashcards-fix
                  active
                    ? "bg-gradient-brand text-white shadow-brand font-medium"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                )}
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
                title={collapsed ? item.label : undefined}
              >
                <item.icon className={cn("h-4 w-4 shrink-0", active && "drop-shadow-sm")} strokeWidth={active ? 2.5 : 2} />
                {!collapsed && <span className="truncate">{item.label}</span>}
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
              >
                <item.icon
                  className={cn("h-4 w-4 shrink-0", active && "drop-shadow-sm")}
                  strokeWidth={active ? 2.5 : 2}
                />
<<<<<<< HEAD
<<<<<<< HEAD
                <span className="truncate">{item.label}</span>
>>>>>>> origin/AI-Study-fix
=======
                {!collapsed && <span className="truncate">{item.label}</span>}
>>>>>>> origin/test/share-document-cloudinary
=======
                {!collapsed && <span className="truncate">{item.label}</span>}
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
              </Link>
            );
          })}
        </nav>

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        {/* Storage */}
        {!collapsed && (
          <div className="p-3">
=======
        {/* Storage card */}
        {!collapsed && (
          <div className="px-3 pt-2">
>>>>>>> origin/test/share-document-cloudinary
=======
        {/* Storage card */}
        {!collapsed && (
          <div className="px-3 pt-2">
>>>>>>> origin/uichange
=======
        {/* Storage */}
        {!collapsed && (
          <div className="p-3">
>>>>>>> origin/admin-added
=======
        {/* Storage */}
        {!collapsed && (
          <div className="p-3">
>>>>>>> origin/update/feature/share
=======
        {/* Storage */}
        {!collapsed && (
          <div className="p-3">
>>>>>>> origin/update/feature/AI/Quiz
=======
        {/* Storage */}
        {!collapsed && (
          <div className="p-3">
>>>>>>> origin/Flashcards-fix
            <div className="rounded-xl border border-sidebar-border bg-card/60 p-3.5 space-y-2.5">
              <div className="flex items-center gap-2">
                <Database className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-semibold">Dung lượng</span>
              </div>
              <Progress value={pct} className="h-1.5" />
              <div className="text-[11px] text-muted-foreground">
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
                <span className="font-medium text-foreground">{formatBytes(used)}</span> / {formatBytes(total)}
=======
=======
>>>>>>> origin/uichange
                <span className="font-medium text-foreground">
                  {formatBytes(used)}
                </span>{" "}
                / {formatBytes(total)}
<<<<<<< HEAD
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
                <span className="font-medium text-foreground">{formatBytes(used)}</span> / {formatBytes(total)}
>>>>>>> origin/admin-added
=======
                <span className="font-medium text-foreground">{formatBytes(used)}</span> / {formatBytes(total)}
>>>>>>> origin/update/feature/share
=======
                <span className="font-medium text-foreground">{formatBytes(used)}</span> / {formatBytes(total)}
>>>>>>> origin/update/feature/AI/Quiz
=======
                <span className="font-medium text-foreground">{formatBytes(used)}</span> / {formatBytes(total)}
>>>>>>> origin/Flashcards-fix
              </div>
            </div>
          </div>
        )}
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
        {/* Upload button */}
        <div className="px-3 pb-1">
          <Button
            onClick={() => setUploadOpen(true)}
            className="w-full justify-start bg-gradient-brand text-white hover:opacity-90 shadow-brand"
          >
            <Upload className="h-4 w-4 mr-2" /> Tải lên tài liệu
          </Button>
        </div>

        {/* Storage card */}
        <div className="p-3">
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
>>>>>>> origin/AI-Study-fix
=======
=======
>>>>>>> origin/uichange

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
<<<<<<< HEAD
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
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

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
          {/* Mobile sidebar toggle */}
          <button onClick={() => setCollapsed(!collapsed)} className="hidden md:flex p-1.5 hover:bg-accent rounded-lg">
            <PanelLeft className="h-5 w-5" />
          </button>

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
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
=======
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
>>>>>>> origin/Flashcards-fix
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 hover:bg-accent rounded-full pr-3 pl-1 py-1 transition-colors">
                  <div className="h-8 w-8 rounded-full bg-gradient-brand text-white flex items-center justify-center text-sm font-semibold shadow-soft">
                    {initial}
                  </div>
                  <div className="hidden sm:flex flex-col items-start leading-tight">
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
                    <span className="text-xs font-medium">{user?.fullName ?? "User"}</span>
                    <span className="text-[10px] text-muted-foreground">@{user?.username ?? "user"}</span>
=======
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
                    <span className="text-xs font-medium">
                      {user?.fullName ?? "User"}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      @{user?.username ?? "user"}
                    </span>
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
                    <span className="text-xs font-medium">{user?.fullName ?? "User"}</span>
                    <span className="text-[10px] text-muted-foreground">@{user?.username ?? "user"}</span>
>>>>>>> origin/admin-added
=======
                    <span className="text-xs font-medium">{user?.fullName ?? "User"}</span>
                    <span className="text-[10px] text-muted-foreground">@{user?.username ?? "user"}</span>
>>>>>>> origin/update/feature/share
=======
                    <span className="text-xs font-medium">{user?.fullName ?? "User"}</span>
                    <span className="text-[10px] text-muted-foreground">@{user?.username ?? "user"}</span>
>>>>>>> origin/update/feature/AI/Quiz
=======
                    <span className="text-xs font-medium">{user?.fullName ?? "User"}</span>
                    <span className="text-[10px] text-muted-foreground">@{user?.username ?? "user"}</span>
>>>>>>> origin/Flashcards-fix
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
                      <div className="font-semibold truncate">{user?.fullName}</div>
                      <div className="text-xs text-muted-foreground font-normal truncate">{user?.email}</div>
=======
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
                      <div className="font-semibold truncate">
                        {user?.fullName}
                      </div>
                      <div className="text-xs text-muted-foreground font-normal truncate">
                        {user?.email}
                      </div>
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
                      <div className="font-semibold truncate">{user?.fullName}</div>
                      <div className="text-xs text-muted-foreground font-normal truncate">{user?.email}</div>
>>>>>>> origin/admin-added
=======
                      <div className="font-semibold truncate">{user?.fullName}</div>
                      <div className="text-xs text-muted-foreground font-normal truncate">{user?.email}</div>
>>>>>>> origin/update/feature/share
=======
                      <div className="font-semibold truncate">{user?.fullName}</div>
                      <div className="text-xs text-muted-foreground font-normal truncate">{user?.email}</div>
>>>>>>> origin/update/feature/AI/Quiz
=======
                      <div className="font-semibold truncate">{user?.fullName}</div>
                      <div className="text-xs text-muted-foreground font-normal truncate">{user?.email}</div>
>>>>>>> origin/Flashcards-fix
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/admin-added
                  <Link to="/profile" className="cursor-pointer"><UserIcon className="h-4 w-4 mr-2" /> Hồ sơ</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
<<<<<<< HEAD
=======
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
                  <Link to="/profile" className="cursor-pointer">
                    <UserIcon className="h-4 w-4 mr-2" /> Hồ sơ
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
<<<<<<< HEAD
<<<<<<< HEAD
                  <Link to="/profile" className="cursor-pointer">
                    <UserIcon className="h-4 w-4 mr-2" /> Hồ sơ
=======
                  <Link to="/settings" className="cursor-pointer">
                    <SettingsIcon className="h-4 w-4 mr-2" /> Cài đặt
>>>>>>> origin/test/share-document-cloudinary
=======
                  <Link to="/settings" className="cursor-pointer">
                    <SettingsIcon className="h-4 w-4 mr-2" /> Cài đặt
>>>>>>> origin/uichange
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
                  <Link to="/profile" className="cursor-pointer"><UserIcon className="h-4 w-4 mr-2" /> Hồ sơ</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/admin" className="cursor-pointer"><Settings className="h-4 w-4 mr-2" /> Cài đặt</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
                  <LogOut className="h-4 w-4 mr-2" /> Đăng xuất
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        {/* Mobile bottom nav */}
        <div className="md:hidden border-b border-border bg-card/60 backdrop-blur-md">
          <nav className="flex overflow-x-auto px-2 py-2 gap-1">
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
        {/* Mobile nav */}
        <div className="md:hidden border-b border-border bg-card/60 backdrop-blur-md">
          <nav className="flex overflow-x-auto px-2 py-2 gap-1">
>>>>>>> origin/AI-Study-fix
=======
        {/* Mobile nav */}
        <div className="md:hidden border-b border-border bg-card/60 backdrop-blur-md">
          <nav className="flex overflow-x-auto px-2 py-2 gap-1">
>>>>>>> origin/test/share-document-cloudinary
=======
        {/* Mobile nav */}
        <div className="md:hidden border-b border-border bg-card/60 backdrop-blur-md">
          <nav className="flex overflow-x-auto px-2 py-2 gap-1">
>>>>>>> origin/uichange
=======
        {/* Mobile bottom nav */}
        <div className="md:hidden border-b border-border bg-card/60 backdrop-blur-md">
          <nav className="flex overflow-x-auto px-2 py-2 gap-1">
>>>>>>> origin/admin-added
=======
        {/* Mobile bottom nav */}
        <div className="md:hidden border-b border-border bg-card/60 backdrop-blur-md">
          <nav className="flex overflow-x-auto px-2 py-2 gap-1">
>>>>>>> origin/update/feature/share
=======
        {/* Mobile bottom nav */}
        <div className="md:hidden border-b border-border bg-card/60 backdrop-blur-md">
          <nav className="flex overflow-x-auto px-2 py-2 gap-1">
>>>>>>> origin/update/feature/AI/Quiz
=======
        {/* Mobile bottom nav */}
        <div className="md:hidden border-b border-border bg-card/60 backdrop-blur-md">
          <nav className="flex overflow-x-auto px-2 py-2 gap-1">
>>>>>>> origin/Flashcards-fix
            {nav.map((item) => {
              const active = pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
                    "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[14px] font-medium transition-colors",
                    active
                      ? "bg-secondary text-primary"
                      : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
                  )}
                >
                  <item.icon className="h-[18px] w-[18px] shrink-0" strokeWidth={active ? 2.4 : 2} />
                  <span className="truncate">{item.label}</span>
=======
                    "flex items-center gap-2 rounded-md px-3 py-1.5 text-xs whitespace-nowrap",
                    active ? "bg-gradient-brand text-white" : "text-muted-foreground hover:bg-accent",
=======
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
                    "flex items-center gap-2 rounded-md px-3 py-1.5 text-xs whitespace-nowrap",
                    active
                      ? "bg-gradient-brand text-white"
                      : "text-muted-foreground hover:bg-accent",
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
                    "flex items-center gap-2 rounded-md px-3 py-1.5 text-xs whitespace-nowrap",
                    active ? "bg-gradient-brand text-white" : "text-muted-foreground hover:bg-accent",
>>>>>>> origin/admin-added
=======
                    "flex items-center gap-2 rounded-md px-3 py-1.5 text-xs whitespace-nowrap",
                    active ? "bg-gradient-brand text-white" : "text-muted-foreground hover:bg-accent",
>>>>>>> origin/update/feature/share
=======
                    "flex items-center gap-2 rounded-md px-3 py-1.5 text-xs whitespace-nowrap",
                    active ? "bg-gradient-brand text-white" : "text-muted-foreground hover:bg-accent",
>>>>>>> origin/update/feature/AI/Quiz
=======
                    "flex items-center gap-2 rounded-md px-3 py-1.5 text-xs whitespace-nowrap",
                    active ? "bg-gradient-brand text-white" : "text-muted-foreground hover:bg-accent",
>>>>>>> origin/Flashcards-fix
                  )}
                >
                  <item.icon className="h-3.5 w-3.5" />
                  {item.label}
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
                </Link>
              );
            })}
          </nav>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

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
=======
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
        </div>

        <main className="flex-1 min-w-0">
          <div className="p-6 md:p-8 max-w-7xl mx-auto">{children}</div>
=======
=======
>>>>>>> origin/uichange
        </div>

        <main className="flex-1 min-w-0">
          <div className="p-4 md:p-5 max-w-[1600px] mx-auto">{children}</div>
<<<<<<< HEAD
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
        </main>
      </div>

      <UploadDocumentDialog open={uploadOpen} onOpenChange={setUploadOpen} />
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
    </div>
  );
}
