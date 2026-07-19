<<<<<<< HEAD
// src/features/documents/hooks/useDocuments.tsx

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { documentApi } from "../services";
import { docKeys } from "../types"; // Assuming docKeys will be in types
import type { Document } from "../types/document.types"; // Specific type import
=======
import { useQuery } from "@tanstack/react-query";
import { documentApi } from "../services";
import { docKeys } from "../types";
>>>>>>> origin/final/demo-v1

export function useDocuments() {
  return useQuery({
    queryKey: docKeys.all,
    queryFn: () => documentApi.list(),
  });
}

export function useDocumentsByFolder(folderId: string) {
  return useQuery({
    queryKey: docKeys.byFolder(folderId),
    queryFn: () => documentApi.listByFolder(folderId),
    enabled: !!folderId,
  });
}
