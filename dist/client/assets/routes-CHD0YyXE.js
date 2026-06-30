import { o as e } from "./chunk-CMxvf4Kt.js";
import { n as t, t as n } from "./jsx-runtime-D0Gpvp3q.js";
import { t as r } from "./link-BbWDPsL2.js";
import { t as i } from "./createLucideIcon-p5NglK5C.js";
import { t as a } from "./cloud-D71LB-BK.js";
import { t as o } from "./share-2-Bnxevpbe.js";
import { t as s } from "./sparkles-BqvYif3p.js";
import { t as c } from "./upload-MwgHKO99.js";
import { t as l } from "./button-CQzuWDyd.js";
var u = i(`bot`, [
    [`path`, { d: `M12 8V4H8`, key: `hb8ula` }],
    [
      `rect`,
      { width: `16`, height: `12`, x: `4`, y: `8`, rx: `2`, key: `enze0r` },
    ],
    [`path`, { d: `M2 14h2`, key: `vft8re` }],
    [`path`, { d: `M20 14h2`, key: `4cs60a` }],
    [`path`, { d: `M15 13v2`, key: `1xurst` }],
    [`path`, { d: `M9 13v2`, key: `rq6x2g` }],
  ]),
  d = e(t()),
  f = n(),
  p = [
    {
      icon: u,
      title: `AI Chatbot`,
      description: `Chat với AI để nhận câu trả lời tức thì từ tài liệu của bạn`,
    },
    {
      icon: o,
      title: `Chia sẻ tài liệu`,
      description: `Cộng tác với bạn học bằng cách chia sẻ tài liệu học tập`,
    },
    {
      icon: a,
      title: `Lưu trữ Cloud`,
      description: `Lưu trữ tài liệu an toàn trên cloud với dung lượng không giới hạn`,
    },
    {
      icon: c,
      title: `Tải tài liệu lên`,
      description: `Kéo thả dễ dàng với hỗ trợ nhiều định dạng tệp`,
    },
  ];
