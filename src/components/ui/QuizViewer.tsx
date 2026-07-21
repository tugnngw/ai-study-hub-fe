import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { QuizResponse, QuestionResponse } from "@/lib/types";

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
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [finished, setFinished] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<Map<string, ShuffledOption[]>>(new Map());
  const [shuffledQuestions, setShuffledQuestions] = useState<{ q: QuestionResponse }[] | null>(null);
  const [isShuffled, setIsShuffled] = useState(false);

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
  const isRevealed = current ? revealed.has(current.q.id) : false;
  const options = current ? (shuffledOptions.get(current.q.id) ?? []) : [];

  const correctLabel = current
    ? (shuffledOptions.get(current.q.id)?.find((o) => o.label === current.q.correctAnswer)?.label ?? "A")
    : undefined;

  useEffect(() => {
    setCurrentIdx(0);
    setAnswers(new Map());
    setRevealed(new Set());
    setFinished(false);
    setShuffledQuestions(null);
    setIsShuffled(false);
  }, [quizzes]);

  const selectAnswer = useCallback((opt: string) => {
    if (!current || isRevealed) return;
    const next = new Map(answers);
    next.set(current.q.id, opt);
    setAnswers(next);
    // auto-reveal
    const nextRevealed = new Set(revealed);
    nextRevealed.add(current.q.id);
    setRevealed(nextRevealed);
  }, [current, isRevealed, answers, revealed]);

  const goNext = useCallback(() => {
    if (currentIdx < allQuestions.length - 1) setCurrentIdx((i) => i + 1);
    else setFinished(true);
  }, [currentIdx, allQuestions.length]);

  const goPrev = useCallback(() => {
    if (currentIdx > 0) setCurrentIdx((i) => i - 1);
  }, [currentIdx]);

  const reset = useCallback(() => {
    setCurrentIdx(0);
    setAnswers(new Map());
    setRevealed(new Set());
    setFinished(false);
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
    setRevealed(new Set());
    setFinished(false);
  }, [isShuffled, flatQuestions]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-64"><div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" /></div>;
  }

  if (!allQuestions.length) {
    return <div className="flex flex-col items-center justify-center h-64 text-muted-foreground"><p className="text-sm">No questions yet.</p></div>;
  }

  if (finished) {
    const correctCount = allQuestions.filter((item) => {
      const ans = answers.get(item.q.id);
      return ans === (shuffledOptions.get(item.q.id)?.find((o) => o.label === item.q.correctAnswer)?.label);
    }).length;

    return (
      <div className="flex flex-col items-center justify-center py-8 gap-4">
        <CheckCircle2 className="h-12 w-12 text-green-500" />
        <h3 className="text-lg font-semibold">Quiz Complete!</h3>
        <p className="text-muted-foreground">{correctCount} / {allQuestions.length} correct</p>
        <Button onClick={reset} variant="outline" className="gap-2">
          <RotateCcw className="h-4 w-4" />Retry
        </Button>
      </div>
    );
  }

  const q = current!.q;

  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <button onClick={goPrev} disabled={currentIdx === 0} className="disabled:opacity-30 hover:text-foreground">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="font-medium tabular-nums min-w-[8rem] text-center">Q{currentIdx + 1} of {allQuestions.length}</span>
        <button onClick={goNext} disabled={currentIdx >= allQuestions.length - 1} className="disabled:opacity-30 hover:text-foreground">
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
          const isCorrect = correctLabel === opt.label;
          const showAsCorrect = isRevealed && isCorrect;
          const showAsWrong = isRevealed && isSelected && !isCorrect;
          const showAsMissed = isRevealed && !isSelected && isCorrect && selected !== undefined;
          return (
            <button
              key={opt.label}
              disabled={isRevealed}
              onClick={() => selectAnswer(opt.label)}
              className={cn(
                "w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all",
                showAsCorrect && "border-green-500 bg-green-50 dark:bg-green-950",
                showAsWrong && "border-red-500 bg-red-50 dark:bg-red-950",
                showAsMissed && "border-green-500 bg-green-50 dark:bg-green-950",
                !isRevealed && isSelected && "border-indigo-400 bg-indigo-50 dark:bg-indigo-950",
                !isRevealed && !isSelected && "border-border bg-card hover:border-indigo-300 hover:bg-accent",
                isRevealed && !isCorrect && !isSelected && "opacity-50 border-border",
                isRevealed && isCorrect && "opacity-100"
              )}
            >
              <span className="text-sm flex-1">{opt.content}</span>
              {showAsCorrect && <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />}
              {showAsWrong && <XCircle className="h-5 w-5 text-red-500 shrink-0" />}
            </button>
          );
        })}
      </div>

      {isRevealed ? (
        <Button onClick={goNext} className="w-full max-w-2xl">
          {currentIdx < allQuestions.length - 1 ? "Next Question" : "See Results"}
        </Button>
      ) : (
        <p className="text-xs text-muted-foreground">Select an answer above</p>
      )}
    </div>
  );
}
