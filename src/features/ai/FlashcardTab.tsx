import { useState } from "react";
import { Sparkles, Loader2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { FlashcardViewer } from "@/components/ui/FlashcardViewer";
import { QuotaDisplay } from "@/components/ui/QuotaDisplay";
import { useGenerateFlashcards, useFlashcardsByDocument, useQuota } from "@/lib/queries";
import type { Document } from "@/lib/types";

interface Props {
  docs: Document[];
  docId?: string;
}

export function FlashcardTab({ docs, docId }: Props) {
  const [flashcardCount, setFlashcardCount] = useState(5);
  const generateFlashcards = useGenerateFlashcards();
  const flashcardsQuery = useFlashcardsByDocument(docId ?? "");
  const { data: quota } = useQuota();

  const remaining = quota?.flashcardRemaining ?? 0;
  const limit = quota?.flashcardLimit ?? 0;
  const isExhausted = limit > 0 && remaining <= 0;
  const isLow = limit > 0 && remaining <= Math.floor(limit * 0.2) && remaining > 0;

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-2 lg:px-6 lg:pt-6">
        <div className="max-w-5xl mx-auto">
          <FlashcardViewer
            flashcards={flashcardsQuery.data ?? []}
            isLoading={flashcardsQuery.isLoading}
          />
        </div>
      </div>
      <div className="px-4 pb-2 pt-2 border-t border-border space-y-2">
        <QuotaDisplay />
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium shrink-0">Cards:</label>
          <Input
            type="number"
            min="1"
            max="50"
            value={flashcardCount}
            onChange={(e) => {
              const v = e.target.value;
              if (v === "" || /^\d+$/.test(v)) {
                const n = parseInt(v, 10);
                setFlashcardCount(v === "" ? 0 : n > 50 ? 50 : n);
              }
            }}
            onBlur={() => {
              if (flashcardCount < 1) setFlashcardCount(10);
            }}
            className="w-20"
          />
          {isExhausted && (
            <span className="text-xs text-red-600 flex items-center gap-1 shrink-0">
              <AlertTriangle className="h-3 w-3" />Hết lượt
            </span>
          )}
          <Button
            disabled={generateFlashcards.isPending || !docId || flashcardCount < 1 || isExhausted}
            onClick={() => {
              if (!docId) return toast.error("Select a document first");
              if (isExhausted) return toast.error("Bạn đã hết lượt tạo flashcard. Vui lòng nâng cấp gói.");
              generateFlashcards.mutate(
                { documentId: docId, numberOfCards: flashcardCount },
                {
                  onSuccess: () => {
                    toast.success("Flashcards generated!");
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
            {generateFlashcards.isPending ? (
              <><Loader2 className="h-4 w-4 animate-spin" />Generating...</>
            ) : isExhausted ? (
              <><AlertTriangle className="h-4 w-4" />Hết lượt</>
            ) : (
              <><Sparkles className="h-4 w-4" />Generate Flashcards</>
            )}
          </Button>
        </div>
        {isLow && (
          <p className="text-xs text-amber-600">Chỉ còn {remaining} lượt tạo flashcard</p>
        )}
      </div>
    </div>
  );
}
