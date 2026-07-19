<<<<<<< HEAD
<<<<<<< HEAD
// src/components/document-workspace/SummaryTab.tsx
import { useEffect, useState, useMemo } from "react";
import { Sparkles, RotateCw } from "lucide-react";
=======
import { RotateCw, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
>>>>>>> origin/Flashcars
=======
import { RotateCw, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
>>>>>>> origin/final/demo-v1
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function SummaryTab({
<<<<<<< HEAD
<<<<<<< HEAD
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const [loading, setLoading] = useState(true);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, [title, tick]);

  const bullets = useMemo(
    () => [
      `Tài liệu "${title}" cung cấp kiến thức nền tảng và thuật ngữ cốt lõi cho người học.`,
      "Trình bày khái niệm theo trình tự từ cơ bản đến nâng cao, kèm ví dụ minh hoạ.",
      "Nhấn mạnh các thuật ngữ tiếng Anh chuyên ngành và cách dùng trong ngữ cảnh thực tế.",
      "Đưa ra bài tập vận dụng giúp người đọc tự kiểm tra mức độ hiểu bài.",
      "Kết luận tổng kết các điểm quan trọng cần ghi nhớ sau khi đọc xong tài liệu.",
    ],
    [title],
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2 text-gradient-brand font-display">
            <Sparkles className="h-5 w-5" /> AI Summary
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Tóm tắt được tạo tự động bởi AI dựa trên nội dung tài liệu
          </p>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setTick((t) => t + 1)}
        >
          <RotateCw className="h-3.5 w-3.5 mr-2" /> Tạo lại
        </Button>
      </div>

      {loading ? (
        <div className="space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      ) : (
        <>
          <div className="rounded-lg border border-primary/20 bg-brand-soft/60 p-4">
            <div className="text-xs font-semibold text-primary mb-1">
              Tóm tắt ngắn
            </div>
            <p className="text-sm leading-relaxed">
              {description ||
                `Tài liệu "${title}" tổng hợp các kiến thức cốt lõi và thuật ngữ quan trọng, giúp người đọc nắm chắc lý thuyết và áp dụng vào thực tế.`}
            </p>
          </div>
          <div>
            <div className="text-sm font-semibold mb-2">Điểm chính</div>
            <ul className="space-y-2 text-sm">
              {bullets.map((b, i) => (
                <li key={i} className="flex gap-2">
                  <span className="h-5 w-5 shrink-0 rounded-full bg-gradient-brand text-white text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
=======
=======
>>>>>>> origin/final/demo-v1
                               title,
                               description,
                           }: {
    title: string;
    description: string;
}) {
    const [loading, setLoading] = useState(true);
    const [tick, setTick] = useState(0);

    useEffect(() => {
        setLoading(true);
        const t = setTimeout(() => setLoading(false), 700);
        return () => clearTimeout(t);
    }, [title, tick]);

    const bullets = useMemo(
        () => [
            `Tài liệu “${title}” cung cấp kiến thức nền tảng và thuật ngữ cốt lõi cho người học.`,
            "Trình bày khái niệm theo trình tự từ cơ bản đến nâng cao, kèm ví dụ minh hoạ.",
            "Nhấn mạnh các thuật ngữ tiếng Anh chuyên ngành và cách dùng trong ngữ cảnh thực tế.",
            "Đưa ra bài tập vận dụng giúp người đọc tự kiểm tra mức độ hiểu bài.",
            "Kết luận tổng kết các điểm quan trọng cần ghi nhớ sau khi đọc xong tài liệu.",
        ],
        [title],
    );

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold flex items-center gap-2 text-gradient-brand font-display">
                        <Sparkles className="h-5 w-5" /> AI Summary
                    </h2>
                    <p className="text-xs text-muted-foreground mt-1">
                        Tóm tắt được tạo tự động bởi AI dựa trên nội dung tài liệu
                    </p>
                </div>
                <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setTick((t) => t + 1)}
                >
                    <RotateCw className="h-3.5 w-3.5 mr-2" /> Tạo lại
                </Button>
            </div>

            {loading ? (
                <div className="space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-2/3" />
                </div>
            ) : (
                <>
                    <div className="rounded-lg border border-primary/20 bg-brand-soft/60 p-4">
                        <div className="text-xs font-semibold text-primary mb-1">
                            Tóm tắt ngắn
                        </div>
                        <p className="text-sm leading-relaxed">
                            {description ||
                                `Tài liệu “${title}” tổng hợp các kiến thức cốt lõi và thuật ngữ quan trọng, giúp người đọc nắm chắc lý thuyết và áp dụng vào thực tế.`}
                        </p>
                    </div>
                    <div>
                        <div className="text-sm font-semibold mb-2">Điểm chính</div>
                        <ul className="space-y-2 text-sm">
                            {bullets.map((b, i) => (
                                <li key={i} className="flex gap-2">
                  <span className="h-5 w-5 shrink-0 rounded-full bg-gradient-brand text-white text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                                    <span>{b}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
<<<<<<< HEAD
}
>>>>>>> origin/Flashcars
=======
}
>>>>>>> origin/final/demo-v1
