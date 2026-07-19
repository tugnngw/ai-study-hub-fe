<<<<<<< HEAD
<<<<<<< HEAD
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
=======
# Trang Chia sẻ (CHỈ folder) — Thay đổi & Điểm nối FE ↔ BE

> **Lưu ý quan trọng:**
> - Phần Chia sẻ chỉ áp dụng cho **thư mục (folder)**, không chia sẻ file đơn lẻ.
> - Khi NHẬN một folder chia sẻ, **backend tự lưu** vào "Tài liệu của tôi" của người
>   nhận — **không có nút "Lưu"** thủ công ở giao diện.
> - Bản này **không dùng mock** — app gọi thẳng backend (cần backend chạy mới hiển thị).

Tài liệu gồm 3 phần:
1. Thay đổi đã làm (Thêm / Sửa / Xóa).
2. Điểm nối FE ↔ BE (endpoint + shape).
3. Giải thích luồng Mở (dữ liệu nằm ở đâu).

---

# PHẦN 1 — THAY ĐỔI

## ✅ Thêm mới
| File | Vai trò |
|------|---------|
| `src/features/shares/components/SharePage.tsx` | Trang Chia sẻ theo figma: tìm kiếm, sắp xếp, 3 tab (Tất cả / Được chia sẻ với tôi / Tôi đã chia sẻ), 2 bảng, menu hành động, phân trang, avatar. |
| `src/features/shares/components/index.ts` | Barrel export components. |
| `src/features/shares/services/shareApi.ts` | Tầng gọi API: lấy danh sách + hành động (xóa, link, tải). |
| `src/features/shares/services/index.ts` | Barrel export services. |

## ✏️ Sửa
| File | Sửa gì |
|------|--------|
| `src/features/shares/types/share.types.ts` | Type figma: `SharePerson` (tên + avatar), `SharedWithMeItem`, `SharedByMeItem`, `ShareSort`. (Folder-only — không có `type`/`kind`.) |
| `src/features/shares/index.ts` | Export thêm `components` + `services`. |
| `src/routes/_authenticated/shared.tsx` | Render `SharePage` mới (trang cũ đọc sai shape nên trống). |
| `src/components/app-shell.tsx` | Thêm link "Cài đặt" vào menu avatar (cạnh "Hồ sơ"). |

## 🗑️ Xóa
- `SaveFileDialog.tsx` (modal "Lưu File") — bỏ vì nhận folder là tự lưu, không cần Lưu thủ công.
- Nút "Lưu" trong menu bảng "Được chia sẻ với tôi".
- Toàn bộ lớp mock (`src/lib/mock/`, cờ `VITE_USE_MOCK`).
- Field `type`/`kind` (file) khỏi types/component/service — chỉ còn folder.

---

# PHẦN 2 — ĐIỂM NỐI FE ↔ BE

Tất cả ở `src/features/shares/services/shareApi.ts`; kiểu dữ liệu ở `types/share.types.ts`.

## 2.1. Lấy danh sách (hiển thị)
| Method | Endpoint | Trả về |
|--------|----------|--------|
| GET | `/api/shares/with-me` | `SharedWithMeItem[]` |
| GET | `/api/shares/by-me`   | `SharedByMeItem[]` |

```ts
interface SharePerson { name: string; avatarUrl?: string | null }

interface SharedWithMeItem {
  id: number;            // id THẬT của folder (để Xóa đúng — xem 2.2)
  name: string;          // tên thư mục
  size: string;          // "11.4mb"
  items: number;         // số mục trong thư mục
  sharedBy: SharePerson; // người chia sẻ (tên + avatar)
  time: string;          // "21 giờ trước"
  order: number;         // số: lớn = mới hơn -> sắp xếp Mới/Cũ nhất
}
interface SharedByMeItem {
  id: number;
  name: string;
  size: string;
  items: number;
  sharedWith: SharePerson[]; // người được chia sẻ (cột hiện avatar + tên người đầu, dư "+N")
  time: string;
  order: number;
}
```
→ Tên, dung lượng, thời gian, người chia sẻ, danh sách người được chia sẻ, avatar
đều lấy trực tiếp từ 2 response trên.

## 2.2. Hành động (menu ⋯)
**Bảng "Được chia sẻ với tôi":** Mở · Tải xuống · Xóa
**Bảng "Tôi đã chia sẻ":** Mở · Sao chép link · Xóa

| Hành động | Method | Endpoint | Trả về |
|-----------|--------|----------|--------|
| **Xóa** | DELETE | `/api/folder/delete/:id` | — |
| **Sao chép link** | GET | `/api/shares/:id/link` | `{ url }` |
| **Tải xuống** | GET | `/api/shares/:id/download` | `{ url }` |

**Nút Xóa:** chỉ chia sẻ folder, nên Xóa = `DELETE /api/folder/delete/:id` — đây chính
là nguồn mà trang `/trash` đọc (`/api/documents/trash`), nên mục bị xóa SẼ xuất hiện
trong Thùng rác. **Điều kiện:** `id` của mục chia sẻ phải là id folder THẬT.

## 2.3. Hành vi UI đã nối sẵn (FE tự xử)
- **Sắp xếp Mới/Cũ nhất** → sort client theo `order`.
- **Phân trang** → 4 mục/trang, tự ẩn khi ≤ 4.
- **Tìm kiếm** → lọc theo tên thư mục + tên người chia sẻ.
- **Avatar** → có `avatarUrl` hiện ảnh; rỗng hiện chữ cái đầu.
- **Cột "Chia sẻ với"** → avatar + tên người đầu, dư ra hiện "+N".

