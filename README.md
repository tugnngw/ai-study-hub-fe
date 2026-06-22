# AI Study Hub — Frontend

Ứng dụng web quản lý tài liệu học tập tích hợp AI (RAG chatbot, quiz, flashcard).
Stack: **Vite 8 + React 19 + React Router v7 + TanStack Query 5 + Tailwind v4 + shadcn/ui (Radix)**.

Toàn bộ dữ liệu lấy từ BE thật qua `src/lib/realApi.ts` & `src/lib/adminApi.ts` — **không có mock data**.

---

## 1. Cài đặt & chạy

```bash
npm install
npm run dev       # chạy dev server (Vite)
npm run build     # build production
npm run preview   # xem thử bản build
npm run lint      # kiểm tra ESLint
```

### Cấu hình BE
Tạo file `.env.local` ở thư mục gốc:

```
VITE_API_BASE=http://localhost:8080
```

> Client tự ghép `${VITE_API_BASE}/api` + path. Nếu không khai báo, mặc định là `http://localhost:8080`.

---

## 2. Cách FE gọi API

| File | Vai trò |
|------|---------|
| `src/lib/api.ts` | HTTP client gốc. Tự gắn `Authorization: Bearer <token>`, parse JSON/text, ném `ApiError`. Khi gặp **401** thì tự xoá token. |
| `src/lib/realApi.ts` | Map 1-1 với endpoint BE cho khu **người dùng**. |
| `src/lib/adminApi.ts` | Map 1-1 với endpoint BE cho khu **quản trị**. |
| `src/lib/queries.ts` | Các hook TanStack Query (`useQuery`/`useMutation`) bọc quanh realApi. |
| `src/lib/auth.tsx` | `AuthProvider` + `useAuth()` — lưu user, login/logout/register. |
| `src/lib/types.ts` | Toàn bộ TypeScript types, map theo schema DB. Khi BE đổi tên field → sửa ở đây. |

### Token
- Lưu trong `localStorage` với key `auth_token` (và `refresh_token` nếu có).
- BE cần trả về `{ token, refreshToken?, user }` ở endpoint login.

---

## 3. Sơ đồ route

```
/                         Trang giới thiệu (public)
/admin/login              Đăng nhập quản trị (ngoài layout admin)

/auth/*                   Layout nền gradient
  /auth/login             Đăng nhập
  /auth/register          Đăng ký
  /auth/forgot-password   Quên mật khẩu
  /auth/reset-password    Đặt lại mật khẩu

(AppShell - khu người dùng)
  /dashboard              Trang chính
  /documents              Tài liệu & thư mục
  /documents/:id          Chi tiết tài liệu
  /folders/:id            Chi tiết thư mục
  /cloud                  Quản lý lưu trữ
  /shared                 Tài liệu chia sẻ
  /trash                  Thùng rác
  /aichat                 Chat AI (RAG)
  /profile                Hồ sơ cá nhân
  /settings               Cài đặt

/admin/*                  Layout sidebar tím
  /admin/dashboard        Thống kê
  /admin/users            Quản lý người dùng
  /admin/files            Tài liệu bị báo cáo
  /admin/approvals        Lịch sử duyệt
  /admin/trash            Thùng rác hệ thống
```

> **Phân quyền:** FE **không** guard quyền truy cập. Việc chặn user thường vào `/admin/*` do **BE kiểm soát** (kiểm tra `role = ADMIN` qua token). FE chỉ điều hướng.

---

## 4. KHU NGƯỜI DÙNG — chi tiết từng mục

### 4.1. Đăng nhập / Đăng ký / Quên mật khẩu
- **Đăng nhập** (`/auth/login`): gọi `POST /api/auth/login` → lưu token, lấy `user`.
- **Đăng ký** (`/auth/register`): gọi `POST /api/auth/register`. Sau khi đăng ký, user đăng nhập lại (hoặc auto-login nếu BE trả token).
- **Đăng xuất**: `POST /api/auth/logout` + xoá token local.
- **Lấy thông tin user hiện tại**: `GET /api/account/me` (gọi khi app khởi động nếu có token).

> 🔧 **BE cần thêm:** luồng **Quên mật khẩu** & **Đặt lại mật khẩu** chưa có endpoint. Dự kiến:
> - `POST /api/auth/forgot-password` body `{ email }` → gửi mail/OTP.
> - `POST /api/auth/reset-password` body `{ token, newPassword }`.

### 4.2. Dashboard (`/dashboard`)
- **Sổ ghi chú gần đây**: lấy từ `GET /api/documents`, sắp xếp theo `createdAt` giảm dần, hiển thị 3 cái mới nhất.
- **Môn học theo kỳ**: dùng `GET /api/subject/getbysemester/:semesterId`.

### 4.3. Tài liệu & Thư mục (`/documents`, `/folders/:id`, `/documents/:id`)
**Thư mục (Folder):**
- Danh sách: `GET /api/folder/getall`
- Chi tiết: `GET /api/folder/getbyid/:id`
- Tạo: `POST /api/folder/create` body `{ name }`
- Đổi tên: `PUT /api/folder/update/:id` body `{ name }`
- Xoá: `DELETE /api/folder/delete/:id`

