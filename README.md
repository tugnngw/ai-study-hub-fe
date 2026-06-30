# AI Study Hub — Frontend

## Bản đồ kết nối UI ↔ Backend

Toàn bộ giao tiếp với backend đi qua một hàm dùng chung duy nhất:
**`src/lib/api.ts`** (hàm `api()`), hàm này gắn token, tự refresh khi gặp lỗi
401, và bóc tách `ApiResponse<T>` của backend về thẳng dữ liệu `T`. Mọi nơi
khác trong UI **không** gọi `fetch` trực tiếp tới backend.

Phía trên `api()` là 2 lớp "API client" theo từng nhóm tính năng — nơi khai
báo endpoint thật (URL, method, body):
- **`src/lib/realApi.ts`** — `authApi`, `accountApi`, `folderApi`,
  `documentApi`, `ragApi`, `shareApi`, `quizApi`, `flashcardApi`.
- **`src/features/shares/services/shareApi.ts`** (export tên `sharesApi`) —
  dành riêng cho trang **"Chia sẻ"** (`/shared`): danh sách
  được/đã chia sẻ, xóa, lấy link, tải xuống, lưu bản sao.

Phía trên 2 lớp đó là **`src/lib/queries.ts`** — các React Query hook
(`useFolders`, `useDocuments`, `useAskRag`, ...) mà các trang/component gọi
trực tiếp. Riêng đăng nhập/đăng ký/refresh/đăng xuất/quên mật khẩu được gọi
thẳng từ **`src/lib/auth.tsx`** (`AuthProvider`/`useAuth()`), không qua
`queries.ts`.

> Cách dò một tính năng: mở UI → tìm hook `useXxx` được gọi trong
> component đó → mở `queries.ts` xem hook gọi hàm nào trong `realApi.ts`
> (hoặc `shareApi.ts` trong `features/shares`) → đó chính là endpoint thật.

### Auth (đăng nhập / đăng ký / mật khẩu)
| UI | Hook / Provider | API client | Endpoint |
|---|---|---|---|
| `routes/auth/login.tsx` | `useAuth().login` (`lib/auth.tsx`) | `authApi.login` | `POST /api/auth/login` |
| `routes/auth/register.tsx` | `useAuth().register` | `authApi.register` | `POST /api/auth/register` |
| `routes/auth/forgot-password.tsx` | `useAuth().requestPasswordReset` / `verifyResetOtp` | `authApi.requestPasswordReset` / `verifyResetOtp` | `POST /api/auth/request-reset`, `POST /api/auth/verify-otp` |
| `routes/auth/reset-password.tsx` | `useAuth().resetPassword` | `authApi.resetPassword` | `POST /api/auth/reset-password` |
| Tự động khi gặp lỗi 401 (mọi trang) | `attemptRefresh()` trong `lib/api.ts` | `authApi.refresh` (gọi trực tiếp) | `POST /api/auth/refresh` |
| Nút "Đăng xuất" (`app-shell.tsx`, `routes/_authenticated/admin.tsx`) | `useAuth().logout` | `authApi.logout` | `POST /api/auth/logout` |
| Header/avatar người dùng, `routes/_authenticated/profile.tsx` | `AuthProvider` tự gọi khi khởi tạo | `accountApi.me` | `GET /api/account/me` |

### Thư mục (Folders)
| UI | Hook | API client | Endpoint |
|---|---|---|---|
| `routes/_authenticated/folders.tsx`, sidebar `components/ui/AIChat.tsx`, `dashboard.tsx` | `useFolders` | `folderApi.list` | `GET /api/folder/getall` |
| `components/document-workspace/FolderPanel.tsx`, `AIChat.tsx` (panel thư mục đang dùng) | `useFolder(id)` | `folderApi.getById` | `GET /api/folder/getbyid/{id}` |
| Dialog "New folder" (`folders.tsx`) | `useCreateFolder` | `folderApi.create` | `POST /api/folder/create` |
| Mục "Đổi tên" trong `components/folder-actions-menu.tsx` | `useUpdateFolder` | `folderApi.update` | `PUT /api/folder/update/{id}` |
| Mục "Xóa" trong `folder-actions-menu.tsx` | `useDeleteFolder` | `folderApi.delete` | `DELETE /api/folder/delete/{id}` |

