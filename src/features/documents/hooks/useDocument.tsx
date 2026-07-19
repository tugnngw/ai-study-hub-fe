<<<<<<< HEAD
// src/features/documents/hooks/useDocument.tsx

import { useQuery, useQueryClient } from "@tanstack/react-query";
=======
import { useQuery } from "@tanstack/react-query";
>>>>>>> origin/final/demo-v1
import { documentApi } from "../services";
import { docKeys } from "../types";
import type { Document } from "../types/document.types";

<<<<<<< HEAD
<<<<<<< HEAD
export function useDocument(id: number) {
  const enabled = !!id;
  console.log('[TRACE-4] useDocument id:', id, 'enabled:', enabled);
  return useQuery({
    queryKey: docKeys.detail(id),
    queryFn: () => {
      console.log('[TRACE-5] queryFn executing for id:', id);
=======
export function useDocument(id: string) {
  const enabled = !!id;
  console.log("[TRACE-4] useDocument id:", id, "enabled:", enabled);
  return useQuery({
    queryKey: docKeys.detail(id),
    queryFn: () => {
      console.log("[TRACE-5] queryFn executing for id:", id);
>>>>>>> origin/Flashcars
      return documentApi.getById(id);
    },
    enabled: enabled,
    // Polling logic for 'processing' status
    refetchInterval: (query) => {
      const data = query.state.data as Document | undefined;
      if (data?.status === "processing") {
<<<<<<< HEAD
        console.log('[Polling] Document is processing, polling every 3s');
=======
        console.log("[Polling] Document is processing, polling every 3s");
>>>>>>> origin/Flashcars
        return 3000; // Poll every 3 seconds
      }
      return false;
=======
export function useDocument(id: string) {
  return useQuery({
    queryKey: docKeys.detail(id),
    queryFn: () => documentApi.getById(id),
    enabled: !!id,
    refetchInterval: (query) => {
      const data = query.state.data as Document | undefined;
      return data?.status === "processing" ? 3000 : false;
>>>>>>> origin/final/demo-v1
    },
    refetchOnWindowFocus: (query) => {
      const data = query.state.data as Document | undefined;
      return data?.status === "processing";
    },
  });
}
