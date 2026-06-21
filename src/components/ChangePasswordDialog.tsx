import React, { useState } from 'react';
import { authApi } from '../api/authApi';
import { KeyRound, X } from 'lucide-react';

export interface ChangePasswordDialogProps {
  onClose: () => void;
}

/**
 * Modal đổi mật khẩu dùng chung cho cả Admin và User — trước đây bị
 * copy-paste y hệt nhau (100% giống nhau) ở AdminSettings.tsx và UserSettings.tsx.
 */
const ChangePasswordDialog: React.FC<ChangePasswordDialogProps> = ({ onClose }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const canSubmit = currentPassword && newPassword.length >= 6 && newPassword === confirmPassword;

  const submit = async () => {
    if (!canSubmit) return;
    setSaving(true);
    setError('');
    try {
      await authApi.changePassword({ currentPassword, newPassword });
      setDone(true);
    } catch {
      setError('Mật khẩu hiện tại không đúng. Vui lòng thử lại.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-ink/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-2xl w-full max-w-[420px] shadow-modal animate-scale-in">
        {!done ? (
          <>
            <div className="flex items-center justify-between px-6 pt-6">
              <h3 className="font-display text-[18px] font-bold">Đổi mật khẩu</h3>
              <button type="button" onClick={onClose} className="text-ink-faint hover:text-ink cursor-pointer">
                <X size={20} />
              </button>
            </div>
            <div className="px-6 pt-5 space-y-4">
              <div>
                <label className="text-[13px] font-bold block mb-1.5">Mật khẩu hiện tại</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full h-[42px] border border-line rounded-xl px-3.5 text-[14px] outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-snappy"
                />
              </div>
              <div>
                <label className="text-[13px] font-bold block mb-1.5">Mật khẩu mới</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Tối thiểu 6 ký tự"
                  className="w-full h-[42px] border border-line rounded-xl px-3.5 text-[14px] outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-snappy"
                />
              </div>
              <div>
                <label className="text-[13px] font-bold block mb-1.5">Xác nhận mật khẩu mới</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full h-[42px] border border-line rounded-xl px-3.5 text-[14px] outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-snappy"
                />
                {confirmPassword && newPassword !== confirmPassword && (
                  <p className="text-danger text-[12.5px] font-semibold mt-1.5">Mật khẩu xác nhận không khớp</p>
                )}
              </div>
              {error && <p className="text-danger text-[13px] font-semibold">{error}</p>}
            </div>
            <div className="flex gap-3 p-6">
              <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-line rounded-xl font-bold text-[14px] text-ink-soft hover:bg-surface-alt cursor-pointer transition-snappy">
                Hủy
              </button>
              <button
                type="button"
                disabled={!canSubmit || saving}
                onClick={submit}
                className={`flex-1 py-2.5 rounded-xl font-bold text-[14px] text-white transition-snappy ${canSubmit && !saving ? 'bg-brand-500 hover:bg-brand-600 cursor-pointer' : 'bg-ink-faint cursor-not-allowed'}`}
              >
                {saving ? 'Đang lưu…' : 'Lưu thay đổi'}
              </button>
            </div>
          </>
        ) : (
          <div className="p-8 text-center">
            <div className="w-14 h-14 rounded-2xl bg-success-bg text-success flex items-center justify-center mx-auto mb-4">
              <KeyRound size={24} strokeWidth={1.9} />
            </div>
            <h3 className="font-display text-[17px] font-bold mb-1.5">Đổi mật khẩu thành công</h3>
            <p className="text-ink-soft text-[13.5px] mb-6">Mật khẩu của bạn đã được cập nhật.</p>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-bold text-[14px] cursor-pointer transition-snappy"
            >
              Đóng
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangePasswordDialog;
