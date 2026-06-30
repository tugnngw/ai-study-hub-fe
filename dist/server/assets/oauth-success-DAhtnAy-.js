import { n as useAuth } from "./auth-Hjcncp2d.js";
import { useEffect, useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Loader2 } from "lucide-react";
//#region src/routes/oauth-success.tsx?tsr-split=component
function OAuthSuccessPage() {
	const navigate = useNavigate();
	const { refresh } = useAuth();
	useRef(false);
	console.log("📱 OAuthSuccessPage MOUNTED");
	useEffect(() => {
		console.log("📱 OAuthSuccessPage useEffect FIRED");
		const handleOAuth = async () => {
			const params = new URLSearchParams(window.location.search);
			const token = params.get("access_token");
			const userId = params.get("user_id");
			console.log("📱 OAuthSuccessPage: token exists?", !!token, "userId exists?", !!userId);
			if (!token) {
				console.log("📱 OAuthSuccessPage: NO TOKEN, redirecting to /auth/login");
				navigate({
					to: "/auth/login",
					replace: true
				});
				return;
			}
			console.log("📱 OAuthSuccessPage: SAVING token to localStorage");
			localStorage.setItem("auth_token", token);
			if (userId) {
				console.log("📱 OAuthSuccessPage: SAVING userId to localStorage");
				localStorage.setItem("user_id", userId);
			}
			console.log("📱 OAuthSuccessPage: CALLING refresh()");
			await refresh();
			console.log("📱 OAuthSuccessPage: refresh() COMPLETED");
			console.log("📱 OAuthSuccessPage: NAVIGATING to /dashboard");
			navigate({
				to: "/dashboard",
				replace: true
			});
		};
		handleOAuth();
	}, []);
	return /* @__PURE__ */ jsx("div", {
		className: "min-h-screen flex items-center justify-center bg-background",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex flex-col items-center gap-4",
			children: [/* @__PURE__ */ jsx(Loader2, { className: "h-12 w-12 animate-spin text-primary" }), /* @__PURE__ */ jsx("p", {
				className: "text-sm text-muted-foreground",
				children: "Đang xử lý đăng nhập..."
			})]
		})
	});
}
//#endregion
export { OAuthSuccessPage as component };
