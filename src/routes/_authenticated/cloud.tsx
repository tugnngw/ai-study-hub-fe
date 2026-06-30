import { createFileRoute } from "@tanstack/react-router";
import { Cloud, Database, HardDrive } from "lucide-react";
import { useDocuments } from "@/lib/queries";
// import { mockStorage } from "@/lib/mock-data"; // removed mock storage
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/_authenticated/cloud")({
  component: CloudPage,
});

function formatBytes(n: number) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 ** 2) return `${(n / 1024).toFixed(2)} KB`;
  if (n < 1024 ** 3) return `${(n / 1024 ** 2).toFixed(2)} MB`;
  return `${(n / 1024 ** 3).toFixed(2)} GB`;
}

function CloudPage() {
  const docs = useDocuments();
  // Calculate storage from actual document sizes
  const used = docs.data?.reduce((sum, d) => sum + (d.fileSize ?? 0), 0) ?? 0;
  const total = 1 * 1024 * 1024 * 1024; // 1 GB limit (or fetch from backend if available)
  // Dung lượng còn lại = tổng dung lượng - dung lượng đã dùng (không cho âm khi vượt quota)
  const remaining = Math.max(total - used, 0);
  const pct = Math.min((used / total) * 100, 100);

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Cloud đã sài</h1>
        <p className="text-muted-foreground mt-1">
          Theo dõi dung lượng lưu trữ của bạn
        </p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Cloud className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">
                Tổng dung lượng đã dùng
              </div>
              <div className="text-2xl font-semibold">
                {formatBytes(used)}{" "}
                <span className="text-base text-muted-foreground">
                  / {formatBytes(total)}
                </span>
              </div>
            </div>
          </div>
          <Progress value={pct} className="h-2" />
          <div className="text-xs text-muted-foreground">
            {pct.toFixed(4)}% đã sử dụng
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-5 flex items-center gap-3">
            <Database className="h-8 w-8 text-violet-500" />
            <div>
              <div className="text-sm text-muted-foreground">Số tài liệu</div>
              <div className="text-2xl font-semibold">
                {docs.data?.length ?? 0}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center gap-3">
            <HardDrive className="h-8 w-8 text-emerald-500" />
            <div>
              <div className="text-sm text-muted-foreground">Còn trống</div>
              <div className="text-2xl font-semibold">
                {formatBytes(remaining)}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