**Tài liệu (Document):**
- Danh sách: `GET /api/documents`
- Theo thư mục: `GET /api/documents/folder/:folderId`
- Chi tiết: `GET /api/documents/:id`
- Cập nhật: `PUT /api/documents/:id` body `{ title?, description?, folderId? }`
- Xoá mềm: `DELETE /api/documents/:id` (set `deleted_at`)
- Tải xuống: `GET /api/documents/:id/download` → `{ url, expiresAt? }`

**Luồng upload (2 bước, xem `useUploadDocument`):**
1. `POST /api/documents` (multipart: `file`, `title`, `description?`, `folderId?`, `subjectId?`) → tạo record, trả `id`.
2. `POST /api/rag/upload` (multipart: `file`, `documentId`) → chunk + nhúng vector cho RAG.

> Nếu bước 2 lỗi, FE vẫn giữ document và đánh dấu `ragUploadFailed` (không chặn user).

### 4.4. Chat AI / RAG (`/aichat`)
- Hỏi đáp theo tài liệu: `POST /api/rag/ask?id=<documentId>&question=<...>` → `{ answer, referencedChunks? }`.
- Nhận query param `folderId` và `docId` từ URL.
- Upload thêm cho RAG: `POST /api/rag/upload` hoặc `POST /api/rag/upload/chunk`.

### 4.5. Cloud — Quản lý lưu trữ (`/cloud`)
- Tính dung lượng đã dùng = tổng `fileSize` của tất cả document (`GET /api/documents`).
- Gộp dung lượng theo thư mục.

> 🔧 **BE cần thêm:** DB **chưa có cột quota** theo user. Hạn mức hiện **hardcode 15 GB** ở FE (`QUOTA_GB` trong `_authenticated.cloud.tsx`). Khi có endpoint quota (vd `GET /api/account/storage` → `{ usedBytes, quotaBytes }`) thì thay hằng số này.

### 4.6. Chia sẻ (`/shared`)
- Tài liệu được chia sẻ cho tôi: `GET /api/documents/shared`
- Thông tin chia sẻ của 1 tài liệu: `GET /api/documents/:id/share`
- Chia sẻ qua email: `POST /api/documents/:id/share` body `{ email }`
- Gỡ khỏi danh sách được chia sẻ: `DELETE /api/documents/shared/:shareId`
- Lưu tài liệu chia sẻ vào thư mục của tôi: `POST /api/documents/:sharedDocId/save` body `{ folderId, title, description? }`
- Báo cáo tài liệu: `POST /api/documents/:id/report` body `{ reason, description? }`

> 🔴 **BE cần xác nhận — MISMATCH với DB:**
> - Bảng `share` lưu theo **folder** (`folder_id, owner_id, shared_account_id`), nhưng FE đang thao tác theo **documentId**. Cần BE chốt: share theo file hay theo folder, rồi đồng bộ path.
> - Chưa có endpoint tổng hợp **"tài liệu tôi đã chia sẻ đi"**. Dự kiến `GET /api/documents/shared-by-me` (suy theo REST, **chưa confirm**).

### 4.7. Thùng rác (`/trash`)
- Danh sách đã xoá: `GET /api/documents/trash`
- Khôi phục: `PUT /api/documents/:id/restore`
- Xoá vĩnh viễn: `DELETE /api/documents/:id/permanent`

> 🔧 **BE cần xác nhận:** 3 endpoint này **chưa có trong API doc**, được suy ra từ cột `deleted_at` trong schema. Cần BE confirm path trước khi lên production.

### 4.8. Hồ sơ (`/profile`)
- Hiển thị thông tin từ `GET /api/account/me`.
- Cập nhật hồ sơ: `PUT /api/account/me` body `{ fullName?, email?, dob?, address?, course? }`.

> 🔧 **BE cần xác nhận:** `PUT /api/account/me` **chưa có trong API doc** (suy theo REST). Các field `dob`, `address`, `course` cũng cần BE bổ sung vào bảng `account` hoặc bảng phụ.

### 4.9. Cài đặt (`/settings`)
- Đổi mật khẩu: `POST /api/account/change-password` body `{ currentPassword, newPassword }`.

> 🔧 **BE cần xác nhận:** endpoint đổi mật khẩu **chưa có trong API doc**.

### 4.10. Quiz & Flashcard (đã code FE, chờ BE)
Hook và API client đã viết sẵn trong `quizApi` / `flashcardApi` (`realApi.ts`) nhưng **toàn bộ endpoint chưa có ở BE**:

**Quiz:**
- `GET /api/quiz?documentId=:id`
- `POST /api/quiz/generate` body `{ documentId, questionCount }`

**Flashcard:**
- `GET /api/flashcard?documentId=:id`
- `POST /api/flashcard/generate` body `{ documentId }`
- `PUT /api/flashcard/:id/progress` body `{ status }`  (`new | learning | mastered`)

