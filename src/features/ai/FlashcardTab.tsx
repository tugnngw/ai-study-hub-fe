import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { FlashcardViewer } from "@/components/ui/FlashcardViewer";
import { useGenerateFlashcards, useFlashcardsByDocument } from "@/lib/queries";
import type { Document } from "@/lib/types";

interface Props {
  docs: Document[];
  docId?: string;
}

export function FlashcardTab({ docs, docId }: Props) {
  const [flashcardCount, setFlashcardCount] = useState(5);
  const generateFlashcards = useGenerateFlashcards();
  const flashcardsQuery = useFlashcardsByDocument(docId ?? "");

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="flex-1 overflow-y-auto p-6">
        <FlashcardViewer
          flashcards={flashcardsQuery.data ?? []}
          isLoading={flashcardsQuery.isLoading}
        />
      </div>
      <div className="p-4 border-t border-border space-y-3">
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
          <Button
            disabled={generateFlashcards.isPending || !docId || flashcardCount < 1}
            onClick={() => {
              if (!docId) return toast.error("Select a document first");
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
            className="gap-2 flex-1"
          >
            {generateFlashcards.isPending ? (
              <><Loader2 className="h-4 w-4 animate-spin" />Generating...</>
            ) : (
              <><Sparkles className="h-4 w-4" />Generate Flashcards</>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
