# Mapping Notes — FE ↔ API doc ↔ Database

Kết quả rà soát sau khi xoá mock data và nối `queries.ts` thẳng vào `realApi.ts`.

## 1. Đã xoá mock hoàn toàn
- Xoá `src/lib/mock-data.ts`, biến `USE_MOCK` / `VITE_USE_MOCK` trong `queries.ts` và `auth.tsx`.
- 4 chỗ còn lại dùng mock đã nối sang API thật: `app-shell.tsx`, `_authenticated.trash.tsx`,
  `_authenticated.cloud.tsx`, `_authenticated.profile.tsx`.
- Toàn bộ app giờ gọi BE thật ngay khi chạy (`npm run dev`) — chưa có BE sẽ thấy lỗi network,
  đó là điều bình thường, không phải bug.

## 2. Nơi gọi base URL (đã kiểm tra toàn bộ `src/`)
Chỉ có **một** nơi duy nhất build base URL: `src/lib/api.ts`
```ts
export const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:8080";
```
Mọi hàm trong `realApi.ts` đều đi qua hàm `api()` này — không có `fetch()`/`axios` rải rác nơi khác.
→ Khi đổi domain BE, chỉ cần sửa `.env.local` (đã tạo sẵn), không cần sửa code.

## 3. `.env.local` (đã tạo)
```
VITE_API_BASE=http://localhost:8080
```
Đổi giá trị này khi BE deploy ở domain khác. Đã thêm `.env*` vào `.gitignore`.

## 4. Đã sửa theo đúng API doc
- `ragApi.ask()`: API doc ghi `id`, `question` là **Request Params** (query string), code cũ gửi
  qua JSON body → đã sửa sang query string.

## 5. Gap — có trong DB nhưng chưa có trong API doc (đã chuẩn bị sẵn endpoint, cần BE xác nhận path)
- **Trash**: bảng `document` có cột `deleted_at` (soft delete) nhưng API doc không có endpoint
  list/restore/xoá vĩnh viễn. Đã thêm tạm `GET /api/documents/trash`,
  `PUT /api/documents/:id/restore`, `DELETE /api/documents/:id/permanent` trong `realApi.ts`
  — **cần BE xác nhận lại path thật**.
- **Storage quota**: không có bảng/cột nào lưu hạn mức lưu trữ theo user. `cloud.tsx` và
  `app-shell.tsx` hiện tính `used` từ tổng `file_size` của các document thật, còn `total` đang
  hardcode 5GB ở FE. Khi BE có gói payment/quota, thay hằng số này bằng dữ liệu thật.

## 6. Gap nghiêm trọng — Share là theo FOLDER trong DB, nhưng FE/realApi đang share theo DOCUMENT
Bảng `share` trong `V1__init_schema.sql`:
```sql
CREATE TABLE share (
    folder_id  UUID NOT NULL REFERENCES folder(id),
    owner_id   UUID NOT NULL,
    shared_account_id UUID,
    visibility VARCHAR(50),
    ...
);
```
→ Không có bảng share theo `document_id`. Nhưng `share-document-dialog.tsx`,
`useShareDocument()`, `useShareInfo()` trong FE lại thao tác theo `documentId`.

**Cần chọn 1 hướng trước khi BE implement:**
- (a) BE thêm bảng/endpoint share theo document, hoặc
- (b) Đổi FE sang share theo folder (đúng với DB hiện có).

Hiện tại `shareApi` trong `realApi.ts` vẫn để theo `documentId` để không phá UI, nhưng đã ghi
chú rõ trong code (`realApi.ts` → mục SHARE) — path/param cần BE xác nhận lại.

## 7. Gap khác — UI có field nhưng DB/API không có
- `Folder.description`: dùng trong `_authenticated.folders.tsx` nhưng bảng `folder` chỉ có
  `name` và `ai_summary`, không có `description`. Cần thêm cột hoặc đổi FE dùng `ai_summary`.
- `User.dob` (ngày sinh): dùng trong `auth.register.tsx`, `profile.tsx` nhưng bảng `account`
  không có cột `dob`. Cần BE thêm cột hoặc bỏ field này khỏi form đăng ký.
- `useAuth().requestPasswordReset / verifyResetOtp / resetPassword`: được gọi trong
  `auth.forgot-password.tsx` / `auth.reset-password.tsx` nhưng **chưa tồn tại** trong
  `AuthContext` (`auth.tsx`) lẫn API doc — luồng quên mật khẩu chưa có API tương ứng, cần BE
  bổ sung `/api/auth/forgot-password`, `/api/auth/verify-otp`, `/api/auth/reset-password`.
- ID types: `folder.id` là UUID (string) trong DB nhưng một số component cũ
  (`document-workspace.tsx`, `upload-document-dialog.tsx`, `AIChat.tsx`,
  `save-shared-document-dialog.tsx`, `_authenticated.documents.tsx`,
  `_authenticated.documents.$id.tsx`) vẫn so sánh/gán `folderId` như `number`. Chạy
  `npx tsc --noEmit` để thấy danh sách lỗi type cụ thể cần sửa ở từng component.

## 8. Việc cần làm tiếp (theo thứ tự ưu tiên)
1. Confirm với BE path thật cho: trash, share (theo doc hay folder), forgot/reset password.
2. Quyết định bổ sung cột `folder.description`, `account.dob` vào DB (hoặc bỏ field ở FE).
3. Sửa các component còn coi `folderId` là `number` sang `string` (UUID) — chạy `tsc --noEmit`
   để bắt hết.
4. Khi BE chạy thật: đổi `VITE_API_BASE` trong `.env.local`, chạy `npm run dev`, kiểm tra từng
   tab (auth, folder, document, share, rag, trash, cloud) theo đúng request/response thật.
