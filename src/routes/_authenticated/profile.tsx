import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
<<<<<<< HEAD
<<<<<<< HEAD
import { FileText, FolderKanban, Share2, Pencil, Save, X } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
=======
=======
>>>>>>> origin/uichange
import { Pencil, Save, X } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
<<<<<<< HEAD
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
      address: "TP.HCM, Việt Nam",
      birthday: "XX/XX/XXXX",
      course: "K19",
>>>>>>> origin/test/share-document-cloudinary
=======
      address: "TP.HCM, Việt Nam",
      birthday: "XX/XX/XXXX",
      course: "K19",
>>>>>>> origin/uichange
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
<<<<<<< HEAD
<<<<<<< HEAD
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
    <div className="space-y-6 max-w-3xl">
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
=======
=======
>>>>>>> origin/uichange
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
<<<<<<< HEAD
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
                <Input
                  value={form.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  disabled={!editing}
                />
              </div>
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
              <div className="space-y-1.5">
                <Label className="text-muted-foreground">Email</Label>
>>>>>>> origin/test/share-document-cloudinary
=======
              <div className="space-y-1.5">
                <Label className="text-muted-foreground">Email</Label>
>>>>>>> origin/uichange
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  disabled={!editing}
                />
              </div>
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> origin/uichange
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

<<<<<<< HEAD
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