function m() {
  return (
    (0, d.useEffect)(() => {
      let e = document.documentElement,
        t = e.classList.contains(`dark`);
      return (
        t && e.classList.remove(`dark`),
        () => {
          t && e.classList.add(`dark`);
        }
      );
    }, []),
    (0, f.jsxs)(`div`, {
      className: `min-h-screen flex flex-col bg-background`,
      children: [
        (0, f.jsx)(`header`, {
          className: `border-b border-border/60 sticky top-0 z-30 bg-background/80 backdrop-blur-xl`,
          children: (0, f.jsxs)(`div`, {
            className: `mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between`,
            children: [
              (0, f.jsxs)(`div`, {
                className: `flex items-center gap-2.5`,
                children: [
                  (0, f.jsx)(`div`, {
                    className: `h-9 w-9 rounded-xl bg-gradient-brand flex items-center justify-center shadow-brand`,
                    children: (0, f.jsx)(a, {
                      className: `h-4.5 w-4.5 text-white`,
                      strokeWidth: 2.5,
                    }),
                  }),
                  (0, f.jsx)(`span`, {
                    className: `font-display font-bold text-base`,
                    children: `AI STUDY HUB`,
                  }),
                ],
              }),
              (0, f.jsxs)(`div`, {
                className: `flex items-center gap-2`,
                children: [
                  (0, f.jsx)(l, {
                    variant: `ghost`,
                    asChild: !0,
                    children: (0, f.jsx)(r, {
                      to: `/auth/login`,
                      children: `Đăng Nhập`,
                    }),
                  }),
                  (0, f.jsx)(l, {
                    className: `bg-gradient-brand shadow-brand hover:opacity-90`,
                    asChild: !0,
                    children: (0, f.jsx)(r, {
                      to: `/auth/register`,
                      children: `Tạo Tài Khoản`,
                    }),
                  }),
                ],
              }),
            ],
          }),
        }),
        (0, f.jsxs)(`main`, {
          className: `flex-1`,
          children: [
            (0, f.jsxs)(`section`, {
              className: `mx-auto max-w-4xl px-4 sm:px-6 pt-16 pb-12 text-center`,
              children: [
                (0, f.jsxs)(`div`, {
                  className: `inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-3.5 py-1.5 text-xs font-semibold`,
                  children: [
                    (0, f.jsx)(s, { className: `h-3.5 w-3.5` }),
                    `Powered by AI Technology`,
                  ],
                }),
                (0, f.jsxs)(`h1`, {
                  className: `mt-6 font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground`,
                  children: [
                    `Quản lý tài liệu học tập`,
                    (0, f.jsx)(`br`, {}),
                    (0, f.jsx)(`span`, {
                      className: `text-gradient-brand bg-clip-text text-transparent`,
                      children: `cùng AI`,
                    }),
                  ],
                }),
                (0, f.jsx)(`p`, {
                  className: `mt-4 text-muted-foreground max-w-xl mx-auto`,
                  children: `Tải lên, tổ chức và trò chuyện với tài liệu học tập của bạn. Nhận câu trả lời tức thì được hỗ trợ bởi công nghệ AI tiên tiến.`,
                }),
              ],
            }),
            (0, f.jsxs)(`section`, {
              className: `mx-auto max-w-6xl px-4 sm:px-6 pb-16`,
              children: [
                (0, f.jsxs)(`div`, {
                  className: `text-center mb-10`,
                  children: [
                    (0, f.jsx)(`h2`, {
                      className: `font-display text-2xl sm:text-3xl font-bold text-foreground`,
                      children: `Mọi thứ bạn cần để thành công`,
                    }),
                    (0, f.jsx)(`p`, {
                      className: `mt-2 text-sm text-muted-foreground`,
                      children: `Những tính năng mạnh mẽ giúp nâng cao trải nghiệm học tập của bạn`,
                    }),
                  ],
                }),
                (0, f.jsx)(`div`, {
                  className: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4`,
                  children: p.map((e) =>
                    (0, f.jsxs)(
                      `div`,
                      {
                        className: `rounded-xl border border-border/60 bg-card p-5 hover:shadow-md transition-shadow`,
                        children: [
                          (0, f.jsx)(`div`, {
                            className: `h-10 w-10 rounded-lg bg-gradient-brand flex items-center justify-center shadow-brand mb-4`,
                            children: (0, f.jsx)(e.icon, {
                              className: `h-5 w-5 text-white`,
                            }),
                          }),
                          (0, f.jsx)(`h3`, {
                            className: `font-display font-semibold text-sm text-foreground`,
                            children: e.title,
                          }),
                          (0, f.jsx)(`p`, {
                            className: `mt-1.5 text-xs text-muted-foreground leading-relaxed`,
                            children: e.description,
                          }),
                        ],
                      },
                      e.title,
                    ),
                  ),
                }),
              ],
            }),
            (0, f.jsx)(`section`, {
              className: `mx-auto max-w-6xl px-4 sm:px-6 pb-20`,
              children: (0, f.jsxs)(`div`, {
                className: `rounded-2xl bg-gradient-brand shadow-brand px-6 py-12 sm:py-16 text-center`,
                children: [
                  (0, f.jsx)(`h2`, {
                    className: `font-display text-2xl sm:text-3xl font-bold text-white`,
                    children: `Sẵn sàng thay đổi cách bạn học tập?`,
                  }),
                  (0, f.jsx)(`p`, {
                    className: `mt-2 text-white/85 text-sm`,
                    children: `Tham gia cùng hàng nghìn sinh viên đang sử dụng AI Study Hub`,
                  }),
                  (0, f.jsx)(`div`, {
                    className: `mt-6`,
                    children: (0, f.jsx)(l, {
                      size: `lg`,
                      variant: `secondary`,
                      className: `shadow-lg`,
                      asChild: !0,
                      children: (0, f.jsx)(r, {
                        to: `/auth/register`,
                        children: `Bắt đầu miễn phí`,
                      }),
                    }),
                  }),
                ],
              }),
            }),
          ],
        }),
        (0, f.jsx)(`footer`, {
          className: `bg-foreground text-background`,
          children: (0, f.jsxs)(`div`, {
            className: `mx-auto max-w-6xl px-4 sm:px-6 py-10`,
            children: [
              (0, f.jsxs)(`div`, {
                className: `flex items-center gap-2.5`,
                children: [
                  (0, f.jsx)(`div`, {
                    className: `h-8 w-8 rounded-lg bg-gradient-brand flex items-center justify-center`,
                    children: (0, f.jsx)(a, {
                      className: `h-4 w-4 text-white`,
                    }),
                  }),
                  (0, f.jsx)(`span`, {
                    className: `font-display font-bold text-sm`,
                    children: `AI Study Hub`,
                  }),
                ],
              }),
              (0, f.jsx)(`p`, {
                className: `mt-3 text-xs text-background/60 max-w-sm`,
                children: `Hệ thống quản lý tài liệu được hỗ trợ bởi AI dành cho sinh viên và giảng viên.`,
              }),
            ],
          }),
        }),
      ],
    })
  );
}
export { m as component };
