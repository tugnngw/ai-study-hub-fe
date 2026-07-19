<<<<<<< HEAD
# AI Study Hub — Frontend

Ứng dụng web quản lý tài liệu học tập có tích hợp AI (chatbot, tóm tắt, flashcard, quiz),
kèm khu **quản trị** (admin) để duyệt tài liệu, quản lý người dùng và thùng rác.

Phiên bản này đã được chuyển từ **TanStack Start** sang **Vite + React + React Router v7**.

---

## 1. Công nghệ sử dụng

| Thành phần        | Lựa chọn                          |
|-------------------|-----------------------------------|
| Build tool        | Vite 8                            |
| UI library        | React 19                          |
| Routing           | React Router v7 (`createBrowserRouter`) |
| Data fetching     | TanStack Query v5 (`@tanstack/react-query`) |
| Styling           | Tailwind CSS v4                   |
| UI components      | Radix UI + shadcn/ui              |
| Form & validation | react-hook-form + zod             |
| Icons             | lucide-react                      |
| Toast             | sonner                            |
| Ngôn ngữ          | TypeScript                        |

---

## 2. Yêu cầu & cách chạy

Yêu cầu: **Node.js ≥ 18** và npm.

```bash
npm install        # cài dependencies
npm run dev        # chạy môi trường dev (mặc định http://localhost:5173)
npm run build      # build production -> thư mục dist/
npm run preview    # xem thử bản build production
npm run lint       # kiểm tra lint
```

---

## 3. Cấu hình Backend

Tạo file `.env.local` ở thư mục gốc (đã có sẵn), đặt URL của backend:

```
VITE_API_BASE=http://localhost:8080
```

- Biến **bắt buộc có tiền tố `VITE_`** thì Vite mới đọc được ở phía client.
- Sau khi sửa `.env.local` phải **khởi động lại `npm run dev`** thì giá trị mới có hiệu lực.
- Khi deploy, đổi `VITE_API_BASE` sang domain thật của backend.
- App **không dùng mock data** — mọi dữ liệu đều gọi API thật. Khi chưa có BE, các trang
  sẽ hiển thị trạng thái rỗng (empty state) và đăng nhập sẽ báo lỗi mạng.

---

## 4. Cấu trúc thư mục

```
src/
├── main.tsx                 # Điểm vào: providers (QueryClient, AuthProvider, Toaster) + RouterProvider
├── router.tsx               # Khai báo TẬP TRUNG toàn bộ route (createBrowserRouter)
├── styles.css               # Tailwind + design tokens (màu, font)
├── routes/                  # Mỗi file là 1 trang (export component thường)
├── components/
│   ├── ui/                  # Component dùng chung (shadcn/ui) + AIChat
│   ├── admin/               # Sidebar / header / phân trang của khu admin
│   └── *.tsx                # app-shell, dialog upload/share/report, document-workspace...
└── lib/
    ├── api.ts               # HTTP client gốc + tokenStore (đọc VITE_API_BASE)
    ├── realApi.ts           # Toàn bộ API người dùng (auth, documents, folders, share, rag, quiz...)
    ├── adminApi.ts          # API khu quản trị (dashboard, users, approvals, files, trash)
    ├── queries.ts           # Các hook TanStack Query bọc quanh realApi
    ├── auth.tsx             # AuthContext (login/logout/me) — gọi API thật
    ├── types.ts            # Định nghĩa kiểu dữ liệu khớp với BE
    └── utils.ts            # Helper (formatBytes, formatDate, cn...)
```

> Lưu ý: tên file trong `routes/` vẫn giữ tiền tố `_authenticated.` / `_admin.` từ thời
> file-based routing cũ, **chỉ để gợi nhớ trang đó thuộc layout nào** — giờ việc nối route
> do `router.tsx` quyết định, không còn tự động theo tên file.

---

## 5. Sơ đồ định tuyến (routing)

Tất cả khai báo trong `src/router.tsx`. Có 3 nhóm layout:

### Trang công khai
| Đường dẫn | Trang |
|-----------|-------|
| `/`       | Trang chào mừng (Welcome) |

