// src/features/admin/components/AdminSemestersPage.tsx
import { useState } from "react";
import {
  Plus,
  Trash2,
  GraduationCap,
  BookOpen,
  Loader2,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import {
  useAdminSemesters,
  useCreateSemester,
  useDeleteSemester,
  useAdminSubjects,
  useCreateSubject,
  useDeleteSubject,
} from "../hooks";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function AdminSemestersPage() {
  const semesters = useAdminSemesters();
  const createSem = useCreateSemester();
  const deleteSem = useDeleteSemester();
  const [expandedSem, setExpandedSem] = useState<string | null>(null);
  const [semesterOpen, setSemesterOpen] = useState(false);
  const [subjectOpen, setSubjectOpen] = useState(false);
  const [selectedSemId, setSelectedSemId] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string; type: "semester" | "subject" } | null>(null);
  const [newSemName, setNewSemName] = useState("");
  const [newSubjCode, setNewSubjCode] = useState("");
  const [newSubjName, setNewSubjName] = useState("");

  const subjects = useAdminSubjects(expandedSem ?? undefined);

  const createSemester = async () => {
    if (!newSemName.trim()) return toast.error("Nhập tên kỳ học");
    await createSem.mutateAsync(newSemName.trim());
    setNewSemName("");
    setSemesterOpen(false);
  };

  const createSubject = async () => {
    if (!newSubjCode.trim()) return toast.error("Nhập mã môn");
    if (!newSubjName.trim()) return toast.error("Nhập tên môn");
    await createSubj.mutateAsync({
      semesterId: selectedSemId,
      code: newSubjCode.trim(),
      name: newSubjName.trim(),
    });
    setNewSubjCode("");
    setNewSubjName("");
    setSubjectOpen(false);
  };

  const createSubj = useCreateSubject();
  const deleteSubj = useDeleteSubject();

  const doDelete = () => {
    if (!deleteTarget) return;
    if (deleteTarget.type === "semester") {
      deleteSem.mutate(deleteTarget.id);
    } else {
      deleteSubj.mutate(deleteTarget.id);
    }
    setDeleteTarget(null);
  };

  const isSemPending = createSem.isPending || deleteSem.isPending;
  const isSubjPending = createSubj.isPending || deleteSubj.isPending;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Quản lý Kỳ học &amp; Môn học</h1>
          <p className="text-muted-foreground mt-1">Thêm, xoá kỳ học và môn học trong hệ thống</p>
        </div>
        <Button onClick={() => setSemesterOpen(true)}>
          <Plus className="h-4 w-4 mr-2" /> Thêm kỳ học
        </Button>
      </div>

      {semesters.isLoading ? (
        <Card>
          <CardContent className="py-12 text-center flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" /> Đang tải…
          </CardContent>
        </Card>
      ) : (semesters.data ?? []).length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <GraduationCap className="h-10 w-10 mx-auto text-muted-foreground/50" />
            <p className="mt-4 text-sm text-muted-foreground">Chưa có kỳ học nào</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {(semesters.data ?? []).map((sem) => {
            const isExpanded = expandedSem === sem.id;
            return (
              <Card key={sem.id} className="overflow-hidden">
                <div
                  className="flex items-center gap-3 p-4 cursor-pointer hover:bg-accent/30 transition-colors"
                  onClick={() => {
                    setExpandedSem(isExpanded ? null : sem.id);
                  }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-auto"
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedSem(isExpanded ? null : sem.id);
                    }}
                  >
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                  <GraduationCap className="h-5 w-5 text-primary shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate">{sem.name}</div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive"
                    disabled={isSemPending}
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteTarget({ id: sem.id, name: sem.name, type: "semester" });
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                {isExpanded && (
                  <div className="border-t border-border px-4 py-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold tracking-wider text-muted-foreground">
                        MÔN HỌC
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedSemId(sem.id);
                          setSubjectOpen(true);
                        }}
                      >
                        <Plus className="h-3.5 w-3.5 mr-1" /> Thêm môn
                      </Button>
                    </div>
                    {subjects.isLoading ? (
                      <div className="flex items-center gap-2 py-2 text-xs text-muted-foreground">
                        <Loader2 className="h-3 w-3 animate-spin" /> Đang tải…
                      </div>
                    ) : (subjects.data ?? []).length === 0 ? (
                      <div className="text-xs text-muted-foreground py-2">Chưa có môn học nào</div>
                    ) : (
                      <div className="divide-y divide-border/50">
                        {(subjects.data ?? []).map((subj) => (
                          <div key={subj.id} className="flex items-center gap-3 py-2">
                            <BookOpen className="h-4 w-4 text-muted-foreground shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className="text-sm truncate">
                                {subj.code && (
                                  <span className="font-mono text-xs text-muted-foreground mr-1.5">{subj.code}</span>
                                )}
                                {subj.name}
                                {subj.defaultSubject && (
                                  <Badge variant="secondary" className="ml-2 text-[10px] px-1.5 py-0 h-auto">
                                    Mặc định
                                  </Badge>
                                )}
                              </div>
                            </div>
                            {!subj.defaultSubject && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-destructive"
                                disabled={isSubjPending}
                                onClick={() =>
                                  setDeleteTarget({ id: subj.id, name: `${subj.code} - ${subj.name}`, type: "subject" })
                                }
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}

      {/* Create semester dialog */}
      <Dialog open={semesterOpen} onOpenChange={setSemesterOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm kỳ học mới</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Tên kỳ học</Label>
              <Input
                value={newSemName}
                onChange={(e) => setNewSemName(e.target.value)}
                placeholder="VD: Spring 2025"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSemesterOpen(false)}>Huỷ</Button>
            <Button onClick={createSemester} disabled={createSem.isPending || !newSemName.trim()}>
              {createSem.isPending ? "Đang tạo…" : "Tạo"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create subject dialog */}
      <Dialog open={subjectOpen} onOpenChange={setSubjectOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm môn học mới</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Mã môn</Label>
              <Input
                value={newSubjCode}
                onChange={(e) => setNewSubjCode(e.target.value)}
                placeholder="VD: SWP391"
              />
            </div>
            <div className="space-y-2">
              <Label>Tên môn</Label>
              <Input
                value={newSubjName}
                onChange={(e) => setNewSubjName(e.target.value)}
                placeholder="VD: Software Development Project"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSubjectOpen(false)}>Huỷ</Button>
            <Button onClick={createSubject} disabled={createSubj.isPending || !newSubjCode.trim() || !newSubjName.trim()}>
              {createSubj.isPending ? "Đang tạo…" : "Tạo"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm delete */}
      <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xoá {deleteTarget?.type === "semester" ? "kỳ học" : "môn học"}?</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc muốn xoá <strong>{deleteTarget?.name}</strong>?
              {deleteTarget?.type === "semester" && " Các môn học trong kỳ này cũng sẽ bị xoá."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Huỷ</AlertDialogCancel>
            <AlertDialogAction onClick={doDelete} className="bg-destructive text-destructive-foreground">
              Xoá
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
