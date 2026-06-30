// src/components/document-workspace/QuizzesTab.tsx
// Tab AI Quizzes (trong session AIChat): màn TÙY CHỌN khởi tạo -> màn LÀM BÀI.
import { useState, useMemo, useEffect } from "react";
import { Sparkles, RotateCw, Check, X, FileText, Files, Loader2, Settings2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDocumentsByFolder } from "@/lib/queries";
import type { QuizItem, QuizQuestionType, QuizGenerateOptions } from "@/features/quiz/types/quiz.types";
import { quizApi } from "@/lib/realApi";

const TYPE_LABELS: Record<QuizQuestionType, string> = {
  multiple_choice: "Trắc nghiệm (1 đáp án)",
  true_false: "Đúng / Sai",
  multiple_answer: "Nhiều đáp án",
};

export function QuizzesTab({ folderId, docId, title }: { folderId: string; docId?: number; title: string }) {
  const folderDocs = useDocumentsByFolder(folderId);
  const docs = folderDocs.data ?? [];

  // ── cấu hình ──
  const [scope, setScope] = useState<"all" | number>(docId ?? "all");
  // Đồng bộ: khi đổi tài liệu ở tab trên / danh sách trái (docId từ URL đổi),
  // "Tài liệu tham chiếu" tự chọn theo.
  useEffect(() => { setScope(docId ?? "all"); }, [docId]);
  const [types, setTypes] = useState<QuizQuestionType[]>(["multiple_choice"]);
  const [count, setCount] = useState(5);

  // ── trạng thái ──
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
      const opts: QuizGenerateOptions = { scope, types, questionCount: count };
      const data = await quizApi.generateAdvanced(opts);
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

  const score = useMemo(
    () => quizzes.reduce((s, q, i) => {
      const picked = (answers[i] ?? []).slice().sort().join(",");
      const correct = q.correctAnswers.slice().sort().join(",");
      return picked && picked === correct ? s + 1 : s;
    }, 0),
    [answers, quizzes],
  );

  const pick = (qi: number, oi: number, multi: boolean) => {
    setAnswers((a) => {
      const cur = a[qi] ?? [];
      if (multi) {
        return { ...a, [qi]: cur.includes(oi) ? cur.filter((x) => x !== oi) : [...cur, oi] };
      }
      return { ...a, [qi]: [oi] };
    });
  };

  // ── MÀN TÙY CHỌN ──
  if (phase === "setup") {
    return (
      <div className="min-h-full flex items-center justify-center">
        <div className="space-y-6 w-full max-w-md">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2 text-gradient-brand font-display">
            <Sparkles className="h-5 w-5" /> Tạo AI Quiz
          </h2>
          <p className="text-xs text-muted-foreground mt-1">Tùy chỉnh trước khi tạo bộ câu hỏi</p>
        </div>

        {/* Chọn tài liệu tham chiếu */}
        <div className="space-y-2">
          <label className="text-sm font-semibold flex items-center gap-1.5"><Files className="h-4 w-4" /> Tài liệu tham chiếu</label>
          <div className="grid gap-2">
            <button
              onClick={() => setScope("all")}
              className={cn("flex items-center gap-2 px-3 py-2 rounded-lg border text-sm text-left transition-colors",
                scope === "all" ? "border-primary bg-brand-soft/60" : "border-border hover:bg-accent")}
            >
              <Files className="h-4 w-4" /> Tất cả tài liệu trong thư mục
              <span className="ml-auto text-xs text-muted-foreground">{docs.length} tệp</span>
            </button>
            {docs.map((d) => (
              <button
                key={d.id}
                onClick={() => setScope(d.id)}
                className={cn("flex items-center gap-2 px-3 py-2 rounded-lg border text-sm text-left transition-colors",
                  scope === d.id ? "border-primary bg-brand-soft/60" : "border-border hover:bg-accent")}
              >
                <FileText className="h-4 w-4 shrink-0" /> <span className="truncate">{d.title}</span>
              </button>
            ))}
            {docs.length === 0 && <p className="text-xs text-muted-foreground">Thư mục chưa có tài liệu.</p>}
          </div>
        </div>

        {/* Loại câu hỏi */}
        <div className="space-y-2">
          <label className="text-sm font-semibold flex items-center gap-1.5"><Settings2 className="h-4 w-4" /> Loại câu hỏi</label>
          <div className="grid gap-2">
            {(Object.keys(TYPE_LABELS) as QuizQuestionType[]).map((t) => (
              <button
                key={t}
                onClick={() => toggleType(t)}
                className={cn("flex items-center gap-2 px-3 py-2 rounded-lg border text-sm text-left transition-colors",
                  types.includes(t) ? "border-primary bg-brand-soft/60" : "border-border hover:bg-accent")}
              >
                <span className={cn("h-4 w-4 rounded border flex items-center justify-center",
                  types.includes(t) ? "bg-gradient-brand border-transparent" : "border-border")}>
                  {types.includes(t) && <Check className="h-3 w-3 text-white" />}
                </span>
                {TYPE_LABELS[t]}
              </button>
            ))}
          </div>
        </div>

        {/* Số câu */}
        <div className="space-y-2">
          <label className="text-sm font-semibold">Số câu hỏi: <span className="text-gradient-brand">{count}</span></label>
          <input type="range" min={3} max={20} value={count} onChange={(e) => setCount(Number(e.target.value))} className="w-full accent-[var(--primary)]" />
        </div>

        <Button onClick={generate} disabled={loading} className="w-full bg-gradient-brand shadow-brand">
          {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Đang tạo…</> : <><Sparkles className="h-4 w-4 mr-2" /> Tạo Quiz</>}
        </Button>
        </div>
      </div>
    );
  }

  // ── MÀN LÀM BÀI ──
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2 text-gradient-brand font-display">
            <Sparkles className="h-5 w-5" /> AI Quizzes
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            {scope === "all" ? `Toàn bộ thư mục` : `Từ "${title}"`} · {quizzes.length} câu
          </p>
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
                    <button
                      key={oi}
                      disabled={submitted}
                      onClick={() => pick(qi, oi, multi)}
                      className={cn("w-full text-left flex items-center gap-3 px-3 py-2 rounded-md border text-sm transition-colors",
                        showCorrect && "border-emerald-400 bg-emerald-50/60",
                        showWrong && "border-red-400 bg-red-50/60",
                        !submitted && picked && "border-primary bg-brand-soft/60",
                        !submitted && !picked && "border-border hover:bg-accent")}
                    >
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
        <Button variant="ghost" onClick={() => setPhase("setup")}>← Tùy chọn</Button>
        {submitted ? (
          <Button variant="outline" onClick={() => { setAnswers({}); setSubmitted(false); }}>
            <RotateCw className="h-4 w-4 mr-2" /> Làm lại
          </Button>
        ) : (
          <Button onClick={() => {
            if (Object.keys(answers).length < quizzes.length) { toast.error("Vui lòng trả lời tất cả câu hỏi"); return; }
            setSubmitted(true);
          }}>Nộp bài</Button>
        )}
      </div>
    </div>
  );
}
