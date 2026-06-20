import React from 'react';
import { AllPages } from '../App';
import {
  BotMessageSquare,
  Cloud,
  GraduationCap,
  Share2,
  Sparkles,
  Upload,
} from 'lucide-react';

interface WelcomePageProps {
  onNavigate: (page: AllPages) => void;
}

const features = [
  {
    icon: BotMessageSquare,
    title: 'Trợ lý AI thông minh',
    desc: 'Đặt câu hỏi và nhận câu trả lời tức thì từ chính tài liệu học tập của bạn.',
  },
  {
    icon: Share2,
    title: 'Chia sẻ tài liệu',
    desc: 'Cùng học, cùng chia sẻ tài liệu với bạn bè và đồng nghiệp một cách dễ dàng.',
  },
  {
    icon: Cloud,
    title: 'Lưu trữ trên Cloud',
    desc: 'Tài liệu được lưu trữ an toàn, truy cập mọi lúc mọi nơi không giới hạn.',
  },
  {
    icon: Upload,
    title: 'Tải lên dễ dàng',
    desc: 'Kéo - thả tệp tin nhanh chóng, hỗ trợ đa dạng định dạng tài liệu.',
  },
];

const WelcomePage: React.FC<WelcomePageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full min-h-screen bg-surface font-sans text-ink antialiased">
      {/* HEADER */}
      <header className="w-full h-[76px] bg-card/90 backdrop-blur border-b border-line flex items-center justify-between px-6 md:px-12 sticky top-0 z-30">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-600 rounded-xl flex items-center justify-center text-white shadow-brand-glow">
            <GraduationCap size={22} strokeWidth={2.25} />
          </div>
          <span className="font-display text-[19px] font-bold tracking-tight">AI Study Hub</span>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => onNavigate('login')}
            className="h-[38px] px-4 rounded-xl text-[13.5px] font-bold text-ink-soft hover:bg-surface-alt hover:text-ink transition-snappy cursor-pointer"
          >
            Đăng nhập
          </button>
          <button
            type="button"
            onClick={() => onNavigate('register')}
            className="h-[38px] px-5 rounded-xl border border-brand-200 text-[13.5px] font-bold text-brand-600 bg-brand-50 hover:bg-brand-100 transition-snappy cursor-pointer"
          >
            Tạo tài khoản
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[680px] h-[680px] rounded-full bg-brand-200/30 blur-3xl" />
        <div className="relative z-10 text-center pt-20 pb-16 px-6 flex flex-col items-center max-w-3xl mx-auto">
          <div className="animate-fade-in-up h-[34px] px-4 bg-brand-50 text-brand-600 border border-brand-100 rounded-full flex items-center gap-1.5 mb-7 text-[13px] font-bold">
            <Sparkles size={14} strokeWidth={2.5} />
            Hỗ trợ bởi công nghệ AI
          </div>
          <h1 className="animate-fade-in-up font-display text-[40px] sm:text-[48px] font-bold leading-[1.12] tracking-tight" style={{ animationDelay: '60ms' }}>
            Quản lý tài liệu học tập
            <br />
            <span className="text-brand-500">cùng trí tuệ nhân tạo</span>
          </h1>
          <p className="animate-fade-in-up mt-5 text-ink-soft text-[15.5px] max-w-[460px] leading-relaxed" style={{ animationDelay: '120ms' }}>
            Tải lên, sắp xếp và trò chuyện với tài liệu học tập của bạn. Nhận câu trả lời
            tức thì được hỗ trợ bởi công nghệ AI tiên tiến.
          </p>
          <div className="animate-fade-in-up flex items-center gap-3 mt-8" style={{ animationDelay: '180ms' }}>
            <button
              type="button"
              onClick={() => onNavigate('register')}
              className="h-[46px] px-7 bg-brand-500 hover:bg-brand-600 active:scale-[0.98] text-white rounded-xl font-bold text-[14.5px] shadow-brand-glow transition-snappy cursor-pointer"
            >
              Bắt đầu miễn phí
            </button>
            <button
              type="button"
              onClick={() => onNavigate('login')}
              className="h-[46px] px-7 border border-line bg-card hover:bg-surface-alt text-ink rounded-xl font-bold text-[14.5px] transition-snappy cursor-pointer"
            >
              Đăng nhập
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-[28px] sm:text-[32px] font-bold tracking-tight">Mọi thứ bạn cần để học tốt hơn</h2>
          <p className="text-ink-soft text-[14.5px] mt-2">Các tính năng mạnh mẽ giúp nâng cao trải nghiệm học tập của bạn</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="group bg-card border border-line rounded-2xl p-6 flex flex-col items-start text-left gap-3 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-snappy"
              >
                <div className="w-11 h-11 bg-brand-50 rounded-xl flex items-center justify-center text-brand-500 group-hover:scale-110 transition-snappy">
                  <Icon size={20} strokeWidth={2.1} />
                </div>
                <h3 className="font-display text-[15.5px] font-bold">{f.title}</h3>
                <p className="text-ink-soft text-[13.5px] leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20 max-w-5xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-500 to-brand-400 px-8 py-14 text-center text-white">
          <div className="pointer-events-none absolute -top-10 -right-10 w-56 h-56 rounded-full bg-white/10 blur-3xl" />
          <h2 className="font-display text-[26px] sm:text-[30px] font-bold tracking-tight">Sẵn sàng thay đổi cách bạn học?</h2>
          <p className="text-[14.5px] text-white/85 mt-2">Tham gia cùng hàng nghìn học viên đang sử dụng AI Study Hub</p>
          <button
            type="button"
            onClick={() => onNavigate('register')}
            className="h-[46px] px-8 bg-white text-brand-600 rounded-xl font-bold text-[14.5px] shadow-lg hover:shadow-xl active:scale-[0.98] transition-snappy cursor-pointer mt-7"
          >
            Đăng ký miễn phí ngay
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-line px-6 py-8">
        <div className="max-w-5xl mx-auto flex items-center gap-2.5">
          <div className="w-7 h-7 bg-brand-900 rounded-lg flex items-center justify-center text-white shrink-0">
            <GraduationCap size={15} strokeWidth={2.25} />
          </div>
          <div>
            <p className="font-display text-[13.5px] font-bold">AI Study Hub</p>
            <p className="text-ink-faint text-[12px] mt-0.5">Hệ thống quản lý tài liệu học tập ứng dụng AI cho học viên và giảng viên.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WelcomePage;
