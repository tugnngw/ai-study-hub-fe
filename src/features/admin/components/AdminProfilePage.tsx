// src/features/admin/components/AdminProfilePage.tsx
// Trang Hồ sơ của chính admin — dựng theo profile.tsx bên user (cùng
// Card/Input/Button), thêm phần đổi mật khẩu. Hiện là UI tĩnh; nối
// API thật khi backend sẵn sàng.

import React, { useMemo, useState } from "react";
import { toast } from "sonner";
import { Pencil, Save, X, ShieldCheck, KeyRound, Lock } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export const AdminProfilePage: React.FC = () => {
  const { user } = useAuth();

  const [editing, setEditing] = useState(false);
  const initialForm = useMemo(
    () => ({
      fullName: user?.fullName ?? "",
      username: user?.username ?? "",
      email: user?.email ?? "",
    }),
    [user]
  );
  const [form, setForm] = useState(initialForm);
  const update = (k: keyof typeof form, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO(backend): gọi accountApi.update(form)
    toast.success("Đã cập nhật hồ sơ");
    setEditing(false);
  };
  const cancel = () => {
    setForm(initialForm);
    setEditing(false);
  };

  // Đổi mật khẩu
  const [pwd, setPwd] = useState({ current: "", next: "", confirm: "" });
  const updatePwd = (k: keyof typeof pwd, v: string) => setPwd((p) => ({ ...p, [k]: v }));
  const changePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pwd.current || !pwd.next) {
      toast.error("Vui lòng nhập đầy đủ mật khẩu");
      return;
    }
    if (pwd.next !== pwd.confirm) {
      toast.error("Mật khẩu xác nhận không khớp");
      return;
    }
    // TODO(backend): gọi accountApi.changePassword(...)
    toast.success("Đã đổi mật khẩu");
    setPwd({ current: "", next: "", confirm: "" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight font-display">Hồ sơ quản trị</h1>
          <p className="text-muted-foreground mt-1 text-sm">Thông tin tài khoản admin của bạn</p>
        </div>
        {!editing && (
          <Button onClick={() => setEditing(true)} variant="outline">
            <Pencil className="h-4 w-4 mr-2" /> Chỉnh sửa
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

      {/* Thông tin tài khoản */}
      <form onSubmit={save}>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Thông tin tài khoản</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-center gap-4 pb-4 border-b border-border">
              <div className="h-16 w-16 rounded-full bg-gradient-brand text-white flex items-center justify-center text-xl font-semibold shadow-soft">
                {form.fullName?.[0]?.toUpperCase() ?? "A"}
              </div>
              <div className="flex-1">
                <div className="font-medium">{form.fullName || "Quản trị viên"}</div>
                <Badge variant="secondary" className="mt-1 gap-1">
                  <ShieldCheck className="h-3 w-3" /> Quản trị viên
                </Badge>
              </div>
              {editing && (
                <Button type="button" variant="outline" size="sm">
                  Đổi ảnh đại diện
                </Button>
              )}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Họ và tên</Label>
                <Input value={form.fullName} onChange={(e) => update("fullName", e.target.value)} disabled={!editing} />
              </div>
              <div className="space-y-2">
                <Label>Tên đăng nhập</Label>
                <Input value={form.username} onChange={(e) => update("username", e.target.value)} disabled={!editing} />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Email</Label>
                <Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} disabled={!editing} />
              </div>
            </div>
          </CardContent>
        </Card>

        {editing && (
          <div className="flex justify-end gap-2 mt-4">
            <Button type="button" variant="outline" onClick={cancel}>
              <X className="h-4 w-4 mr-2" /> Huỷ
            </Button>
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" /> Lưu thay đổi
            </Button>
          </div>
        )}
      </form>

      {/* Đổi mật khẩu */}
      <form onSubmit={changePassword}>
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <KeyRound className="h-4 w-4 text-muted-foreground" /> Bảo mật
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Mật khẩu hiện tại</Label>
              <Input type="password" value={pwd.current} onChange={(e) => updatePwd("current", e.target.value)} placeholder="••••••••" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Mật khẩu mới</Label>
                <Input type="password" value={pwd.next} onChange={(e) => updatePwd("next", e.target.value)} placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <Label>Xác nhận mật khẩu mới</Label>
                <Input type="password" value={pwd.confirm} onChange={(e) => updatePwd("confirm", e.target.value)} placeholder="••••••••" />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" variant="outline">
                <Lock className="h-4 w-4 mr-2" /> Đổi mật khẩu
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
      </div>
    </div>
  );
};
