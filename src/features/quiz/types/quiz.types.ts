// src/features/quiz/types/quiz.types.ts
// Quiz related types

export interface Quiz {
  id: number;
  documentId: string;
  questions: QuizQuestion[];
  createdAt: string;
}

export interface QuizQuestion {
  id: number;
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
}

// ── Tùy chọn khởi tạo Quiz (UI) ────────────────────────
export type QuizQuestionType =
  | "multiple_choice"
  | "true_false"
  | "multiple_answer";

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
  options: string[]; // true_false: ["Đúng","Sai"]
  correctAnswers: number[]; // multiple_answer có thể >1 index
}