### Tài liệu (Documents)
| UI | Hook | API client | Endpoint |
|---|---|---|---|
| `routes/_authenticated/documents.tsx`, `cloud.tsx`, `profile.tsx`, `dashboard.tsx` | `useDocuments` | `documentApi.list` | `GET /api/documents` |
| `FolderPanel.tsx`, `AIChat.tsx` (danh sách file trong 1 thư mục) | `useDocumentsByFolder(folderId)` | `documentApi.listByFolder` | `GET /api/documents/folder/{folderId}` |
| `routes/_authenticated/documents.$id.tsx`, panel xem nội dung trong `AIChat.tsx`/`ContentPanel.tsx` | `useDocument(id)` (tự poll mỗi 3s khi `status: "processing"`) | `documentApi.getById` | `GET /api/documents/{id}` |
| Nút "Thêm file" trong `FolderPanel.tsx`, trang `documents.tsx` | `useUploadDocument` | `documentApi.upload` | `POST /api/documents` (multipart, field `files`) |
| (chưa có UI gọi — hook sẵn sàng) | `useUpdateDocument` | `documentApi.update` | `PUT /api/documents/{id}` |
| Mục "Xóa" trong `components/document-actions-menu.tsx` | `useDeleteDocument` | `documentApi.delete` | `DELETE /api/documents/{id}` |
| Mục "Tải xuống" trong `document-actions-menu.tsx` | `useDownloadDocument` | `documentApi.getDownloadUrl` | `GET /api/documents/{id}/download` |
| `routes/_authenticated/trash.tsx` (danh sách) | `useTrash` | `documentApi.listTrash` | `GET /api/documents/trash` |
| `trash.tsx` (nút "Khôi phục") | `useRestoreFromTrash` | `documentApi.restoreFromTrash` | `POST /api/documents/{id}/restore` |
| `trash.tsx` (nút "Xóa vĩnh viễn") | `useEmptyTrash` | `documentApi.emptyTrash` | `DELETE /api/documents/{id}/permanent` |

### AI Chat (RAG)
| UI | Hook | API client | Endpoint |
|---|---|---|---|
| Ô nhập câu hỏi trong `components/ui/AIChat.tsx` | `useAskRag` | `ragApi.ask` | `POST /api/rag/ask` |
| (chưa có UI gọi — hook sẵn sàng, dùng khi cần re-index file) | `useUploadRag` | `ragApi.upload` / `ragApi.uploadAndChunk` | `POST /api/rag/upload`, `POST /api/rag/upload/chunk` |

### Chia sẻ thư mục (mời người khác) — dialog dùng chung
| UI | Hook | API client | Endpoint |
|---|---|---|---|
| `components/share-document-dialog.tsx` (mở từ "Chia sẻ" trong `folder-actions-menu.tsx`) — mời theo email/username | `useShareFolder` | `shareApi.shareFolder` | `POST /api/shares` |
| `share-document-dialog.tsx` — danh sách "Đã chia sẻ (n)" | `useOwnedShares` | `shareApi.listOwned` | `GET /api/shares/owner` |
| (chưa có UI gọi) | `useSharedDocuments` | `shareApi.listSharedWithMe` | `GET /api/shares/shared-with-me` |
| (chưa có UI gọi) | `useDeleteSharedDocument` | `shareApi.removeShare` | `DELETE /api/shares/{shareId}` |
| Mục "Báo cáo" trong `document-actions-menu.tsx` → `components/report-document-dialog.tsx` | `useReportDocument` | `shareApi.report` | `POST /api/documents/{id}/report` |
| Mục "Báo cáo" trong `folder-actions-menu.tsx` → `ReportFolderDialog` trong `routes/_authenticated/folders.tsx` | `useReportFolder` | ⚠️ **placeholder** — backend chưa có endpoint report theo folder, hiện chỉ `console.log` + toast thành công | — |

