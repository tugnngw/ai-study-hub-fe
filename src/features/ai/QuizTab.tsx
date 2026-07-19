import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { QuizViewer } from "@/components/ui/QuizViewer";
import { useGenerateQuiz } from "@/lib/queries";
import type { Document } from "@/lib/types";

interface Props {
  docs: Document[];
  docId?: string;
}

export function QuizTab({ docs, docId }: Props) {
  const [quizCount, setQuizCount] = useState(10);
  const generateQuiz = useGenerateQuiz();

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="mt-4 space-y-4">
        <div className="flex-1">
          <label className="text-sm font-medium">Number of questions:</label>
          <Input
            type="number"
            min="1"
            max="50"
            value={quizCount}
            onChange={(e) => setQuizCount(parseInt(e.target.value) || 10)}
            className="mt-1"
          />
        </div>
        <Button
          disabled={generateQuiz.isPending || !docId}
          onClick={() => {
            if (!docId) return toast.error("Select a document first");
            generateQuiz.mutate(
              { documentId: docId, numberOfQuestions: quizCount },
              {
                onSuccess: () => toast.success("Quiz generated!"),
                onError: (err) =>
                  toast.error(
                    err instanceof Error ? err.message : "Failed"
                  ),
              }
            );
          }}
          className="w-full gap-2"
        >
          {generateQuiz.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Quiz
            </>
          )}
        </Button>
        <QuizViewer
          quizzes={generateQuiz.data ? [generateQuiz.data] : []}
          isLoading={generateQuiz.isPending}
        />
      </div>
    </div>
  );
}
