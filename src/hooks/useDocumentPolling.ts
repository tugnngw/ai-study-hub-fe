// src/hooks/useDocumentPolling.ts
<<<<<<< HEAD
<<<<<<< HEAD
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { docKeys } from '@/lib/queries';

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix
export function useDocumentPolling(documentId: number, status: string) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (status !== 'processing' || !documentId || documentId <= 0) return;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
=======
>>>>>>> origin/final/demo-v1
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { docKeys } from "@/lib/queries";

<<<<<<< HEAD
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1
export function useDocumentPolling(documentId: string, status: string) {
  const queryClient = useQueryClient();

  useEffect(() => {
<<<<<<< HEAD
<<<<<<< HEAD
    if (status !== 'processing' || !documentId) return;
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
=======
>>>>>>> origin/admin-added
=======
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
=======
>>>>>>> origin/Flashcards-fix
=======
>>>>>>> origin/admin-added-fix

    console.log('[Polling] Starting polling for document:', documentId);

    const interval = setInterval(() => {
      console.log('[Polling] Refetching document:', documentId);
=======
=======
>>>>>>> origin/final/demo-v1
    if (status !== "processing" || !documentId) return;

    console.log("[Polling] Starting polling for document:", documentId);

    const interval = setInterval(() => {
      console.log("[Polling] Refetching document:", documentId);
<<<<<<< HEAD
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1
      queryClient.invalidateQueries({
        queryKey: docKeys.detail(documentId),
      });
    }, 3000);

    return () => {
<<<<<<< HEAD
<<<<<<< HEAD
      console.log('[Polling] Stopping polling for document:', documentId);
      clearInterval(interval);
    };
  }, [documentId, status, queryClient]);
}
=======
=======
>>>>>>> origin/final/demo-v1
      console.log("[Polling] Stopping polling for document:", documentId);
      clearInterval(interval);
    };
  }, [documentId, status, queryClient]);
}
<<<<<<< HEAD
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1
