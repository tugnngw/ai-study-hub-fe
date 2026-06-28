# AI Study Hub — Frontend (Admin + Payment/Premium)

## Tổng quan

- Người dùng có `role === "ADMIN"` khi đăng nhập sẽ tự động được chuyển hướng vào
  khu quản trị `/admin_panel`.
- Người dùng thường truy cập khu thanh toán qua sidebar: **Nâng cấp Premium** và
  **Lịch sử giao dịch**.

> **Lưu ý:** Bản này **không còn mock data**. Toàn bộ service trả về dữ liệu rỗng
> và sẵn sàng nối API thật (xem mục "Nối backend"). Khi chưa có backend, các trang
> sẽ hiển thị trống — đây là trạng thái mong muốn.

---

## So với bản trước (`ai-study-hub-fe-admin-added`)

Bản `ai-study-hub-fe-payment-premium` = bản admin trước **+ tính năng Payment/Premium**.

### Thêm mới
- `features/payment/` — feature người dùng: Nâng cấp Premium + Lịch sử giao dịch.
  - `components/PremiumUpgradePage.tsx` — luồng 3 bước: chọn gói → chọn phương thức
    nạp tiền → màn chuyển khoản ngân hàng (ACB) chờ xác nhận.
  - `components/TransactionHistoryPage.tsx` — bảng lịch sử mua gói.
- `features/admin/components/AdminPremiumPage.tsx` — trang **Quản lý Premium** (admin):
  4 thẻ thống kê + tab lọc (Tất cả / Plus / Pro) + bảng lịch sử giao dịch nâng cấp
  (chỉ xem, không có nút duyệt).
- `features/admin/components/PlanBadge.tsx` — badge gói FREE / Plus / Pro dùng chung.
- `features/admin/services/premiumApi.ts`, `paymentApi.ts` — service Premium/Payment.
- `features/admin/hooks/usePremium.ts`, `usePayment.ts` — hook TanStack Query.
- Route: `routes/admin_panel/premium.tsx`, `routes/_authenticated/premium.tsx`,
  `routes/_authenticated/transactions.tsx`.

### Sửa
- `features/admin/components/AdminUsersPage.tsx` — thêm cột **Gói** (FREE/Plus/Pro).
- `features/admin/components/AdminShell.tsx` — thêm mục **Premium** vào sidebar admin.
- `features/admin/components/AdminProfilePage.tsx` — bố cục 2 cột, giảm khoảng trắng.
- `features/admin/types/admin.types.ts` — thêm type: `PlanId`, `PremiumRequestItem`,
  `PremiumStats`, `TransactionItem`, `PlanOption`, `TopUpMethod`… và `plan` cho user.
- `features/admin/hooks/adminKeys.ts`, `hooks/index.ts`, `services/index.ts` — mở rộng.
- `components/app-shell.tsx` — thêm 2 link **Nâng cấp Premium** + **Lịch sử giao dịch**.

---

## Cấu trúc thư mục

