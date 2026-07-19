// src/features/doc/types/docKeys.ts
// React Query keys for document-related queries

export const docKeys = {
  all: ["documents"] as const,
  byFolder: (folderId: string) => ["documents", "folder", folderId] as const,
<<<<<<< HEAD
<<<<<<< HEAD
  detail: (id: number) => ["documents", id] as const,
=======
  detail: (id: string) => ["documents", id] as const,
>>>>>>> origin/Flashcars
=======
  detail: (id: string) => ["documents", id] as const,
>>>>>>> origin/final/demo-v1
  trash: ["documents", "trash"] as const,
};
