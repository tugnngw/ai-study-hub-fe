# AI Study Hub - Frontend Documentation

## 📁 Cấu trúc thư mục

```
src/
├── routes/          # Định nghĩa tất cả route (TanStack Router)
├── lib/             # Logic, API, Types, Auth
├── components/      # Components UI
├── hooks/           # Custom React hooks
└── styles.css       # Global styles (Tailwind)
```

---

## 🚀 Routes - Tính năng chính

### 🔐 Authentication (`/auth`)
| Route | File | Mô tả |
|-------|------|-------|
| `/auth` | `routes/auth/route.tsx` | Layout auth (background gradient) |
| `/auth/login` | `routes/auth/login.tsx` | Form đăng nhập (username/password + Social login Google/Facebook) |
| `/auth/register` | `routes/auth/register.tsx` | Form đăng ký (username, email, password) |
| `/auth/forgot-password` | `routes/auth/forgot-password.tsx` | Quên mật khẩu (gửi OTP qua email) |
| `/auth/reset-password` | `routes/auth/reset-password.tsx` | Đặt lại mật khẩu sau khi xác minh OTP |
| `/auth/` | `routes/auth/index.tsx` | Redirect đến `/auth/login` |

### 🛡️ Authenticated (Bảo vệ) (`/_authenticated`)
Tất cả routes này yêu cầu đăng nhập. Nếu chưa login, tự động redirect về `/auth/login`.

#### Layout
- `routes/_authenticated/route.tsx`: AuthLayout - Bao bọc toàn bộ app sau khi login, sử dụng `AppShell`

#### Dashboard & Thống kê
| Route | File | Mô tả |
|-------|------|-------|
| `/` | `routes/_authenticated/dashboard.tsx` | Trang tổng quan: thống kê thư mục, tài liệu, tải lên, 7 ngày qua + Tài liệu gần đây + Thư mục |
| `/cloud` | `routes/_authenticated/cloud.tsx` | Theo dõi dung lượng cloud: tổng dùng / tổng giới hạn (15GB), số tài liệu, còn trống |
| `/profile` | `routes/_authenticated/profile.tsx` | Hồ sơ cá nhân: họ tên, username, email, DOB + Stats: tài liệu, thư mục, chia sẻ |

#### Quản lý tài liệu
| Route | File | Mô tả |
|-------|------|-------|
| `/documents` | `routes/_authenticated/documents.tsx` | Danh sách tất cả tài liệu: tìm kiếm, upload, hành động (xem chi tiết, chia sẻ, xóa, báo cáo) |
| `/documents/:id` | `routes/_authenticated/documents.$id.tsx` | Chi tiết tài liệu: dùng `DocumentWorkspace` component |
| `/folders` | `routes/_authenticated/folders.tsx` | Danh sách thư mục: tìm kiếm, tạo/sửa/xóa |
| `/folders/:id` | `routes/_authenticated/folders.$id.tsx` | Nội dung thư mục: hiển thị danh sách tài liệu trong thư mục đó |
| `/trash` | `routes/_authenticated/trash.tsx` | Thùng rác: khôi phục (restore) hoặc xóa vĩnh viễn (empty) tài liệu |

#### AI & Chia sẻ
| Route | File | Mô tả |
|-------|------|-------|
| `/aichat` | `routes/_authenticated/ai.tsx` | Trang AI Chat: trò chuyện với AI về tài liệu, tab Original/Summary/Flashcards/Quizzes |
| `/shared` | `routes/_authenticated/shared.tsx` | Danh sách tài liệu được chia sẻ với tôi |

#### Settings (Admin)
| Route | File | Mô tả |
|-------|------|-------|
| `/settings` | `routes/_authenticated/admin.tsx` | Cài đặt tài khoản: đổi mật khẩu, bật/tắt 2FA, quản lý phiên đăng nhập |

---

## 🧩 Components

