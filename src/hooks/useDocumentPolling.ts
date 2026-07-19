// src/hooks/useDocumentPolling.ts
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
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { docKeys } from "@/lib/queries";

>>>>>>> origin/Flashcars
export function useDocumentPolling(documentId: string, status: string) {
  const queryClient = useQueryClient();

  useEffect(() => {
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
    if (status !== "processing" || !documentId) return;

    console.log("[Polling] Starting polling for document:", documentId);

    const interval = setInterval(() => {
      console.log("[Polling] Refetching document:", documentId);
>>>>>>> origin/Flashcars
      queryClient.invalidateQueries({
        queryKey: docKeys.detail(documentId),
      });
    }, 3000);

    return () => {
<<<<<<< HEAD
      console.log('[Polling] Stopping polling for document:', documentId);
      clearInterval(interval);
    };
  }, [documentId, status, queryClient]);
}
=======
      console.log("[Polling] Stopping polling for document:", documentId);
      clearInterval(interval);
    };
  }, [documentId, status, queryClient]);
}
>>>>>>> origin/Flashcars
