import { useQuery } from "@tanstack/react-query";
import { documentApi } from "../services";
import { docKeys } from "../types";

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
