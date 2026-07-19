// src/components/document-workspace/FlashcardsTab.tsx
<<<<<<< HEAD
import { useState, useEffect, useMemo } from "react";
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const DEFAULT_CARDS = [
  { front: "Algorithm", back: "Tập hợp các bước cụ thể để giải quyết một bài toán." },
  { front: "Variable", back: "Vùng nhớ có tên, dùng để lưu trữ giá trị có thể thay đổi." },
  { front: "Function", back: "Khối lệnh có thể tái sử dụng, nhận đầu vào và trả về kết quả." },
  { front: "Loop", back: "Cấu trúc lặp lại một khối lệnh nhiều lần theo điều kiện." },
  { front: "Class", back: "Khuôn mẫu định nghĩa thuộc tính và hành vi của đối tượng (OOP)." },
];

export function FlashcardsTab({ title }: { title: string }) {
  const cards = useMemo(() => DEFAULT_CARDS, []);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => setFlipped(false), [idx]);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
=======
// AI Flashcards for a single document. Fully independent per document:
// data is fetched/keyed by documentId, and learning progress is stored
// per documentId+flashcardId so different files never share state.

import { useEffect, useMemo, useState } from "react";
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  Loader2,
  RotateCw,
  Check,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  useFlashcardsByDocument,
  useGenerateFlashcards,
  useUpdateFlashcardProgress,
} from "@/lib/queries";
import type { Flashcard, FlashcardProgress } from "@/lib/types";

type StatusFilter = "all" | FlashcardProgress["status"];

function progressKey(documentId: number) {
  return `ai-study-hub:flashcard-progress:${documentId}`;
}

function loadProgress(documentId: number): Record<number, FlashcardProgress["status"]> {
  try {
    const raw = window.localStorage.getItem(progressKey(documentId));
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveProgress(documentId: number, map: Record<number, FlashcardProgress["status"]>) {
  try {
    window.localStorage.setItem(progressKey(documentId), JSON.stringify(map));
  } catch {
    // ignore
  }
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const STATUS_LABEL: Record<StatusFilter, string> = {
  all: "Tất cả",
  new: "Mới",
  learning: "Đang học",
  mastered: "Đã thuộc",
};

export function FlashcardsTab({ documentId, title }: { documentId: number; title: string }) {
  const { data, isLoading } = useFlashcardsByDocument(documentId);
  const generate = useGenerateFlashcards();
  const updateProgress = useUpdateFlashcardProgress();

  const [order, setOrder] = useState<number[]>([]); // indices into `data`
  const [pos, setPos] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [progress, setProgress] = useState<Record<number, FlashcardProgress["status"]>>({});

  const cards: Flashcard[] = data ?? [];

  // Reset progress map + order whenever we switch documents
  useEffect(() => {
    if (!documentId) return;
    setProgress(loadProgress(documentId));
    setFilter("all");
    setFlipped(false);
  }, [documentId]);

  // Rebuild ordered index list when cards or filter change
  useEffect(() => {
    const indices = cards
      .map((_, i) => i)
      .filter((i) => filter === "all" || (progress[cards[i].id] ?? "new") === filter);
    setOrder(indices);
    setPos(0);
    setFlipped(false);
  }, [cards.length, filter, documentId]); // eslint-disable-line react-hooks/exhaustive-deps

  const current = order.length > 0 ? cards[order[pos]] : undefined;
  const currentStatus = current ? progress[current.id] ?? "new" : "new";

  const counts = useMemo(() => {
    const c = { all: cards.length, new: 0, learning: 0, mastered: 0 } as Record<StatusFilter, number>;
    cards.forEach((card) => {
      const s = progress[card.id] ?? "new";
      c[s]++;
    });
    return c;
  }, [cards, progress]);

  const goNext = () => {
    if (order.length === 0) return;
    setFlipped(false);
    setPos((p) => (p + 1) % order.length);
  };
  const goPrev = () => {
    if (order.length === 0) return;
    setFlipped(false);
    setPos((p) => (p - 1 + order.length) % order.length);
  };
  const handleShuffle = () => {
    setOrder((o) => shuffleArray(o));
    setPos(0);
    setFlipped(false);
  };

  const markStatus = (status: FlashcardProgress["status"]) => {
    if (!current) return;
    const next = { ...progress, [current.id]: status };
    setProgress(next);
    saveProgress(documentId, next);
    updateProgress.mutate({ flashcardId: current.id, status, documentId });
  };

  // Keyboard navigation: ← → to move, Space/Enter to flip
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        setFlipped((f) => !f);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [order.length]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!documentId) {
    return <div className="text-sm text-muted-foreground text-center mt-16">Chọn một tài liệu để xem flashcards.</div>;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3 text-center">
        <Sparkles className="h-8 w-8 text-primary/60" />
        <p className="text-sm text-muted-foreground">Chưa có flashcards cho tài liệu "{title}".</p>
        <Button
          size="sm"
          onClick={() => generate.mutate(documentId)}
          disabled={generate.isPending}
          className="bg-gradient-brand text-white"
        >
          {generate.isPending ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4 mr-2" />
          )}
          Tạo Flashcards bằng AI
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3 flex-wrap">
>>>>>>> origin/Flashcards-fix
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2 text-gradient-brand font-display">
            <Sparkles className="h-5 w-5" /> AI Flashcards
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
<<<<<<< HEAD
            Thẻ ghi nhớ từ "{title}" — bấm vào thẻ để lật mặt
          </p>
        </div>
        <div className="text-xs text-muted-foreground">
          {idx + 1} / {cards.length}
        </div>
      </div>

      <button
        onClick={() => setFlipped((f) => !f)}
        className="w-full min-h-[220px] rounded-xl border-2 border-primary/20 bg-gradient-soft p-8 flex flex-col items-center justify-center text-center transition-all hover:shadow-md"
      >
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-3">
          {flipped ? "Định nghĩa" : "Thuật ngữ"}
        </div>
        <div className={cn("font-semibold", flipped ? "text-base leading-relaxed" : "text-2xl")}>
          {flipped ? cards[idx].back : cards[idx].front}
        </div>
        <div className="text-xs text-muted-foreground mt-4">Bấm để lật thẻ</div>
      </button>

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIdx((i) => (i - 1 + cards.length) % cards.length)}
        >
          <ChevronLeft className="h-4 w-4 mr-1" /> Trước
        </Button>
        <div className="flex gap-1">
          {cards.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === idx ? "w-6 bg-gradient-brand" : "w-1.5 bg-muted"
              )}
            />
          ))}
        </div>
        <Button size="sm" onClick={() => setIdx((i) => (i + 1) % cards.length)}>
          Tiếp <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
