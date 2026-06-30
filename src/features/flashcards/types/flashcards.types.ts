// src/features/flashcards/types/flashcards.types.ts
// Flashcard related types

export interface Flashcard {
  id: number;
  documentId: string;
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
}

export interface FlashcardProgress {
  flashcardId: number;
  userId: string;
  status: "learned" | "review" | "new";
  lastReviewedAt: string;
  nextReviewAt: string;
}
