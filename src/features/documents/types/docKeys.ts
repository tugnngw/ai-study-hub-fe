// src/features/doc/types/docKeys.ts
// React Query keys for document-related queries

export const docKeys = {
  all: ["documents"] as const,
  byFolder: (folderId: string) => ["documents", "folder", folderId] as const,
<<<<<<< HEAD
  detail: (id: number) => ["documents", id] as const,
=======
  detail: (id: string) => ["documents", id] as const,
>>>>>>> origin/Flashcars
  trash: ["documents", "trash"] as const,
};
