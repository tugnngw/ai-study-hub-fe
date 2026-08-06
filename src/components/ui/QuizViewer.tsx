import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, RotateCcw, CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { QuizResponse, QuestionResponse, QuizSubmitResponse } from "@/lib/types";
import { quizApi } from "@/lib/realApi";

interface Props {
  quizzes: QuizResponse[];
  isLoading: boolean;
}

type AnswerMap = Map<string, string>;

interface ShuffledOption {
  label: string;
  content: string;
}

export function QuizViewer({ quizzes, isLoading }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>(new Map());
  const [finished, setFinished] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<Map<string, ShuffledOption[]>>(new Map());
  const [shuffledQuestions, setShuffledQuestions] = useState<{ q: QuestionResponse }[] | null>(null);
  const [isShuffled, setIsShuffled] = useState(false);
  // Kết quả backend trả theo từng câu — dùng để highlight đúng/sai sau submit.
  const [results, setResults] = useState<Map<string, NonNullable<QuizSubmitResponse["questionResults"]>[number]>>(new Map());

  const flatQuestions: { q: QuestionResponse }[] = [];
  quizzes.forEach((quiz) => {
    (quiz.questions || []).forEach((q) => flatQuestions.push({ q }));
  });

  const allQuestions = shuffledQuestions ?? flatQuestions;
  const current = allQuestions[currentIdx];

  useEffect(() => {
    const newMap = new Map(shuffledOptions);
    allQuestions.forEach(({ q }) => {
      if (!newMap.has(q.id)) {
        const opts: ShuffledOption[] = [
          { label: "A", content: q.optionA },
          { label: "B", content: q.optionB },
          { label: "C", content: q.optionC },
          { label: "D", content: q.optionD },
        ].sort(() => Math.random() - 0.5);
        newMap.set(q.id, opts);
      }
    });
    setShuffledOptions(newMap);
  }, [quizzes]);

  const selected = current ? answers.get(current.q.id) : undefined;
  const options = current ? (shuffledOptions.get(current.q.id) ?? []) : [];

  useEffect(() => {
    setCurrentIdx(0);
    setAnswers(new Map());
    setFinished(false);
    setShuffledQuestions(null);
    setIsShuffled(false);
    setResults(new Map());
  }, [quizzes]);

  // Chọn đáp án → highlight đúng/sai ngay, giữ nguyên câu, chờ bấm Next
  const selectAnswer = useCallback(async (opt: string) => {
    if (!current || results.has(current.q.id)) return; // câu đã trả lời — khóa
    const question = current.q;
    const next = new Map(answers);
    next.set(question.id, opt);
    setAnswers(next);

    // Tìm quiz chứa câu này để submit (backend chấm từng câu, giữ nguyên scoring)
    const quiz = quizzes.find((qz) => (qz.questions || []).some((qq) => qq.id === question.id));
    if (!quiz) return;

    try {
      const res = await quizApi.submit(quiz.id, [
        { questionId: String(question.id), selectedAnswer: opt },
      ]);
      const allResults = new Map(results);
      (res.questionResults ?? []).forEach((r) => allResults.set(r.questionId, r));
      setResults(allResults);
    } catch {
      // Chấm lỗi — giữ đáp án nhưng không có kết quả backend
    }
  }, [current, answers, results, quizzes]);

  // Bấm chọn đáp án rồi "Next" mới chuyển câu; câu cuối → tổng kết
  const onNext = useCallback(() => {
    if (currentIdx < allQuestions.length - 1) setCurrentIdx((i) => i + 1);
    else setFinished(true);
  }, [currentIdx, allQuestions.length]);

  const goPrev = useCallback(() => {
    // Quay lại câu đã trả lời (review), không đổi đáp án
    if (currentIdx > 0) setCurrentIdx((i) => i - 1);
  }, [currentIdx]);

  const reset = useCallback(() => {
    setCurrentIdx(0);
    setAnswers(new Map());
    setFinished(false);
    setResults(new Map());
  }, []);

  const toggleShuffle = useCallback(() => {
    if (isShuffled) {
      setShuffledQuestions(null);
      setIsShuffled(false);
    } else {
      setShuffledQuestions([...flatQuestions].sort(() => Math.random() - 0.5));
      setIsShuffled(true);
    }
    setCurrentIdx(0);
    setAnswers(new Map());
    setFinished(false);
    setResults(new Map());
  }, [isShuffled, flatQuestions]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onNext, goPrev]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-64"><div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" /></div>;
  }

  if (!allQuestions.length) {
    return <div className="flex flex-col items-center justify-center h-64 text-muted-foreground"><p className="text-sm">No questions yet.</p></div>;
  }

  if (finished) {
    const graded = allQuestions.filter(({ q }) => results.has(q.id));
    const correctCount = graded.filter(({ q }) => results.get(q.id)?.correct).length;
    const wrongCount = graded.length - correctCount;
    const totalQuestions = allQuestions.length;
    const percentage = totalQuestions > 0 ? Math.round((correctCount * 100) / totalQuestions) : 0;
    return (
      <div className="flex flex-col items-center justify-center py-8 gap-4">
        <CheckCircle2 className="h-12 w-12 text-green-500" />
        <h3 className="text-lg font-semibold">Quiz Complete!</h3>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <span className="text-green-600 font-medium">Correct: {correctCount}</span>
          <span className="text-red-600 font-medium">Wrong: {wrongCount}</span>
          <span className="font-medium">Score: {correctCount}/{totalQuestions}</span>
          <span className="font-medium">Percentage: {percentage}%</span>
        </div>

        {/* Chi tiết từng câu — highlight đúng/sai, không hiện A/B/C/D */}
        {allQuestions.length > 0 && (
          <div className="w-full max-w-2xl space-y-3 max-h-[40vh] overflow-y-auto">
            {allQuestions.map(({ q }, i) => {
              const r = results.get(q.id);
              const sel = answers.get(q.id);
              const opts = shuffledOptions.get(q.id) ?? [
                { label: "A", content: q.optionA },
                { label: "B", content: q.optionB },
                { label: "C", content: q.optionC },
                { label: "D", content: q.optionD },
              ];
              return (
                <div key={q.id} className="rounded-xl border border-border bg-card p-4">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium">
                      <span className="text-muted-foreground mr-1">Q{i + 1}.</span>
                      {q.content}
                    </p>
                    {r ? (
                      r.correct ? (
                        <span className="inline-flex items-center gap-1 text-[11px] text-green-600 bg-green-500/10 px-2 py-0.5 rounded-full shrink-0">
                          <CheckCircle2 className="h-3 w-3" /> Correct
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] text-red-600 bg-red-500/10 px-2 py-0.5 rounded-full shrink-0">
                          <XCircle className="h-3 w-3" /> Incorrect
                        </span>
                      )
                    ) : (
                      <span className="text-[11px] text-muted-foreground shrink-0">Không trả lời</span>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-2">
                    {opts.map((opt) => {
                      const isCorrect = r?.correctAnswer === opt.label;
                      const isSelected = sel === opt.label;
                      return (
                        <div
                          key={opt.label}
                          className={cn(
                            "text-xs px-2.5 py-1.5 rounded-md border",
                            isCorrect && "border-green-500/50 bg-green-500/10 text-green-700",
                            !isCorrect && isSelected && "border-red-500/50 bg-red-500/10 text-red-700",
                            !isCorrect && !isSelected && "border-border text-muted-foreground",
                          )}
                        >
                          {opt.content}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <Button onClick={reset} variant="outline" className="gap-2">
          <RotateCcw className="h-4 w-4" />Retry
        </Button>
      </div>
    );
  }


  const q = current!.q;
  const isAnswered = results.has(q.id);

  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <button type="button" onClick={goPrev} disabled={currentIdx === 0} className="disabled:opacity-30 hover:text-foreground">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="font-medium tabular-nums min-w-[8rem] text-center">Q{currentIdx + 1} of {allQuestions.length}</span>
        <button
          type="button"
          onClick={onNext}
          disabled={currentIdx >= allQuestions.length - 1}
          className="disabled:opacity-30 hover:text-foreground"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={toggleShuffle} className="gap-1.5 text-xs">
          <svg className={cn("h-3.5 w-3.5", isShuffled && "text-primary")} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg>
          {isShuffled ? "Reset order" : "Shuffle"}
        </Button>
        <Button variant="outline" size="sm" onClick={reset} className="gap-1.5 text-xs">
          <RotateCcw className="h-3.5 w-3.5" />Reset
        </Button>
      </div>
      <div className="w-full max-w-2xl p-8 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-xl text-white text-center">
        <p className="text-xs text-white/60 mb-3">Question {currentIdx + 1}</p>
        <p className="text-xl font-semibold leading-relaxed">{q.content}</p>
      </div>

      <div className="w-full max-w-2xl space-y-3">
        {options.map((opt) => {
          const isSelected = selected === opt.label;
          const r = results.get(q.id);
          const locked = !!r; // câu đã chấm — khóa, không đổi đáp án
          const isCorrect = r?.correctAnswer === opt.label;
          const isWrongPick = r && isSelected && !r.correct;
          return (
            <button
              key={opt.label}
              type="button"
              disabled={locked}
              onClick={() => void selectAnswer(opt.label)}
              className={cn(
                "w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all",
                locked
                  ? cn(
                      isCorrect && "border-green-500 bg-green-500/10",
                      isWrongPick && "border-red-500 bg-red-500/10",
                      !isCorrect && !isWrongPick && "border-border bg-card opacity-60",
                    )
                  : cn(
                      isSelected && "border-indigo-400 bg-indigo-50 dark:bg-indigo-950",
                      !isSelected && "border-border bg-card hover:border-indigo-300 hover:bg-accent",
                    ),
              )}
            >
              <span className="text-sm flex-1">{opt.content}</span>
              {locked && isCorrect && <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />}
              {locked && isWrongPick && <XCircle className="h-4 w-4 text-red-600 shrink-0" />}
            </button>
          );
        })}
      </div>

      {isAnswered ? (
          <Button onClick={onNext} variant="default" className="gap-2 mt-1">
            {currentIdx < allQuestions.length - 1 ? (
              <>Next Question <ArrowRight className="h-4 w-4" /></>
            ) : (
              <>Xem kết quả <ArrowRight className="h-4 w-4" /></>
            )}
          </Button>
      ) : (
        <p className="text-xs text-muted-foreground">Select an answer above</p>
      )}
    </div>
  );
}
