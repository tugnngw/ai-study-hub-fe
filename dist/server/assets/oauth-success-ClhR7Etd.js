import { c as tokenStore } from "./realApi-DdsVabnO.js";
import { n as useAuth } from "./auth-ZyesprRF.js";
import { useEffect, useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Loader2 } from "lucide-react";
//#region src/routes/oauth-success.tsx?tsr-split=component
function OAuthSuccessPage() {
	const navigate = useNavigate();
	const { refresh } = useAuth();
	const hasRunRef = useRef(false);
	useEffect(() => {
		if (hasRunRef.current) return;
		hasRunRef.current = true;
		const handleOAuth = async () => {
			console.log("=============== OAUTH DEBUG ===============");
			console.log("Full URL:", window.location.href);
			console.log("Search params:", window.location.search);
			const params = new URLSearchParams(window.location.search);
			const accessToken = params.get("access_token");
			const userId = params.get("user_id");
			const refreshToken = params.get("refresh_token");
			console.log("Parsed parameters:");
			console.log("  accessToken:", accessToken ? `${accessToken.substring(0, 20)}...` : "NULL");
			console.log("  refreshToken:", refreshToken ? `${refreshToken.substring(0, 20)}...` : "NULL");
			console.log("  userId:", userId);
			console.log("All URL parameters:");
			for (const [key, value] of params.entries()) console.log(`  ${key}: ${String(value).substring(0, 30)}...`);
			console.log("=========================================");
			if (!accessToken || !refreshToken || !userId) {
				console.error("OAuth failed: Missing access token, refresh token, or user ID in URL.");
				console.error(`Missing: ${!accessToken ? "accessToken " : ""}${!refreshToken ? "refreshToken " : ""}${!userId ? "userId" : ""}`);
				navigate({
					to: "/auth/login",
					replace: true
				});
				return;
			}
			tokenStore.set(accessToken);
			tokenStore.setRefresh(refreshToken);
			localStorage.setItem("user_id", userId);
			console.log("OAuth successful. Tokens and user ID stored.");
			try {
				await refresh();
			} catch (error) {
				console.error("Failed to fetch user info after OAuth success:", error);
				navigate({
					to: "/auth/login",
					replace: true
				});
				return;
			}
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
