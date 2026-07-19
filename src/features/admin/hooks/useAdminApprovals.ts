// src/features/admin/hooks/useAdminApprovals.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { approvalApi } from "../services";
import type { ApprovalAction } from "../types/admin.types";
import { adminKeys } from "./adminKeys";

export function useApprovals() {
<<<<<<< HEAD
<<<<<<< HEAD
  return useQuery({
    queryKey: adminKeys.approvals(),
    queryFn: () => approvalApi.getPendingList(),
  });
=======
=======
>>>>>>> origin/final/demo-v1
  const query = useQuery({
    queryKey: adminKeys.approvals(),
    queryFn: async () => {
      console.log("[useApprovals] queryFn called - stack:", new Error().stack?.split('\n').slice(0, 3).join('\n'));
      const data = await approvalApi.getPendingList();
      const cloned = JSON.parse(JSON.stringify(data));
      console.log("[useApprovals] queryFn data (cloned):", cloned);
      return cloned;
    },
    refetchOnWindowFocus: false,
    refetchInterval: false,
    structuralSharing: false,
    notifyOnChangeProps: "all",
  });
  console.log("[useApprovals] query state:", query);
  return query;
<<<<<<< HEAD
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1
}

export function useApprovalAction() {
  const qc = useQueryClient();
  return useMutation({
<<<<<<< HEAD
<<<<<<< HEAD
    mutationFn: ({ id, action }: { id: number; action: ApprovalAction }) =>
      action === "approve" ? approvalApi.approve(id) : approvalApi.reject(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.approvals() }),
=======
=======
>>>>>>> origin/final/demo-v1
    mutationFn: ({ id, action }: { id: string; action: ApprovalAction }) => {
      console.log("[useApprovalAction] mutating:", { id, action });
      return action === "approve" ? approvalApi.approve(id) : approvalApi.reject(id);
    },
    onSuccess: async (_, variables) => {
      console.log("[useApprovalAction] mutation settled, clearing cache");
      try {
        // Clear specific queries and refetch
        await qc.cancelQueries({ queryKey: adminKeys.approvals() });
        await qc.cancelQueries({ queryKey: adminKeys.reportedFiles() });
        
        await qc.refetchQueries({ queryKey: adminKeys.approvals() });
        await qc.refetchQueries({ queryKey: adminKeys.reportedFiles() });
        
        console.log("[useApprovalAction] cache cleared and refetched");
      } catch (err) {
        console.error("[useApprovalAction] reset error:", err);
      }
    },
    onError: (err) => {
      console.error("[useApprovalAction] error:", err);
    },
<<<<<<< HEAD
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1
  });
}
