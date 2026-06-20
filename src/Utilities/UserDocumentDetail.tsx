import React, { useEffect, useState } from 'react';
import UserSidebar from '../components/UserSideBar';
import { workspaceApi, CURRENT_USER } from '../api/workspaceApi';
import { DocumentItem } from '../types/userTypes';
import { NavigateFn } from '../App';
import UserFolderDetail from './UserFolderDetail';

const UserDocumentDetail: React.FC<{ onNavigate: NavigateFn; docId: number }> = ({ onNavigate, docId }) => {
  const [doc, setDoc] = useState<DocumentItem | null | undefined>(undefined);

  useEffect(() => {
    workspaceApi.getDocument(docId).then((d) => setDoc(d ?? null));
  }, [docId]);

  if (doc === undefined) {
    return (
      <div className="w-full min-h-screen bg-surface flex font-sans text-ink antialiased">
        <UserSidebar onNavigate={onNavigate} activeTab="userDocuments" userName={CURRENT_USER.fullName} />
        <div className="flex-1 flex items-center justify-center text-ink-soft text-sm">Đang tải…</div>
      </div>
    );
  }

  if (doc === null) {
    return (
      <div className="w-full min-h-screen bg-surface flex font-sans text-ink antialiased">
        <UserSidebar onNavigate={onNavigate} activeTab="userDocuments" userName={CURRENT_USER.fullName} />
        <div className="flex-1 flex items-center justify-center text-ink-soft text-sm">Không tìm thấy tài liệu.</div>
      </div>
    );
  }

  return <UserFolderDetail onNavigate={onNavigate} folderId={doc.folderId} docId={docId} />;
};

export default UserDocumentDetail;