### Khu xác thực — layout nền gradient (`/auth`)
| Đường dẫn | Trang |
|-----------|-------|
| `/auth` | Tự chuyển hướng tới `/auth/login` |
| `/auth/login` | Đăng nhập người dùng |
| `/auth/register` | Đăng ký |
| `/auth/forgot-password` | Quên mật khẩu (gửi OTP) |
| `/auth/reset-password` | Đặt lại mật khẩu |

### Khu người dùng — bọc trong `AppShell` (sidebar + header dung lượng)
| Đường dẫn | Trang |
|-----------|-------|
| `/dashboard` | Trang chủ (ghi chú gần đây, tài liệu, môn học theo kỳ) |
| `/documents` | Tài liệu của tôi (grid thư mục) |
| `/documents/:id` | Chi tiết một tài liệu |
| `/folders/:id` | Mở một thư mục (kèm AI workspace) |
| `/shared` | Tài liệu chia sẻ (được chia sẻ với tôi / tôi đã chia sẻ) |
| `/trash` | Thùng rác |
| `/cloud` | Bộ nhớ (thống kê dung lượng) |
| `/aichat` | Khu AI chatbot (nhận `?folderId=&docId=`) |
| `/profile` | Hồ sơ cá nhân |
| `/settings` | Cài đặt & bảo mật |

### Khu quản trị — layout sidebar tím (`/admin`)
| Đường dẫn | Trang |
|-----------|-------|
| `/admin/login` | Đăng nhập quản trị (trang riêng, ngoài layout admin) |
| `/admin` | Tự chuyển hướng tới `/admin/dashboard` |
| `/admin/dashboard` | Bảng điều khiển (thống kê + hoạt động) |
| `/admin/users` | Quản lý người dùng |
| `/admin/files` | Quản lý tài liệu bị báo cáo |
| `/admin/approvals` | Lịch sử phê duyệt |
| `/admin/trash` | Thùng rác hệ thống (file / tài khoản) |

---

## 6. Luồng đăng nhập

- **Người dùng**: vào `/auth/login`, đăng nhập xong → `/dashboard` (hoặc `/admin` nếu là tài khoản ADMIN).
- **Quản trị**: nút "Cổng quản trị" ở trang login dẫn tới `/admin/login` (form riêng) → `/admin`.
- Việc **kiểm tra quyền truy cập** (chỉ ADMIN mới vào được khu admin) hiện do **Backend** đảm nhiệm;
  phía FE không chặn theo role. BE cần kiểm tra quyền trên từng API admin.

---

## 7. Tầng gọi API

- `src/lib/api.ts` — HTTP client gốc: ghép `VITE_API_BASE`, tự gắn `Authorization: Bearer <token>`
  (token lưu qua `tokenStore`), xử lý lỗi và body rỗng.
- `src/lib/realApi.ts` — gom theo nhóm: `authApi`, `accountApi`, `semesterApi`, `subjectApi`,
  `folderApi`, `documentApi`, `shareApi`, `ragApi`, `quizApi`, `flashcardApi`.
- `src/lib/adminApi.ts` — nhóm admin: `dashboardApi`, `userApi`, `approvalApi`, `fileApi`.
- `src/lib/queries.ts` — các hook React Query (`useDocuments`, `useFolders`, `useTrash`...)
  để component dùng trực tiếp.

Muốn đổi đường dẫn endpoint cho khớp BE: sửa path trong các file `realApi.ts` / `adminApi.ts`.

---

## 8. Ghi chú khi nối Backend

- Một vài thống kê chưa có chỗ trong DB nên đặt tạm ở FE: **hạn mức dung lượng 15 GB**
  (hardcode trong `app-shell.tsx` và trang `/cloud`).
- Tab "Tôi đã chia sẻ" và một số hàm auth (`requestPasswordReset`, `resetPassword`...) đang
  chờ BE cung cấp endpoint tương ứng.
- Khi BE sẵn sàng, đảm bảo bật kiểm tra quyền ADMIN ở backend cho mọi route `/admin/*`.
=======
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
>>>>>>> origin/admin-added
