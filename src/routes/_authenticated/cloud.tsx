import { createFileRoute } from "@tanstack/react-router";
import { Cloud, Database, HardDrive } from "lucide-react";
import { useDocuments } from "@/lib/queries";
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

  // Tính dung lượng đã dùng
  const used = docs.data?.reduce((sum, d) => sum + (d.fileSize ?? 0), 0) ?? 0;
  const total = 1 * 1024 * 1024 * 1024; // 1 GB
  const pct = Math.min((used / total) * 100, 100); // Giới hạn tối đa 100%
  const free = total - used;
  const isOverLimit = used > total;

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

            <Progress
                value={pct}
                className={`h-2 ${isOverLimit ? 'bg-destructive/20' : ''}`}
            />

            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{pct.toFixed(2)}% đã sử dụng</span>
              {isOverLimit && (
                  <span className="text-destructive font-semibold">
                Đã vượt quá giới hạn!
              </span>
              )}
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
              <HardDrive className={`h-8 w-8 ${isOverLimit ? 'text-destructive' : 'text-emerald-500'}`} />
              <div>
                <div className="text-sm text-muted-foreground">Còn trống</div>
                <div className={`text-2xl font-semibold ${isOverLimit ? 'text-destructive' : ''}`}>
                  {isOverLimit ? '0 B' : formatBytes(free)}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Hiển thị thông tin chi tiết */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Giới hạn:</span>
                <span className="ml-2 font-medium">{formatBytes(total)}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Đã dùng:</span>
                <span className="ml-2 font-medium">{formatBytes(used)}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Còn trống:</span>
                <span className={`ml-2 font-medium ${isOverLimit ? 'text-destructive' : ''}`}>
                {isOverLimit ? '0 B' : formatBytes(free)}
              </span>
              </div>
              <div>
                <span className="text-muted-foreground">Trạng thái:</span>
                <span className={`ml-2 font-medium ${isOverLimit ? 'text-destructive' : 'text-emerald-500'}`}>
                {isOverLimit ? '⚠️ Vượt giới hạn' : '✅ Bình thường'}
              </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
  );
}