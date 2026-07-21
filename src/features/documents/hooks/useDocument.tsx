import { useQuery } from "@tanstack/react-query";
import { documentApi } from "../services";
import { docKeys } from "../types";
import type { Document } from "../types/document.types";

export function useDocument(id: string) {
  return useQuery({
    queryKey: docKeys.detail(id),
    queryFn: () => documentApi.getById(id),
    enabled: !!id,
    refetchInterval: (query) => {
      const data = query.state.data as Document | undefined;
      return data?.aiStatus === "PROCESSING" ? 3000 : false;
    },
    refetchOnWindowFocus: (query) => {
      const data = query.state.data as Document | undefined;
      return data?.aiStatus === "PROCESSING";
    },
  });
}
