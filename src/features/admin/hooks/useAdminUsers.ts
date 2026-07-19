// src/features/admin/hooks/useAdminUsers.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminUserApi } from "../services";
import { adminKeys } from "./adminKeys";

export function useAdminUsers() {
  return useQuery({
    queryKey: adminKeys.users(),
<<<<<<< HEAD
<<<<<<< HEAD
    queryFn: () => adminUserApi.getUsers(),
=======
    queryFn: async () => (await adminUserApi.getUsers()) ?? []
>>>>>>> origin/Flashcars
=======
    queryFn: async () => (await adminUserApi.getUsers()) ?? []
>>>>>>> origin/final/demo-v1
  });
}

export function useToggleUserStatus() {
  const qc = useQueryClient();
  return useMutation({
<<<<<<< HEAD
<<<<<<< HEAD
    mutationFn: (id: number) => adminUserApi.toggleStatus(id),
=======
    mutationFn: (id: string) => adminUserApi.toggleStatus(id),
>>>>>>> origin/Flashcars
=======
    mutationFn: (id: string) => adminUserApi.toggleStatus(id),
>>>>>>> origin/final/demo-v1
    onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.users() }),
  });
}

export function useDeleteUser() {
  const qc = useQueryClient();
  return useMutation({
<<<<<<< HEAD
<<<<<<< HEAD
    mutationFn: (id: number) => adminUserApi.deleteUser(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.users() }),
  });
}
=======
=======
>>>>>>> origin/final/demo-v1
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
<<<<<<< HEAD
}
>>>>>>> origin/Flashcars
=======
}
>>>>>>> origin/final/demo-v1
