// src/features/quiz/types/quiz.types.ts
// Quiz related types

export interface Quiz {
  id: number;
<<<<<<< HEAD
  documentId: number;
=======
  documentId: string;
>>>>>>> origin/Flashcars
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
=======
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix

// ── Tùy chọn khởi tạo Quiz (UI) ────────────────────────
export type QuizQuestionType = "multiple_choice" | "true_false" | "multiple_answer";
=======

// ── Tùy chọn khởi tạo Quiz (UI) ────────────────────────
export type QuizQuestionType =
  | "multiple_choice"
  | "true_false"
  | "multiple_answer";
>>>>>>> origin/Flashcars

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
