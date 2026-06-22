import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Shield, KeyRound, Smartphone, Monitor, LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
    device: "Chrome trên Windows",
    location: "Hà Nội, Việt Nam",
    lastActive: "Đang hoạt động",
    current: true,
  },
  {
    id: "2",
    device: "Safari trên iPhone",
    location: "Hà Nội, Việt Nam",
    lastActive: "2 giờ trước",
    current: false,
  },
  {
    id: "3",
    device: "Chrome trên macOS",
    location: "TP.HCM, Việt Nam",
    lastActive: "3 ngày trước",
    current: false,
  },
];

function SettingsPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [twoFA, setTwoFA] = useState(false);
  const [twoFAOpen, setTwoFAOpen] = useState(false);
  const [pwdOpen, setPwdOpen] = useState(false);
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

  const toggle2FA = (v: boolean) => {
    if (v) setTwoFAOpen(true);
    else {
      setTwoFA(false);
      toast.success("Đã tắt xác thực 2 lớp");
    }
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

  const handleLogout = async () => {
    await logout();
    navigate({ to: "/auth/login" });
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Cài đặt & Quyền riêng tư
        </h1>
        <p className="text-muted-foreground mt-1">
          Bảo vệ tài khoản và quản lý các phiên đăng nhập
        </p>
      </div>

      {/* Password */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <KeyRound className="h-4 w-4" /> Mật khẩu
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Cập nhật mật khẩu thường xuyên để giữ an toàn cho tài khoản
          </div>
          <Button variant="outline" onClick={() => setPwdOpen(true)}>
            Đổi mật khẩu
          </Button>
        </CardContent>
      </Card>

      {/* 2FA */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Shield className="h-4 w-4" /> Xác thực 2 lớp
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-sm">
              {twoFA ? "Đang bật" : "Đang tắt"} — bảo vệ tài khoản bằng mã OTP
            </div>
            <div className="text-xs text-muted-foreground">
              Yêu cầu mã từ ứng dụng xác thực mỗi khi đăng nhập
            </div>
          </div>
          <Switch checked={twoFA} onCheckedChange={toggle2FA} />
        </CardContent>
      </Card>

      {/* Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Monitor className="h-4 w-4" /> Phiên đăng nhập
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {sessions.map((s) => (
            <div
              key={s.id}
              className="flex items-center justify-between p-3 rounded-md border border-border"
            >
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-md bg-muted flex items-center justify-center">
                  {s.device.includes("iPhone") ? (
                    <Smartphone className="h-4 w-4" />
                  ) : (
                    <Monitor className="h-4 w-4" />
                  )}
                </div>
                <div>
                  <div className="text-sm font-medium flex items-center gap-2">
                    {s.device}
                    {s.current && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-medium">
                        Hiện tại
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {s.location} • {s.lastActive}
                  </div>
                </div>
              </div>
              {!s.current && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-destructive"
                  onClick={() => revokeSession(s.id)}
                >
                  Đăng xuất
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Sign out */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Đăng xuất tài khoản</CardTitle>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" /> Đăng xuất
          </Button>
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
                onChange={(e) =>
                  setPwd((p) => ({ ...p, next: e.target.value }))
                }
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
            <DialogTitle>Bật xác thực 2 lớp</DialogTitle>
            <DialogDescription>
              Quét mã QR bằng Google Authenticator hoặc Authy
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 py-2">
            <div className="h-44 w-44 bg-gradient-to-br from-muted to-muted/60 border rounded-md flex items-center justify-center text-xs text-muted-foreground">
              QR Code (mock)
            </div>
            <div className="w-full space-y-2">
              <Label>Mã xác thực 6 chữ số</Label>
              <Input placeholder="123456" maxLength={6} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setTwoFAOpen(false)}>
              Huỷ
            </Button>
            <Button onClick={confirm2FA}>Xác nhận</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
