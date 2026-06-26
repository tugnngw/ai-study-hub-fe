# Admin Panel — Changelog & Documentation

## Tổng quan

Người dùng có `role === "ADMIN"` khi đăng nhập sẽ được tự động chuyển hướng vào khu quản trị `/admin_panel`.

## Cấu trúc thư mục

```
src/
├── features/admin/
│   ├── index.ts                      # barrel: export components/hooks/services/types
│   ├── types/
│   │   ├── admin.types.ts            # [SỬA] bộ domain type đầy đủ
│   │   └── index.ts
│   ├── services/                     # [MỚI] tầng gọi API (hiện là mock)
│   │   ├── dashboardApi.ts
│   │   ├── userApi.ts
│   │   ├── fileApi.ts
│   │   ├── approvalApi.ts
│   │   └── index.ts
│   ├── hooks/                        # [MỚI] tầng data dùng TanStack Query
│   │   ├── adminKeys.ts              # query keys tập trung
│   │   ├── useAdminDashboard.ts
│   │   ├── useAdminUsers.ts
│   │   ├── useAdminFiles.ts
│   │   ├── useAdminApprovals.ts
│   │   └── index.ts
│   └── components/                   # [MỚI] tầng giao diện
│       ├── AdminShell.tsx            # layout + sidebar điều hướng
│       ├── AdminDashboardPage.tsx
│       ├── AdminUsersPage.tsx
│       ├── AdminFilesPage.tsx
│       ├── AdminApprovalsPage.tsx
│       ├── AdminTrashPage.tsx
│       ├── AdminProfilePage.tsx
│       └── index.ts
└── routes/admin_panel/               # [MỚI] khai báo route
    ├── route.tsx                     # layout route + bảo vệ quyền truy cập
    ├── index.tsx                     # /admin_panel        → Dashboard
    ├── users.tsx                     # /admin_panel/users
    ├── files.tsx                     # /admin_panel/files
    ├── approvals.tsx                 # /admin_panel/approvals
    ├── trash.tsx                     # /admin_panel/trash
    └── profile.tsx                   # /admin_panel/profile
```

## Chi tiết thay đổi

### 1. Files mới hoàn toàn

**Components (`features/admin/components/`)** — ~1.074 dòng UI:
- `AdminShell` — khung layout với sidebar điều hướng giữa các trang admin.
- `AdminDashboardPage` — thống kê tổng quan + hoạt động gần đây.
- `AdminUsersPage` — danh sách người dùng, khóa/mở khóa, xóa.
- `AdminFilesPage` — quản lý tài liệu bị báo cáo (xử lý gỡ/từ chối).
- `AdminApprovalsPage` — hàng đợi duyệt tài liệu (duyệt/từ chối).
- `AdminTrashPage` — thùng rác file & tài khoản (khôi phục/xóa vĩnh viễn).
- `AdminProfilePage` — hồ sơ quản trị viên.

**Hooks (`features/admin/hooks/`)** — tầng dữ liệu dựa trên TanStack Query:
- `adminKeys.ts` — quản lý query keys tập trung.
- `useAdminDashboard`, `useAdminUsers`, `useAdminFiles`, `useAdminApprovals`.

**Services (`features/admin/services/`)** — tầng API ở dạng **stub rỗng**, chưa nối backend (mỗi file có comment `// TODO(backend): thay bằng api<T>("/api/admin/...")`):
- `dashboardApi` — `getStats()`, `getRecentActivity()`.
- `adminUserApi` — `getUsers()`, `toggleStatus(id)`, `deleteUser(id)`.
- `adminFileApi` — `getReportedFiles()`, `handleReportDecision(id, decision)`, `getDeletedFiles()`, `getDeletedAccounts()`, `permanentDelete(id, type)`, `restoreItem(id, type)`.
- `approvalApi` — `getPendingList()`, `approve(id)`, `reject(id)`.

**Routes (`routes/admin_panel/`)** — 7 route files. `route.tsx` bảo vệ truy cập: chưa đăng nhập → `/auth/login`; không phải admin → `/dashboard`.

### 2. Files đã sửa

- **`features/admin/types/admin.types.ts`** — thay placeholder bằng bộ domain type đầy đủ: `DashboardStats` (kèm các trường `*Trend`, `pendingApprovals`), `ActivityItem` / `ActivityType`, `AdminUserItem` / `UserStatus`, `ReportedFileItem` / `ReportDecision`, `ApprovalItem` / `ApprovalAction`, `DeletedFileItem`, `DeletedAccountItem`, `TrashItemType`, `TrashAction`.
- **`features/admin/index.ts`** — thêm `export * from "./components"`.
- **`routes/_authenticated/dashboard.tsx`** — thêm `useEffect` tự điều hướng admin (`user.role === "ADMIN"`) thẳng sang `/admin_panel`, bỏ lối vào riêng.
- **`styles.css`** — thêm bảng màu (palette) riêng cho giao diện admin.
- **`routeTree.gen.ts`** — file tự sinh, cập nhật khai báo các route `admin_panel` mới.

## Lưu ý cho bước tiếp theo

Tầng `services/` hiện là **stub rỗng**, không có dữ liệu mẫu: các hàm trả về `Promise.resolve([])` (danh sách), `Promise.resolve(true)` (hành động) và `emptyStats` toàn số 0 (dashboard). Vì vậy nếu chạy lên bây giờ, mọi trang admin sẽ hiển thị danh sách trống và thống kê bằng 0.

Để có dữ liệu thật, thay phần thân các hàm trong thư mục `services/` bằng lệnh gọi API backend (theo `// TODO(backend)` ghi sẵn trong mỗi file) — không phải động đến hooks hay components.
