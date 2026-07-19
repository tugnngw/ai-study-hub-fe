// src/features/flashcards/types/flashcards.types.ts
// Flashcard related types

export interface Flashcard {
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
