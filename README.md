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