> 🔧 **BE cần thêm:** triển khai các bảng `quiz`, `question`, `quiz_attempt`, `quiz_answer`, `flashcard`, `flashcard_progress` và các endpoint trên.

---

## 5. KHU QUẢN TRỊ (ADMIN) — chi tiết từng mục

Đăng nhập tại `/admin/login` (dùng chung `POST /api/auth/login`; BE kiểm tra `role = ADMIN`).
Tất cả API admin nằm trong `src/lib/adminApi.ts`.

### 5.1. Dashboard (`/admin/dashboard`)
- `GET /api/admin/dashboard/stats` → 
  ```
  { totalUsers, totalDocs, downloads,
    usersTrend, docsTrend, downloadsTrend,
    activities: [{ id, action, user, time }] }
  ```

### 5.2. Quản lý người dùng (`/admin/users`)
- Danh sách: `GET /api/admin/users` → `[{ id, name, email, status }]` (`status`: "Hoạt động" | "Khóa")
- Khoá/mở khoá: `PATCH /api/admin/users/:id/toggle-status`
- Xoá: `DELETE /api/admin/users/:id`

### 5.3. Tài liệu bị báo cáo (`/admin/files`)
- Danh sách báo cáo: `GET /api/admin/files/reported` →
  `[{ id, name, uploader, size, reports, reportedBy: { name, reason, detail } }]`
- Xử lý báo cáo: `PATCH /api/admin/files/reported/:id/decision` body `{ decision }` (`remove | reject`)

### 5.4. Lịch sử duyệt (`/admin/approvals`)
- Danh sách chờ duyệt: `GET /api/admin/approvals/pending` →
  `[{ id, title, uploader, size, result }]`
- Duyệt: `PATCH /api/admin/approvals/:id/approve`
- Từ chối: `PATCH /api/admin/approvals/:id/reject`

### 5.5. Thùng rác hệ thống (`/admin/trash`)
- File đã xoá: `GET /api/admin/trash/files` → `[{ id, name, deletedDate, remainingDays }]`
- Tài khoản đã xoá: `GET /api/admin/trash/accounts` → `[{ id, name, deletedDate, remainingDays }]`
- Khôi phục: `POST /api/admin/trash/:type/:id/restore` (`type`: `file | account`)
- Xoá vĩnh viễn: `DELETE /api/admin/trash/:type/:id`

> 🔧 **BE cần thêm:** toàn bộ nhóm `/api/admin/*` ở trên là **giao diện đã có sẵn ở FE**, cần BE triển khai endpoint khớp tên và shape JSON như mô tả. Field như `remainingDays`, `reports`, `usersTrend`... cần BE tính sẵn rồi trả về.

---

## 6. Tổng hợp các điểm BE cần xử lý

| Mức độ | Endpoint / Hạng mục | Ghi chú |
|--------|---------------------|---------|
| 🔧 Thêm mới | `POST /api/auth/forgot-password`, `POST /api/auth/reset-password` | Luồng quên/đặt lại mật khẩu |
| 🔧 Xác nhận | `PUT /api/account/me` | Cập nhật hồ sơ + field `dob/address/course` |
| 🔧 Xác nhận | `POST /api/account/change-password` | Đổi mật khẩu |
| 🔧 Xác nhận | `/api/semester/*`, `/api/subject/*` | Path suy theo REST, chưa có trong doc |
| 🔧 Xác nhận | `/api/documents/trash`, `/restore`, `/permanent` | Suy từ `deleted_at` |
| 🔴 Mismatch | `/api/documents/*/share` | DB `share` theo folder nhưng FE theo document |
| 🔧 Thêm mới | `GET /api/documents/shared-by-me` | Danh sách tài liệu tôi đã chia sẻ đi |
| 🔧 Thêm mới | `GET /api/account/storage` (hoặc tương đương) | Quota lưu trữ — FE đang hardcode 15 GB |
| 🔧 Thêm mới | `/api/quiz/*`, `/api/flashcard/*` | FE đã sẵn sàng, BE chưa có |
| 🔧 Thêm mới | Toàn bộ `/api/admin/*` | FE đã sẵn sàng, BE cần triển khai khớp shape |

**Quy ước response:** nếu BE bọc dữ liệu trong `{ data, message, success }` hoặc phân trang `{ content, totalElements, totalPages, page, size }`, đã có sẵn type `ApiResponse<T>` / `PagedResponse<T>` trong `types.ts` để dùng.

---

## 7. Cấu trúc thư mục

```
src/
├── components/
│   ├── admin/        # component riêng khu quản trị (vd phân trang)
│   └── ui/           # shadcn/ui + component dùng chung (AIChat, ...)
├── lib/              # api client, queries, auth, types, utils
├── routes/           # các trang (component thường, không file-based routing)
├── router.tsx        # khai báo cây route tập trung (createBrowserRouter)
├── main.tsx          # entry point
└── styles.css        # Tailwind + theme
```
