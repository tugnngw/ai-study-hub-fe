# Chức năng Quizzes — Thay đổi & Khu vực theo Checklist

> Phạm vi: CHỈ phần Quiz.

---

## A. CẤU TRÚC (tách lớp giống `features/documents`)
```
src/features/quiz/
├── components/
│   ├── QuizzesTab.tsx      ← lắp ráp (Setup + Runner)
│   ├── QuizSetup.tsx       ← màn tùy chọn khởi tạo
│   ├── QuizRunner.tsx      ← màn làm bài + chấm điểm
│   ├── quiz-constants.ts   ← nhãn loại câu hỏi
│   └── index.ts
├── hooks/
│   ├── useQuiz.tsx         ← logic: cấu hình → tạo → làm → chấm
│   └── index.ts
├── services/
│   ├── quizApi.ts          ← gọi API /api/quiz/generate
│   └── index.ts
├── types/
│   ├── quiz.types.ts       ← QuizQuestionType, QuizGenerateOptions, QuizItem
│   └── index.ts
└── index.ts                ← barrel: export components/hooks/services/types
```

## B. THAY ĐỔI (Thêm / Sửa / Xóa)

### ✅ Thêm mới
| File | Nội dung |
|------|----------|
| `features/quiz/components/QuizzesTab.tsx` | Assembler: chọn màn Setup/Runner qua `useQuiz`. |
| `features/quiz/components/QuizSetup.tsx` | Màn tùy chọn: tài liệu tham chiếu + loại câu hỏi + số câu. |
| `features/quiz/components/QuizRunner.tsx` | Màn làm bài + chấm điểm (tô xanh/đỏ). |
| `features/quiz/components/quiz-constants.ts` | `TYPE_LABELS` (nhãn 3 loại câu hỏi). |
| `features/quiz/hooks/useQuiz.tsx` | Logic quiz (state cấu hình, tạo, chọn đáp án, nộp, chấm điểm). |
| `features/quiz/services/quizApi.ts` | `quizApi.generate(opts)` → POST /api/quiz/generate. |
| Các `index.ts` (components/hooks/services) | Barrel export. |
| `features/quiz/types/quiz.types.ts` (cuối file) | `QuizQuestionType`, `QuizGenerateOptions`, `QuizItem`. |

### ✏️ Sửa
| File | Sửa gì |
|------|--------|
| `src/components/ui/AIChat.tsx` | Tab "AI Quizzes" render `<QuizzesTab>`; import đổi sang `@/features/quiz`. |
| `src/features/quiz/index.ts` | Barrel export đủ components/hooks/services/types. |

### 🗑️ Xóa
| File | Lý do |
|------|-------|
| `src/components/document-workspace/QuizzesTab.tsx` | Chuyển vào `features/quiz/components` (tách lớp). |
| `quizApi.generateAdvanced` trong `src/lib/realApi.ts` | Trùng — đã có `quizApi` riêng trong feature. |

---

## C. KHU VỰC CHO TỪNG CHECKLIST

### ☑ 1. Flow Quizzes + chuyển từ trong session qua Quizzes
- `src/components/ui/AIChat.tsx`
  - Nút tab `setActiveTab("quizzes")` (~dòng 245).
  - `activeTab === "quizzes"` → render `<QuizzesTab folderId docId title>` (~dòng 363–365).
- `features/quiz/components/QuizzesTab.tsx` — chọn `phase` setup/doing.
- `features/quiz/hooks/useQuiz.tsx` — `phase`, `generate`, `backToSetup`.

### ☑ 2. UI tùy chọn khởi tạo (loại câu hỏi + số câu)
- `features/quiz/components/QuizSetup.tsx`
  - Khối "Loại câu hỏi": map `TYPE_LABELS`, chọn nhiều loại (`toggleType`).
  - "Số câu hỏi": slider 3–20 (`setCount`).
  - Nút "Tạo Quiz" → `onGenerate`.
- `features/quiz/components/quiz-constants.ts` — 3 loại câu hỏi.

### ☑ 2b. Chọn tài liệu tham chiếu: phổ danh sách folder + tùy chọn All
- `features/quiz/components/QuizSetup.tsx`
  - `useDocumentsByFolder(folderId)` — lấy danh sách tài liệu trong thư mục.
  - Nút "Tất cả tài liệu trong thư mục" (`scope = "all"`) — quiz bao hàm toàn bộ file.
  - `docs.map(...)` — liệt kê từng tài liệu để chọn 1 file cụ thể.

### ☑ (Thêm) Đồng bộ tài liệu tham chiếu theo tài liệu đang mở
- `features/quiz/hooks/useQuiz.tsx`: `useEffect(() => setScope(docId ?? "all"), [docId])`.

### ☑ (Thêm) Chấm điểm
- `features/quiz/hooks/useQuiz.tsx`: `submit()` đặt `submitted`, `score` (useMemo) so `correctAnswers`.
- `features/quiz/components/QuizRunner.tsx`: hiện "Điểm: X / N", tô xanh (đúng) / đỏ (sai), nút "Làm lại".

---

## D. ĐIỂM NỐI BACKEND
- `features/quiz/services/quizApi.ts`: `generate(opts)` → `POST /api/quiz/generate`
  body `{ scope: "all" | documentId, types: QuizQuestionType[], questionCount }`, trả `QuizItem[]`
  (`{ id, type, question, options[], correctAnswers[] }`).
- ⚠️ Backend cần hiện thực endpoint nhận `scope` + `types` (API cũ chỉ có documentId + questionCount).