=======
            Thẻ ghi nhớ từ "{title}" — bấm vào thẻ để lật mặt, dùng ← → để chuyển thẻ
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-3.5 w-3.5 text-muted-foreground" />
          <Select value={filter} onValueChange={(v) => setFilter(v as StatusFilter)}>
            <SelectTrigger className="h-8 w-[150px] text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {(Object.keys(STATUS_LABEL) as StatusFilter[]).map((s) => (
                <SelectItem key={s} value={s} className="text-xs">
                  {STATUS_LABEL[s]} ({counts[s]})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button size="sm" variant="outline" onClick={handleShuffle} disabled={order.length < 2} title="Xáo trộn thẻ">
            <Shuffle className="h-3.5 w-3.5" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => generate.mutate(documentId)}
            disabled={generate.isPending}
            title="Tạo thêm flashcards bằng AI"
          >
            {generate.isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RotateCw className="h-3.5 w-3.5" />}
          </Button>
        </div>
      </div>

      {!current ? (
        <div className="flex flex-col items-center justify-center h-48 gap-2 text-center text-sm text-muted-foreground">
          Không có thẻ nào khớp với bộ lọc "{STATUS_LABEL[filter]}".
        </div>
      ) : (
        <>
          <div className="text-xs text-muted-foreground text-right">
            {pos + 1} / {order.length}
          </div>

          <button
            onClick={() => setFlipped((f) => !f)}
            className="w-full min-h-[220px] rounded-xl border-2 border-primary/20 bg-gradient-soft p-8 flex flex-col items-center justify-center text-center transition-all hover:shadow-md [perspective:1000px]"
          >
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
              {flipped ? "Định nghĩa" : "Thuật ngữ"}
              <span
                className={cn(
                  "px-1.5 py-0.5 rounded-full text-[9px] font-medium",
                  currentStatus === "mastered" && "bg-emerald-500/15 text-emerald-600",
                  currentStatus === "learning" && "bg-amber-500/15 text-amber-600",
                  currentStatus === "new" && "bg-muted text-muted-foreground",
                )}
              >
                {STATUS_LABEL[currentStatus]}
              </span>
            </div>
            <div className={cn("font-semibold", flipped ? "text-base leading-relaxed" : "text-2xl")}>
              {flipped ? current.backContent : current.frontContent}
            </div>
            <div className="text-xs text-muted-foreground mt-4">Bấm để lật thẻ</div>
          </button>

          <div className="flex items-center justify-between flex-wrap gap-3">
            <Button variant="outline" size="sm" onClick={goPrev} disabled={order.length < 2}>
              <ChevronLeft className="h-4 w-4 mr-1" /> Trước
            </Button>

            <div className="flex items-center gap-1.5">
              <Button
                size="sm"
                variant={currentStatus === "learning" ? "default" : "outline"}
                onClick={() => markStatus("learning")}
                className="text-xs h-8"
              >
                Đang học
              </Button>
              <Button
                size="sm"
                variant={currentStatus === "mastered" ? "default" : "outline"}
                onClick={() => markStatus("mastered")}
                className={cn("text-xs h-8", currentStatus === "mastered" && "bg-emerald-600 hover:bg-emerald-600/90")}
              >
                <Check className="h-3.5 w-3.5 mr-1" /> Đã thuộc
              </Button>
            </div>

            <Button size="sm" onClick={goNext} disabled={order.length < 2}>
              Tiếp <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          <div className="flex gap-1 justify-center flex-wrap">
            {order.map((cardIdx, i) => (
              <button
                key={cards[cardIdx].id}
                onClick={() => {
                  setPos(i);
                  setFlipped(false);
                }}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === pos ? "w-6 bg-gradient-brand" : "w-1.5 bg-muted hover:bg-muted-foreground/40",
                )}
              />
            ))}
          </div>
        </>
      )}
>>>>>>> origin/Flashcards-fix
    </div>
  );
}
