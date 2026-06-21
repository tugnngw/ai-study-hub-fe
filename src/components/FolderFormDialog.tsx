import React, { useState } from 'react';
import { X } from 'lucide-react';

export interface FolderFormValues {
  name: string;
  description: string;
}

export interface FolderFormDialogProps {
  /** Truyền vào khi sửa thư mục có sẵn; bỏ trống (undefined) khi tạo mới. */
  initialValues?: FolderFormValues;
  onSubmit: (values: FolderFormValues) => Promise<void>;
  onClose: () => void;
}

/** Modal tạo/sửa thư mục — tách từ UserFolders.tsx để tái sử dụng. */
const FolderFormDialog: React.FC<FolderFormDialogProps> = ({ initialValues, onSubmit, onClose }) => {
  const isEditing = !!initialValues;
  const [name, setName] = useState(initialValues?.name ?? '');
  const [description, setDescription] = useState(initialValues?.description ?? '');
  const [saving, setSaving] = useState(false);

  const submit = async () => {
    if (!name.trim()) return;
    setSaving(true);
    try {
      await onSubmit({ name, description });
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-ink/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-2xl w-full max-w-[440px] shadow-modal animate-scale-in">
        <div className="flex items-center justify-between px-6 pt-6">
          <h3 className="font-display text-[18px] font-bold">{isEditing ? 'Chỉnh sửa thư mục' : 'Thư mục mới'}</h3>
          <button type="button" onClick={onClose} className="text-ink-faint hover:text-ink cursor-pointer">
            <X size={20} />
          </button>
        </div>
        <div className="px-6 pt-5 space-y-4">
          <div>
            <label className="text-[13px] font-bold block mb-1.5">Tên thư mục</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="VD: Hợp đồng"
              className="w-full h-[42px] border border-line rounded-xl px-3.5 text-[14px] outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-snappy"
            />
          </div>
          <div>
            <label className="text-[13px] font-bold block mb-1.5">Mô tả (tùy chọn)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full border border-line rounded-xl p-3.5 text-[14px] outline-none resize-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-snappy"
            />
          </div>
        </div>
        <div className="flex gap-3 p-6">
          <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-line rounded-xl font-bold text-[14px] text-ink-soft hover:bg-surface-alt cursor-pointer transition-snappy">
            Hủy
          </button>
          <button
            type="button"
            disabled={!name.trim() || saving}
            onClick={submit}
            className={`flex-1 py-2.5 rounded-xl font-bold text-[14px] text-white transition-snappy ${name.trim() && !saving ? 'bg-brand-500 hover:bg-brand-600 cursor-pointer' : 'bg-ink-faint cursor-not-allowed'}`}
          >
            {isEditing ? 'Lưu thay đổi' : 'Tạo thư mục'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FolderFormDialog;
