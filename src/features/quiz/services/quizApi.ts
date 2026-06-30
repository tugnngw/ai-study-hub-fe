// src/features/quiz/services/quizApi.ts
// Tầng gọi API cho Quiz. Backend chỉ cần khớp endpoint dưới đây.
import { api } from "@/lib/api";
import type { QuizItem, QuizGenerateOptions } from "../types/quiz.types";

export const quizApi = {
  // Sinh quiz theo tùy chọn (scope: "all" | documentId, nhiều loại câu hỏi).
  // TODO(backend): POST /api/quiz/generate nhận { scope, types, questionCount }
  // và trả QuizItem[] ({ id, type, question, options[], correctAnswers[] }).
  generate: (opts: QuizGenerateOptions) =>
    api<QuizItem[]>("/api/quiz/generate", { method: "POST", body: opts }),
};
