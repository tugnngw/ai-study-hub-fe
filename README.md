# AI Study Hub — Frontend (Hợp nhất)

Frontend hợp nhất cho AI Study Hub: gộp giao diện **User** và **Admin** vào một
project React + Vite duy nhất, dùng chung một design system.

## Kiến trúc

- **Vite + React 19 + Tailwind CSS v4** — không dùng router, điều hướng trang
  bằng state (`App.tsx`), theo đúng kiến trúc gốc của khu vực Admin.
- Toàn bộ màu sắc / spacing dùng design tokens khai báo trong `src/index.css`
  (`brand-*`, `ink`, `surface`, `success`, `danger`, `warning`...).
- Dữ liệu hiện tại đều là **mock API** (Promise giả lập độ trễ mạng) nằm trong
  `src/api/*.ts`. Khi có backend thật, chỉ cần thay nội dung các hàm trong các
  file này bằng `fetch`/`axios` thật — phần UI không cần đổi.

## Cấu trúc thư mục

```
src/
  App.tsx                  Điều hướng toàn app (state-based router)
  Utilities/                Toàn bộ "trang" (page-level components)
    WelcomePage, LoginPage, RegisterPage, ForgotPasswordPage,
    OtpPage, ResetPasswordPage, ResetSucessPage, EmailVerificationPage
                             ↳ Luồng xác thực phía người dùng (FE_Admin gốc)
    AdminLoginPage, AdminDashboard, AdminUserManager, AdminFileManager,
    AdminHistoryApproval, AdminTrashManager
                             ↳ Khu vực quản trị (giữ nguyên từ FE_Admin)
    UserDashboard, UserFolders, UserFolderDetail, UserDocuments,
    UserDocumentDetail, UserShared, UserTrash, UserCloud,
    UserProfile, UserSettings
                             ↳ Không gian làm việc người dùng (port từ FE_User,
                               viết lại theo design system của Admin)
  components/                Component dùng chung (Admin* + UserSideBar mới)
  api/                       Mock API: authApi, dashboardApi, userApi, fileApi,
                             approvalApi (Admin) + workspaceApi (User)
  types/                     Type definitions phía User (userTypes.ts)
```

## Luồng điều hướng chính

- `welcome` → `login` (người dùng) hoặc `admin` (quản trị viên)
- `login` thành công → `userDashboard`
- `admin` (AdminLoginPage) thành công → `adminDashboard`
- Sidebar User: Dashboard / Thư mục / Tài liệu / Được chia sẻ / Thùng rác /
  Cloud — click avatar vào `userProfile`, "Cài đặt" vào `userSettings`.
- Sidebar Admin: Dashboard / Users / Tài liệu / Phê duyệt / Thùng rác.

## Chạy dự án

```bash
npm install
npm run dev
```

## Ghi chú

- Dự án này không còn phụ thuộc vào Lovable, TanStack Router/Start, hay
  shadcn/Radix UI — toàn bộ UI dùng component nội bộ trong `src/components`.
- Mock data (thư mục, tài liệu, chia sẻ, thùng rác...) được giữ nguyên nội
  dung từ bản gốc, chỉ chuyển định dạng API.
