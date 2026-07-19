# Cập nhật UI & luồng nối Backend — Vòng bổ sung

Tài liệu này ghi lại các thay đổi trong đợt cập nhật theo yêu cầu:

1. Upload tài liệu phải chọn **Kỳ** và **Môn học** (chỉ áp dụng cho upload file).
2. Chia sẻ được **cả folder lẫn file**.
3. Admin **sửa được giá trị các gói nâng cấp**.
4. Hiển thị **thời hạn gói** của user (khi nào hết hạn).
5. **KHÔNG đổi gói giữa chừng** — thanh toán theo **số ngày**; khi nâng gói thì quy đổi số ngày còn lại ra tiền để bù trừ.
6. Admin **xem được file trước khi duyệt**.
7. **Dashboard người dùng** dựng lại theo ảnh thiết kế.

> App vẫn cần backend thật chạy tại `VITE_API_BASE` (mặc định `http://localhost:4040`).

---

## 1. Upload chọn Kỳ + Môn học

**Ý tưởng:** mỗi tài liệu thuộc 1 môn (`subjectId`), mỗi môn thuộc 1 kỳ (`semester`). Người dùng chọn Kỳ trước → danh sách Môn được lọc theo kỳ → chọn Môn.

| File | Thay đổi |
| --- | --- |
| `src/lib/types.ts` | Thêm interface `Subject { id, code, name, semester }`. |
| `src/lib/realApi.ts` | Thêm `subjectApi.list()` (`GET /api/subjects`) và `listBySemester(semester)` (`GET /api/subjects?semester=`). |
| `src/lib/queries.ts` | Thêm hook `useSubjects()`. |
| `src/routes/_authenticated/documents.tsx` | `UploadDialog` thêm 2 select **Kỳ học** + **Môn học** (bắt buộc), gửi kèm `subjectId` khi upload. Đổi kỳ sẽ reset môn. |
| `src/components/upload-document-dialog.tsx` | Component upload dùng chung cũng được cập nhật y hệt. |

**Điểm nối BE:**
- `GET /api/subjects` → trả `Subject[]` (kèm `semester`). Nếu BE hỗ trợ lọc, dùng `?semester=`; nếu không, FE tự lọc từ `list()`.
- `POST /api/documents` (multipart) đã sẵn field `subjectId` trong `documentApi.upload()`.

---

## 2. Chia sẻ cho cả folder và file

Tạo dialog dùng chung `ShareEntityDialog` cho **folder** (truyền `folderId`) hoặc **file** (truyền `documentId`).

| File | Thay đổi |
| --- | --- |
| `src/lib/types.ts` | `ShareRequest` giờ có cả `folderId?` và `documentId?` (truyền đúng 1). |
| `src/lib/realApi.ts` | `shareApi.shareFolder` nhận `ShareRequest` linh hoạt; thêm alias `shareApi.shareDocument`. |
| `src/lib/queries.ts` | `useShareFolder()` nhận `{ folderId?, documentId? }`; thêm alias `useShareDocument()`. |
| `src/components/share-entity-dialog.tsx` | **MỚI** — dialog chia sẻ dùng chung, mời theo email/username, hiển thị danh sách đã chia sẻ đúng tài nguyên, và link chia sẻ (`/shared/folder/:id` hoặc `/shared/document/:id`). |
| `src/components/document-actions-menu.tsx` | Menu "Chia sẻ" của file giờ mở `ShareEntityDialog` (trước đây chỉ hiện toast "đang phát triển"). |
| `src/routes/_authenticated/folders.tsx` | Bỏ `ShareFolderDialog` cũ, dùng chung `ShareEntityDialog` (kèm link chia sẻ). |

**Điểm nối BE:**
- `POST /api/shares` body `{ folderId | documentId, email | username, visibility }`. BE cần chấp nhận `documentId` để chia sẻ file đơn lẻ (tương tự folder).
- `GET /api/shares/owner` nên trả cả bản ghi có `documentId` để FE lọc danh sách người đã được chia sẻ theo từng file.

---

## 3. Admin sửa giá trị các gói nâng cấp

