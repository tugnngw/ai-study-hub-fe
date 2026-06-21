import React, { useState } from 'react';
import { Flag, X } from 'lucide-react';

export const REPORT_REASONS = [
  'Nội dung vi phạm bản quyền',
  'Thông tin sai lệch / gây hiểu lầm',
  'Nội dung không phù hợp / phản cảm',
  'Vi phạm quyền riêng tư',
  'Lý do khác',
];

export interface ReportDocumentDialogProps {
  documentTitle: string;
  /** (lý do, chi tiết bổ sung) -> Promise */
  onSubmit: (category: string, details: string) => Promise<void>;
  onClose: () => void;
}

/** Modal báo cáo tài liệu — tách từ UserDocuments.tsx để tái sử dụng. */
const ReportDocumentDialog: React.FC<ReportDocumentDialogProps> = ({ documentTitle, onSubmit, onClose }) => {
  const [category, setCategory] = useState('');
  const [details, setDetails] = useState('');
  const [reporting, setReporting] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async () => {
    if (!category) return;
    setReporting(true);
    try {
      await onSubmit(category, details);
      setDone(true);
    } finally {
      setReporting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-ink/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-2xl w-full max-w-[520px] max-h-[90vh] overflow-y-auto scrollbar-thin shadow-modal animate-scale-in">
        {!done ? (
          <>
            <div className="flex items-start justify-between px-6 pt-6">
              <div className="min-w-0 pr-4">
                <h3 className="font-display text-[18px] font-bold truncate">Báo cáo "{documentTitle}"</h3>
                <p className="text-ink-soft text-[13.5px] mt-1">Cho chúng tôi biết vấn đề bạn gặp phải với tài liệu này.</p>
              </div>
              <button type="button" onClick={onClose} className="shrink-0 text-ink-faint hover:text-ink cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <div className="px-6 pt-5">
              <label className="text-[13px] font-bold block mb-2.5">Lý do báo cáo</label>
              <div className="space-y-2.5">
                {REPORT_REASONS.map((reason) => (
                  <label
                    key={reason}
                    className={`flex items-center gap-3 px-4 py-3 border rounded-xl cursor-pointer transition-snappy ${
                      category === reason ? 'border-brand-400 bg-brand-50' : 'border-line hover:bg-surface-alt'
                    }`}
                  >
                    <input
                      type="radio"
                      name="reportReason"
                      checked={category === reason}
                      onChange={() => setCategory(reason)}
                      className="w-4 h-4 accent-brand-500 shrink-0 cursor-pointer"
                    />
                    <span className="text-[14px] font-medium">{reason}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="px-6 pt-5">
              <label className="text-[13px] font-bold block mb-1.5">Mô tả thêm (tùy chọn)</label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={3}
                placeholder="Cung cấp chi tiết để chúng tôi xử lý nhanh hơn…"
                className="w-full border border-line rounded-xl p-3.5 text-[14px] outline-none resize-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-snappy"
              />
            </div>

            <div className="flex justify-end gap-3 p-6">
              <button type="button" onClick={onClose} className="px-5 py-2.5 border border-line rounded-xl font-bold text-[14px] text-ink-soft hover:bg-surface-alt cursor-pointer transition-snappy">
                Hủy
              </button>
              <button
                type="button"
                disabled={!category || reporting}
                onClick={submit}
                className={`px-5 py-2.5 rounded-xl font-bold text-[14px] text-white transition-snappy ${category && !reporting ? 'bg-danger hover:opacity-90 cursor-pointer' : 'bg-ink-faint cursor-not-allowed'}`}
              >
                {reporting ? 'Đang gửi…' : 'Gửi báo cáo'}
              </button>
            </div>
          </>
        ) : (
          <div className="p-8 text-center">
            <div className="w-14 h-14 rounded-2xl bg-danger-bg text-danger flex items-center justify-center mx-auto mb-4">
              <Flag size={24} strokeWidth={1.9} />
            </div>
            <h3 className="font-display text-[17px] font-bold mb-1.5">Đã gửi báo cáo</h3>
            <p className="text-ink-soft text-[13.5px] mb-6">Cảm ơn bạn. Đội ngũ quản trị sẽ xem xét tài liệu này sớm.</p>
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

export default ReportDocumentDialog;
