<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { createBrowserRouter, Navigate } from "react-router-dom";

// Layouts
import { AuthLayoutOuter } from "./routes/auth";
import { AuthLayout } from "./routes/_authenticated";
import { AdminLayout } from "./routes/_admin";

// Public
import { WelcomePage } from "./routes/index";

// Auth
import { LoginPage } from "./routes/auth.login";
import { RegisterPage } from "./routes/auth.register";
import { ForgotPasswordPage } from "./routes/auth.forgot-password";
import { ResetPasswordPage } from "./routes/auth.reset-password";

// App (authenticated)
import { Dashboard } from "./routes/_authenticated.dashboard";
import { DocumentsPage } from "./routes/_authenticated.documents";
import { DocumentDetail } from "./routes/_authenticated.documents.$id";
import { FolderDetail } from "./routes/_authenticated.folders.$id";
import { ProfilePage } from "./routes/_authenticated.profile";
import { SettingsPage } from "./routes/_authenticated.settings";
import { SharedPage } from "./routes/_authenticated.shared";
import { TrashPage } from "./routes/_authenticated.trash";
import { CloudPage } from "./routes/_authenticated.cloud";
import { AIChatPage } from "./routes/_authenticated.aichat";

// Admin
import { AdminLoginPage } from "./routes/admin_.login";
import { AdminDashboard } from "./routes/_admin.admin.dashboard";
import { AdminUserManager } from "./routes/_admin.admin.users";
import { AdminFileManager } from "./routes/_admin.admin.files";
import { AdminHistoryApproval } from "./routes/_admin.admin.approvals";
import { AdminTrashManager } from "./routes/_admin.admin.trash";

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Không tìm thấy trang</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Trang bạn tìm không tồn tại hoặc đã bị di chuyển.
        </p>
        <a href="/" className="mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Về trang chủ
        </a>
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  { path: "/", element: <WelcomePage /> },

  // Cổng quản trị — trang login riêng (ngoài layout admin)
  { path: "/admin/login", element: <AdminLoginPage /> },

  // Auth (layout nền gradient)
  {
    path: "/auth",
    element: <AuthLayoutOuter />,
    children: [
      { index: true, element: <Navigate to="/auth/login" replace /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "forgot-password", element: <ForgotPasswordPage /> },
      { path: "reset-password", element: <ResetPasswordPage /> },
    ],
  },

  // Khu người dùng (AppShell)
  {
    element: <AuthLayout />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/documents", element: <DocumentsPage /> },
      { path: "/documents/:id", element: <DocumentDetail /> },
      { path: "/folders/:id", element: <FolderDetail /> },
      { path: "/profile", element: <ProfilePage /> },
      { path: "/settings", element: <SettingsPage /> },
      { path: "/shared", element: <SharedPage /> },
      { path: "/trash", element: <TrashPage /> },
      { path: "/cloud", element: <CloudPage /> },
      { path: "/aichat", element: <AIChatPage /> },
    ],
  },

  // Khu quản trị (sidebar tím)
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Navigate to="/admin/dashboard" replace /> },
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "users", element: <AdminUserManager /> },
      { path: "files", element: <AdminFileManager /> },
      { path: "approvals", element: <AdminHistoryApproval /> },
      { path: "trash", element: <AdminTrashManager /> },
    ],
  },

  { path: "*", element: <NotFound /> },
]);
=======
=======
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