| File | Thay đổi |
| --- | --- |
| `src/features/admin/services/paymentApi.ts` | Thêm `adminGetPlans()` (`GET /api/admin/plans`) và `adminUpdatePlan(id, body)` (`PUT /api/admin/plans/:id`). Kiểu `AdminPlan { id, name, description, storageGb, aiQuestions, price, isActive }`. |
| `src/features/admin/hooks/usePayment.ts` | Thêm `useAdminPlans()` + `useUpdatePlan()`. |
| `src/features/admin/hooks/adminKeys.ts` | Thêm key `adminPlans()`. |
| `src/features/admin/components/AdminPremiumPage.tsx` | Thêm card **"Cấu hình gói nâng cấp"**: bảng cho phép admin sửa trực tiếp giá (30 ngày), dung lượng, số câu hỏi AI, bật/tắt gói. |

**Điểm nối BE:**
- `GET /api/admin/plans` → `AdminPlan[]`.
- `PUT /api/admin/plans/:id` body `{ price?, storageGb?, aiQuestions?, description?, isActive? }`.

---

## 4. Hiển thị thời hạn gói của user

| File | Thay đổi |
| --- | --- |
| `src/lib/types.ts` | `User` thêm `planExpiresAt?` và `planStartedAt?` (ISO string). |
| `src/routes/_authenticated/profile.tsx` | Thêm card **"Gói dịch vụ"**: gói hiện tại, ngày hết hạn, **số ngày còn lại**. |
| `src/features/payment/components/PremiumUpgradePage.tsx` | Thêm banner trạng thái gói + hạn dùng ở đầu trang. |

**Điểm nối BE:**
- `GET /api/account/me` cần trả thêm `planExpiresAt` (và tuỳ chọn `planStartedAt`).

---

## 5. Thanh toán theo số ngày + KHÔNG đổi gói giữa chừng (proration)

**Nguyên tắc:** không đổi gói trực tiếp giữa chừng. Người dùng chọn **số ngày**. Khi **nâng cấp** trong lúc gói cũ còn hạn: quy đổi số ngày còn lại của gói cũ thành tiền, trừ vào giá gói mới.

> Ví dụ: đang PLUS 99k/30 ngày, đã dùng 10 ngày (còn 20). Giá trị còn lại = 99k×20/30 = 66k. Nâng lên PREMIUM: 159k − 66k = **93k** cho 20 ngày còn lại.

| File | Thay đổi |
| --- | --- |
| `src/features/payment/proration.ts` | **MỚI** — hàm tính: `remainingDaysUntil`, `remainingValue`, `computeUpgrade`, `priceForDays`. Chu kỳ chuẩn 30 ngày. |
| `src/features/admin/services/paymentApi.ts` | Thêm `getUpgradeQuote(planId, days)` (`GET /api/payment/quote`) và `createPaymentByDays(planId, days)` (`POST /api/payment/create` body `{ planId, days }`). Kiểu `UpgradeQuote`. |
| `src/features/payment/components/PremiumUpgradePage.tsx` | Dựng lại: chọn số ngày (7/30/90/180/365 hoặc nhập tay); khi nâng cấp hiện bảng bù trừ (ngày còn lại, giá trị chưa dùng, thành tiền). **Chặn hạ gói** khi đang còn hạn. |

**Điểm nối BE:**
- `POST /api/payment/create` nên nhận `{ planId, days }` và tự tính proration khi user đang có gói còn hạn (FE đã preview, BE là nguồn số liệu cuối cùng).
- (Tuỳ chọn) `GET /api/payment/quote?planId=&days=` để BE trả số tiền chính xác cho FE hiển thị.

---

## 6. Admin xem file trước khi duyệt

| File | Thay đổi |
| --- | --- |
| `src/features/admin/components/FilePreviewDialog.tsx` | **MỚI** — dialog xem trước ảnh/PDF (iframe), fallback mở tab mới / tải xuống. |
| `src/features/admin/components/AdminFilesPage.tsx` | Mỗi dòng có nút **"Xem"**. Tại tab **Chờ duyệt**, nút **Duyệt/Từ chối** bị khoá cho tới khi admin đã bấm xem file. |
| `src/features/admin/components/AdminApprovalsPage.tsx` | Nút **"Xem file"** (tải chi tiết document để lấy URL); **Chấp nhận/Từ chối** chỉ bật sau khi đã xem. |
| `src/features/admin/types/admin.types.ts` | `ApprovalItem` + `ReportedFileItem` thêm `documentId?` (và `cloudinaryUrl?`, `mimeType?`). |
| `src/features/admin/services/approvalApi.ts` | Truyền kèm `documentId` xuống danh sách chờ duyệt. |

