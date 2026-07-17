import { r as tokenStore } from "./api-CE3th9nP.js";
import { n as authApi, t as accountApi } from "./realApi-13UTssC_.js";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { jsx } from "react/jsx-runtime";
//#region src/lib/auth.tsx
var AuthContext = createContext(null);
function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const initializeAuth = async () => {
			if (!tokenStore.get()) {
				setIsLoading(false);
				setUser(null);
				return;
			}
			try {
				const u = await accountApi.me();
				setUser(u);
				console.log("✅ Auth initialized, user:", u.username);
			} catch (err) {
				console.warn("⚠️ Token validation failed during init:", err.status);
				tokenStore.clear();
				setUser(null);
			} finally {
				setIsLoading(false);
			}
		};
		initializeAuth();
	}, []);
	useEffect(() => {
		const handleStorageChange = (e) => {
			if (e.key === "auth_token" || e.key === "refresh_token") {
				if (e.newValue === null) {
					console.log("🔔 Token cleared in another tab, clearing local user state");
					setUser(null);
				}
			}
		};
		window.addEventListener("storage", handleStorageChange);
		return () => window.removeEventListener("storage", handleStorageChange);
	}, []);
	useEffect(() => {
		const handleSessionChange = () => {
			if (!tokenStore.get() && user) {
				console.log("⚠️ Session cleared, logging out");
				setUser(null);
			}
		};
		window.addEventListener("storage", handleSessionChange);
		return () => window.removeEventListener("storage", handleSessionChange);
	}, [user]);
	useEffect(() => {
		const interval = setInterval(async () => {
			const token = tokenStore.get();
			const refreshToken = tokenStore.getRefresh();
			if (!token || !refreshToken) {
				setUser(null);
				clearInterval(interval);
				return;
			}
			try {
				const res = await authApi.refresh();
				if (res?.accessToken && res.refreshToken) {
					tokenStore.set(res.accessToken);
					tokenStore.setRefresh(res.refreshToken);
					console.log("✅ Token refreshed successfully");
				} else {
					console.warn("⚠️ Refresh response invalid");
					tokenStore.clear();
					setUser(null);
				}
			} catch (err) {
				console.error("❌ Token refresh failed:", err);
				tokenStore.clear();
				setUser(null);
			}
		}, 600 * 1e3);
		return () => clearInterval(interval);
	}, []);
	const login = async (username, password) => {
		const res = await authApi.login({
			username,
			password
		});
		const accessToken = res?.accessToken;
		const refreshToken = res?.refreshToken;
		if (accessToken && refreshToken) {
			tokenStore.set(accessToken);
			tokenStore.setRefresh(refreshToken);
			try {
				const fullUser = await accountApi.me();
				setUser(fullUser);
				console.log("✅ Login success, user loaded with storageGb:", fullUser.storageGb);
			} catch (error) {
				console.error("Failed to fetch full user info after login:", error);
				setUser({
					id: res.userId,
					username: res.username,
					email: res.email,
					fullName: res.fullName,
					role: res.role,
					status: "ACTIVE",
					authProvider: "LOCAL",
					createdAt: (/* @__PURE__ */ new Date()).toISOString(),
					updatedAt: (/* @__PURE__ */ new Date()).toISOString()
				});
			}
		} else throw new Error("Login failed: Missing tokens from backend.");
	};
	const register = async (data) => {
		const res = await authApi.register(data);
		if (res?.accessToken && res.refreshToken) {
			tokenStore.set(res.accessToken);
			tokenStore.setRefresh(res.refreshToken);
			try {
				const fullUser = await accountApi.me();
				setUser(fullUser);
				console.log("✅ Register success, user loaded with storageGb:", fullUser.storageGb);
			} catch (error) {
				console.error("Failed to fetch full user info after register:", error);
				setUser({
					id: res.userId,
					username: res.username,
					email: res.email,
					fullName: res.fullName,
					role: res.role,
					status: "ACTIVE",
					authProvider: "LOCAL",
					createdAt: (/* @__PURE__ */ new Date()).toISOString(),
					updatedAt: (/* @__PURE__ */ new Date()).toISOString()
				});
			}
		} else throw new Error("Registration failed: Missing tokens from backend.");
	};
	const logout = async () => {
		try {
			await authApi.logout();
		} catch {}
		tokenStore.clear();
		setUser(null);
		console.log("✅ Logged out successfully");
		if (typeof window !== "undefined") window.location.href = "/auth/login";
	};
	const refresh = useCallback(async () => {
		if (!tokenStore.getRefresh()) throw new Error("No refresh token available.");
		try {
			const res = await authApi.refresh();
			if (res?.accessToken && res.refreshToken) {
				tokenStore.set(res.accessToken);
				tokenStore.setRefresh(res.refreshToken);
				try {
					setUser(await accountApi.me());
				} catch {}
			} else throw new Error("Refresh failed: Backend response invalid.");
		} catch (error) {
			tokenStore.clear();
			setUser(null);
			throw error;
		}
	}, []);
	const reloadUser = useCallback(async () => {
		try {
			setUser(await accountApi.me());
		} catch (error) {
			console.error("Reload user failed:", error);
			throw error;
		}
	}, []);
	const requestPasswordReset = async (email) => {
		await authApi.requestPasswordReset(email);
	};
	const verifyResetOtp = async (email, otp) => {
		await authApi.verifyResetOtp(email, otp);
	};
	const resetPassword = async (email, password) => {
		await authApi.resetPassword(email, password);
	};
	return /* @__PURE__ */ jsx(AuthContext.Provider, {
		value: {
			user,
			isLoading,
			isAuthenticated: !!user,
			login,
			register,
			logout,
			refresh,
			reloadUser,
			requestPasswordReset,
			verifyResetOtp,
			resetPassword
		},
		children
	});
}
function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuth must be used within AuthProvider");
	return ctx;
}
//#endregion
export { useAuth as n, AuthProvider as t };
