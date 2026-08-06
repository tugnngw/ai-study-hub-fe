import { i as tokenStore, r as refreshTokens } from "./api-BmsV1BBR.js";
import { n as useAuth } from "./auth-B65hUS2-.js";
import { useEffect, useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Loader2 } from "lucide-react";
//#region src/routes/oauth-success.tsx?tsr-split=component
function OAuthSuccessPage() {
	const navigate = useNavigate();
	const { reloadUser } = useAuth();
	const processed = useRef(false);
	useEffect(() => {
		const handleOAuth = async () => {
			const params = new URLSearchParams(window.location.search);
			const token = params.get("access_token");
			const refreshToken = params.get("refresh_token");
			window.history.replaceState({}, "", "/oauth-success");
			if (!token) {
				navigate({
					to: "/auth/login",
					replace: true
				});
				return;
			}
			tokenStore.set(token);
			if (refreshToken) tokenStore.setRefresh(refreshToken);
			try {
				await reloadUser();
			} catch {
				if (refreshToken) {
					if (!await refreshTokens()) throw new Error("OAuth session could not be restored");
				} else throw new Error("OAuth session could not be restored");
			}
			navigate({
				to: "/dashboard",
				replace: true
			});
		};
		if (!processed.current) {
			processed.current = true;
			handleOAuth();
		}
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
