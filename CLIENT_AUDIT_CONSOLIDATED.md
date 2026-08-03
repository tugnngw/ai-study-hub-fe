# Client-Side Logic Audit (Consolidated)

## 1. Logic nghiệp vụ / tài chính (cần chuyển lên server)
*   **Tính tiền proration nâng cấp gói**: ✅ ĐÃ XONG (Chuyển lên server, xóa `proration.ts`)
*   **Doanh thu + số giao dịch PAID**: ✅ ĐÃ XONG (Sử dụng API `/api/admin/dashboard/revenue`)
*   **Retention policy (xóa 30 ngày)**: `src/features/admin/services/fileApi.ts` hardcode logic.
*   **Tính dung lượng đã dùng**: `cloud.tsx`, `app-shell.tsx`, `AIChat.tsx` dùng `reduce` tính `fileSize` (rủi ro sai sót nếu phân trang).
*   **Chấm điểm quiz**: `QuizzesTab.tsx` và `QuizViewer.tsx` tính điểm tại client, không lưu kết quả.

## 2. Logic nghiệp vụ & Xử lý dữ liệu tại client
*   **Đếm tài liệu theo folder**: `src/lib/queries.ts` đếm thủ công bằng loop.
*   **Fetch N+1 subjects**: `src/lib/queries.ts` fetch all semesters rồi tới từng subjects.
*   **Lọc tài liệu BANNED/REJECT**: `AIChat.tsx`, `ContentPanel.tsx`, `FolderPanel.tsx`, `SharedWorkspace.tsx`, `ai.tsx` (Rủi ro bảo mật: API vẫn trả dữ liệu).
*   **Search/Sort/Pagination client-side**: `shares`, `documents`, `folders`, `subjects`, `reported` (làm nặng client, sai sót nếu dữ liệu lớn).
*   **Mock success thanh toán**: ✅ ĐÃ XONG (Dùng API status, không dùng URL flag)
*   **Dựng User giả**: `useAuth.tsx` và `auth.tsx` dựng object `User` thủ công khi `/me` fail.
*   **Parse chuỗi lỗi**: `login.tsx`, `verify-email.tsx` dựa vào substring error message (dễ vỡ khi đổi i18n).
*   **Encode/Decode ID**: `src/lib/id-encoder.ts` (không sử dụng, nhưng là logic client).
*   **Cloudinary/File detection**: `cloudinaryUtils.ts`, `fileTypeDetection.ts` fetch trực tiếp từ client.
*   **Polling trạng thái**: ✅ ĐÃ XONG (Dùng polling tập trung cho thanh toán, đã bỏ polling `/me`)

## 3. Auth & Token Logic
*   **LocalStorage**: Lưu `auth_token` / `refresh_token` trong `localStorage` (dễ bị XSS).
*   **Refresh token**: `api.ts`, `auth.tsx` quản lý vòng đời token (cạnh tranh nhau).
*   **Token trong URL query**: `oauth-success.tsx` (access_token, refresh_token), `verify-email.tsx`, `reset-password.tsx` (otp).
*   **Auth Guard**: Chỉ ở tầng client (redirect, không thay thế cho backend filter).
*   **Logout**: Chỉ clear local, không revoke triệt để server session.

## 4. Rủi ro bảo mật tổng hợp
*   **XSS**: Token trong localStorage.
*   **Bypass**: Client-side filter (BANNED docs).
*   **Rò rỉ**: Thông tin nhạy cảm qua URL query (tokens/OTP).
*   **Tung tin giả**: ✅ ĐÃ XONG (Đã bỏ mock payment, không giả lập user)
*   **Sai lệch**: ✅ ĐÃ XONG (Backend tự tính toán tài chính / quota)

## 5. Hiệu năng & TODO
*   **N+1 requests**: `app-shell.tsx` fetch mọi query bất kể trang cần hay không.
*   **Log/Debug**: Log nhạy cảm (token, debug map) còn trong production.
*   **TODO/HACK**: `AdminProfilePage` form giả không gọi API, `MOCK_SESSIONS`.