### Core Components (`src/components/`)
| Component | Chức năng |
|-----------|-----------|
| `app-shell.tsx` | Layout chính: Sidebar (navigation) + Header + Content |
| `document-workspace.tsx` | Không gian làm việc tài liệu với: tabs (Original/Notes/Summary/Flashcards/Quizzes), AI chat sidebar, file grid |
| `document-actions-menu.tsx` | Menu dropdown cho tài liệu: chia sẻ, xóa, báo cáo |
| `shared-document-actions-menu.tsx` | Menu cho tài liệu được chia sẻ: lưu, xóa |
| `share-document-dialog.tsx` | Dialog chia sẻ tài liệu qua email + copy link chia sẻ |
| `save-shared-document-dialog.tsx` | Dialog lưu tài liệu chia sẻ vào folder của mình |
| `upload-document-dialog.tsx` | Dialog upload tài liệu: file, tiêu đề, mô tả, chọn thư mục |
| `report-document-dialog.tsx` | Dialog báo cáo tài liệu vi phạm: chọn lý do + mô tả |
| `confirm-delete-dialog.tsx` | Dialog xác nhận xóa: tiêu đề + mô tả + nút xác nhận |

### UI Components (`src/components/ui/`)
Shadcn UI primitives: button, input, label, dialog, card, skeleton, textarea, select, switch, tabs, tooltip, sonner, table, progress, badge, avatar, separator, scroll-area, sheet, sidebar, dropdown-menu, context-menu, command, popover, calendar, checkbox, radio-group, slider, toggle, toggle-group, collapsible, accordion, aspect-ratio, carousel, chart, form, hover-card, input-otp, menubar, navigation-menu, pagination, resizable.

### Utility
- `lib/auth.tsx`: `AuthProvider` + hook `useAuth()` (isAuthenticated, isLoading, user, login, register, logout)

---

## 🔌 API Integration (Thực tế)

### Endpoints (đã implement trong `realApi.ts`)

#### 1. Authentication (`/api/auth`)
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | `/api/auth/register` | Đăng ký |
| POST | `/api/auth/login` | Đăng nhập (trả về token, refreshToken, user) |
| POST | `/api/auth/logout` | Đăng xuất |

#### 2. Account (`/api/account`)
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/account/me` | Lấy thông tin user hiện tại |

#### 3. Document (`/api/documents`)
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | `/api/documents` | Upload tài liệu (multipart/form-data) |
| GET | `/api/documents` | Danh sách tất cả tài liệu |
| GET | `/api/documents/folder/:folderId` | Tài liệu theo folder |
| GET | `/api/documents/:id` | Chi tiết tài liệu |
| PUT | `/api/documents/:id` | Cập nhật metadata |
| DELETE | `/api/documents/:id` | Xóa (soft delete - chuyển vào trash) |
| GET | `/api/documents/:id/download` | Lấy URL download |
| GET | `/api/documents/trash` | Danh sách tài liệu trong thùng rác |
| POST | `/api/documents/:id/restore` | Khôi phục từ trash |
| DELETE | `/api/documents/:id/permanent` | Xóa vĩnh viễn |

#### 4. Folder (`/api/folder`)
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | `/api/folder/create` | Tạo folder mới |
| GET | `/api/folder/getall` | Danh sách folder của user |
| GET | `/api/folder/getbyid/:id` | Chi tiết folder |
| PUT | `/api/folder/update/:id` | Cập nhật folder |
| DELETE | `/api/folder/delete/:id` | Xóa folder |

#### 5. RAG (AI Search)
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | `/api/rag/upload` | Upload file RAG (cần documentId) |
| POST | `/api/rag/upload/chunk` | Upload và chunk file |
| POST | `/api/rag/ask` | Hỏi AI về tài liệu (id, question) |

#### 6. Share
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/documents/shared` | Danh sách tài liệu chia sẻ với tôi |
| GET | `/api/documents/:id/share` | Lấy thông tin chia sẻ (recipients, link) |
| POST | `/api/documents/:id/share` | Chia sẻ với email |
| DELETE | `/api/documents/shared/:shareId` | Xóa khỏi danh sách chia sẻ |
| POST | `/api/documents/:sharedId/save` | Lưu tài liệu chia sẻ vào folder của mình |
| POST | `/api/documents/:id/report` | Báo cáo tài liệu |

