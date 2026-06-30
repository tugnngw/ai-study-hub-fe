import { t as Button } from "./button-OuFjfcpS.js";
import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Bot, Cloud, Share2, Sparkles, Upload } from "lucide-react";
//#region src/routes/index.tsx?tsr-split=component
var features = [
	{
		icon: Bot,
		title: "AI Chatbot",
		description: "Chat với AI để nhận câu trả lời tức thì từ tài liệu của bạn"
	},
	{
		icon: Share2,
		title: "Chia sẻ tài liệu",
		description: "Cộng tác với bạn học bằng cách chia sẻ tài liệu học tập"
	},
	{
		icon: Cloud,
		title: "Lưu trữ Cloud",
		description: "Lưu trữ tài liệu an toàn trên cloud với dung lượng không giới hạn"
	},
	{
		icon: Upload,
		title: "Tải tài liệu lên",
		description: "Kéo thả dễ dàng với hỗ trợ nhiều định dạng tệp"
	}
];
function WelcomePage() {
	useEffect(() => {
		const root = document.documentElement;
		const hadDark = root.classList.contains("dark");
		if (hadDark) root.classList.remove("dark");
		return () => {
			if (hadDark) root.classList.add("dark");
		};
	}, []);
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen flex flex-col bg-background",
		children: [
			/* @__PURE__ */ jsx("header", {
				className: "border-b border-border/60 sticky top-0 z-30 bg-background/80 backdrop-blur-xl",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2.5",
						children: [/* @__PURE__ */ jsx("div", {
							className: "h-9 w-9 rounded-xl bg-gradient-brand flex items-center justify-center shadow-brand",
							children: /* @__PURE__ */ jsx(Cloud, {
								className: "h-4.5 w-4.5 text-white",
								strokeWidth: 2.5
							})
						}), /* @__PURE__ */ jsx("span", {
							className: "font-display font-bold text-base",
							children: "AI STUDY HUB"
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ jsx(Button, {
							variant: "ghost",
							asChild: true,
							children: /* @__PURE__ */ jsx(Link, {
								to: "/auth/login",
								children: "Đăng Nhập"
							})
						}), /* @__PURE__ */ jsx(Button, {
							className: "bg-gradient-brand shadow-brand hover:opacity-90",
							asChild: true,
							children: /* @__PURE__ */ jsx(Link, {
								to: "/auth/register",
								children: "Tạo Tài Khoản"
							})
						})]
					})]
				})
			}),
			/* @__PURE__ */ jsxs("main", {
				className: "flex-1",
				children: [
					/* @__PURE__ */ jsxs("section", {
						className: "mx-auto max-w-4xl px-4 sm:px-6 pt-16 pb-12 text-center",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-3.5 py-1.5 text-xs font-semibold",
								children: [/* @__PURE__ */ jsx(Sparkles, { className: "h-3.5 w-3.5" }), "Powered by AI Technology"]
							}),
							/* @__PURE__ */ jsxs("h1", {
								className: "mt-6 font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground",
								children: [
									"Quản lý tài liệu học tập",
									/* @__PURE__ */ jsx("br", {}),
									/* @__PURE__ */ jsx("span", {
										className: "text-gradient-brand bg-clip-text text-transparent",
										children: "cùng AI"
									})
								]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-4 text-muted-foreground max-w-xl mx-auto",
								children: "Tải lên, tổ chức và trò chuyện với tài liệu học tập của bạn. Nhận câu trả lời tức thì được hỗ trợ bởi công nghệ AI tiên tiến."
							})
						]
					}),
					/* @__PURE__ */ jsxs("section", {
						className: "mx-auto max-w-6xl px-4 sm:px-6 pb-16",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "text-center mb-10",
							children: [/* @__PURE__ */ jsx("h2", {
								className: "font-display text-2xl sm:text-3xl font-bold text-foreground",
								children: "Mọi thứ bạn cần để thành công"
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: "Những tính năng mạnh mẽ giúp nâng cao trải nghiệm học tập của bạn"
							})]
						}), /* @__PURE__ */ jsx("div", {
							className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
							children: features.map((f) => /* @__PURE__ */ jsxs("div", {
								className: "rounded-xl border border-border/60 bg-card p-5 hover:shadow-md transition-shadow",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "h-10 w-10 rounded-lg bg-gradient-brand flex items-center justify-center shadow-brand mb-4",
										children: /* @__PURE__ */ jsx(f.icon, { className: "h-5 w-5 text-white" })
									}),
									/* @__PURE__ */ jsx("h3", {
										className: "font-display font-semibold text-sm text-foreground",
										children: f.title
									}),
									/* @__PURE__ */ jsx("p", {
										className: "mt-1.5 text-xs text-muted-foreground leading-relaxed",
										children: f.description
									})
								]
							}, f.title))
						})]
					}),
					/* @__PURE__ */ jsx("section", {
						className: "mx-auto max-w-6xl px-4 sm:px-6 pb-20",
						children: /* @__PURE__ */ jsxs("div", {
							className: "rounded-2xl bg-gradient-brand shadow-brand px-6 py-12 sm:py-16 text-center",
							children: [
								/* @__PURE__ */ jsx("h2", {
									className: "font-display text-2xl sm:text-3xl font-bold text-white",
									children: "Sẵn sàng thay đổi cách bạn học tập?"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-2 text-white/85 text-sm",
									children: "Tham gia cùng hàng nghìn sinh viên đang sử dụng AI Study Hub"
								}),
								/* @__PURE__ */ jsx("div", {
									className: "mt-6",
									children: /* @__PURE__ */ jsx(Button, {
										size: "lg",
										variant: "secondary",
										className: "shadow-lg",
										asChild: true,
										children: /* @__PURE__ */ jsx(Link, {
											to: "/auth/register",
											children: "Bắt đầu miễn phí"
										})
									})
								})
							]
						})
					})
				]
			}),
			/* @__PURE__ */ jsx("footer", {
				className: "bg-foreground text-background",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-6xl px-4 sm:px-6 py-10",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2.5",
						children: [/* @__PURE__ */ jsx("div", {
							className: "h-8 w-8 rounded-lg bg-gradient-brand flex items-center justify-center",
							children: /* @__PURE__ */ jsx(Cloud, { className: "h-4 w-4 text-white" })
						}), /* @__PURE__ */ jsx("span", {
							className: "font-display font-bold text-sm",
							children: "AI Study Hub"
						})]
					}), /* @__PURE__ */ jsx("p", {
						className: "mt-3 text-xs text-background/60 max-w-sm",
						children: "Hệ thống quản lý tài liệu được hỗ trợ bởi AI dành cho sinh viên và giảng viên."
					})]
				})
			})
		]
	});
}
//#endregion
export { WelcomePage as component };
