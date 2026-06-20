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

// Ràng buộc nghiêm ngặt tất cả các chuỗi trang hợp lệ trong hệ thống
export type AllPages = 
  | 'welcome' | 'login' | 'admin' | 'forgot' | 'otp' | 'reset' | 'resetSuccess' 
  | 'register' | 'verifyEmail' | 'adminDashboard' | 'adminUserManager' 
  | 'adminFileManager' | 'adminHistoryApproval' | 'adminTrashManager';

function App() {
  const [currentPage, setCurrentPage] = useState<AllPages>('welcome');

  return (
    <div className="min-h-screen bg-white">
      {currentPage === 'welcome' && <WelcomePage onNavigate={setCurrentPage} />}
      {currentPage === 'login' && <LoginPage onNavigate={setCurrentPage} />}
      {currentPage === 'admin' && <AdminLoginPage onNavigate={setCurrentPage} />}
      {currentPage === 'forgot' && <ForgotPasswordPage onNavigate={setCurrentPage} />}
      {currentPage === 'otp' && <OtpPage onNavigate={setCurrentPage} />}
      {currentPage === 'reset' && <ResetPasswordPage onNavigate={setCurrentPage} />}
      {currentPage === 'resetSuccess' && <ResetSuccessPage onNavigate={setCurrentPage} />}
      {currentPage === 'register' && <RegisterPage onNavigate={setCurrentPage} />}
      {currentPage === 'verifyEmail' && <EmailVerificationPage onNavigate={setCurrentPage} />}
      
      {/* Các phân vùng quản trị hệ thống */}
      {currentPage === 'adminDashboard' && <AdminDashboard onNavigate={setCurrentPage} />}
      {currentPage === 'adminUserManager' && <AdminUserManager onNavigate={setCurrentPage} />}
      {currentPage === 'adminFileManager' && <AdminFileManager onNavigate={setCurrentPage} />}
      {currentPage === 'adminHistoryApproval' && <AdminHistoryApproval onNavigate={setCurrentPage} />}
      {currentPage === 'adminTrashManager' && <AdminTrashManager onNavigate={setCurrentPage} />}
    </div>
  );
}

export default App;