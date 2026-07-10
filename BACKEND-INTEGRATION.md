# Bỏ mock → nối Backend thật: cần gì?

## 1. Cách tắt mock (KHÔNG đổi code)

Trong file `.env`:

```env
VITE_API_BASE=http://localhost:4040   # URL backend thật của bạn
VITE_MOCK=0                            # 0 = tắt mock, dùng BE thật
```

Chỉ vậy. Toàn bộ FE code **không thay đổi gì** khi tắt mock — mọi request `/api/...`
sẽ đi thẳng ra `VITE_API_BASE` thay vì lớp mock trong bộ nhớ.

> Có thể xoá luôn `src/lib/mockApi.ts` và đoạn `if (MOCK_MODE)` trong `src/lib/api.ts`
> nếu không cần mock nữa. Không bắt buộc.

---

## 2. Endpoint BE thật CẦN BỔ SUNG (mới so với bản gốc)

Đây là những endpoint FE mới gọi qua các vòng chỉnh sửa. Chia theo mức độ bắt buộc.

### 2.1. BẮT BUỘC (không có sẽ lỗi tính năng)

| Endpoint | Method | Dùng cho | Body / Trả về |
| --- | --- | --- | --- |
| `/api/subjects` | GET | Kỳ + môn khi upload/sửa/dashboard | Trả `Subject[]`: `{ id, code, name, semester }` |
| `/api/admin/plans` | GET | Admin xem/sửa gói | `AdminPlan[]`: `{ id, name, description, storageGb, aiQuestions, price, isActive }` |
| `/api/admin/plans/:id` | PUT | Admin sửa giá trị gói | Body: `{ price?, storageGb?, aiQuestions?, description?, isActive? }` |

### 2.2. NÊN CÓ (có fallback — thiếu vẫn chạy nhưng kém tối ưu)

| Endpoint | Method | Fallback khi thiếu |
| --- | --- | --- |
| `/api/dashboard` | GET | FE tự dựng từ `folder/getall` + `documents` + `subjects` |
| `/api/plans` | GET | FE tự lấy từ `/api/admin/plans` (nhưng nên có endpoint public để user không cần quyền admin) |
| `/api/payment/quote?planId=&days=` | GET | FE tự tính proration ở client (`proration.ts`) |

### 2.3. Đã dùng field MỚI trên endpoint CŨ

| Endpoint | Field mới cần BE trả/nhận |
| --- | --- |
| `POST /api/documents` (upload) | Nhận **nhiều** phần `files` (multipart) + `subjectId`. Mỗi file → 1 document. |
| `PUT /api/documents/:id` (sửa) | Nhận thêm `subjectId` (ngoài `title, description, folderId`) |
| `POST /api/shares` (chia sẻ) | Nhận `documentId` (chia sẻ 1 file) HOẶC `folderId` (chia sẻ folder) |
| `GET /api/shares/owner` | Nên trả kèm `documentId` để lọc người được chia sẻ theo từng file |
| `GET /api/folder/getall` | Nên trả kèm `documentCount` mỗi thư mục (nếu không, FE tự đếm) |
| `GET /api/account/me` | Nên trả kèm `plan`, `planExpiresAt`, `planStartedAt` (hiển thị hạn gói) |
| `POST /api/payment/create` | Nhận `{ planId, days }`. Sau thanh toán, `me()` phải trả gói + `planExpiresAt` mới |

---

## 3. Thanh toán: khác biệt mock vs thật

- **Mock**: `POST /api/payment/create` cập nhật gói NGAY (giả lập thành công) và lưu localStorage.
- **Thật**: `POST /api/payment/create` trả `checkoutUrl` của cổng thanh toán (PayOS…).
  FE tự phát hiện: nếu `checkoutUrl` là link cổng thật → redirect sang đó. Sau khi
  webhook BE cập nhật gói, user quay lại và `GET /api/account/me` trả gói mới.

FE đã xử lý cả 2 nhánh sẵn trong `PremiumUpgradePage.tsx` (`handlePay`).

---

## 4. Số kỳ (semester)

Không phải endpoint — số kỳ là **hằng số trong code**: `src/lib/config.ts` → `SEMESTER_COUNT`.
BE chỉ cần cấp danh sách **môn** qua `/api/subjects` (mỗi môn có field `semester`).

---

## 5. Tóm tắt "đã thay đổi những gì" khi bỏ mock

Bản thân việc bỏ mock **không đổi dòng code FE nào** — chỉ đổi `VITE_MOCK=0`.
Những gì BE thật phải đáp ứng chính là danh sách ở mục 2 (endpoint mới) và mục 2.3
(field mới trên endpoint cũ). Nếu BE đã có sẵn các endpoint gốc và bổ sung phần
này, FE chạy thẳng không cần sửa.
