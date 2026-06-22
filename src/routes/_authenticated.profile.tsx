
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";
import { useDocuments, useFolders, useSharedDocuments, useUpdateProfile } from "@/lib/queries";

export function ProfilePage() {
  const { user, refresh } = useAuth();
  const docs = useDocuments();
  const folders = useFolders();
  const shared = useSharedDocuments();
  const updateProfile = useUpdateProfile();

  const [editing, setEditing] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const [form, setForm] = useState({
    fullName: "", username: "", email: "", address: "", dob: "", course: "",
  });

  // Đồng bộ form với user thật mỗi khi user đổi
  useEffect(() => {
    setForm({
      fullName: user?.fullName ?? "",
      username: user?.username ?? "",
      email: user?.email ?? "",
      address: (user as any)?.address ?? "",
      dob: (user as any)?.dob ?? "",
      course: (user as any)?.course ?? "",
    });
  }, [user]);

  const set = (k: keyof typeof form, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const onSave = async () => {
    try {
      await updateProfile.mutateAsync({
        fullName: form.fullName, email: form.email,
        address: form.address, dob: form.dob, course: form.course,
      });
      await refresh();
      setEditing(false);
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 2500);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Lưu hồ sơ thất bại");
    }
  };

  const onCancel = () => {
    setForm({
      fullName: user?.fullName ?? "", username: user?.username ?? "",
      email: user?.email ?? "", address: (user as any)?.address ?? "",
      dob: (user as any)?.dob ?? "", course: (user as any)?.course ?? "",
    });
    setEditing(false);
  };

  const initial = (user?.fullName ?? "U")[0]?.toUpperCase();
  const stats = [
    { value: docs.data?.length ?? 0, label: "Tài liệu" },
    { value: folders.data?.length ?? 0, label: "Thư mục" },
    { value: shared.data?.length ?? 0, label: "Chia sẻ" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="font-display font-bold text-[24px]">Hồ sơ cá nhân</h1>
        {justSaved ? (
          <span className="px-3 py-1.5 rounded-md bg-emerald-50 text-emerald-600 text-[13px] font-semibold">Đã lưu</span>
        ) : editing ? (
          <div className="flex items-center gap-2">
            <button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg border border-border text-[13px] font-medium hover:bg-secondary/60">Hủy</button>
            <button type="button" onClick={onSave} disabled={updateProfile.isPending} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-[13px] font-semibold hover:opacity-90 disabled:opacity-60">
              {updateProfile.isPending ? "Đang lưu..." : "Lưu"}
            </button>
          </div>
        ) : (
          <button type="button" onClick={() => setEditing(true)} className="px-4 py-2 rounded-lg border border-border text-[13px] font-medium hover:bg-secondary/60">Chỉnh sửa</button>
        )}
      </div>

      {/* Card thông tin */}
      <div className="rounded-2xl border border-border/70 bg-white p-7">
        <div className="flex items-center gap-5 mb-7">
          <div className="relative">
            <div className="h-20 w-20 rounded-full bg-gradient-brand text-white flex items-center justify-center text-[26px] font-bold">{initial}</div>
            {editing && (
              <span className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center text-sm border-2 border-white">+</span>
            )}
          </div>
          <div>
            <h2 className="font-display font-bold text-[24px]">{user?.fullName ?? "—"}</h2>
            <p className="text-muted-foreground text-[14px]">{user?.email ?? ""}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
          <Field label="Họ và tên" value={form.fullName} editing={editing} onChange={(v) => set("fullName", v)} />
          <Field label="Email" value={form.email} editing={editing} onChange={(v) => set("email", v)} />
          <Field label="Tên đăng nhập" value={form.username} editing={false} onChange={(v) => set("username", v)} />
          <Field label="Địa chỉ" value={form.address} editing={editing} onChange={(v) => set("address", v)} placeholder="TP.HCM, Việt Nam" />
          <Field label="Ngày tháng năm sinh" value={form.dob} editing={editing} onChange={(v) => set("dob", v)} placeholder="XX/XX/XXXX" />
          <Field label="Khóa học" value={form.course} editing={editing} onChange={(v) => set("course", v)} placeholder="K19" />
        </div>
      </div>

      {/* Thống kê */}
      <div className="rounded-2xl border border-border/70 bg-white p-6">
        <h3 className="font-display font-bold text-[16px] mb-4">Thống kê tài khoản</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl bg-secondary/60 py-5 text-center">
              <div className="font-display font-bold text-[22px] text-primary">{s.value}</div>
              <div className="text-[12px] text-muted-foreground mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, editing, onChange, placeholder }: {
  label: string; value: string; editing: boolean; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-[13px] text-muted-foreground mb-1.5">{label}</label>
      <input
        value={value}
        readOnly={!editing}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full h-11 rounded-xl border px-3.5 text-[14px] outline-none transition-colors ${
          editing ? "border-input bg-white focus:border-primary" : "border-border/70 bg-secondary/40 text-foreground"
        }`}
      />
    </div>
  );
}
