import { createFileRoute } from "@tanstack/react-router";
import { Cloud, Database, HardDrive } from "lucide-react";
import { useDocuments } from "@/lib/queries";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/lib/auth";
import { formatBytes } from "@/lib/utils";
import { useEffect } from "react";

export const Route = createFileRoute("/_authenticated/cloud")({
  component: CloudPage,
});

function CloudPage() {
  const docs = useDocuments();
  const { user, reloadUser } = useAuth();

  useEffect(() => {
    reloadUser().catch(console.error);
  }, [reloadUser]);

  const used = docs.data?.reduce((sum, d) => sum + (d.fileSize ?? 0), 0) ?? 0;
  const total = (user?.storageGb || 1) * 1024 * 1024 * 1024;
  const pct = Math.min((used / total) * 100, 100);
  const free = total - used;
  const isOverLimit = used > total;

  return (
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight font-display">
            Lưu trữ Cloud
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Theo dõi dung lượng lưu trữ của bạn
          </p>
        </div>

        <Card>
          <CardContent className="p-6 space-y-5">
            {/* Dòng tổng quan + thanh tiến trình */}
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Cloud className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-muted-foreground">
                  Tổng dung lượng đã dùng
                </div>
                <div className="text-2xl font-bold font-display">
                  {formatBytes(used)}{" "}
                  <span className="text-base text-muted-foreground font-normal">
                    / {formatBytes(total)}
                  </span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div
                  className={`text-sm font-semibold ${
                    isOverLimit ? "text-destructive" : "text-emerald-600"
                  }`}
                >
                  {isOverLimit ? "⚠️ Vượt giới hạn" : "✅ Bình thường"}
                </div>
                <div className="text-xs text-muted-foreground">
                  {pct.toFixed(2)}% đã dùng
                </div>
              </div>
            </div>

            <Progress
                value={pct}
                className={`h-2.5 ${isOverLimit ? "bg-destructive/20" : ""}`}
            />

            {/* Ba chỉ số gọn trên cùng 1 hàng */}
            <div className="grid grid-cols-3 divide-x divide-border border-t border-border pt-4 -mx-6 px-6">
              <div className="px-4 first:pl-0">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Database className="h-3.5 w-3.5 text-violet-500" /> Số tài liệu
                </div>
                <div className="text-xl font-bold font-display mt-0.5">
                  {docs.data?.length ?? 0}
                </div>
              </div>
              <div className="px-4">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <HardDrive className="h-3.5 w-3.5 text-primary" /> Giới hạn
                </div>
                <div className="text-xl font-bold font-display mt-0.5">
                  {formatBytes(total)}
                </div>
              </div>
              <div className="px-4">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <HardDrive
                    className={`h-3.5 w-3.5 ${
                      isOverLimit ? "text-destructive" : "text-emerald-500"
                    }`}
                  />{" "}
                  Còn trống
                </div>
                <div
                  className={`text-xl font-bold font-display mt-0.5 ${
                    isOverLimit ? "text-destructive" : ""
                  }`}
                >
                  {isOverLimit ? "0 B" : formatBytes(free)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
  );
}