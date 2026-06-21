import React from 'react';

export interface ConfirmDeleteDialogProps {
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

/**
 * Modal xác nhận xóa dùng chung — thay cho window.confirm() (UX xấu, không
 * theo design system) và các modal "Xóa ...?" từng bị copy-paste riêng lẻ
 * ở UserFolders, UserDocuments, UserTrash, AdminTrashManager, v.v.
 */
const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
  title,
  description,
  confirmLabel = 'Xóa',
  cancelLabel = 'Hủy',
  loading = false,
  onConfirm,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-ink/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-2xl w-full max-w-[420px] shadow-modal animate-scale-in p-6">
        <h3 className="font-display text-[18px] font-bold mb-1.5">{title}</h3>
        <p className="text-ink-soft text-[14px] mb-6">{description}</p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-2.5 border border-line rounded-xl font-bold text-[14px] text-ink-soft hover:bg-surface-alt cursor-pointer transition-snappy disabled:opacity-60"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-2.5 bg-danger hover:opacity-90 text-white rounded-xl font-bold text-[14px] cursor-pointer transition-snappy disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Đang xóa…' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteDialog;
