import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { FlashcardViewer } from "@/components/ui/FlashcardViewer";
import { DocumentSelector } from "./DocumentSelector";
import { useSelectedDocuments } from "./DocumentSelectionContext";
import { useGenerateFlashcards } from "@/lib/queries";
import type { Document } from "@/lib/types";

interface Props {
  docs: Document[];
}

export function FlashcardTab({ docs }: Props) {
  const { ids } = useSelectedDocuments();
  const [flashcardCount, setFlashcardCount] = useState(10);
  const generateFlashcards = useGenerateFlashcards();

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <DocumentSelector docs={docs} />
      <div className="mt-4 space-y-4">
        <div className="flex-1">
          <label className="text-sm font-medium">Number of cards:</label>
          <Input
            type="number"
            min="1"
            max="50"
            value={flashcardCount}
            onChange={(e) => setFlashcardCount(parseInt(e.target.value) || 10)}
            className="mt-1"
          />
        </div>
        <Button
          disabled={generateFlashcards.isPending || ids.length === 0}
          onClick={() => {
            generateFlashcards.mutate(
              { documentIds: ids, numberOfCards: flashcardCount },
              {
                onSuccess: () => toast.success("Flashcards generated!"),
                onError: (err) =>
                  toast.error(
                    err instanceof Error ? err.message : "Failed"
                  ),
              }
            );
          }}
          className="w-full gap-2"
        >
          {generateFlashcards.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Flashcards
            </>
          )}
        </Button>
        <FlashcardViewer
          flashcards={generateFlashcards.data ?? []}
          isLoading={generateFlashcards.isPending}
        />
      </div>
    </div>
  );
}