### Trang "Chia sẻ" (`/shared`) — danh sách đã/được chia sẻ
> Nhóm này **không** đi qua `lib/queries.ts` mà qua hook riêng
> `src/features/shares/hooks/useShares.tsx` và `useShareActions.tsx`, gọi
> thẳng `sharesApi` trong `src/features/shares/services/shareApi.ts`.

| UI | Hook | API client | Endpoint |
|---|---|---|---|
| `features/shares/components/SharedWithMeTable.tsx` ("Được chia sẻ với tôi") | `useShares()` | `sharesApi.getSharedWithMe` | `GET /api/shares/with-me` |
| `features/shares/components/SharedByMeTable.tsx` ("Tôi đã chia sẻ") | `useShares()` | `sharesApi.getSharedByMe` | `GET /api/shares/by-me` |
| Mục "Xóa" trong cả 2 bảng | `useShareActions().removeWithMe/removeByMe` | `sharesApi.deleteShared` | `DELETE /api/folder/delete/{folderId}` |
| Mục "Sao chép link" trong `SharedByMeTable.tsx` | `useShareActions().copyLink` | `sharesApi.getShareLink` | `GET /api/shares/{shareId}/link` |
| Mục "Tải xuống" trong `SharedWithMeTable.tsx` | `useShareActions().download` | `sharesApi.getDownloadUrl` | `GET /api/shares/{shareId}/download` |
| Mục "Lưu" trong `SharedWithMeTable.tsx` → `features/shares/components/SaveFileDialog.tsx` | gọi `sharesApi.saveShared` trực tiếp trong dialog | `sharesApi.saveShared` | `POST /api/shares/{shareId}/save` |

### Quiz & Flashcards
| UI | Hook | API client | Endpoint |
|---|---|---|---|
| (chưa có UI gọi trực tiếp — `QuizzesTab.tsx` dùng `generateAdvanced` bên dưới) | `useQuizByDocument` | `quizApi.listByDocument` | `GET /api/quiz?documentId={id}` |
| (chưa có UI gọi — quiz nhanh không tùy chọn loại câu) | `useGenerateQuiz` | `quizApi.generate` | `POST /api/quiz/generate` (body `{documentId, questionCount}`) |
| `components/document-workspace/QuizzesTab.tsx` (nút "Tạo Quiz") | gọi `quizApi.generateAdvanced` trực tiếp | `quizApi.generateAdvanced` | `POST /api/quiz/generate` (body `{scope, types[], questionCount}`) — xem mục C bên dưới |
| `components/document-workspace/FlashcardsTab.tsx` | `useFlashcardsByDocument` | `flashcardApi.listByDocument` | `GET /api/flashcard?documentId={id}` |
| `FlashcardsTab.tsx` (nút tạo thẻ) | `useGenerateFlashcards` | `flashcardApi.generate` | `POST /api/flashcard/generate` |
| `FlashcardsTab.tsx` (đánh dấu đã thuộc / đang học) | `useUpdateFlashcardProgress` | `flashcardApi.updateProgress` | `PUT /api/flashcard/{id}/progress` |

### Không gọi backend (chỉ lưu cục bộ trong trình duyệt)
- `src/lib/preferences.ts` — ghim tài liệu (`usePinnedDocuments`), gắn sao
  thư mục/tài liệu chia sẻ (`useStarredFolders`, `useStarredSharedDocuments`):
  lưu trong `localStorage`, không có API tương ứng.
- `src/lib/theme.tsx` — chế độ sáng/tối: lưu trong `localStorage`, không
  gọi backend.
- `routes/_authenticated/admin.tsx` (trang "Cài đặt & Quyền riêng tư"): đổi
  mật khẩu, bật 2FA chỉ hiển thị `toast` thành công, **chưa nối** API thật
  vì backend chưa có endpoint tương ứng.

