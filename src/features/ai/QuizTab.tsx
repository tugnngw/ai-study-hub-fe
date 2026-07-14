import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { QuizViewer } from "@/components/ui/QuizViewer";
import { QuotaDisplay } from "@/components/ui/QuotaDisplay";
import { useGenerateQuiz, useQuizByDocument } from "@/lib/queries";
import type { Document } from "@/lib/types";

interface Props {
  docs: Document[];
  docId?: string;
}

export function QuizTab({ docs, docId }: Props) {
  const [quizCount, setQuizCount] = useState(5);
  const generateQuiz = useGenerateQuiz();
  const quizQuery = useQuizByDocument(docId ?? "");

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
          <Button
            disabled={generateQuiz.isPending || !docId || quizCount < 1}
            onClick={() => {
              if (!docId) return toast.error("Select a document first");
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
            className="gap-2 flex-1"
          >
            {generateQuiz.isPending ? (
              <><Loader2 className="h-4 w-4 animate-spin" />Generating...</>
            ) : (
              <><Sparkles className="h-4 w-4" />Generate Quiz</>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
