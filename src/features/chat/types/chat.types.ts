// src/features/chat/types/chat.types.ts
// Chatbot and RAG related types

export interface AskRequest {
  id: number; // Document ID or context ID
  question: string;
}

export interface AskResponse {
  answer: string;
}
