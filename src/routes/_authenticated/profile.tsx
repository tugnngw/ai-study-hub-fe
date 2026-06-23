import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Pencil, Save, X } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDocuments, useFolders, useSharedDocuments } from "@/lib/queries";

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
      address: "TP.HCM, Việt Nam",
      birthday: "XX/XX/XXXX",
      course: "K19",
    }),
    [user],
  );
  const [form, setForm] = useState(initialForm);

  const update = (k: keyof typeof form, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

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
    { label: "Tài liệu", value: docs.data?.length ?? 0 },
    { label: "Thư mục", value: folders.data?.length ?? 0 },
    { label: "Chia sẻ", value: sharedDocs.data?.length ?? 0 },
  ];

  const initial = form.fullName?.[0]?.toUpperCase() ?? "U";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold font-display">Hồ sơ cá nhân</h1>
        {!editing ? (
          <Button onClick={() => setEditing(true)} variant="outline" size="sm">
            <Pencil className="h-3.5 w-3.5 mr-2" /> Chỉnh sửa
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button type="button" variant="outline" size="sm" onClick={cancel}>
              <X className="h-3.5 w-3.5 mr-2" /> Huỷ
            </Button>
            <Button type="submit" form="profile-form" size="sm">
              <Save className="h-3.5 w-3.5 mr-2" /> Lưu
            </Button>
          </div>
        )}
      </div>

      {/* Info card */}
      <form id="profile-form" onSubmit={save}>
        <Card className="shadow-soft">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-full bg-gradient-brand text-white flex items-center justify-center text-2xl font-bold shrink-0">
                {initial}
              </div>
              <div className="min-w-0">
                <div className="text-xl font-bold font-display truncate">
                  {form.fullName}
                </div>
                <div className="text-sm text-muted-foreground truncate">
                  {form.email}
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
              <div className="space-y-1.5">
                <Label className="text-muted-foreground">Họ và tên</Label>
                <Input
                  value={form.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  disabled={!editing}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-muted-foreground">Email</Label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  disabled={!editing}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-muted-foreground">Tên đăng nhập</Label>
                <Input
                  value={form.username}
                  onChange={(e) => update("username", e.target.value)}
                  disabled={!editing}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-muted-foreground">Địa chỉ</Label>
                <Input
                  value={form.address}
                  onChange={(e) => update("address", e.target.value)}
                  disabled={!editing}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-muted-foreground">
                  Ngày tháng năm sinh
                </Label>
                <Input
                  value={form.birthday}
                  onChange={(e) => update("birthday", e.target.value)}
                  disabled={!editing}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-muted-foreground">Khóa học</Label>
                <Input
                  value={form.course}
                  onChange={(e) => update("course", e.target.value)}
                  disabled={!editing}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </form>

      {/* Stats card */}
      <Card className="shadow-soft">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-base font-semibold font-display">
            Thống kê tài khoản
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl bg-brand-soft/60 py-5 text-center"
              >
                <div className="text-2xl font-bold text-primary">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

