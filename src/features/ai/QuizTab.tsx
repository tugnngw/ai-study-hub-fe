import { useState } from "react";
import { Sparkles, Loader2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { QuizViewer } from "@/components/ui/QuizViewer";
import { QuotaDisplay } from "@/components/ui/QuotaDisplay";
import { useGenerateQuiz, useQuizByDocument, useQuota } from "@/lib/queries";
import type { Document } from "@/lib/types";

interface Props {
  docs: Document[];
  docId?: string;
}

export function QuizTab({ docs, docId }: Props) {
  const [quizCount, setQuizCount] = useState(5);
  const generateQuiz = useGenerateQuiz();
  const quizQuery = useQuizByDocument(docId ?? "");
  const { data: quota } = useQuota();

  const remaining = quota?.questionRemaining ?? 0;
  const limit = quota?.questionLimit ?? 0;
  const isExhausted = limit > 0 && remaining <= 0;
  const isLow = limit > 0 && remaining <= Math.floor(limit * 0.2) && remaining > 0;

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="flex-1 overflow-y-auto p-6">
        <QuizViewer
          quizzes={quizQuery.data ?? []}
          isLoading={quizQuery.isLoading}
        />
      </div>
      <div className="p-4 border-t border-border space-y-3">
        <QuotaDisplay />
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium shrink-0">Questions:</label>
          <Input
            type="number"
            min="1"
            max="50"
            value={quizCount}
            onChange={(e) => {
              const v = e.target.value;
              if (v === "" || /^\d+$/.test(v)) {
                const n = parseInt(v, 10);
                setQuizCount(v === "" ? 0 : n > 50 ? 50 : n);
              }
            }}
            onBlur={() => {
              if (quizCount < 1) setQuizCount(10);
            }}
            className="w-20"
          />
          {isExhausted && (
            <span className="text-xs text-red-600 flex items-center gap-1 shrink-0">
              <AlertTriangle className="h-3 w-3" />Hết lượt
            </span>
          )}
          <Button
            disabled={generateQuiz.isPending || !docId || quizCount < 1 || isExhausted}
            onClick={() => {
              if (!docId) return toast.error("Select a document first");
              if (isExhausted) return toast.error("Bạn đã hết lượt tạo quiz. Vui lòng nâng cấp gói.");
              generateQuiz.mutate(
                { documentId: docId, numberOfQuestions: quizCount },
                {
                  onSuccess: () => {
                    toast.success("Quiz generated!");
                  },
                  onError: (err) =>
                    toast.error(
                      err instanceof Error ? err.message : "Failed"
                    ),
                }
              );
            }}
            className={`gap-2 flex-1 ${isExhausted ? "opacity-50" : ""}`}
          >
            {generateQuiz.isPending ? (
              <><Loader2 className="h-4 w-4 animate-spin" />Generating...</>
            ) : isExhausted ? (
              <><AlertTriangle className="h-4 w-4" />Hết lượt</>
            ) : (
              <><Sparkles className="h-4 w-4" />Generate Quiz</>
            )}
          </Button>
        </div>
        {isLow && (
          <p className="text-xs text-amber-600">Chỉ còn {remaining} lượt tạo quiz</p>
        )}
      </div>
    </div>
  );
}