```
src/
├── components/
│   └── app-shell.tsx                 # [SỬA] sidebar user + 2 link premium/transactions
├── features/admin/
│   ├── index.ts                      # barrel: components/hooks/services/types
│   ├── types/admin.types.ts          # [SỬA] domain type (gồm Premium/Payment)
│   ├── services/                     # tầng gọi API (hiện trả rỗng, chờ backend)
│   │   ├── dashboardApi.ts
│   │   ├── userApi.ts
│   │   ├── fileApi.ts
│   │   ├── approvalApi.ts
│   │   ├── premiumApi.ts             # [MỚI]
│   │   ├── paymentApi.ts             # [MỚI]
│   │   └── index.ts
│   ├── hooks/                        # tầng data (TanStack Query)
│   │   ├── adminKeys.ts
│   │   ├── useAdminDashboard.ts
│   │   ├── useAdminUsers.ts
│   │   ├── useAdminFiles.ts
│   │   ├── useAdminApprovals.ts
│   │   ├── usePremium.ts             # [MỚI]
│   │   ├── usePayment.ts             # [MỚI]
│   │   └── index.ts
│   └── components/
│       ├── AdminShell.tsx            # layout + sidebar (đã thêm Premium)
│       ├── AdminDashboardPage.tsx
│       ├── AdminUsersPage.tsx        # [SỬA] thêm cột Gói
│       ├── AdminFilesPage.tsx
│       ├── AdminApprovalsPage.tsx
│       ├── AdminTrashPage.tsx
│       ├── AdminProfilePage.tsx      # [SỬA] bố cục 2 cột
│       ├── AdminPremiumPage.tsx      # [MỚI] Quản lý Premium
│       ├── PlanBadge.tsx             # [MỚI] badge gói
│       └── index.ts
├── features/payment/                 # [MỚI] feature người dùng
│   ├── index.ts
│   └── components/
│       ├── PremiumUpgradePage.tsx    # luồng nâng cấp + thanh toán
│       ├── TransactionHistoryPage.tsx
│       └── index.ts
└── routes/
    ├── admin_panel/                  # khu quản trị (path /admin_panel)
    │   ├── route.tsx                 # guard: chỉ role ADMIN
    │   ├── index.tsx                 # /admin_panel            → Dashboard
    │   ├── users.tsx                 # /admin_panel/users
    │   ├── files.tsx                 # /admin_panel/files
    │   ├── approvals.tsx             # /admin_panel/approvals
    │   ├── trash.tsx                 # /admin_panel/trash
    │   ├── premium.tsx               # /admin_panel/premium     [MỚI]
    │   └── profile.tsx               # /admin_panel/profile
    └── _authenticated/
        ├── premium.tsx               # /premium       (Nâng cấp Premium)   [MỚI]
        └── transactions.tsx          # /transactions  (Lịch sử giao dịch)  [MỚI]
```

---

## Tuyến đường (routes)

### Khu quản trị — `/admin_panel` (yêu cầu `role === "ADMIN"`)
| Path | Trang |
|------|-------|
| `/admin_panel` | Dashboard |
| `/admin_panel/users` | Quản lý Users (có cột Gói) |
| `/admin_panel/files` | Quản lý tài liệu (báo cáo vi phạm) |
| `/admin_panel/approvals` | Phê duyệt tài liệu |
| `/admin_panel/trash` | Thùng rác |
| `/admin_panel/premium` | Quản lý Premium (thống kê + lịch sử giao dịch) |
| `/admin_panel/profile` | Hồ sơ quản trị |

### Khu người dùng — dưới `_authenticated` (yêu cầu đăng nhập)
| Path | Trang |
|------|-------|
| `/premium` | Nâng cấp Premium (chọn gói → nạp tiền → chuyển khoản) |
| `/transactions` | Lịch sử giao dịch |

---

## Luồng đăng nhập admin

1. Đăng nhập tại `/auth/login` bằng tài khoản backend trả về `role: "ADMIN"`.
2. Trang `/dashboard` phát hiện admin → tự chuyển hướng sang `/admin_panel`.
3. `routes/admin_panel/route.tsx` chặn: chưa đăng nhập → `/auth/login`;
   đã đăng nhập nhưng không phải admin → `/dashboard`.

---

## Gói (Plan)

Thống nhất 3 gói: **FREE / PLUS / PRO** (`PlanId` trong `admin.types.ts`).
Giao dịch chỉ áp dụng cho PLUS và PRO.

---

## Quy ước kiến trúc

- **features/**: mỗi feature tự quản lý `components / hooks / services / types`.
- **components/** (gốc): chỉ layout & UI dùng chung (Shadcn `ui/`, `app-shell`).
- **routes/**: chỉ là lớp presentation, import trang từ `features/`.
- Không đặt business logic trong `components/`, `hooks/` (kỹ thuật), `lib/`.