**Điểm nối BE:**
- Preview dùng `cloudinaryUrl` + `mimeType` từ `GET /api/documents/:id` (hoặc `GET /api/admin/documents`). Cần đảm bảo URL xem được (ảnh/PDF) hoặc cho tải xuống.

---

## 7. Dashboard người dùng dựng lại theo ảnh

`src/routes/_authenticated/dashboard.tsx` được viết lại gồm các khối:
- **Chào mừng trở lại** + phụ đề.
- **Sổ ghi chú gần đây** — 3 thẻ gradient tím (lấy từ folders gần đây).
- **Tài liệu gần đây** — danh sách + nút **"+ Tạo mới"**.
- **Môn học theo kỳ** — dải pill **Kỳ 1..9** (chọn kỳ).
- **Môn học kỳ N** — lưới thẻ môn học của kỳ đang chọn, kèm số tài liệu mỗi môn.

Dữ liệu lấy từ `useFolders`, `useDocuments`, `useSubjects`. Số tài liệu mỗi môn đếm theo `document.subjectId`.

---

## Tổng hợp file mới

- `src/components/share-entity-dialog.tsx`
- `src/features/payment/proration.ts`
- `src/features/admin/components/FilePreviewDialog.tsx`

Tất cả thay đổi build thành công (`npm run build`). Các cảnh báo `tsc` còn lại là **lỗi type có sẵn từ source gốc** (dự án dùng Vite/esbuild transpile-only), không phát sinh thêm từ đợt cập nhật này.

---

## 8. Mock data để chạy thử không cần backend

Đã thêm lớp mock data trong bộ nhớ để kiểm thử toàn bộ UI mà **không cần backend**.

| File | Vai trò |
| --- | --- |
| `src/lib/mockApi.ts` | **MỚI** — router mock cho toàn bộ endpoint (`/api/...`): auth, account, subjects, folder, documents, shares, reports, quiz/flashcard, payment, admin. Dữ liệu mẫu: user/admin, 12 môn theo kỳ, 3 thư mục, 4 tài liệu, thùng rác, chia sẻ, gói, giao dịch, báo cáo. |
| `src/lib/api.ts` | Thêm cờ `MOCK_MODE`; khi bật, mọi request đi qua `mockApi` thay vì `fetch` backend. |
| `src/features/admin/services/reportApi.ts` | `handleReportDecision` cũng đi qua mock khi bật cờ. |
| `.env` | Thêm `VITE_MOCK=1` (đổi `0` để dùng backend thật). |

### Cách chạy

```bash
npm install
npm run dev        # mở http://localhost:5173
```

### Tài khoản demo

| Vai trò | Username | Password | Ghi chú |
| --- | --- | --- | --- |
| Người dùng | `demo` | `demo` | gói **PLUS còn ~20 ngày** (để test proration/nâng cấp) |
| Quản trị | `admin` | `admin` | vào thẳng khu `admin_panel` |

### Gợi ý kiểm thử theo tính năng
- **Upload chọn kỳ/môn:** vào **Tài liệu → Upload**, chọn Kỳ rồi Môn.
- **Chia sẻ file:** menu "⋮" của một tài liệu → **Chia sẻ**. **Chia sẻ folder:** menu thư mục → **Share**.
- **Admin sửa gói:** đăng nhập `admin` → **Premium** → card *Cấu hình gói nâng cấp* → **Sửa**.
- **Hạn gói + proration:** đăng nhập `demo` → **Nâng cấp Premium** (thấy còn 20 ngày). Bấm **Nâng lên Premium** để xem bảng bù trừ; hoặc mua theo số ngày.
- **Admin xem trước khi duyệt:** `admin` → **Quản lý tài liệu** tab *Chờ duyệt* → nút **Xem** (mở PDF mẫu) rồi mới bấm **Duyệt/Từ chối**. Tương tự ở **Báo cáo file**.
- **Dashboard:** đăng nhập `demo` → trang chủ hiển thị Sổ ghi chú / Tài liệu gần đây / pill Kỳ 1–9 / môn theo kỳ.

