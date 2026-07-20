import { r as tokenStore } from "./api-CR3oJcwy.js";
import { n as useAuth } from "./auth-D2WdPR2y.js";
import { useEffect, useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Loader2 } from "lucide-react";
//#region src/routes/oauth-success.tsx?tsr-split=component
function OAuthSuccessPage() {
	const navigate = useNavigate();
	const { refresh, reloadUser } = useAuth();
	useRef(false);
	console.log("📱 OAuthSuccessPage MOUNTED");
	useEffect(() => {
		console.log("📱 OAuthSuccessPage useEffect FIRED");
		const handleOAuth = async () => {
			const params = new URLSearchParams(window.location.search);
			const token = params.get("access_token");
			const refreshToken = params.get("refresh_token");
			const userId = params.get("user_id");
			console.log("📱 OAuthSuccessPage: token exists?", !!token, "refreshToken exists?", !!refreshToken, "userId exists?", !!userId);
			if (!token) {
				console.log("📱 OAuthSuccessPage: NO TOKEN, redirecting to /auth/login");
				navigate({
					to: "/auth/login",
					replace: true
				});
				return;
			}
			console.log("📱 OAuthSuccessPage: SAVING token to tokenStore");
			tokenStore.set(token);
			if (refreshToken) {
				console.log("📱 OAuthSuccessPage: SAVING refresh_token");
				tokenStore.setRefresh(refreshToken);
			}
			if (userId) localStorage.setItem("user_id", userId);
			console.log("📱 OAuthSuccessPage: CALLING reloadUser()");
			try {
				await reloadUser();
			} catch (e) {
				if (refreshToken) {
					console.log("📱 OAuthSuccessPage: reloadUser failed, trying refresh()");
					await refresh();
				} else throw e;
			}
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
