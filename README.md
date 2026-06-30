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