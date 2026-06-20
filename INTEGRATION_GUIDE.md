# API Integration Guide — AI Study Hub

> Tài liệu này hướng dẫn cách kết nối FE với BE thật, từng bước.

---

## Cấu trúc file được tạo

```
src/lib/
├── types.ts       ← Data models align với DB schema + API response
├── realApi.ts     ← Hàm gọi API thật (1-1 với endpoint BE)
├── queries.ts     ← TanStack Query hooks (có switch mock/real)
└── auth.tsx       ← AuthContext (có switch mock/real)
```

---

## Bước 1 — Cấu hình môi trường

Tạo file `.env.local` tại root project:

```env
# URL của BE (Spring Boot)
VITE_API_BASE=http://localhost:8080

# true = dùng mock data, false = gọi API thật
VITE_USE_MOCK=true
```

---

## Bước 2 — Copy file vào project

```bash
# Thay 3 file cũ bằng file mới
cp types.ts     src/lib/types.ts
cp realApi.ts   src/lib/realApi.ts
cp queries.ts   src/lib/queries.ts
cp auth.tsx     src/lib/auth.tsx
```

---

## Bước 3 — Chuyển sang real API

Đổi `VITE_USE_MOCK=false` trong `.env.local`.  
Toàn bộ hook trong `queries.ts` và `auth.tsx` sẽ tự dùng `realApi` thay vì `mockApi`.

Hoặc nếu muốn test từng phần: bỏ comment `// REAL:` và comment `// MOCK:` trong từng function.

---

## Mapping: Mock → Real

| Hook hiện tại | mockApi | realApi |
|---|---|---|
| `useFolders()` | `mockApi.listFolders()` | `folderApi.list()` → `GET /api/folder/getall` |
| `useFolder(id)` | `mockApi.getFolder(id)` | `folderApi.getById(id)` → `GET /api/folder/getbyid/:id` |
| `useCreateFolder()` | `mockApi.createFolder()` | `folderApi.create()` → `POST /api/folder/create` |
| `useUpdateFolder()` | `mockApi.updateFolder()` | `folderApi.update()` → `PUT /api/folder/update/:id` |
| `useDeleteFolder()` | `mockApi.deleteFolder()` | `folderApi.delete()` → `DELETE /api/folder/delete/:id` |
| `useDocuments()` | `mockApi.listDocuments()` | `documentApi.list()` → `GET /api/documents` |
| `useDocumentsByFolder(id)` | `mockApi.listDocsByFolder()` | `documentApi.listByFolder()` → `GET /api/documents/folder/:id` |
| `useDocument(id)` | `mockApi.getDocument()` | `documentApi.getById()` → `GET /api/documents/:id` |
| `useUploadDocument()` | `mockApi.uploadDocument()` | `documentApi.upload()` → `POST /api/documents` |
| `useDeleteDocument()` | `mockApi.deleteDocument()` | `documentApi.delete()` → `DELETE /api/documents/:id` |
| `useDownloadDocument()` | `mockApi.downloadDocument()` | `documentApi.getDownloadUrl()` → `GET /api/documents/:id/download` |
| `useSharedDocuments()` | `mockApi.listShared()` | `shareApi.listSharedWithMe()` → `GET /api/documents/shared` |
| `useShareDocument()` | `mockApi.shareDocument()` | `shareApi.shareWithEmail()` → `POST /api/documents/:id/share` |
| `useShareInfo()` | `mockApi.getShareInfo()` | `shareApi.getShareInfo()` → `GET /api/documents/:id/share` |
| `useDeleteSharedDocument()` | `mockApi.deleteSharedDocument()` | `shareApi.removeFromShared()` → `DELETE /api/documents/shared/:id` |
| `useSaveSharedDocument()` | `mockApi.saveSharedDocument()` | `shareApi.saveToMyFolder()` → `POST /api/documents/:id/save` |
| `useReportDocument()` | `mockApi.reportDocument()` | `shareApi.report()` → `POST /api/documents/:id/report` |
| `useAskRag()` | `mockApi.ask()` | `ragApi.ask()` → `POST /api/rag/ask` |

---

## Lưu ý quan trọng về type

### ID Types thay đổi

```ts
// CŨ (mock dùng number cho cả folder)
folder.id: number

// MỚI (align với DB: folder dùng UUID)
folder.id: string  // UUID
document.id: number  // BIGINT
account.id: string  // UUID
```

Các component nào truyền `folder.id` cần kiểm tra lại — đặc biệt là nơi so sánh `===` với `number`.

### Share API chưa có trong doc

Các endpoint share (`/api/documents/shared`, `/api/documents/:id/share`) được định nghĩa theo convention. Cần confirm với BE khi implement xong:

```ts
// realApi.ts — shareApi section
// Điều chỉnh path nếu BE dùng endpoint khác
shareApi.listSharedWithMe()  // GET /api/documents/shared
shareApi.getShareInfo(id)    // GET /api/documents/:id/share
shareApi.shareWithEmail()    // POST /api/documents/:id/share
```

### RAG ask — query params vs body

`POST /api/rag/ask` theo API doc nhận `id` và `question` dạng **Request Params**, không phải body.  
Nếu BE dùng query params, sửa lại trong `realApi.ts`:

```ts
// Thay vì body:
ask: (input: AskRequest) =>
  api<AskResponse>(`/rag/ask?id=${input.id}&question=${encodeURIComponent(input.question)}`, {
    method: "POST",
  }),
```

---

## Xử lý BE trả response bọc trong `{ data, message }`

Nếu BE dùng wrapper `ApiResponse<T>`, sửa hàm `api()` trong `api.ts`:

```ts
// Trong api.ts, sau khi parse JSON:
const payload = data?.data ?? data;  // unwrap nếu có
return payload as T;
```

---

## Các feature chưa có API doc (chuẩn bị sẵn)

- `useQuizByDocument()` / `useGenerateQuiz()` → `/api/quiz`
- `useFlashcardsByDocument()` / `useGenerateFlashcards()` → `/api/flashcard`
- `useUpdateDocument()` → `PUT /api/documents/:id`
- `useUploadRag()` → `POST /api/rag/upload/chunk`
