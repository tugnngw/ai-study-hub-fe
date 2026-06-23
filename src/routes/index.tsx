import { Link } from "react-router-dom";

import {
  Sparkles,
  Bot,
  Share2,
  Cloud,
  Upload,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Bot,
    title: "AI Chatbot",
    description: "Chat với AI để nhận câu trả lời tức thì từ tài liệu của bạn",
  },
  {
    icon: Share2,
    title: "Chia sẻ tài liệu",
    description: "Cộng tác với bạn học bằng cách chia sẻ tài liệu học tập",
  },
  {
    icon: Cloud,
    title: "Lưu trữ Cloud",
    description: "Lưu trữ tài liệu an toàn trên cloud với dung lượng không giới hạn",
  },
  {
    icon: Upload,
    title: "Tải tài liệu lên",
    description: "Kéo thả dễ dàng với hỗ trợ nhiều định dạng tệp",
  },
];

export function WelcomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border/60 sticky top-0 z-50 bg-background">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-gradient-brand flex items-center justify-center shadow-brand">
              <Cloud className="h-4.5 w-4.5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-display font-bold text-base">AI STUDY HUB</span>
          </div>
          <div className="relative z-50 flex items-center gap-2">
            <Link to="/auth/login" className={buttonVariants({ variant: "ghost" })}>
              Đăng Nhập
            </Link>
            <Link
              to="/auth/register"
              className={cn(buttonVariants(), "bg-gradient-brand shadow-brand hover:opacity-90")}
            >
              Tạo Tài Khoản
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-4xl px-4 sm:px-6 pt-16 pb-12 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-3.5 py-1.5 text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5" />
            Powered by AI Technology
          </div>
          <h1 className="mt-6 font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            Quản lý tài liệu học tập
            <br />
            <span className="text-gradient-brand bg-clip-text text-transparent">cùng AI</span>
          </h1>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Tải lên, tổ chức và trò chuyện với tài liệu học tập của bạn. Nhận câu trả lời tức thì
            được hỗ trợ bởi công nghệ AI tiên tiến.
          </p>
        </section>

        {/* Features */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-16">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              Mọi thứ bạn cần để thành công
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Những tính năng mạnh mẽ giúp nâng cao trải nghiệm học tập của bạn
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-border/60 bg-card p-5 hover:shadow-md transition-shadow"
              >
                <div className="h-10 w-10 rounded-lg bg-gradient-brand flex items-center justify-center shadow-brand mb-4">
                  <f.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-display font-semibold text-sm text-foreground">{f.title}</h3>
                <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-20">
          <div className="rounded-2xl bg-gradient-brand shadow-brand px-6 py-12 sm:py-16 text-center">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Sẵn sàng thay đổi cách bạn học tập?
            </h2>
            <p className="mt-2 text-white/85 text-sm">
              Tham gia cùng hàng nghìn sinh viên đang sử dụng AI Study Hub
            </p>
            <div className="mt-6">
              <Link
                to="/auth/register"
                className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "shadow-lg")}
              >
                Bắt đầu miễn phí
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-background">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-gradient-brand flex items-center justify-center">
              <Cloud className="h-4 w-4 text-white" />
            </div>
            <span className="font-display font-bold text-sm">AI Study Hub</span>
          </div>
          <p className="mt-3 text-xs text-background/60 max-w-sm">
            Hệ thống quản lý tài liệu được hỗ trợ bởi AI dành cho sinh viên và giảng viên.
          </p>
        </div>
      </footer>
    </div>
  );
}
