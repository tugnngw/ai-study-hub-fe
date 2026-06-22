# AI Study Hub — FE (Vite + React Router)

Phiên bản này được chuyển từ TanStack Start sang **Vite + React + React Router v7**.

## Chạy
```bash
npm install
npm run dev      # chạy dev (Vite)
npm run build    # build production
```

## Cấu hình BE
Đặt URL backend trong `.env.local`:
```
VITE_API_BASE=http://localhost:8080
```

## Routing
- File các trang nằm trong `src/routes/` (component thường, không còn file-based routing).
- Cây route khai báo tập trung ở `src/router.tsx` (createBrowserRouter).
- Layout: `/auth/*` (nền gradient), khu user (AppShell), `/admin/*` (sidebar tím).
- Cổng quản trị có trang đăng nhập riêng `/admin/login`.

Không dùng mock data — toàn bộ gọi API thật qua `src/lib/realApi.ts`.
