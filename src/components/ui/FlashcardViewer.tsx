import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, Shuffle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { FlashcardResponse } from "@/lib/types";

interface Props {
  flashcards: FlashcardResponse[];
  isLoading: boolean;
}

export function FlashcardViewer({ flashcards, isLoading }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [shuffled, setShuffled] = useState<FlashcardResponse[]>([]);
  const [isShuffled, setIsShuffled] = useState(false);

  const cards = isShuffled ? shuffled : flashcards;

  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setShuffled([]);
    setIsShuffled(false);
  }, [flashcards]);

  const current = cards[currentIndex];

  const goNext = useCallback(() => {
    if (currentIndex < cards.length - 1) {
      setIsFlipped(false);
      setCurrentIndex((i) => i + 1);
    }
  }, [currentIndex, cards.length]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setCurrentIndex((i) => i - 1);
    }
  }, [currentIndex]);

  const toggleFlip = useCallback(() => setIsFlipped((f) => !f), []);

  const handleShuffle = useCallback(() => {
    if (isShuffled) {
      setIsShuffled(false);
    } else {
      setShuffled([...flashcards].sort(() => Math.random() - 0.5));
      setIsShuffled(true);
    }
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [flashcards, isShuffled]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); toggleFlip(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev, toggleFlip]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-64"><div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" /></div>;
  }

  if (!flashcards.length) {
    return <div className="flex flex-col items-center justify-center h-64 text-muted-foreground"><p className="text-sm">No flashcards yet.</p></div>;
  }

  return (
    <div className="flex flex-col items-center gap-6 py-4">
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <button onClick={goPrev} disabled={currentIndex === 0} className="disabled:opacity-30 hover:text-foreground transition-opacity">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="font-medium tabular-nums min-w-[6rem] text-center">{currentIndex + 1} / {cards.length}</span>
        <button onClick={goNext} disabled={currentIndex >= cards.length - 1} className="disabled:opacity-30 hover:text-foreground transition-opacity">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="perspective w-full max-w-lg cursor-pointer select-none" onClick={toggleFlip} style={{ height: 260 }}>
        <div className="relative w-full h-full transition-transform duration-500" style={{ transformStyle: "preserve-3d", transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}>
          <div className="absolute inset-0 rounded-2xl shadow-xl flex flex-col items-center justify-center p-8 text-center" style={{ backfaceVisibility: "hidden", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
            <p className="text-white/60 text-xs font-medium uppercase tracking-widest mb-4">Definition</p>
            <p className="text-white text-xl font-semibold leading-relaxed">{current?.frontContent}</p>
            <p className="text-white/40 text-xs mt-6">Tap to reveal</p>
          </div>
          <div className="absolute inset-0 rounded-2xl shadow-xl flex flex-col items-center justify-center p-8 text-center" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" }}>
            <p className="text-white/60 text-xs font-medium uppercase tracking-widest mb-4">Answer</p>
            <p className="text-white text-xl font-semibold leading-relaxed">{current?.backContent}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" onClick={handleShuffle} className="gap-2">
          <Shuffle className={`h-4 w-4 ${isShuffled ? "text-primary" : ""}`} />
          {isShuffled ? "Reset" : "Shuffle"}
        </Button>
        <Button variant="outline" size="sm" onClick={() => { setIsFlipped(false); setCurrentIndex(0); }} className="gap-2">
          <RotateCcw className="h-4 w-4" />Start Over
        </Button>
      </div>

      <p className="text-[11px] text-muted-foreground">Tap card or Space to flip | Arrow keys to navigate</p>
    </div>
  );
}
