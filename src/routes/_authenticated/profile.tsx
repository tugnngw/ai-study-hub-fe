import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { FileText, FolderKanban, Share2, Pencil, Save, X, Crown } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDocuments, useFolders, useSharedDocuments } from "@/lib/queries";
import { remainingDaysUntil } from "@/features/payment/proration";

export const Route = createFileRoute("/_authenticated/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { user } = useAuth();
  const docs = useDocuments();
  const folders = useFolders();
  const sharedDocs = useSharedDocuments();

  const [editing, setEditing] = useState(false);
  const initialForm = useMemo(
    () => ({
      fullName: user?.fullName ?? "",
      username: user?.username ?? "",
      email: user?.email ?? "",
    }),
    [user],
  );
  const [form, setForm] = useState(initialForm);

  const update = (k: keyof typeof form, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  const planRemainingDays = remainingDaysUntil(user?.planExpiresAt);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Đã cập nhật hồ sơ");
    setEditing(false);
  };

  const cancel = () => {
    setForm(initialForm);
    setEditing(false);
  };

  const stats = [
    {
      label: "Tài liệu",
      value: docs.data?.length ?? 0,
      icon: FileText,
      cls: "text-blue-600 bg-blue-50",
    },
    {
      label: "Thư mục",
      value: folders.data?.length ?? 0,
      icon: FolderKanban,
      cls: "text-violet-600 bg-violet-50",
    },
    {
      label: "Chia sẻ",
      value: sharedDocs.data?.length ?? 0,
      icon: Share2,
      cls: "text-emerald-600 bg-emerald-50",
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Hồ sơ</h1>
          <p className="text-muted-foreground mt-1">
            Thông tin tài khoản và thống kê hoạt động
          </p>
        </div>
        {!editing ? (
          <Button onClick={() => setEditing(true)} variant="outline">
            <Pencil className="h-4 w-4 mr-2" /> Chỉnh sửa
          </Button>
        ) : null}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="flex items-center gap-3 p-4">
              <div
                className={`h-10 w-10 rounded-lg flex items-center justify-center ${s.cls}`}
              >
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-semibold leading-none">
                  {s.value}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {s.label}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Gói hiện tại + hạn dùng */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Crown className="h-4 w-4 text-primary" /> Gói dịch vụ
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-x-10 gap-y-3">
          <div>
            <div className="text-xs text-muted-foreground">Gói hiện tại</div>
            <div className="font-semibold text-lg">
              {String(user?.plan ?? "FREE").toUpperCase()}
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Ngày hết hạn</div>
            <div className="font-semibold">
              {planRemainingDays > 0
                ? new Date(user?.planExpiresAt as string).toLocaleDateString("vi-VN")
                : "Không giới hạn (Free)"}
            </div>
          </div>
          {planRemainingDays > 0 && (
            <div>
              <div className="text-xs text-muted-foreground">Còn lại</div>
              <div className="font-semibold text-primary">
                {planRemainingDays} ngày
              </div>
            </div>
          )}
          <div className="ml-auto">
            <Button asChild variant="outline" size="sm">
              <Link to="/premium">Quản lý gói</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <form onSubmit={save}>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Thông tin tài khoản</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-center gap-4 pb-4 border-b border-border">
              <div className="h-16 w-16 rounded-full bg-violet-200 text-violet-700 flex items-center justify-center text-xl font-semibold">
                {form.fullName?.[0]?.toUpperCase() ?? "U"}
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
                <Input
                  value={form.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  disabled={!editing}
                />
              </div>
              <div className="space-y-2">
                <Label>Tên đăng nhập</Label>
                <Input
                  value={form.username}
                  onChange={(e) => update("username", e.target.value)}
                  disabled={!editing}
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  disabled={!editing}
                />
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
    </div>
  );
}
