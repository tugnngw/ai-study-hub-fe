// src/features/quiz/components/QuizzesTab.tsx
// Tab AI Quizzes (trong session): lắp ráp Setup + Runner qua hook useQuiz.
import { useQuiz } from "../hooks";
import { QuizSetup } from "./QuizSetup";
import { QuizRunner } from "./QuizRunner";

export function QuizzesTab({ folderId, docId, title }: { folderId: string; docId?: number; title: string }) {
  const q = useQuiz(docId);
  const scopeLabel = q.scope === "all" ? "Toàn bộ thư mục" : `Từ "${title}"`;

  if (q.phase === "setup") {
    return (
      <QuizSetup
        folderId={folderId}
        scope={q.scope} setScope={q.setScope}
        types={q.types} toggleType={q.toggleType}
        count={q.count} setCount={q.setCount}
        loading={q.loading} onGenerate={q.generate}
      />
    );
  }
  return (
    <QuizRunner
      quizzes={q.quizzes} answers={q.answers} submitted={q.submitted} score={q.score}
      scopeLabel={scopeLabel}
      onPick={q.pick} onSubmit={q.submit} onRetry={q.retry} onBack={q.backToSetup}
    />
  );
}
