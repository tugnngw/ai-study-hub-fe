// src/features/admin/hooks/useAdminApprovals.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { approvalApi } from "../services";
import type { ApprovalAction } from "../types/admin.types";
import { adminKeys } from "./adminKeys";

export function useApprovals() {
  return useQuery({
    queryKey: adminKeys.approvals(),
    queryFn: () => approvalApi.getPendingList(),
  });
}

export function useApprovalAction() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, action }: { id: string; action: ApprovalAction }) =>
        action === "approve" ? approvalApi.approve(id) : approvalApi.reject(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.approvals() }),
  });
}