---

# Chức năng Quizzes — Thay đổi & Khu vực theo Checklist


---

## A. THAY ĐỔI (Thêm / Sửa / Xóa)

### ✅ Thêm mới
| File | Nội dung |
|------|----------|
| `src/features/quiz/types/quiz.types.ts` (cuối file) | Bổ sung type cho UI quiz: `QuizQuestionType`, `QuizGenerateOptions`, `QuizItem`. |

### ✏️ Sửa
| File | Sửa gì |
|------|--------|
| `src/components/document-workspace/QuizzesTab.tsx` | Viết lại: từ mock cứng → 2 màn (Tùy chọn khởi tạo + Làm bài) có chấm điểm. |
| `src/components/ui/AIChat.tsx` | Tab "AI Quizzes" trước render rỗng → render `<QuizzesTab>`; thêm import. |
| `src/lib/realApi.ts` | Thêm `quizApi.generateAdvanced({scope,types,questionCount})` trả `QuizItem[]`; import type `QuizItem`. |


---

## B. KHU VỰC CHO TỪNG CHECKLIST

### ☑ 1. Flow Quizzes + chuyển từ trong session qua Quizzes
- `src/components/ui/AIChat.tsx`
  - Dòng 245: nút tab `onClick={() => setActiveTab("quizzes")}` — chuyển sang Quizzes.
  - Dòng 363–365: khi `activeTab === "quizzes"` → render `<QuizzesTab folderId docId title>`.
- `src/components/document-workspace/QuizzesTab.tsx`
  - Dòng 76: `if (phase === "setup")` → màn Tùy chọn.
  - Dòng 145 trở đi: màn Làm bài. Flow: setup → tạo → làm → nộp → chấm.

### ☑ 2. UI tùy chọn khởi tạo (loại câu hỏi + số câu)
- `src/components/document-workspace/QuizzesTab.tsx`
  - Dòng 12: `TYPE_LABELS` — 3 loại: trắc nghiệm / đúng-sai / nhiều đáp án.
  - Dòng 113–129: khối "Loại câu hỏi", chọn được nhiều loại (`toggleType`).
  - Dòng 135–137: "Số câu hỏi" slider (3–20).
  - Dòng 140: nút "Tạo Quiz" → `generate()`.

### ☑ 2b. Chọn tài liệu tham chiếu: phổ danh sách folder + tùy chọn All
- `src/components/document-workspace/QuizzesTab.tsx`
  - Dòng 8 + 19: `useDocumentsByFolder(folderId)` — lấy danh sách tài liệu trong thư mục.
  - Dòng 89: nhãn "Tài liệu tham chiếu".
  - Dòng 96: tùy chọn **"Tất cả tài liệu trong thư mục"** (`scope = "all"`) — quiz bao hàm toàn bộ file.
  - Dòng 99: `docs.map(...)` — liệt kê từng tài liệu để chọn 1 file cụ thể.

### ☑ (Thêm) Đồng bộ tài liệu tham chiếu theo tài liệu đang mở
- Dòng 27: `useEffect(() => setScope(docId ?? "all"), [docId])` — chọn tài liệu ở tab trên/list trái thì tham chiếu tự đổi theo.

### ☑ (Thêm) Chấm điểm
- Dòng 215: "Nộp bài" → `setSubmitted(true)`.
- Dòng 161: hiển thị "Điểm: X / N".
- Tô xanh (đúng) / đỏ (sai) từng đáp án; hỗ trợ câu nhiều đáp án.

---

## C. ĐIỂM NỐI BACKEND
- `src/lib/realApi.ts` (dòng 220): `quizApi.generateAdvanced` → `POST /api/quiz/generate`
  body `{ scope: "all" | documentId, types: string[], questionCount }`, trả `QuizItem[]`
  (`{ id, type, question, options[], correctAnswers[] }`).
- ⚠️ Backend cần hiện thực endpoint này nhận `scope` + `types` (API cũ `generate` chỉ có documentId + questionCount).