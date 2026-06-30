// src/features/quiz/components/QuizSetup.tsx — màn TÙY CHỌN khởi tạo quiz
import { Sparkles, Check, FileText, Files, Loader2, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDocumentsByFolder } from "@/lib/queries";
import type { QuizQuestionType } from "../types/quiz.types";
import { TYPE_LABELS } from "./quiz-constants";

interface Props {
  folderId: string;
  scope: "all" | number;
  setScope: (s: "all" | number) => void;
  types: QuizQuestionType[];
  toggleType: (t: QuizQuestionType) => void;
  count: number;
  setCount: (n: number) => void;
  loading: boolean;
  onGenerate: () => void;
}

export function QuizSetup({ folderId, scope, setScope, types, toggleType, count, setCount, loading, onGenerate }: Props) {
  const docs = useDocumentsByFolder(folderId).data ?? [];
  return (
    <div className="min-h-full flex items-center justify-center">
      <div className="space-y-6 w-full max-w-md">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2 text-gradient-brand font-display">
            <Sparkles className="h-5 w-5" /> Tạo AI Quiz
          </h2>
          <p className="text-xs text-muted-foreground mt-1">Tùy chỉnh trước khi tạo bộ câu hỏi</p>
        </div>

        {/* Tài liệu tham chiếu */}
        <div className="space-y-2">
          <label className="text-sm font-semibold flex items-center gap-1.5"><Files className="h-4 w-4" /> Tài liệu tham chiếu</label>
          <div className="grid gap-2">
            <button onClick={() => setScope("all")}
              className={cn("flex items-center gap-2 px-3 py-2 rounded-lg border text-sm text-left transition-colors",
                scope === "all" ? "border-primary bg-brand-soft/60" : "border-border hover:bg-accent")}>
              <Files className="h-4 w-4" /> Tất cả tài liệu trong thư mục
              <span className="ml-auto text-xs text-muted-foreground">{docs.length} tệp</span>
            </button>
            {docs.map((d) => (
              <button key={d.id} onClick={() => setScope(d.id)}
                className={cn("flex items-center gap-2 px-3 py-2 rounded-lg border text-sm text-left transition-colors",
                  scope === d.id ? "border-primary bg-brand-soft/60" : "border-border hover:bg-accent")}>
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
              <button key={t} onClick={() => toggleType(t)}
                className={cn("flex items-center gap-2 px-3 py-2 rounded-lg border text-sm text-left transition-colors",
                  types.includes(t) ? "border-primary bg-brand-soft/60" : "border-border hover:bg-accent")}>
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

        <Button onClick={onGenerate} disabled={loading} className="w-full bg-gradient-brand shadow-brand">
          {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Đang tạo…</> : <><Sparkles className="h-4 w-4 mr-2" /> Tạo Quiz</>}
        </Button>
      </div>
    </div>
  );
}
