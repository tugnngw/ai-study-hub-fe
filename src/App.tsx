import React, { Suspense, lazy, useState } from 'react';

// Tải lười (lazy) từng trang — mỗi trang trở thành 1 chunk riêng,
// chỉ tải khi người dùng thực sự điều hướng đến, giúp giảm dung lượng
// bundle JS ban đầu thay vì gộp toàn bộ ~25 trang vào 1 file.
const WelcomePage = lazy(() => import('./Utilities/WelcomePage'));
const LoginPage = lazy(() => import('./Utilities/LoginPage'));
const AdminLoginPage = lazy(() => import('./Utilities/AdminLoginPage'));
const ForgotPasswordPage = lazy(() => import('./Utilities/ForgotPasswordPage'));
const OtpPage = lazy(() => import('./Utilities/OtpPage'));
const ResetPasswordPage = lazy(() => import('./Utilities/ResetPasswordPage'));
const ResetSuccessPage = lazy(() => import('./Utilities/ResetSucessPage'));
const RegisterPage = lazy(() => import('./Utilities/RegisterPage'));
const EmailVerificationPage = lazy(() => import('./Utilities/EmailVerificationPage'));
const AdminDashboard = lazy(() => import('./Utilities/AdminDashboard'));
const AdminUserManager = lazy(() => import('./Utilities/AdminUserManager'));
const AdminFileManager = lazy(() => import('./Utilities/AdminFileManager'));
const AdminHistoryApproval = lazy(() => import('./Utilities/AdminHistoryApproval'));
const AdminTrashManager = lazy(() => import('./Utilities/AdminTrashManager'));
const AdminProfile = lazy(() => import('./Utilities/AdminProfile'));
const AdminSettings = lazy(() => import('./Utilities/AdminSettings'));
const UserDashboard = lazy(() => import('./Utilities/UserDashboard'));
const UserFolders = lazy(() => import('./Utilities/UserFolders'));
const UserFolderDetail = lazy(() => import('./Utilities/UserFolderDetail'));
const UserDocuments = lazy(() => import('./Utilities/UserDocuments'));
const UserDocumentDetail = lazy(() => import('./Utilities/UserDocumentDetail'));
const UserShared = lazy(() => import('./Utilities/UserShared'));
const UserTrash = lazy(() => import('./Utilities/UserTrash'));
const UserCloud = lazy(() => import('./Utilities/UserCloud'));
const UserProfile = lazy(() => import('./Utilities/UserProfile'));
const UserSettings = lazy(() => import('./Utilities/UserSettings'));

// Ràng buộc nghiêm ngặt tất cả các chuỗi trang hợp lệ trong hệ thống
export type AllPages =
  | 'welcome' | 'login' | 'admin' | 'forgot' | 'otp' | 'reset' | 'resetSuccess'
  | 'register' | 'verifyEmail' | 'adminDashboard' | 'adminUserManager'
  | 'adminFileManager' | 'adminHistoryApproval' | 'adminTrashManager'
  | 'adminProfile' | 'adminSettings'
  | 'userDashboard' | 'userFolders' | 'userFolderDetail' | 'userDocuments'
  | 'userDocumentDetail' | 'userShared' | 'userTrash' | 'userCloud'
  | 'userProfile' | 'userSettings';

// Tham số điều hướng phụ — dùng cho các trang cần biết "đang mở mục nào"
export interface NavParams {
  folderId?: number;
  docId?: number;
}

export type NavigateFn = (page: AllPages, params?: NavParams) => void;

// Fallback nhẹ trong lúc chunk của trang đang được tải
const PageLoader: React.FC = () => (
  <div className="min-h-screen w-full flex items-center justify-center bg-white">
    <div className="h-8 w-8 rounded-full border-2 border-brand-200 border-t-brand-500 animate-spin" />
  </div>
);

function App() {
  const [currentPage, setCurrentPage] = useState<AllPages>('welcome');
  const [navParams, setNavParams] = useState<NavParams>({});

  const handleNavigate: NavigateFn = (page, params = {}) => {
    setNavParams(params);
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-white">
      <Suspense fallback={<PageLoader />}>
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
        {currentPage === 'adminProfile' && <AdminProfile onNavigate={handleNavigate} />}
        {currentPage === 'adminSettings' && <AdminSettings onNavigate={handleNavigate} />}

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
      </Suspense>
    </div>
  );
}

export default App;
