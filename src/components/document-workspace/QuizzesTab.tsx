// src/components/document-workspace/QuizzesTab.tsx
import { useState, useMemo } from "react";
import { Sparkles, RotateCw, Check, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Quiz {
  q: string;
  options: string[];
  answer: number;
}

const DEFAULT_QUIZZES: Quiz[] = [
  {
    q: "Thuật ngữ "Algorithm" có nghĩa là gì?",
    options: [
      "Một loại ngôn ngữ lập trình",
      "Tập hợp các bước giải quyết bài toán",
      "Một loại biến trong bộ nhớ",
      "Tên gọi của một framework",
    ],
    answer: 1,
  },
  {
    q: "Cấu trúc nào dùng để lặp lại một khối lệnh?",
    options: ["Function", "Variable", "Loop", "Class"],
    answer: 2,
  },
  {
    q: "Trong OOP, "Class" là gì?",
    options: [
      "Một biến toàn cục",
      "Khuôn mẫu định nghĩa đối tượng",
      "Một hàm trả về số",
      "Một loại vòng lặp",
    ],
    answer: 1,
  },
];

export function QuizzesTab({ title }: { title: string }) {
  const quizzes = useMemo(() => DEFAULT_QUIZZES, []);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(
    () => quizzes.reduce((s, q, i) => (answers[i] === q.answer ? s + 1 : s), 0),
    [answers, quizzes],
  );

  const reset = () => { setAnswers({}); setSubmitted(false); };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2 text-gradient-brand font-display">
            <Sparkles className="h-5 w-5" /> AI Quizzes
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Câu hỏi trắc nghiệm từ "{title}"
          </p>
        </div>
        {submitted && (
          <div className="text-sm font-semibold">
            Điểm: <span className="text-gradient-brand">{score} / {quizzes.length}</span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {quizzes.map((quiz, qi) => (
          <div key={qi} className="rounded-lg border border-border p-4">
            <div className="font-medium text-sm mb-3">Câu {qi + 1}. {quiz.q}</div>
            <div className="space-y-2">
              {quiz.options.map((opt, oi) => {
                const picked = answers[qi] === oi;
                const correct = submitted && oi === quiz.answer;
                const wrong = submitted && picked && oi !== quiz.answer;
                return (
                  <button
                    key={oi}
                    disabled={submitted}
                    onClick={() => setAnswers((a) => ({ ...a, [qi]: oi }))}
                    className={cn(
                      "w-full text-left flex items-center gap-3 px-3 py-2 rounded-md border text-sm transition-colors",
                      correct && "border-emerald-400 bg-emerald-50/60",
                      wrong && "border-red-400 bg-red-50/60",
                      !submitted && picked && "border-primary bg-brand-soft/60",
                      !submitted && !picked && "border-border hover:bg-accent",
                    )}
                  >
                    <span className={cn(
                      "h-5 w-5 rounded-full border flex items-center justify-center text-[10px] font-bold shrink-0",
                      correct && "bg-emerald-500 text-white border-emerald-500",
                      wrong && "bg-red-500 text-white border-red-500",
                      !submitted && picked && "bg-gradient-brand text-white border-transparent",
                    )}>
                      {correct ? <Check className="h-3 w-3" /> : wrong ? <X className="h-3 w-3" /> : String.fromCharCode(65 + oi)}
                    </span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-2">
        {submitted ? (
          <Button variant="outline" onClick={reset}>
            <RotateCw className="h-4 w-4 mr-2" /> Làm lại
          </Button>
        ) : (
          <Button onClick={() => {
            if (Object.keys(answers).length < quizzes.length) {
              toast.error("Vui lòng trả lời tất cả câu hỏi");
              return;
            }
            setSubmitted(true);
          }}>
            Nộp bài
          </Button>
        )}
      </div>
    </div>
  );
}
