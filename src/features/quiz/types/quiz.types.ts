// src/features/quiz/types/quiz.types.ts
// Quiz related types

export interface Quiz {
  id: number;
  documentId: number;
  questions: QuizQuestion[];
  createdAt: string;
}

export interface QuizQuestion {
  id: number;
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
}
