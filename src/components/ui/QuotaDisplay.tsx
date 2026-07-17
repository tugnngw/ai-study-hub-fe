import { Info, Infinity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useQuota } from "@/lib/queries";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

export function QuotaDisplay() {
  const { data, isLoading, error } = useQuota();

  if (isLoading) {
    return <Skeleton className="h-28 w-full" />;
  }

  if (error) {
    console.error("Quota fetch error:", error);
    return null;
  }

  if (!data) {
    return null;
  }

  const { status, flashcardLimit, flashcardRemaining, questionLimit, questionRemaining, summaryLimit, summaryRemaining, chatLimit, chatRemaining } = data;

  if (status === "NO_SUBSCRIPTION" || status === "NO_PLAN" || status === "EXPIRED") {
    return (
      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-yellow-800">
            <Info className="h-4 w-4" />
            <span className="text-sm font-medium">
              {status === "NO_SUBSCRIPTION" && "Bạn chưa đăng ký gói dịch vụ"}
              {status === "NO_PLAN" && "Không thể xác định gói dịch vụ"}
              {status === "EXPIRED" && "Gói dịch vụ của bạn đã hết hạn"}
            </span>
          </div>
        </CardContent>
      </Card>
    );
  }

  const renderQuotaBar = (label: string, limit: number, remaining: number) => {
    if (limit === -1) {
      return (
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">{label}:</span>
          <div className="flex items-center gap-1">
            <Infinity className="h-4 w-4 text-green-600" />
            <span className="text-sm text-green-700 font-medium">Không giới hạn</span>
          </div>
        </div>
      );
    }

    if (limit === 0) {
      return (
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">{label}:</span>
          <span className="text-sm text-red-600 font-medium">Đã tắt</span>
        </div>
      );
    }

    const used = limit - remaining;
    const percentage = Math.max(0, (used / limit) * 100);
    const isLow = remaining <= Math.floor(limit * 0.2);
    const isExhausted = remaining <= 0;

    return (
      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span className="font-medium text-muted-foreground">{label}</span>
          <span className={isExhausted ? "text-red-600 font-medium" : isLow ? "text-amber-600 font-medium" : "text-muted-foreground"}>
            {isExhausted ? "Hết lượt" : `Còn ${remaining}/${limit} lượt`}
          </span>
        </div>
        <Progress
          value={percentage}
          className={`h-2 ${isExhausted ? "bg-red-100" : isLow ? "bg-amber-100" : ""}`}
        />
      </div>
    );
  };

  return (
    <Card>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Hạn mức sử dụng</span>
        </div>
        <div className="space-y-3">
          {renderQuotaBar("Tạo Flashcard", flashcardLimit, flashcardRemaining)}
          {renderQuotaBar("Tạo Quiz", questionLimit, questionRemaining)}
          {renderQuotaBar("Tóm tắt AI", summaryLimit, summaryRemaining)}
          {renderQuotaBar("Chat AI", chatLimit, chatRemaining)}
        </div>
      </CardContent>
    </Card>
  );
}