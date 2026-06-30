// src/features/documents/hooks/useDocument.tsx

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { documentApi } from "../services";
import { docKeys } from "../types";
import type { Document } from "../types/document.types";

export function useDocument(id: number) {
  const enabled = !!id;
  console.log('[TRACE-4] useDocument id:', id, 'enabled:', enabled);
  return useQuery({
    queryKey: docKeys.detail(id),
    queryFn: () => {
      console.log('[TRACE-5] queryFn executing for id:', id);
      return documentApi.getById(id);
    },
    enabled: enabled,
    // Polling logic for 'processing' status
    refetchInterval: (query) => {
      const data = query.state.data as Document | undefined;
      if (data?.status === "processing") {
        console.log('[Polling] Document is processing, polling every 3s');
        return 3000; // Poll every 3 seconds
      }
      return false;
    },
    refetchOnWindowFocus: (query) => {
      const data = query.state.data as Document | undefined;
      return data?.status === "processing";
    },
  });
}