> ⚠️ Mock lưu trong bộ nhớ nên **reset khi tải lại trang**. Tắt mock: đặt `VITE_MOCK=0` trong `.env`.

---

## 9. Bổ sung theo phản hồi (vòng 2)

### 9.1. Danh sách tài liệu hiện Kỳ + Môn
`src/routes/_authenticated/documents.tsx`: thêm **2 cột riêng** `Kỳ` và `Môn` (badge "Kỳ N" + mã môn), tra cứu từ `useSubjects()` theo `document.subjectId`.

### 9.2. Upload nhiều file cùng lúc
- `src/lib/types.ts`: `UploadDocumentRequest` thêm `files?: File[]` (giữ `file?` để tương thích).
- `src/lib/realApi.ts`: `documentApi.upload` append **nhiều** file vào field `files`.
- `documents.tsx` + `src/components/upload-document-dialog.tsx`: input `multiple`, hiển thị danh sách file đã chọn (xoá từng file), khi chọn >1 file thì mỗi file thành 1 tài liệu (lấy tên theo tên tệp), Kỳ/Môn/Thư mục áp dụng chung.
- `src/lib/mockApi.ts`: mock đọc `formData.getAll("files")` tạo nhiều document.

**Điểm nối BE:** `POST /api/documents` (multipart) nhận nhiều phần `files`; BE tách mỗi file thành 1 document, dùng chung `folderId`/`subjectId`.

### 9.3. Dashboard có điểm nối API cho BE
- `src/lib/realApi.ts`: thêm `dashboardApi.get()` (`GET /api/dashboard`) trả `DashboardData { recentNotes, recentDocuments, subjects, docCountBySubject }`.
- `src/lib/queries.ts`: thêm `useDashboard()` — gọi endpoint thật, **tự fallback** dựng payload từ folders/documents/subjects nếu BE chưa có.
- `src/routes/_authenticated/dashboard.tsx`: đọc dữ liệu từ `useDashboard()` thay vì gọi rời từng query.
- `src/lib/mockApi.ts`: thêm mock `GET /api/dashboard`.

**Điểm nối BE:** làm 1 endpoint `GET /api/dashboard` trả đúng shape `DashboardData` là dashboard tự chạy; chưa làm cũng không sao (fallback).

### 9.4. Admin: Thùng rác thành trang riêng
- `src/features/admin/components/AdminShell.tsx`: thêm lại mục **Thùng rác** vào sidebar (route `/admin_panel/trash` đã có sẵn `AdminTrashPage`).
- `src/features/admin/components/AdminFilesPage.tsx`: bỏ tab **Thùng rác** khỏi trang Quản lý tài liệu (tránh trùng).

### 9.5. Admin: nút đổi nền sáng/tối
`src/features/admin/components/AdminShell.tsx`: thêm nút **Sun/Moon** trên header, dùng `useTheme()` (cùng cơ chế toggle `dark` như phía user, lưu `localStorage`).

---

## 10. Bổ sung theo phản hồi (vòng 3)

### 10.1. Sổ ghi chú / thư mục hiện số file bên trong
- `src/lib/types.ts`: `Folder` thêm `documentCount?`.
- `src/lib/queries.ts` (`useDashboard` fallback): tính số tài liệu mỗi thư mục, gắn vào `recentNotes`.
- `src/routes/_authenticated/dashboard.tsx`: thẻ sổ ghi chú hiện **badge "N tài liệu"** + mô tả.
- `src/routes/_authenticated/folders.tsx`: mỗi thẻ thư mục hiện **"N tài liệu"** (đếm từ documents theo `folderId`).
- `src/lib/mockApi.ts`: `/api/folder/getall` và `/api/dashboard` trả kèm `documentCount`.

