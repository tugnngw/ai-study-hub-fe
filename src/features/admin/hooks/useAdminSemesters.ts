// src/features/admin/hooks/useAdminSemesters.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { semesterApi, subjectApi } from "@/lib/realApi";
import { adminKeys } from "./adminKeys";

// ================================================================
// SEMESTERS
// ================================================================

export function useAdminSemesters() {
  return useQuery({
    queryKey: adminKeys.semesters(),
    queryFn: () => semesterApi.list(),
  });
}

export function useCreateSemester() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (name: string) => semesterApi.create(name),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKeys.semesters() });
      toast.success("Đã tạo kỳ học mới");
    },
    onError: (err: any) => {
      toast.error(err?.message || "Không thể tạo kỳ học");
    },
  });
}

export function useDeleteSemester() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => semesterApi.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKeys.semesters() });
      toast.success("Đã xoá kỳ học");
    },
    onError: (err: any) => {
      toast.error(err?.message || "Không thể xoá kỳ học");
    },
  });
}

// ================================================================
// SUBJECTS
// ================================================================

export function useAdminSubjects(semesterId?: string) {
  return useQuery({
    queryKey: [...adminKeys.subjects(), semesterId],
    queryFn: () => subjectApi.listBySemester(semesterId!),
    enabled: !!semesterId,
  });
}

export function useCreateSubject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: { semesterId: string; code: string; name: string }) =>
      subjectApi.create(body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKeys.subjects() });
      qc.invalidateQueries({ queryKey: ["subjects"] });
      toast.success("Đã tạo môn học mới");
    },
    onError: (err: any) => {
      toast.error(err?.message || "Không thể tạo môn học");
    },
  });
}

export function useDeleteSubject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => subjectApi.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKeys.subjects() });
      qc.invalidateQueries({ queryKey: ["subjects"] });
      toast.success("Đã xoá môn học");
    },
    onError: (err: any) => {
      toast.error(err?.message || "Không thể xoá môn học");
    },
  });
}
