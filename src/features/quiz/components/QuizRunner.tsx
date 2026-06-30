// src/features/quiz/components/QuizRunner.tsx — màn LÀM BÀI + chấm điểm
import { Sparkles, RotateCw, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { QuizItem } from "../types/quiz.types";
import { TYPE_LABELS } from "./quiz-constants";

interface Props {
  quizzes: QuizItem[];
  answers: Record<number, number[]>;
  submitted: boolean;
  score: number;
  scopeLabel: string;
  onPick: (qi: number, oi: number, multi: boolean) => void;
  onSubmit: () => void;
  onRetry: () => void;
  onBack: () => void;
}

export function QuizRunner({ quizzes, answers, submitted, score, scopeLabel, onPick, onSubmit, onRetry, onBack }: Props) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2 text-gradient-brand font-display">
            <Sparkles className="h-5 w-5" /> AI Quizzes
          </h2>
          <p className="text-xs text-muted-foreground mt-1">{scopeLabel} · {quizzes.length} câu</p>
        </div>
        {submitted && (
          <div className="text-sm font-semibold">Điểm: <span className="text-gradient-brand">{score} / {quizzes.length}</span></div>
        )}
      </div>

      <div className="space-y-4">
        {quizzes.map((quiz, qi) => {
          const multi = quiz.type === "multiple_answer";
          return (
            <div key={qi} className="rounded-lg border border-border p-4">
              <div className="font-medium text-sm mb-1">Câu {qi + 1}. {quiz.question}</div>
              <div className="text-[11px] text-muted-foreground mb-3">{TYPE_LABELS[quiz.type]}</div>
              <div className="space-y-2">
                {quiz.options.map((opt, oi) => {
                  const picked = (answers[qi] ?? []).includes(oi);
                  const isCorrect = quiz.correctAnswers.includes(oi);
                  const showCorrect = submitted && isCorrect;
                  const showWrong = submitted && picked && !isCorrect;
                  return (
                    <button key={oi} disabled={submitted} onClick={() => onPick(qi, oi, multi)}
                      className={cn("w-full text-left flex items-center gap-3 px-3 py-2 rounded-md border text-sm transition-colors",
                        showCorrect && "border-emerald-400 bg-emerald-50/60",
                        showWrong && "border-red-400 bg-red-50/60",
                        !submitted && picked && "border-primary bg-brand-soft/60",
                        !submitted && !picked && "border-border hover:bg-accent")}>
                      <span className={cn("h-5 w-5 flex items-center justify-center text-[10px] font-bold shrink-0 border",
                        multi ? "rounded" : "rounded-full",
                        showCorrect && "bg-emerald-500 text-white border-emerald-500",
                        showWrong && "bg-red-500 text-white border-red-500",
                        !submitted && picked && "bg-gradient-brand text-white border-transparent")}>
                        {showCorrect ? <Check className="h-3 w-3" /> : showWrong ? <X className="h-3 w-3" /> : String.fromCharCode(65 + oi)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between gap-2">
        <Button variant="ghost" onClick={onBack}>← Tùy chọn</Button>
        {submitted ? (
          <Button variant="outline" onClick={onRetry}><RotateCw className="h-4 w-4 mr-2" /> Làm lại</Button>
        ) : (
          <Button onClick={onSubmit}>Nộp bài</Button>
        )}
      </div>
    </div>
  );
}