#### 7. Quiz
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/quiz?documentId=...` | Lấy quiz theo tài liệu |
| POST | `/api/quiz/generate` | Tạo quiz mới (documentId, questionCount) |

#### 8. Flashcard
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/flashcard?documentId=...` | Lấy flashcard theo tài liệu |
| POST | `/api/flashcard/generate` | Tạo flashcard mới |
| PUT | `/api/flashcard/:flashcardId/progress` | Cập nhật trạng thái học flashcard |

---

## 🔑 Query Hooks (trong `queries.ts`)

### Auth
- `useLogin()`, `useRegister()`, `useLogout()`

### Account
- `useCurrentUser()` → `/api/account/me`

### Folder
- `useFolders()` → `/api/folder/getall`
- `useFolder(id)` → `/api/folder/getbyid/:id`
- `useCreateFolder()`
- `useUpdateFolder()`
- `useDeleteFolder()`

### Document
- `useDocuments()` → `/api/documents`
- `useDocumentsByFolder(folderId)` → `/api/documents/folder/:folderId`
- `useDocument(id)` → `/api/documents/:id`
- `useUploadDocument()`
- `useUpdateDocument()`
- `useDeleteDocument()`
- `useDownloadDocument()` → `/api/documents/:id/download`

### Trash
- `useTrash()` → `/api/documents/trash`
- `useRestoreFromTrash()`
- `useEmptyTrash()`

### Share
- `useSharedDocuments()` → `/api/documents/shared`
- `useShareInfo(documentId, enabled)` → `/api/documents/:id/share`
- `useShareDocument()`
- `useDeleteSharedDocument()`
- `useSaveSharedDocument()`
- `useReportDocument()`

### RAG
- `useAskRag()`
- `useUploadRag()`

### Quiz
- `useQuizByDocument(documentId)`
- `useGenerateQuiz()`

### Flashcard
- `useFlashcardsByDocument(documentId)`
- `useGenerateFlashcards()`

---

## 🎨 Types (trong `types.ts`)

### Interfaces
- `User`, `LoginRequest`, `LoginResponse`, `RegisterRequest`
- `Folder`, `CreateFolderRequest`, `UpdateFolderRequest`
- `Document` (với status: "processing"|"ready"|"failed"|"deleted")
- `UploadDocumentRequest`, `UpdateDocumentRequest`, `DownloadUrlResponse`
- `ShareInfo`, `ShareRecipient`, `SharedDocument`
- `AskRequest`, `AskResponse`, `ReferencedChunk`
- `Quiz`, `Question`, `QuizAttempt`
- `Flashcard`, `FlashcardProgress`
- `ReportDocumentRequest`

---

## 🛠️ Tech Stack

- **Framework**: TanStack Start (React 19) + TanStack Router
- **State/Query**: TanStack Query (React Query)
- **Styling**: Tailwind CSS (v4)
- **UI Components**: Shadcn UI (Radix UI primitives)
- **Forms**: React Hook Form + Zod validation
- **Navigation**: TanStack Router (file-based routing)
- **Icons**: Lucide React
- **Toast**: Sonner
- **Build**: Vite

---

## ⚙️ Configuration

### Environment Variables (`.env`)
```env
VITE_API_BASE=http://localhost:4040
VITE_USE_MOCK=false
VITE_APP_NAME=AI Study Hub
VITE_APP_DESCRIPTION=AI-powered document management system
VITE_AUTH_TOKEN_KEY=auth_token
VITE_REFRESH_TOKEN_KEY=refresh_token
```

### Build Commands
```bash
npm run dev        # Development server
npm run build      # Production build (client + SSR)
npm run build:dev  # Development build
npm run preview    # Preview production build
```

---

## ✅ Status

- ✅ **All mock data removed**
- ✅ **Real API integration complete**
- ✅ **Build passing (no errors)**
- ✅ **Routes organized by feature**
- ✅ **UI components separated**
- ✅ **Auth guard working**

---

*Last updated: 2026-06-22*
