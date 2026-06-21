import React, { useEffect, useState } from 'react';
import { workspaceApi } from '../api/workspaceApi';
import { FolderItem } from '../types/userTypes';
import { X } from 'lucide-react';

export interface UploadDocumentDialogProps {
  /** Khi truyền sẵn (VD: đang ở trong 1 thư mục cụ thể), ẩn luôn ô chọn thư mục. */
  folderId?: number;
  onClose: () => void;
  onUploaded: () => void;
}

const UploadDocumentDialog: React.FC<UploadDocumentDialogProps> = ({ folderId: fixedFolderId, onClose, onUploaded }) => {
  const [folders, setFolders] = useState<FolderItem[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [folderId, setFolderId] = useState('');
  const [uploading, setUploading] = useState(false);

  const needsFolderPicker = fixedFolderId === undefined;

  useEffect(() => {
    if (needsFolderPicker) workspaceApi.getFolders().then(setFolders);
  }, [needsFolderPicker]);

  const resolvedFolderId = fixedFolderId ?? Number(folderId);
  const canSubmit = file && title.trim() && (!needsFolderPicker || folderId);

  const submit = async () => {
    if (!canSubmit) return;
    setUploading(true);
    try {
      await workspaceApi.uploadDocument({ file: file!, folderId: resolvedFolderId, title, description });
      onUploaded();
      onClose();
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-ink/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 text-ink">
      <div className="bg-card rounded-2xl w-full max-w-[440px] shadow-modal animate-scale-in">
        <div className="flex items-center justify-between px-6 pt-6">
          <h3 className="font-display text-[18px] font-bold">Tải lên tài liệu</h3>
          <button type="button" onClick={onClose} className="text-ink-faint hover:text-ink cursor-pointer">
            <X size={20} />
          </button>
        </div>
        <div className="px-6 pt-5 space-y-4">
          <div>
            <label className="text-[13px] font-bold block mb-1.5">File</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="w-full text-[13.5px] border border-line rounded-xl px-3 py-2 outline-none cursor-pointer"
            />
          </div>
          <div>
            <label className="text-[13px] font-bold block mb-1.5">Tiêu đề</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-[42px] border border-line rounded-xl px-3.5 text-[14px] outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-snappy"
            />
          </div>
          <div>
            <label className="text-[13px] font-bold block mb-1.5">Mô tả</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={needsFolderPicker ? 2 : 3}
              className="w-full border border-line rounded-xl p-3.5 text-[14px] outline-none resize-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-snappy"
            />
          </div>
          {needsFolderPicker && (
            <div>
              <label className="text-[13px] font-bold block mb-1.5">Thư mục</label>
              <select
                value={folderId}
                onChange={(e) => setFolderId(e.target.value)}
                className="w-full h-[42px] border border-line rounded-xl px-3.5 text-[14px] outline-none cursor-pointer focus:border-brand-400 transition-all bg-white"
              >
                <option value="">Chọn thư mục</option>
                {folders.map((f) => (
                  <option key={f.id} value={f.id}>{f.name}</option>
                ))}
              </select>
            </div>
          )}
        </div>
        <div className="flex gap-3 p-6">
          <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-line rounded-xl font-bold text-[14px] text-ink-soft hover:bg-surface-alt cursor-pointer transition-snappy">
            Hủy
          </button>
          <button
            type="button"
            disabled={!canSubmit || uploading}
            onClick={submit}
            className={`flex-1 py-2.5 rounded-xl font-bold text-[14px] text-white transition-snappy ${
              canSubmit && !uploading ? 'bg-brand-500 hover:bg-brand-600 cursor-pointer' : 'bg-ink-faint cursor-not-allowed'
            }`}
          >
            {uploading ? 'Đang tải…' : 'Tải lên'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadDocumentDialog;
