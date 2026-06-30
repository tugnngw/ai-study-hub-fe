// src/features/admin/hooks/useAdminUsers.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminUserApi } from "../services";
import { adminKeys } from "./adminKeys";

export function useAdminUsers() {
  return useQuery({
    queryKey: adminKeys.users(),
    queryFn: () => adminUserApi.getUsers(),
  });
}

export function useToggleUserStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => adminUserApi.toggleStatus(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.users() }),
  });
}

export function useDeleteUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => adminUserApi.deleteUser(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.users() }),
  });
}
