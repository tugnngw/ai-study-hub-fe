import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import {
  FolderKanban,
  FileText,
  Upload,
  Clock,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useFolders, useDocuments } from "@/lib/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const folders = useFolders();
  const docs = useDocuments();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Nếu là admin (backend trả role ADMIN) thì điều hướng thẳng vào khu
  // quản trị — không cần lối vào riêng.
  const isAdmin = user?.role === "ADMIN";
  useEffect(() => {
    if (isAdmin) navigate({ to: "/admin_panel", replace: true });
  }, [isAdmin, navigate]);

  const recent = (docs.data ?? [])
    .slice()
    .sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""))
    .slice(0, 5);

  const stats = [
    {
      label: "Thư mục",
      value: folders.data?.length ?? 0,
      icon: FolderKanban,
      iconBg: "bg-primary/10 text-primary",
    },
    {
      label: "Tài liệu",
      value: docs.data?.length ?? 0,
      icon: FileText,
      iconBg: "bg-violet/10 text-violet",
    },
    {
      label: "Đã tải lên",
      value: recent.length,
      icon: Upload,
      iconBg: "bg-emerald-500/10 text-emerald-600",
    },
    {
      label: "7 ngày qua",
      value: recent.filter((d) => {
        if (!d.createdAt) return false;
        return Date.now() - new Date(d.createdAt).getTime() < 7 * 86400000;
      }).length,
      icon: Clock,
      iconBg: "bg-amber-500/10 text-amber-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-brand p-6 md:p-8 text-white shadow-brand">
        <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-16 -left-8 h-56 w-56 rounded-full bg-white/5 blur-3xl" />
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-white/80 text-xs font-medium">
              <Sparkles className="h-3.5 w-3.5" /> AI STUDY HUB
            </div>
            <h1 className="font-display font-bold text-2xl md:text-3xl mt-2">
              Chào mừng trở lại, {user?.fullName?.split(" ").pop() ?? "bạn"} 👋
            </h1>
            <p className="text-white/80 text-sm mt-1.5 max-w-md">
              Tiếp tục học cùng AI — tóm tắt, flashcards và quizzes từ tài liệu
              của bạn.
            </p>
          </div>
          <Button
            asChild
            variant="secondary"
            className="bg-white text-primary hover:bg-white/90"
          >
            <Link to="/folders">
              Mở thư mục <ArrowRight className="h-4 w-4 ml-1.5" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="border-border/60 shadow-soft">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-muted-foreground font-medium">
                    {s.label}
                  </div>
                  <div className="text-3xl font-bold font-display mt-2">
                    {folders.isLoading || docs.isLoading ? (
                      <Skeleton className="h-8 w-12" />
                    ) : (
                      s.value
                    )}
                  </div>
                </div>
                <div
                  className={`h-11 w-11 rounded-xl flex items-center justify-center ${s.iconBg}`}
                >
                  <s.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-base font-display">
              Tài liệu gần đây
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5">
            {docs.isLoading &&
              Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-14 rounded-xl" />
              ))}
            {!docs.isLoading && recent.length === 0 && (
              <div className="text-sm text-muted-foreground py-6 text-center">
                Chưa có tài liệu.
              </div>
            )}
            {recent.map((d) => (
              <Link
                key={d.id}
                to="/documents/$id"
                params={{ id: String(d.id) }}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent transition-colors group"
              >
                <div className="h-9 w-9 rounded-lg bg-gradient-soft flex items-center justify-center shrink-0 group-hover:bg-gradient-brand transition-colors">
                  <FileText className="h-4 w-4 text-primary group-hover:text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{d.title}</div>
                  <div className="text-xs text-muted-foreground truncate">
                    {d.description}
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-base font-display">
              Thư mục của bạn
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5">
            {folders.isLoading &&
              Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-14 rounded-xl" />
              ))}
            {!folders.isLoading && (folders.data?.length ?? 0) === 0 && (
              <div className="text-sm text-muted-foreground py-6 text-center">
                Chưa có thư mục.
              </div>
            )}
            {(folders.data ?? []).slice(0, 5).map((f) => (
              <Link
                key={f.id}
                to="/folders/$id"
                params={{ id: String(f.id) }}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent transition-colors group"
              >
                <div className="h-9 w-9 rounded-lg bg-gradient-soft flex items-center justify-center shrink-0 group-hover:bg-gradient-brand transition-colors">
                  <FolderKanban className="h-4 w-4 text-primary group-hover:text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{f.name}</div>
                  <div className="text-xs text-muted-foreground truncate">
                    {f.aiSummary || "Chưa có tóm tắt"}
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
