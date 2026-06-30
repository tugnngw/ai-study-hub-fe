// src/features/admin/hooks/useAdminUsers.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminUserApi } from "../services";
import { adminKeys } from "./adminKeys";

export function useAdminUsers() {
  return useQuery({
    queryKey: adminKeys.users(),
    queryFn: async () => (await adminUserApi.getUsers()) ?? []
  });
}

export function useToggleUserStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminUserApi.toggleStatus(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.users() }),
  });
}

export function useDeleteUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminUserApi.softDeleteUser(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.users() }),
  });
}

export function useLockUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminUserApi.lockUser(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.users() }),
  });
}

export function useUnlockUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminUserApi.unlockUser(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.users() }),
  });
}