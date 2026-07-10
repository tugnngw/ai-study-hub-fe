import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  Shield,
  KeyRound,
  Smartphone,
  Monitor,
  ChevronRight,
  Pencil,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/_authenticated/admin")({
  component: SettingsPage,
});

const MOCK_SESSIONS = [
  {
    id: "1",
    device: "Chrome - Windows 11",
    location: "TP.HCM, Việt Nam",
    lastActive: "Hiện tại",
    current: true,
  },
  {
    id: "2",
    device: "Safari - iPhone 15",
    location: "TP.HCM, Việt Nam",
    lastActive: "2 giờ trước",
    current: false,
  },
  {
    id: "3",
    device: "Firefox - macOS",
    location: "Hà Nội, Việt Nam",
    lastActive: "1 ngày trước",
    current: false,
  },
];

function initials(name?: string) {
  if (!name) return "U";
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(-2)
    .join("")
    .toUpperCase();
}

function SettingsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [twoFA, setTwoFA] = useState(false);
  const [twoFAOpen, setTwoFAOpen] = useState(false);
  const [pwdOpen, setPwdOpen] = useState(false);
  const [sessionsOpen, setSessionsOpen] = useState(false);
  const [sessions, setSessions] = useState(MOCK_SESSIONS);
  const [pwd, setPwd] = useState({ current: "", next: "", confirm: "" });

  const submitPwd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pwd.current || !pwd.next) return toast.error("Vui lòng nhập đầy đủ");
    if (pwd.next.length < 6)
      return toast.error("Mật khẩu mới phải có ít nhất 6 ký tự");
    if (pwd.next !== pwd.confirm)
      return toast.error("Mật khẩu xác nhận không khớp");
    toast.success("Đã đổi mật khẩu");
    setPwd({ current: "", next: "", confirm: "" });
    setPwdOpen(false);
  };

  const confirm2FA = () => {
    setTwoFA(true);
    setTwoFAOpen(false);
    toast.success("Đã bật xác thực 2 lớp");
  };

  const revokeSession = (id: string) => {
    setSessions((s) => s.filter((x) => x.id !== id));
    toast.success("Đã đăng xuất khỏi phiên");
  };

  const revokeAll = () => {
    setSessions((s) => s.filter((x) => x.current));
    toast.success("Đã đăng xuất tất cả thiết bị khác");
  };

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("vi-VN")
    : "—";

  return (
    <div className="space-y-6 max-w-4xl">
      <h1 className="text-2xl font-bold tracking-tight font-display">Cài đặt</h1>

      {/* Thông tin tài khoản */}
      <Card>
        <CardContent className="py-5">
          <h2 className="font-semibold mb-4">Thông tin tài khoản</h2>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <div className="h-14 w-14 rounded-full bg-gradient-brand text-white flex items-center justify-center text-lg font-semibold shrink-0">
                {initials(user?.fullName)}
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-lg truncate">
                  {user?.fullName ?? "Người dùng"}
                </div>
                <div className="text-sm text-muted-foreground truncate">
                  {user?.email ?? ""}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  Thành viên từ {memberSince}
                </div>
              </div>
            </div>
            <Button variant="outline" onClick={() => navigate({ to: "/profile" })}>
              <Pencil className="h-4 w-4 mr-2" /> Chỉnh sửa thông tin
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bảo mật */}
      <Card>
        <CardContent className="py-5">
          <h2 className="font-semibold mb-1">Bảo mật</h2>
          <div className="divide-y divide-border">
            <SettingRow
              icon={<KeyRound className="h-4 w-4" />}
              title="Đổi mật khẩu"
              desc="Cập nhật mật khẩu để bảo vệ tài khoản bạn"
              onClick={() => setPwdOpen(true)}
            />
            <SettingRow
              icon={<Shield className="h-4 w-4" />}
              title="Xác thực 2 lớp"
              desc="Thêm vào lớp bảo mật để bảo vệ tài khoản của bạn"
              badge={twoFA ? "Đang bật" : "Đã tắt"}
              badgeTone={twoFA ? "on" : "off"}
              onClick={() => setTwoFAOpen(true)}
            />
            <SettingRow
              icon={<Monitor className="h-4 w-4" />}
              title="Phiên đăng nhập"
              desc="Quản lý các thiết bị đã đăng nhập vào tài khoản"
              onClick={() => setSessionsOpen(true)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Change password dialog */}
      <Dialog open={pwdOpen} onOpenChange={setPwdOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Đổi mật khẩu</DialogTitle>
            <DialogDescription>
              Nhập mật khẩu hiện tại và mật khẩu mới
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={submitPwd} className="space-y-4">
            <div className="space-y-2">
              <Label>Mật khẩu hiện tại</Label>
              <Input
                type="password"
                value={pwd.current}
                onChange={(e) =>
                  setPwd((p) => ({ ...p, current: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Mật khẩu mới</Label>
              <Input
                type="password"
                value={pwd.next}
                onChange={(e) => setPwd((p) => ({ ...p, next: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Xác nhận mật khẩu</Label>
              <Input
                type="password"
                value={pwd.confirm}
                onChange={(e) =>
                  setPwd((p) => ({ ...p, confirm: e.target.value }))
                }
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setPwdOpen(false)}
              >
                Huỷ
              </Button>
              <Button type="submit">Cập nhật</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* 2FA setup dialog */}
      <Dialog open={twoFAOpen} onOpenChange={setTwoFAOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {twoFA ? "Tắt xác thực 2 lớp" : "Bật xác thực 2 lớp"}
            </DialogTitle>
            <DialogDescription>
              {twoFA
                ? "Tài khoản sẽ không còn yêu cầu mã OTP khi đăng nhập."
                : "Quét mã QR bằng Google Authenticator hoặc Authy"}
            </DialogDescription>
          </DialogHeader>
          {!twoFA && (
            <div className="flex flex-col items-center gap-4 py-2">
              <div className="h-44 w-44 bg-gradient-to-br from-muted to-muted/60 border rounded-md flex items-center justify-center text-xs text-muted-foreground">
                QR Code (mock)
              </div>
              <div className="w-full space-y-2">
                <Label>Mã xác thực 6 chữ số</Label>
                <Input placeholder="123456" maxLength={6} />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setTwoFAOpen(false)}>
              Huỷ
            </Button>
            {twoFA ? (
              <Button
                variant="destructive"
                onClick={() => {
                  setTwoFA(false);
                  setTwoFAOpen(false);
                  toast.success("Đã tắt xác thực 2 lớp");
                }}
              >
                Tắt
              </Button>
            ) : (
              <Button onClick={confirm2FA}>Xác nhận</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Sessions dialog */}
      <Dialog open={sessionsOpen} onOpenChange={setSessionsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Monitor className="h-5 w-5 text-primary" /> Phiên đăng nhập
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            {sessions.map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between gap-3 p-3 rounded-lg border border-border"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-9 w-9 rounded-md bg-muted flex items-center justify-center shrink-0">
                    {s.device.includes("iPhone") ? (
                      <Smartphone className="h-4 w-4" />
                    ) : (
                      <Monitor className="h-4 w-4" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">{s.device}</div>
                    <div className="text-xs text-muted-foreground truncate">
                      {s.location} • {s.lastActive}
                    </div>
                  </div>
                </div>
                {s.current ? (
                  <span className="text-[11px] bg-primary text-white px-2 py-1 rounded-full font-medium shrink-0">
                    Hiện tại
                  </span>
                ) : (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-destructive shrink-0"
                    onClick={() => revokeSession(s.id)}
                  >
                    Đăng xuất
                  </Button>
                )}
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="w-full text-destructive"
              onClick={revokeAll}
            >
              Đăng xuất tất cả thiết bị khác
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function SettingRow({
  icon,
  title,
  desc,
  badge,
  badgeTone,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  badge?: string;
  badgeTone?: "on" | "off";
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 py-4 text-left hover:bg-accent/40 transition-colors -mx-2 px-2 rounded-lg"
    >
      <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground shrink-0">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium flex items-center gap-2">
          {title}
          {badge && (
            <span
              className={
                "text-[10px] px-1.5 py-0.5 rounded font-medium " +
                (badgeTone === "on"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-muted text-muted-foreground")
              }
            >
              {badge}
            </span>
          )}
        </div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
      <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
    </button>
  );
}