## 2.4. ⚠️ Còn phụ thuộc BE
- **Sao chép link**: link do BE sinh ở `/api/shares/:id/link`. Dán ra kết quả gì là
  tùy BE tạo link + có route xử lý link đó hay không.
- **Mở đúng nội dung trong AI chat**: xem PHẦN 3.

---

# PHẦN 3 — LUỒNG MỞ (dữ liệu nằm ở đâu)

- **Chưa mở / chưa nhận** — folder nằm ở tài khoản người chia sẻ; người nhận chỉ có
  "quyền truy cập" (bản ghi share).
- **Bấm "Mở"** — điều hướng sang AI chat `/ai` và AIChat ĐỌC TRỰC TIẾP folder gốc của
  người chia sẻ để hỏi đáp (theo quyền). Không tạo bản sao tại bước này.
- **Tự lưu khi nhận** — khi người nhận thực sự nhận folder, BE tự tạo bản sao vào
  "Tài liệu của tôi" của họ (không qua thao tác Lưu thủ công).

### Điểm cần BE để "Mở" đúng nội dung
Hiện FE truyền `folderId: "shared-<id>"` (chuỗi tạm) khi mở. Để AIChat mở đúng folder
gốc, BE cần trả **folderId THẬT** của mục chia sẻ (thêm vào response 2.1), rồi sửa
`openInAI` trong `SharePage.tsx`:
```ts
// navigate({ to: "/ai", search: { folderId: it.realFolderId } })
```
Route `/ai` yêu cầu search `{ folderId: string, docId?: number }`.
>>>>>>> origin/update/feature/share
=======
# Chức năng Quizzes — Thay đổi & Khu vực theo Checklist


---

## A. THAY ĐỔI (Thêm / Sửa / Xóa)

### ✅ Thêm mới
| File | Nội dung |
|------|----------|
| `src/features/quiz/types/quiz.types.ts` (cuối file) | Bổ sung type cho UI quiz: `QuizQuestionType`, `QuizGenerateOptions`, `QuizItem`. |

### ✏️ Sửa
| File | Sửa gì |
|------|--------|
| `src/components/document-workspace/QuizzesTab.tsx` | Viết lại: từ mock cứng → 2 màn (Tùy chọn khởi tạo + Làm bài) có chấm điểm. |
| `src/components/ui/AIChat.tsx` | Tab "AI Quizzes" trước render rỗng → render `<QuizzesTab>`; thêm import. |
| `src/lib/realApi.ts` | Thêm `quizApi.generateAdvanced({scope,types,questionCount})` trả `QuizItem[]`; import type `QuizItem`. |


---

## B. KHU VỰC CHO TỪNG CHECKLIST

### ☑ 1. Flow Quizzes + chuyển từ trong session qua Quizzes
- `src/components/ui/AIChat.tsx`
  - Dòng 245: nút tab `onClick={() => setActiveTab("quizzes")}` — chuyển sang Quizzes.
  - Dòng 363–365: khi `activeTab === "quizzes"` → render `<QuizzesTab folderId docId title>`.
- `src/components/document-workspace/QuizzesTab.tsx`
  - Dòng 76: `if (phase === "setup")` → màn Tùy chọn.
  - Dòng 145 trở đi: màn Làm bài. Flow: setup → tạo → làm → nộp → chấm.

### ☑ 2. UI tùy chọn khởi tạo (loại câu hỏi + số câu)
- `src/components/document-workspace/QuizzesTab.tsx`
  - Dòng 12: `TYPE_LABELS` — 3 loại: trắc nghiệm / đúng-sai / nhiều đáp án.
  - Dòng 113–129: khối "Loại câu hỏi", chọn được nhiều loại (`toggleType`).
  - Dòng 135–137: "Số câu hỏi" slider (3–20).
  - Dòng 140: nút "Tạo Quiz" → `generate()`.

### ☑ 2b. Chọn tài liệu tham chiếu: phổ danh sách folder + tùy chọn All
- `src/components/document-workspace/QuizzesTab.tsx`
  - Dòng 8 + 19: `useDocumentsByFolder(folderId)` — lấy danh sách tài liệu trong thư mục.
  - Dòng 89: nhãn "Tài liệu tham chiếu".
  - Dòng 96: tùy chọn **"Tất cả tài liệu trong thư mục"** (`scope = "all"`) — quiz bao hàm toàn bộ file.
  - Dòng 99: `docs.map(...)` — liệt kê từng tài liệu để chọn 1 file cụ thể.

### ☑ (Thêm) Đồng bộ tài liệu tham chiếu theo tài liệu đang mở
- Dòng 27: `useEffect(() => setScope(docId ?? "all"), [docId])` — chọn tài liệu ở tab trên/list trái thì tham chiếu tự đổi theo.

### ☑ (Thêm) Chấm điểm
- Dòng 215: "Nộp bài" → `setSubmitted(true)`.
- Dòng 161: hiển thị "Điểm: X / N".
- Tô xanh (đúng) / đỏ (sai) từng đáp án; hỗ trợ câu nhiều đáp án.

---

## C. ĐIỂM NỐI BACKEND
- `src/lib/realApi.ts` (dòng 220): `quizApi.generateAdvanced` → `POST /api/quiz/generate`
  body `{ scope: "all" | documentId, types: string[], questionCount }`, trả `QuizItem[]`
  (`{ id, type, question, options[], correctAnswers[] }`).
- ⚠️ Backend cần hiện thực endpoint này nhận `scope` + `types` (API cũ `generate` chỉ có documentId + questionCount).
>>>>>>> origin/update/feature/AI/Quiz
