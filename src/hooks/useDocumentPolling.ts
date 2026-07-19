// src/hooks/useDocumentPolling.ts
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { docKeys } from '@/lib/queries';

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/admin-added
export function useDocumentPolling(documentId: number, status: string) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (status !== 'processing' || !documentId || documentId <= 0) return;
<<<<<<< HEAD
=======
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
export function useDocumentPolling(documentId: string, status: string) {
  const queryClient = useQueryClient();

  useEffect(() => {
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

    console.log('[Polling] Starting polling for document:', documentId);

    const interval = setInterval(() => {
      console.log('[Polling] Refetching document:', documentId);
      queryClient.invalidateQueries({
        queryKey: docKeys.detail(documentId),
      });
    }, 3000);

    return () => {
      console.log('[Polling] Stopping polling for document:', documentId);
      clearInterval(interval);
    };
  }, [documentId, status, queryClient]);
}