**Điểm nối BE:** `GET /api/folder/getall` (và `/api/dashboard`) nên trả `documentCount` mỗi thư mục; nếu không, FE tự đếm từ danh sách tài liệu.

### 10.2. Chỉnh sửa thông tin tài liệu
- `src/lib/types.ts`: `UpdateDocumentRequest` thêm `subjectId?`.
- `src/components/edit-document-dialog.tsx`: **MỚI** — dialog sửa tiêu đề, mô tả, **kỳ, môn**, thư mục.
- `src/components/document-actions-menu.tsx`: thêm mục **"Sửa thông tin"**; nhận thêm props `description`, `subjectId`.
- `src/routes/_authenticated/documents.tsx`: truyền `description` + `subjectId` xuống menu.

**Điểm nối BE:** `PUT /api/documents/:id` nhận `{ title?, description?, folderId?, subjectId? }`.

### 10.3. Sửa gói (admin) → đồng bộ ngay sang user
- `src/features/admin/services/paymentApi.ts`: thêm `getPlans()` (`GET /api/plans`, fallback `/api/admin/plans`) cho user đọc.
- `src/lib/queries.ts`: thêm `usePlans()` (cache key `["plans"]`).
- `src/features/admin/hooks/usePayment.ts`: `useUpdatePlan` sau khi lưu **invalidate cả `["plans"]`** → trang Premium của user tự cập nhật.
- `src/features/payment/components/PremiumUpgradePage.tsx`: đổi sang dùng `usePlans()` (thay vì fetch thủ công) nên nhận giá/thông số mới ngay; nút **Làm mới** cũng refetch.
- `src/lib/mockApi.ts`: thêm `GET /api/plans`. Tài khoản demo đổi sang gói **PRO (99k)** để khớp ví dụ proration (nâng Premium: 159 − 66 = 93k).

**Điểm nối BE:** nên có endpoint công khai `GET /api/plans` (user đọc); khi admin `PUT /api/admin/plans/:id` thì user tải lại sẽ thấy giá mới. Với mock: sửa gói ở admin → mở/refresh trang Premium của user thấy đổi ngay (cùng phiên).

> Kiểm thử nhanh vòng 3: đăng nhập `admin` → **Premium** → sửa giá gói Pro/Premium → Lưu. Sang tài khoản `demo` (hoặc mở trang **Nâng cấp Premium**, bấm *Làm mới*) sẽ thấy giá mới. *(Vì mock reset theo phiên, nên đổi giá và kiểm tra trong cùng phiên trước khi tải lại trang.)*

---

## 11. Bổ sung theo phản hồi (vòng 4)

### 11.1. Card thư mục trong AI box: tên nổi bật + MB/số tài liệu nhỏ + đổi thư mục
`src/components/ui/AIChat.tsx` (màn hình `/ai`): card góc trái giờ hiện **tên thư mục to**, dòng "`MB · N tài liệu`" nhỏ bên dưới. Nút folder bên phải mở **dropdown chọn thư mục khác** (điều hướng sang thư mục được chọn) + lối tắt "Quản lý thư mục". `FolderPanel.tsx` cũng chỉnh tên nổi bật cho đồng bộ.

### 11.2. "Tải lên tài liệu" thêm vào sidebar chính
`src/components/app-shell.tsx`: thêm nút **Tải lên tài liệu** ở cuối sidebar (thu gọn thành icon khi sidebar hẹp), mở `UploadDocumentDialog` (đã có chọn nhiều file + kỳ + môn).

### 11.3. Xem trước hiển thị THÔNG TIN FILE thay vì chỉ link
`src/components/document-viewer/PdfViewer.tsx`: khi không xem trước được, thay vì chỉ dòng lỗi + nút tải, hiện **thẻ thông tin file**: tên, loại tệp, kích thước, số trang, ngày tải lên, kèm nút *Mở tab mới* / *Tải xuống*. `DocumentViewer.tsx` truyền thêm `fileSize/mimeType/totalPages/createdAt` xuống.

