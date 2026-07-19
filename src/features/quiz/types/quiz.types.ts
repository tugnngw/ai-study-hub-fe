// src/features/quiz/types/quiz.types.ts
// Quiz related types

export interface Quiz {
  id: number;
<<<<<<< HEAD
<<<<<<< HEAD
  documentId: number;
=======
  documentId: string;
>>>>>>> origin/Flashcars
=======
  documentId: string;
>>>>>>> origin/final/demo-v1
  questions: QuizQuestion[];
  createdAt: string;
}

export interface QuizQuestion {
  id: number;
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
}
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix

// ── Tùy chọn khởi tạo Quiz (UI) ────────────────────────
export type QuizQuestionType = "multiple_choice" | "true_false" | "multiple_answer";
=======
=======
>>>>>>> origin/final/demo-v1

// ── Tùy chọn khởi tạo Quiz (UI) ────────────────────────
export type QuizQuestionType =
  | "multiple_choice"
  | "true_false"
  | "multiple_answer";
<<<<<<< HEAD
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1

export interface QuizGenerateOptions {
  // "all" = dùng toàn bộ tài liệu trong thư mục; hoặc 1 documentId cụ thể
  scope: "all" | number;
  types: QuizQuestionType[]; // các loại câu hỏi muốn tạo
  questionCount: number;
}

// Câu hỏi mở rộng cho nhiều loại (UI dùng)
export interface QuizItem {
  id: number;
  type: QuizQuestionType;
  question: string;
<<<<<<< HEAD
<<<<<<< HEAD
  options: string[];          // true_false: ["Đúng","Sai"]
  correctAnswers: number[];   // multiple_answer có thể >1 index
}
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
=======
  options: string[]; // true_false: ["Đúng","Sai"]
  correctAnswers: number[]; // multiple_answer có thể >1 index
}
>>>>>>> origin/Flashcars
=======
  options: string[]; // true_false: ["Đúng","Sai"]
  correctAnswers: number[]; // multiple_answer có thể >1 index
}
>>>>>>> origin/final/demo-v1
