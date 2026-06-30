import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FlashcardsTab({ title }: { title: string }) {
    const cards = useMemo(
        () => [
            {
                front: "Algorithm",
                back: "Tập hợp các bước cụ thể để giải quyết một bài toán.",
            },
            {
                front: "Variable",
                back: "Vùng nhớ có tên, dùng để lưu trữ giá trị có thể thay đổi.",
            },
            {
                front: "Function",
                back: "Khối lệnh có thể tái sử dụng, nhận đầu vào và trả về kết quả.",
            },
            {
                front: "Loop",
                back: "Cấu trúc lặp lại một khối lệnh nhiều lần theo điều kiện.",
            },
            {
                front: "Class",
                back: "Khuôn mẫu định nghĩa thuộc tính và hành vi của đối tượng (OOP).",
            },
        ],
        [],
    );
    const [idx, setIdx] = useState(0);
    const [flipped, setFlipped] = useState(false);

    useEffect(() => setFlipped(false), [idx]);

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold flex items-center gap-2 text-gradient-brand font-display">
                        <Sparkles className="h-5 w-5" /> AI Flashcards
                    </h2>
                    <p className="text-xs text-muted-foreground mt-1">
                        Thẻ ghi nhớ từ “{title}” — bấm vào thẻ để lật mặt
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
                <div
                    className={cn(
                        "font-semibold",
                        flipped ? "text-base leading-relaxed" : "text-2xl",
                    )}
                >
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
                                i === idx ? "w-6 bg-gradient-brand" : "w-1.5 bg-muted",
                            )}
                        />
                    ))}
                </div>
                <Button size="sm" onClick={() => setIdx((i) => (i + 1) % cards.length)}>
                    Tiếp <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
            </div>
        </div>
    );
}