import React, { useEffect, useState } from 'react';
import AdminSidebar from '../components/AdminSideBar';
import AdminHeader from '../components/AdminHeader';
import ToggleSwitch from '../components/ToggleSwitch';
import ChangePasswordDialog from '../components/ChangePasswordDialog';
import ConfirmDeleteDialog from '../components/ConfirmDeleteDialog';
import { authApi, LoginSession } from '../api/authApi';
import { AllPages } from '../App';
import { KeyRound, Laptop, LogOut, Monitor, Shield, Smartphone } from 'lucide-react';

const AdminSettings: React.FC<{ onNavigate: (page: AllPages) => void }> = ({ onNavigate }) => {
  const [sessions, setSessions] = useState<LoginSession[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [twoFA, setTwoFA] = useState(false);
  const [togglingTwoFA, setTogglingTwoFA] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [revokingId, setRevokingId] = useState<number | null>(null);
  const [revoking, setRevoking] = useState(false);

  const fetchSessions = () => {
    setLoadingSessions(true);
    authApi.getSessions().then((s) => { setSessions(s); setLoadingSessions(false); });
  };

  useEffect(() => {
    fetchSessions();
    authApi.get2FAStatus().then(setTwoFA);
  }, []);

  const handleToggle2FA = async (next: boolean) => {
    setTogglingTwoFA(true);
    try {
      const result = await authApi.toggle2FA(next);
      setTwoFA(result);
    } finally {
      setTogglingTwoFA(false);
    }
  };

  const handleRevoke = async (id: number) => {
    setRevoking(true);
    try {
      await authApi.revokeSession(id);
      fetchSessions();
    } finally {
      setRevoking(false);
      setRevokingId(null);
    }
  };

  return (
    <div className="w-full min-h-screen bg-surface flex font-sans text-ink antialiased">
      <AdminSidebar onNavigate={onNavigate} activeTab="adminSettings" />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader role="admin" />
        <main className="flex-1 animate-fade-in-up p-8 max-w-4xl mx-auto w-full">
          <div className="mb-7">
            <h1 className="font-display text-[26px] font-bold tracking-tight">Cài đặt &amp; Quyền riêng tư</h1>
            <p className="text-ink-soft text-[14.5px] mt-1">Bảo vệ tài khoản quản trị và quản lý các phiên đăng nhập</p>
          </div>

          <div className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              {/* Mật khẩu */}
              <div className="bg-card border border-line rounded-2xl shadow-card p-6 flex flex-col">
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <div className="h-10 w-10 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center shrink-0">
                    <KeyRound size={19} strokeWidth={2.1} />
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-display text-[16px] font-bold mb-0.5">Mật khẩu</h2>
                    <p className="text-ink-soft text-[13.5px] leading-relaxed">
                      Cập nhật mật khẩu thường xuyên để giữ an toàn cho tài khoản
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setPasswordOpen(true)}
                  className="mt-5 h-[40px] px-4 border border-line rounded-xl font-bold text-[13.5px] hover:bg-surface-alt transition-snappy cursor-pointer self-start"
                >
                  Đổi mật khẩu
                </button>
              </div>

              {/* Xác thực 2 lớp */}
              <div className="bg-card border border-line rounded-2xl shadow-card p-6 flex flex-col">
                <div className="flex items-start justify-between gap-3 flex-1">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="h-10 w-10 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center shrink-0">
                      <Shield size={19} strokeWidth={2.1} />
                    </div>
                    <div className="min-w-0">
                      <h2 className="font-display text-[16px] font-bold mb-0.5">Xác thực 2 lớp</h2>
                      <p className="text-ink-soft text-[13.5px] leading-relaxed">
                        {twoFA ? 'Đang bật' : 'Đang tắt'} — bảo vệ tài khoản bằng mã OTP
                        <br />
                        Yêu cầu mã từ ứng dụng xác thực mỗi khi đăng nhập
                      </p>
                    </div>
                  </div>
                  <ToggleSwitch checked={twoFA} onChange={handleToggle2FA} disabled={togglingTwoFA} label="Xác thực 2 lớp" />
                </div>
              </div>
            </div>

            {/* Phiên đăng nhập */}
            <div className="bg-card border border-line rounded-2xl shadow-card overflow-hidden">
              <div className="h-[60px] border-b border-line flex items-center gap-2.5 px-6">
                <Monitor size={18} strokeWidth={2.1} className="text-ink-soft" />
                <h2 className="font-display text-[16px] font-bold">Phiên đăng nhập</h2>
              </div>
              <div className="p-3 grid sm:grid-cols-2 gap-1">
                {loadingSessions ? (
                  <p className="text-ink-soft text-[13.5px] p-3">Đang tải…</p>
                ) : (
                  sessions.map((s) => {
                    const DeviceIcon = s.deviceType === 'mobile' ? Smartphone : Laptop;
                    return (
                      <div
                        key={s.id}
                        className="flex items-center justify-between gap-3 px-3 py-3.5 rounded-xl hover:bg-surface-alt/60 transition-snappy"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="h-10 w-10 rounded-xl bg-surface-alt text-ink-soft flex items-center justify-center shrink-0">
                            <DeviceIcon size={18} strokeWidth={2} />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-[14px] truncate">{s.device}</span>
                              {s.isCurrent && (
                                <span className="px-2 py-0.5 rounded-full bg-success-bg text-success text-[11px] font-bold shrink-0">
                                  Hiện tại
                                </span>
                              )}
                            </div>
                            <div className="text-ink-soft text-[13px] truncate">
                              {s.location} • {s.lastActive}
                            </div>
                          </div>
                        </div>
                        {!s.isCurrent && (
                          <button
                            type="button"
                            onClick={() => setRevokingId(s.id)}
                            className="shrink-0 text-danger text-[13px] font-bold hover:underline cursor-pointer whitespace-nowrap"
                          >
                            Đăng xuất
                          </button>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Đăng xuất tài khoản */}
            <div className="bg-card border border-line rounded-2xl shadow-card p-6 flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h2 className="font-display text-[16px] font-bold mb-1">Đăng xuất tài khoản</h2>
                <p className="text-ink-soft text-[13.5px]">Kết thúc phiên làm việc hiện tại trên thiết bị này.</p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('welcome')}
                className="inline-flex items-center gap-2 h-[42px] px-5 bg-danger hover:opacity-90 text-white rounded-xl font-bold text-[14px] transition-colors cursor-pointer shrink-0"
              >
                <LogOut size={16} /> Đăng xuất
              </button>
            </div>
          </div>
        </main>
      </div>

      {passwordOpen && <ChangePasswordDialog onClose={() => setPasswordOpen(false)} />}

      {revokingId !== null && (
        <ConfirmDeleteDialog
          title="Đăng xuất khỏi thiết bị này?"
          description="Phiên đăng nhập trên thiết bị này sẽ kết thúc ngay lập tức."
          confirmLabel="Đăng xuất"
          loading={revoking}
          onConfirm={() => handleRevoke(revokingId)}
          onClose={() => setRevokingId(null)}
        />
      )}
    </div>
  );
};

export default AdminSettings;
