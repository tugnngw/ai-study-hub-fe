# Tổng hợp Thay đổi UI (Ghim / Gắn sao / Sidebar / AIChat) — Theo Checklist

---

## A. THAY ĐỔI (Thêm / Sửa / Xóa)

### ✅ Thêm mới

| File                                      | Nội dung                                                                                                                                                                                              |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/lib/preferences.ts` (dòng 51, 77–79) | Thêm store `useStarredSharedDocuments` — gắn sao/bỏ sao cho mục "Được chia sẻ với tôi", lưu localStorage (tái dùng cơ chế `createIdSetStore` đã có sẵn cho `useStarredFolders`/`usePinnedDocuments`). |

### ✏️ Sửa

| File                                                   | Sửa gì                                                                                                                                                                                                                    |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/components/document-actions-menu.tsx`             | Thêm mục **Ghim / Bỏ ghim** vào menu "⋮" của tài liệu (dùng trong AIChat). Import `Pin/PinOff`, dùng `usePinnedDocuments`.                                                                                                |
| `src/components/ui/AIChat.tsx`                         | (1) Sắp xếp tài liệu đã ghim lên đầu danh sách "TÀI LIỆU ĐANG CÓ" + hiện icon 📌. (2) Tab "AI Flashcards" trước render rỗng → render `<FlashcardsTab>`. (3) Tab "AI Summary" trước render rỗng → hiện `document.summary`. |
| `src/features/shares/components/SharedWithMeTable.tsx` | Thêm cột icon ☆ đầu mỗi dòng để gắn sao nhanh; thêm mục **Gắn sao / Bỏ gắn sao** vào menu "•••"; sắp xếp mục đã gắn sao lên đầu danh sách.                                                                                |
| `src/components/app-shell.tsx`                         | Trạng thái thu/phóng sidebar (`collapsed`) được lưu vào `localStorage`, không bị reset khi tải lại trang.                                                                                                                 |
| `src/routes/__root.tsx`                                | Sửa lỗi cú pháp JSX có sẵn trong code gốc: thẻ `</head>` bị lặp 2 lần khiến app không build được.                                                                                                                         |
| `src/routes/index.tsx`                                 | Trang chủ (`/`) luôn hiển thị chế độ sáng — tự gỡ class `dark` khỏi `<html>` khi mount, khôi phục lại khi rời trang.                                                                                                      |

### ❌ Xóa

| File                                           | Lý do                                                                                                                                                               |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/lib/mockApi.ts`                           | Gỡ toàn bộ lớp mock data (login, folder, document, flashcard, quiz, chia sẻ) đã thêm để test UI khi chưa có backend — theo yêu cầu chuyển hẳn về dùng backend thật. |
| `src/lib/api.ts` (đoạn `if (MOCK_MODE) {...}`) | Bỏ nhánh chặn request sang mock; mọi request lại đi thẳng qua `fetch()` thật như code gốc.                                                                          |
| `.env` (`VITE_MOCK_MODE`)                      | Bỏ biến bật/tắt mock mode, chỉ giữ `VITE_API_BASE`.                                                                                                                 |

---

## B. KHU VỰC CHO TỪNG CHECKLIST

### ☑ 1. Ghim tài liệu trong AIChat

- `src/components/document-actions-menu.tsx`
  - Dòng 32–33: lấy `isPinned`/`togglePin` từ `usePinnedDocuments()`.
  - Dòng 98–107: nút **Ghim / Bỏ ghim** trong dropdown menu, nằm sau "Xóa".
- `src/components/ui/AIChat.tsx`
  - Dòng 78–80: sort `docs` theo `isPinned` — tài liệu ghim lên đầu.
  - Dòng 183–184: hiện icon 📌 (`Pin`, tô vàng) cạnh tên file đã ghim trong danh sách "TÀI LIỆU ĐANG CÓ".

### ☑ 2. Gắn sao trong "Được chia sẻ với tôi"

- `src/lib/preferences.ts`
  - Dòng 51: tạo store `starredSharedDocumentsStore` (localStorage riêng).
  - Dòng 77–79: export hook `useStarredSharedDocuments()`.
- `src/features/shares/components/SharedWithMeTable.tsx`
  - Dòng 24, 26: lấy `isStarred`/`toggleStar`, sort danh sách theo trạng thái sao.
  - Dòng 42–51: icon ☆ riêng đầu mỗi dòng, bấm trực tiếp để gắn/bỏ sao.
  - Dòng 70–72: mục **Gắn sao / Bỏ gắn sao** trong menu "•••" (sau "Xóa").

### ☑ 3. Tab "AI Flashcards" / "AI Summary" trong AIChat

- `src/components/ui/AIChat.tsx`
  - Dòng 4: import `FlashcardsTab` từ `document-workspace/FlashcardsTab`.
  - Dòng 362–377: tab `summary` → hiện `document.summary`, có fallback khi chưa chọn tài liệu / chưa có tóm tắt.
  - Dòng 379–382: tab `flashcards` → render `<FlashcardsTab documentId title>` (trước đó là `<div>` rỗng, không gọi component thật nào).

### ☑ 4. Sidebar thu/phóng — nhớ trạng thái

- `src/components/app-shell.tsx`
  - Dòng 58–63: key localStorage + hàm đọc trạng thái ban đầu `getInitialCollapsed()`.
  - Dòng 75, 78–82: `setCollapsed` ghi đè cả state lẫn localStorage mỗi lần đổi.
  - Dòng 125, 130, 192: 3 nơi gọi `setCollapsed` (nút trong sidebar header + nút trên topbar) đều dùng chung hàm này nên luôn đồng bộ và được lưu lại.

### ☑ (Sửa lỗi) Build app bị crash do JSX

- `src/routes/__root.tsx`: gỡ thẻ `</head>` thừa (lỗi sẵn có trong source gốc, không liên quan các tính năng trên) khiến Vite báo `SyntaxError: Expected corresponding JSX closing tag for <html>`.

### ☑ (Gỡ bỏ) Toàn bộ mock data

- `src/lib/mockApi.ts` — xóa file.
- `src/lib/api.ts` — bỏ nhánh `if (MOCK_MODE)`, trả về luồng `fetch()` thật như ban đầu.
- `.env` — bỏ `VITE_MOCK_MODE`.

---

## C. ĐIỂM NỐI BACKEND

Các tính năng **Ghim** và **Gắn sao** ở trên là state thuần client-side (`localStorage`), **chưa có** field tương ứng ở backend — giống cách `useStarredFolders` cho trang Folders đã làm từ trước. Nếu muốn đồng bộ đa thiết bị, cần:

- Backend bổ sung field `pinned: boolean` cho `Document` và `starred: boolean` (hoặc bảng riêng) cho share-item.
- Frontend thay `usePinnedDocuments()` / `useStarredSharedDocuments()` bằng gọi API thật (`documentApi.update(id, {pinned})`, `shareApi.toggleStar(id)`...) qua `src/lib/realApi.ts` + hook trong `src/lib/queries.ts`, theo đúng pattern hiện có của `folderApi`/`documentApi`.

⚠️ Toàn bộ mock data (login, folders, file, tài liệu, chia sẻ) đã bị xóa — app hiện **bắt buộc cần backend thật chạy tại `VITE_API_BASE`** (`http://localhost:4040`) để hoạt động, kể cả đăng nhập.