### 11.4. Cài đặt user/admin
- User: menu avatar rõ ràng hơn — **"Hồ sơ của tôi"** (`/profile`) và **"Cài đặt & Bảo mật"** (`/admin` — trang *Cài đặt & Quyền riêng tư*: đổi mật khẩu, 2FA, phiên đăng nhập).
- Admin: đã có **"Hồ sơ"** trong sidebar + menu (`/admin_panel/profile` gồm thông tin tài khoản + đổi mật khẩu/bảo mật).

---

## 12. Bổ sung theo phản hồi (vòng 5)

### 12.1. Card thư mục hiện đúng TÊN (không còn chữ "Thư mục")
Nguyên nhân: hook `useFolder(id)` có điều kiện `enabled: id > 0` — với id dạng chuỗi ("f-1") phép so sánh luôn false nên **không bao giờ gọi API**, card rơi về chữ mặc định.
- `src/lib/queries.ts`: sửa `enabled` thành `!!id && id !== "0"` (hợp lệ cho id chuỗi).
- `src/components/ui/AIChat.tsx`: thêm fallback lấy tên từ danh sách `useFolders()` (hiện ngay cả khi chi tiết đang tải), và trạng thái "Đang tải…".

### 12.2. Số kỳ cấu hình trong CODE (không qua admin)
- `src/lib/config.ts`: **MỚI** — hằng số `SEMESTER_COUNT` (mặc định 9) và mảng `SEMESTERS`. Muốn đổi số kỳ chỉ cần sửa 1 con số ở đây.
- Các ô chọn kỳ (dashboard, upload, sửa tài liệu) dùng chung `SEMESTERS` thay cho số 9 rải rác. Danh sách môn vẫn lấy từ `GET /api/subjects` như cũ.
- (Đã bỏ ý tưởng trang admin quản lý môn theo yêu cầu — số kỳ chỉnh trong code.)

### 12.3. Nâng/đổi gói cập nhật thật, reload vẫn giữ
Nguyên nhân: mock chỉ trả `checkoutUrl` giả, không đổi gói của user; reload là mất.
- `src/lib/mockApi.ts`: `POST /api/payment/create` nay **cập nhật gói ngay** cho user hiện tại (tính ngày hết hạn, cộng dồn nếu cùng gói còn hạn) và **persist qua localStorage** (`mock:userPlan`) để reload vẫn giữ; `me()` nạp lại giá trị đã lưu.
- `src/features/payment/components/PremiumUpgradePage.tsx`: sau thanh toán (mock) gọi `reloadUser()` để cập nhật ngay trên UI, không cần reload. Với BE thật vẫn redirect sang cổng thanh toán như cũ.

**Điểm nối BE:** giữ nguyên `POST /api/payment/create` → trả `checkoutUrl` cổng thật; sau khi thanh toán thành công và webhook cập nhật gói, `GET /api/account/me` trả gói + `planExpiresAt` mới.

> Kiểm thử vòng 5: đăng nhập `demo` → **Nâng cấp Premium** → chọn Premium → Thanh toán → thấy gói đổi ngay và **reload vẫn giữ**. Muốn thử lại từ đầu: xoá key `mock:userPlan` trong localStorage (DevTools → Application → Local Storage). Đổi số kỳ: sửa `SEMESTER_COUNT` trong `src/lib/config.ts`.

---

## 13. Bổ sung theo phản hồi (vòng 6)

### 13.1. Admin sửa dung lượng gói → user thấy đúng (không còn kẹt 15GB)
Nguyên nhân: mock giữ gói trong bộ nhớ, reload là mất chỉnh sửa; và dung lượng ở sidebar user đọc từ `user.storageGb` cũ.
- `src/lib/mockApi.ts`: chỉnh sửa gói của admin nay **persist qua localStorage** (`mock:plans`) — reload vẫn giữ. Các endpoint đọc gói (`/api/plans`, `/api/admin/plans`, `payment/create`) đều nạp lại giá trị đã lưu.
- `GET /api/account/me` **đồng bộ `storageGb` theo gói hiện tại** — admin đổi Pro thành 5GB thì user gói Pro thấy quota 5GB (cả thẻ gói lẫn thanh dung lượng sidebar).

**Điểm nối BE:** khi admin `PUT /api/admin/plans/:id`, BE lưu vào DB; `GET /api/plans` và `me()` (storageGb theo gói) trả giá trị mới.

