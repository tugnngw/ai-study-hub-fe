// src/features/quiz/hooks/useQuiz.tsx
// Logic Quiz: cấu hình -> tạo -> làm bài -> chấm điểm.
import { useState, useMemo, useEffect } from "react";
import { toast } from "sonner";
import { quizApi } from "../services";
import type { QuizItem, QuizQuestionType } from "../types/quiz.types";

export function useQuiz(docId?: number) {
  // cấu hình
  const [scope, setScope] = useState<"all" | number>(docId ?? "all");
  const [types, setTypes] = useState<QuizQuestionType[]>(["multiple_choice"]);
  const [count, setCount] = useState(5);
  // đồng bộ với tài liệu đang mở
  useEffect(() => { setScope(docId ?? "all"); }, [docId]);

  // trạng thái
  const [phase, setPhase] = useState<"setup" | "doing">("setup");
  const [loading, setLoading] = useState(false);
  const [quizzes, setQuizzes] = useState<QuizItem[]>([]);
  const [answers, setAnswers] = useState<Record<number, number[]>>({});
  const [submitted, setSubmitted] = useState(false);

  const toggleType = (t: QuizQuestionType) =>
    setTypes((cur) => (cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]));

  const generate = async () => {
    if (types.length === 0) { toast.error("Chọn ít nhất 1 loại câu hỏi"); return; }
    setLoading(true);
    try {
      const data = await quizApi.generate({ scope, types, questionCount: count });
      setQuizzes(data);
      setAnswers({});
      setSubmitted(false);
      setPhase("doing");
    } catch {
      toast.error("Tạo quiz thất bại");
    } finally {
      setLoading(false);
    }
  };

  const pick = (qi: number, oi: number, multi: boolean) => {
    setAnswers((a) => {
      const cur = a[qi] ?? [];
      if (multi) return { ...a, [qi]: cur.includes(oi) ? cur.filter((x) => x !== oi) : [...cur, oi] };
      return { ...a, [qi]: [oi] };
    });
  };

  const submit = () => {
    if (Object.keys(answers).length < quizzes.length) { toast.error("Vui lòng trả lời tất cả câu hỏi"); return; }
    setSubmitted(true);
  };
  const retry = () => { setAnswers({}); setSubmitted(false); };
  const backToSetup = () => setPhase("setup");

  const score = useMemo(
    () => quizzes.reduce((s, q, i) => {
      const picked = (answers[i] ?? []).slice().sort().join(",");
      const correct = q.correctAnswers.slice().sort().join(",");
      return picked && picked === correct ? s + 1 : s;
    }, 0),
    [answers, quizzes],
  );

  return {
    scope, setScope, types, toggleType, count, setCount,
    phase, loading, quizzes, answers, submitted, score,
    generate, pick, submit, retry, backToSetup,
  };
}
