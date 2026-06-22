import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { toast } from "sonner";
import { Lock, ShieldCheck, Monitor, ChevronRight, X } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useChangePassword } from "@/lib/queries";

export function SettingsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [pwOpen, setPwOpen] = useState(false);
  const initial = (user?.fullName ?? "U")[0]?.toUpperCase();

  const rows = [
    { icon: Lock, title: "Đổi mật khẩu", desc: "Cập nhật mật khẩu để bảo vệ tài khoản bạn", onClick: () => setPwOpen(true) },
    { icon: ShieldCheck, title: "Xác thực 2 lớp", desc: "Thêm vào lớp bảo mật để bảo vệ tài khoản của bạn", badge: "Đã bật" },
    { icon: Monitor, title: "Phiên đăng nhập", desc: "Quản lý các thiết bị đã đăng nhập vào tài khoản" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="font-display font-bold text-[24px]">Cài đặt</h1>

      {/* Thông tin tài khoản */}
      <div className="rounded-2xl border border-border/70 bg-white p-6">
        <h3 className="font-display font-bold text-[15px] mb-4">Thông tin tài khoản</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-gradient-brand text-white flex items-center justify-center text-[16px] font-bold">{initial}</div>
            <div>
              <p className="font-bold text-[15px]">{user?.fullName ?? "—"}</p>
              <p className="text-muted-foreground text-[13px]">{user?.email ?? ""}</p>
              <p className="text-muted-foreground text-[12px]">Thành viên từ {(user as any)?.createdAt?.slice(0, 10) ?? "—"}</p>
            </div>
          </div>
          <button type="button" onClick={() => navigate("/profile")} className="px-4 py-2 rounded-lg border border-border text-[13px] font-medium hover:bg-secondary/60">
            Chỉnh sửa thông tin
          </button>
        </div>
      </div>

      {/* Bảo mật */}
      <div className="rounded-2xl border border-border/70 bg-white p-6">
        <h3 className="font-display font-bold text-[15px] mb-2">Bảo mật</h3>
        <div className="divide-y divide-border/60">
          {rows.map((r) => (
            <button key={r.title} type="button" onClick={r.onClick} className="w-full flex items-center gap-4 py-4 text-left hover:bg-secondary/30 -mx-2 px-2 rounded-lg transition-colors">
              <div className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                <r.icon className="h-4.5 w-4.5 text-foreground/70" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-[14px]">{r.title}</p>
                  {r.badge && <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600 text-[10px] font-semibold">{r.badge}</span>}
                </div>
                <p className="text-muted-foreground text-[12px]">{r.desc}</p>
              </div>
              <ChevronRight className="h-4.5 w-4.5 text-muted-foreground shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {pwOpen && <ChangePasswordDialog onClose={() => setPwOpen(false)} />}
    </div>
  );
}

function ChangePasswordDialog({ onClose }: { onClose: () => void }) {
  const changePw = useChangePassword();
  const [form, setForm] = useState({ current: "", next: "", confirm: "" });
  const set = (k: keyof typeof form, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const onConfirm = async () => {
    if (!form.current || !form.next) return toast.error("Vui lòng nhập đầy đủ mật khẩu");
    if (form.next !== form.confirm) return toast.error("Xác nhận mật khẩu không khớp");
    try {
      await changePw.mutateAsync({ currentPassword: form.current, newPassword: form.next });
      toast.success("Đã đổi mật khẩu");
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Đổi mật khẩu thất bại");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-[420px] shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Lock className="h-6 w-6 text-primary" />
            <h3 className="font-display font-bold text-[20px]">Đổi mật khẩu</h3>
          </div>
          <button type="button" onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
        </div>

        <div className="space-y-4">
          <PwField label="Mật khẩu hiện tại" value={form.current} onChange={(v) => set("current", v)} />
          <PwField label="Mật khẩu mới" value={form.next} onChange={(v) => set("next", v)} />
          <PwField label="Xác nhận mật khẩu mới" value={form.confirm} onChange={(v) => set("confirm", v)} />
        </div>

        <div className="flex justify-end items-center gap-3 mt-6">
          <button type="button" onClick={onClose} className="px-5 py-2 rounded-lg border border-border text-[14px] font-medium hover:bg-secondary/60">Hủy</button>
          <button type="button" onClick={onConfirm} disabled={changePw.isPending} className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-[14px] font-semibold hover:opacity-90 disabled:opacity-60">
            {changePw.isPending ? "Đang xử lý..." : "Xác Nhận"}
          </button>
        </div>
      </div>
    </div>
  );
}

function PwField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-[14px] font-medium mb-1.5">{label}</label>
      <input type="password" value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full h-11 rounded-xl border border-input px-3.5 text-[14px] outline-none focus:border-primary" />
    </div>
  );
}
