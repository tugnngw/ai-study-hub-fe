# MERGE_NOTES — Gộp khu Admin (FE_updated) vào AI Study Hub

Tài liệu này ghi lại những gì đã thay đổi khi tích hợp khu **Quản trị (Admin)** từ
project `FE_updated` (Vite thuần) vào project chính `AI-Study6` (TanStack Start).

## Hướng gộp đã chọn
- Tích hợp khu Admin vào **chung một project** (app chính), chạy chung 1 lần `npm run dev`.
- Khu Admin nằm dưới nhánh route **`/admin`**, có layout riêng (sidebar tím + header),
  tách biệt với khu người dùng (`/_authenticated` + AppShell).
- **Auth**: giữ luồng login của app chính (trang `auth.login.tsx`, dùng `useAuth().login`).
  Trang login giờ điều hướng theo `role`:
  - `ADMIN` → `/admin`
  - `USER`  → `/dashboard`
  Nút **"Cổng quản trị"** ở cuối form login (trước đây chỉ hiện toast) nay điều hướng tới `/admin`.

## File mới thêm
```
src/lib/adminApi.ts                       ← API admin (dashboard/users/approvals/files/trash)
                                            dùng chung api() client, base URL = VITE_API_BASE
src/components/admin/
├── admin-sidebar.tsx                     ← sidebar dùng TanStack <Link>, logout qua useAuth
├── admin-header.tsx                      ← header (port nguyên từ FE_updated)
├── admin-pagination.tsx                  ← phân trang (ẩn khi 1 trang, có '...')
└── sub-tab-filter.tsx                    ← filter File/Tài khoản cho Thùng rác
src/routes/
├── _admin.tsx                            ← layout khu admin (sidebar + header + Outlet)
├── _admin.admin.index.tsx               ← /admin → redirect /admin/dashboard
├── _admin.admin.dashboard.tsx           ← /admin/dashboard
├── _admin.admin.users.tsx               ← /admin/users
├── _admin.admin.files.tsx               ← /admin/files (kèm 2 modal xử lý báo cáo)
├── _admin.admin.approvals.tsx           ← /admin/approvals
└── _admin.admin.trash.tsx               ← /admin/trash (sub-tab File/Tài khoản)
```

## File đã sửa
- `src/lib/auth.tsx` — `login()` nay trả về `User` để route biết role mà điều hướng.
- `src/routes/auth.login.tsx` — điều hướng theo role + nối nút Cổng quản trị.

## Base URL — chỉ một nơi
Khu Admin **không** có base URL riêng. Mọi hàm trong `adminApi.ts` đi qua `api()` trong
`src/lib/api.ts`, dùng `VITE_API_BASE` (đặt trong `.env.local`). Đổi domain BE chỉ sửa 1 chỗ.

## Endpoint admin (cần BE xác nhận path)
Đặt tạm theo quy ước REST, tiền tố `/api/admin/...`:

| Trang        | Hàm                          | Method + path                                  |
|--------------|------------------------------|------------------------------------------------|
| Dashboard    | dashboardApi.getStats        | GET    /api/admin/dashboard/stats              |
| Users        | userApi.getUsers             | GET    /api/admin/users                        |
|              | userApi.toggleStatus         | PATCH  /api/admin/users/:id/toggle-status      |
|              | userApi.deleteUser           | DELETE /api/admin/users/:id                    |
| Approvals    | approvalApi.getPendingList   | GET    /api/admin/approvals/pending            |
|              | approvalApi.approve/reject   | PATCH  /api/admin/approvals/:id/approve|reject |
| Files        | fileApi.getReportedFiles     | GET    /api/admin/files/reported               |
|              | fileApi.handleReportDecision | PATCH  /api/admin/files/reported/:id/decision  |
| Trash        | fileApi.getDeletedFiles      | GET    /api/admin/trash/files                  |
|              | fileApi.getDeletedAccounts   | GET    /api/admin/trash/accounts               |
|              | fileApi.permanentDelete      | DELETE /api/admin/trash/:type/:id              |
|              | fileApi.restoreItem          | POST   /api/admin/trash/:type/:id/restore      |

## Lưu ý
- Auth guard cho khu admin **đang tắt** (giống `_authenticated.tsx` hiện tại của app).
  Khi nối BE, bật guard trong `_admin.tsx` để chỉ cho `role === "ADMIN"` truy cập.
- Khi chưa có BE, vào `/admin/...` sẽ thấy lỗi network (list rỗng) — đây là điều bình thường,
  các trang đã `.catch()` để không crash.
- Project `FE_updated` cũ không còn cần thiết; toàn bộ phần Admin đã nằm trong app chính.
```
