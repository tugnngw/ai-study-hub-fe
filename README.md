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
