import React, { useState } from 'react';
import WelcomePage from './Utilities/WelcomePage';
import LoginPage from './Utilities/LoginPage';
import AdminLoginPage from './Utilities/AdminLoginPage';
import ForgotPasswordPage from './Utilities/ForgotPasswordPage';
import OtpPage from './Utilities/OtpPage';
import ResetPasswordPage from './Utilities/ResetPasswordPage';
import ResetSuccessPage from './Utilities/ResetSucessPage';
import RegisterPage from './Utilities/RegisterPage';
import EmailVerificationPage from './Utilities/EmailVerificationPage';
import AdminDashboard from './Utilities/AdminDashboard';
import AdminUserManager from './Utilities/AdminUserManager';
import AdminFileManager from './Utilities/AdminFileManager';
import AdminHistoryApproval from './Utilities/AdminHistoryApproval';
import AdminTrashManager from './Utilities/AdminTrashManager';
import UserDashboard from './Utilities/UserDashboard';
import UserFolders from './Utilities/UserFolders';
import UserFolderDetail from './Utilities/UserFolderDetail';
import UserDocuments from './Utilities/UserDocuments';
import UserDocumentDetail from './Utilities/UserDocumentDetail';
import UserShared from './Utilities/UserShared';
import UserTrash from './Utilities/UserTrash';
import UserCloud from './Utilities/UserCloud';
import UserProfile from './Utilities/UserProfile';
import UserSettings from './Utilities/UserSettings';

// Ràng buộc nghiêm ngặt tất cả các chuỗi trang hợp lệ trong hệ thống
export type AllPages =
  | 'welcome' | 'login' | 'admin' | 'forgot' | 'otp' | 'reset' | 'resetSuccess'
  | 'register' | 'verifyEmail' | 'adminDashboard' | 'adminUserManager'
  | 'adminFileManager' | 'adminHistoryApproval' | 'adminTrashManager'
  | 'userDashboard' | 'userFolders' | 'userFolderDetail' | 'userDocuments'
  | 'userDocumentDetail' | 'userShared' | 'userTrash' | 'userCloud'
  | 'userProfile' | 'userSettings';

// Tham số điều hướng phụ — dùng cho các trang cần biết "đang mở mục nào"
export interface NavParams {
  folderId?: number;
  docId?: number;
}

export type NavigateFn = (page: AllPages, params?: NavParams) => void;

function App() {
  const [currentPage, setCurrentPage] = useState<AllPages>('welcome');
  const [navParams, setNavParams] = useState<NavParams>({});

  const handleNavigate: NavigateFn = (page, params = {}) => {
    setNavParams(params);
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-white">
      {currentPage === 'welcome' && <WelcomePage onNavigate={handleNavigate} />}
      {currentPage === 'login' && <LoginPage onNavigate={handleNavigate} />}
      {currentPage === 'admin' && <AdminLoginPage onNavigate={handleNavigate} />}
      {currentPage === 'forgot' && <ForgotPasswordPage onNavigate={handleNavigate} />}
      {currentPage === 'otp' && <OtpPage onNavigate={handleNavigate} />}
      {currentPage === 'reset' && <ResetPasswordPage onNavigate={handleNavigate} />}
      {currentPage === 'resetSuccess' && <ResetSuccessPage onNavigate={handleNavigate} />}
      {currentPage === 'register' && <RegisterPage onNavigate={handleNavigate} />}
      {currentPage === 'verifyEmail' && <EmailVerificationPage onNavigate={handleNavigate} />}

      {/* Các phân vùng quản trị hệ thống */}
      {currentPage === 'adminDashboard' && <AdminDashboard onNavigate={handleNavigate} />}
      {currentPage === 'adminUserManager' && <AdminUserManager onNavigate={handleNavigate} />}
      {currentPage === 'adminFileManager' && <AdminFileManager onNavigate={handleNavigate} />}
      {currentPage === 'adminHistoryApproval' && <AdminHistoryApproval onNavigate={handleNavigate} />}
      {currentPage === 'adminTrashManager' && <AdminTrashManager onNavigate={handleNavigate} />}

      {/* Không gian làm việc của người dùng */}
      {currentPage === 'userDashboard' && <UserDashboard onNavigate={handleNavigate} />}
      {currentPage === 'userFolders' && <UserFolders onNavigate={handleNavigate} />}
      {currentPage === 'userFolderDetail' && (
        <UserFolderDetail onNavigate={handleNavigate} folderId={navParams.folderId!} docId={navParams.docId} />
      )}
      {currentPage === 'userDocuments' && <UserDocuments onNavigate={handleNavigate} />}
      {currentPage === 'userDocumentDetail' && (
        <UserDocumentDetail onNavigate={handleNavigate} docId={navParams.docId!} />
      )}
      {currentPage === 'userShared' && <UserShared onNavigate={handleNavigate} />}
      {currentPage === 'userTrash' && <UserTrash onNavigate={handleNavigate} />}
      {currentPage === 'userCloud' && <UserCloud onNavigate={handleNavigate} />}
      {currentPage === 'userProfile' && <UserProfile onNavigate={handleNavigate} />}
      {currentPage === 'userSettings' && <UserSettings onNavigate={handleNavigate} />}
    </div>
  );
}

export default App;