### 13.2. Kéo dài các ô — trang Nâng cấp & Hồ sơ
- `PremiumUpgradePage.tsx`: bỏ `max-w-4xl`, 2 thẻ gói giãn full chiều ngang, hết khoảng trắng thừa bên phải.
- `profile.tsx`: nới `max-w-3xl` → `max-w-5xl` cho các ô thông tin dài ra.

### 13.3. Trang Cài đặt dựng lại theo Figma
`src/routes/_authenticated/admin.tsx` (route `/admin`) viết lại gọn theo thiết kế:
- Tiêu đề **"Cài đặt"**.
- Card **"Thông tin tài khoản"**: avatar chữ cái, họ tên, email, "Thành viên từ …", nút *Chỉnh sửa thông tin* (sang `/profile`).
- Card **"Bảo mật"**: 3 dòng bấm được (Đổi mật khẩu, Xác thực 2 lớp kèm badge, Phiên đăng nhập) mỗi dòng có mũi tên.
- Modal **"Phiên đăng nhập"**: liệt kê thiết bị (Chrome-Windows 11 "Hiện tại", Safari-iPhone 15, Firefox-macOS), nút *Đăng xuất* từng phiên + *Đăng xuất tất cả thiết bị khác*.
- Bớt khoảng trắng: gộp các card rời thành 2 nhóm gọn thay vì 4 card tách biệt.

---

## 14. Bổ sung theo phản hồi (vòng 7)

### 14.1. Dung lượng gói chỉnh được theo MB hoặc GB
- `src/lib/config.ts`: thêm `MB_PER_GB`, `gbToMb`, `mbToGb`, `formatStorage` (hiển thị MB nếu < 1 GB, ngược lại GB — bỏ số 0 thừa).
- `AdminPremiumPage.tsx` (Cấu hình gói): ô sửa dung lượng nay có **số + chọn đơn vị MB/GB**; đổi đơn vị tự quy đổi giá trị. Hệ thống vẫn lưu chuẩn theo GB (số thập phân) nên tương thích BE cũ.
- `PremiumUpgradePage.tsx`: thẻ gói hiển thị dung lượng bằng `formatStorage` (ví dụ "10 MB", "5 GB").
- Nhờ `me()` đồng bộ storage theo gói + quy đổi `storageGb * 1024³` ra bytes: đặt gói **10 MB** thì giới hạn thật = 10 MB → thầy cô test tải nhiều file để xem hệ thống báo vượt quota thế nào (trang Lưu trữ Cloud + thanh sidebar chuyển đỏ "Vượt giới hạn").

**Điểm nối BE:** vẫn dùng `storageGb` (cho phép số thập phân, ví dụ 0.00977 = 10 MB). Không cần thêm field.

### 14.2. Trang Lưu trữ Cloud gọn lại, bớt khoảng trắng
`src/routes/_authenticated/cloud.tsx`: gộp 3 card rời (tổng quan + 2 ô + bảng chi tiết trùng lặp) thành **1 card duy nhất**: dòng tổng quan + trạng thái, thanh tiến trình, và 3 chỉ số (Số tài liệu · Giới hạn · Còn trống) trên cùng một hàng. Sửa tiêu đề "Cloud đã sài" → **"Lưu trữ Cloud"**.

---

## 15. Gỡ bỏ mock data

Đã gỡ hoàn toàn lớp mock để dùng backend thật:
- Xoá `src/lib/mockApi.ts`.
- `src/lib/api.ts`: bỏ `MOCK_MODE` và nhánh `if (MOCK_MODE)` — mọi request đi thẳng ra `VITE_API_BASE`.
- `src/features/admin/services/reportApi.ts`: bỏ nhánh mock + import không dùng.
- `.env`: bỏ `VITE_MOCK`, chỉ còn `VITE_API_BASE`.

Toàn bộ tính năng đã làm (chia sẻ, upload nhiều file, kỳ/môn, sửa tài liệu, proration gói, xem file, dashboard, cấu hình dung lượng MB/GB…) **giữ nguyên**. Xem `BACKEND-INTEGRATION.md` để biết BE cần cung cấp endpoint/field gì.
