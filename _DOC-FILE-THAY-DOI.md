# Các file đã thay đổi so với bản gốc

Gói này chỉ chứa **những file khác với bản gốc** (`ai-study-hub-fe-final-demo-v1.zip`),
giữ nguyên cấu trúc thư mục.

## Cách dùng

Giải nén và **copy đè** toàn bộ nội dung vào thư mục gốc của dự án:

```bash
# từ thư mục chứa gói này
cp -r ./* /đường/dẫn/tới/ai-study-hub-fe-final-demo-v1/
```

Sau đó chạy lại:

```bash
npm install
npm run build
```

---

## Thống kê

| Loại | Số lượng |
| --- | --- |
| File **thêm mới** | 7 |
| File **sửa** | 28 |
| File **xóa** | 0 |
| **Tổng** | **35** |

---

## 1. FILE THÊM MỚI (7)

| File | Tác dụng |
| --- | --- |
| `src/lib/config.ts` | Hằng số `SEMESTER_COUNT` (số kỳ) + tiện ích dung lượng MB/GB |
| `src/components/share-entity-dialog.tsx` | Dialog chia sẻ dùng chung cho cả folder lẫn file |
| `src/components/edit-document-dialog.tsx` | Dialog sửa thông tin tài liệu (tiêu đề, mô tả, kỳ, môn, thư mục) |
| `src/features/admin/components/FilePreviewDialog.tsx` | Admin xem trước file trước khi duyệt |
| `src/features/payment/proration.ts` | Tính tiền đổi/nâng gói theo số ngày còn lại |
| `BACKEND-INTEGRATION.md` | Hướng dẫn nối Backend (endpoint/field cần bổ sung) |
| `CHANGELOG-UPDATE.md` | Nhật ký thay đổi chi tiết |

---

## 2. FILE SỬA (28)

### Cấu hình
- `.env` — bỏ `VITE_MOCK`, chỉ còn `VITE_API_BASE`

### Core / API (4)
- `src/lib/types.ts` — thêm `Subject`, `documentCount`, `planExpiresAt`, `subjectId`, `files[]`
- `src/lib/realApi.ts` — thêm `subjectApi`, `dashboardApi`, upload nhiều file, share file
- `src/lib/queries.ts` — thêm `useSubjects`, `useDashboard`, `usePlans`; sửa bug `useFolder`
- `src/components/app-shell.tsx` — nút "Tải lên tài liệu" ở sidebar, nhãn menu cài đặt

### Trang người dùng (6)
- `src/routes/_authenticated/dashboard.tsx` — dựng lại theo thiết kế
- `src/routes/_authenticated/documents.tsx` — 2 cột Kỳ/Môn, upload nhiều file
- `src/routes/_authenticated/folders.tsx` — hiện số tài liệu, dùng dialog share chung
- `src/routes/_authenticated/profile.tsx` — card "Gói dịch vụ" + hạn dùng
- `src/routes/_authenticated/cloud.tsx` — gộp card, bớt khoảng trắng
- `src/routes/_authenticated/admin.tsx` — trang Cài đặt dựng lại theo Figma

### Component (5)
- `src/components/document-actions-menu.tsx` — thêm "Sửa thông tin", share file thật
- `src/components/upload-document-dialog.tsx` — chọn kỳ/môn, nhiều file
- `src/components/ui/AIChat.tsx` — card thư mục hiện tên + đổi thư mục
- `src/components/document-viewer/DocumentViewer.tsx` — truyền metadata xuống viewer
- `src/components/document-viewer/PdfViewer.tsx` — hiện thông tin file khi không xem được
- `src/components/document-workspace/FolderPanel.tsx` — tên thư mục nổi bật

### Admin (9)
- `src/features/admin/components/AdminPremiumPage.tsx` — cấu hình gói (giá, dung lượng MB/GB, AI)
- `src/features/admin/components/AdminFilesPage.tsx` — nút Xem, khóa duyệt tới khi xem
- `src/features/admin/components/AdminApprovalsPage.tsx` — nút Xem file trước khi xử lý
- `src/features/admin/components/AdminShell.tsx` — nav Thùng rác + toggle sáng/tối
- `src/features/admin/hooks/usePayment.ts` — `useAdminPlans`, `useUpdatePlan`
- `src/features/admin/hooks/adminKeys.ts` — thêm key `adminPlans`
- `src/features/admin/services/paymentApi.ts` — API quản lý gói + thanh toán theo ngày
- `src/features/admin/services/approvalApi.ts` — truyền `documentId`
- `src/features/admin/services/reportApi.ts` — bỏ nhánh mock
- `src/features/admin/types/admin.types.ts` — thêm `documentId`, `cloudinaryUrl`, `mimeType`

### Thanh toán (1)
- `src/features/payment/components/PremiumUpgradePage.tsx` — chọn số ngày, bù trừ khi nâng gói

---

> Chi tiết đầy đủ (tác dụng + điểm nối Backend cho từng thay đổi) xem trong
> `CHANGELOG-UPDATE.md` và `BACKEND-INTEGRATION.md`.
