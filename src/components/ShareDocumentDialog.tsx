import React, { useState } from 'react';
import { X } from 'lucide-react';

export interface ShareDocumentDialogProps {
  documentTitle: string;
  onShare: (email: string) => Promise<void>;
  onClose: () => void;
}

/** Modal chia sẻ tài liệu qua email — tách từ UserDocuments.tsx để tái sử dụng. */
const ShareDocumentDialog: React.FC<ShareDocumentDialogProps> = ({ documentTitle, onShare, onClose }) => {
  const [email, setEmail] = useState('');
  const [sharing, setSharing] = useState(false);

  const submit = async () => {
    if (!email.trim()) return;
    setSharing(true);
    try {
      await onShare(email.trim());
      onClose();
    } finally {
      setSharing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-ink/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-2xl w-full max-w-[420px] shadow-modal animate-scale-in">
        <div className="flex items-center justify-between px-6 pt-6">
          <h3 className="font-display text-[18px] font-bold">Chia sẻ tài liệu</h3>
          <button type="button" onClick={onClose} className="text-ink-faint hover:text-ink cursor-pointer">
            <X size={20} />
          </button>
        </div>
        <div className="px-6 pt-5">
          <p className="text-ink-soft text-[13.5px] mb-3">Chia sẻ "{documentTitle}" với:</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            className="w-full h-[42px] border border-line rounded-xl px-3.5 text-[14px] outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-snappy"
          />
        </div>
        <div className="flex gap-3 p-6">
          <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-line rounded-xl font-bold text-[14px] text-ink-soft hover:bg-surface-alt cursor-pointer transition-snappy">
            Hủy
          </button>
          <button
            type="button"
            disabled={!email.trim() || sharing}
            onClick={submit}
            className={`flex-1 py-2.5 rounded-xl font-bold text-[14px] text-white transition-snappy ${email.trim() && !sharing ? 'bg-brand-500 hover:bg-brand-600 cursor-pointer' : 'bg-ink-faint cursor-not-allowed'}`}
          >
            {sharing ? 'Đang chia sẻ…' : 'Chia sẻ'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareDocumentDialog;
