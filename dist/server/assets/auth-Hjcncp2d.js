import { r as tokenStore } from "./api-WaaweWSf.js";
import { n as authApi, t as accountApi } from "./realApi-W8TTNICO.js";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { jsx } from "react/jsx-runtime";
//#region src/lib/auth.tsx
var AuthContext = createContext(null);
function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const initializeAuth = async () => {
			const accessToken = tokenStore.get();
			const refreshToken = tokenStore.getRefresh();
			if (!accessToken || !refreshToken) {
				setIsLoading(false);
				setUser(null);
				return;
			}
			try {
				setUser(await accountApi.me());
			} catch (err) {
				if (err?.status === 401 || err?.status === 403) try {
					await refresh();
					setUser(await accountApi.me());
				} catch {
					tokenStore.clear();
					setUser(null);
				}
				else setUser(null);
			} finally {
				setIsLoading(false);
			}
		};
		initializeAuth();
	}, []);
	useEffect(() => {
		const interval = setInterval(async () => {
			if (!tokenStore.get() || !tokenStore.getRefresh()) {
				setUser(null);
				clearInterval(interval);
				return;
			}
			try {
				const res = await authApi.refresh();
				if (res?.accessToken && res.refreshToken) {
					tokenStore.set(res.accessToken);
					tokenStore.setRefresh(res.refreshToken);
				} else {
					tokenStore.clear();
					setUser(null);
				}
			} catch {
				tokenStore.clear();
				setUser(null);
			}
		}, 600 * 1e3);
		return () => clearInterval(interval);
	}, []);
	const login = async (username, password) => {
		tokenStore.clear();
		const res = await authApi.login({
			username,
			password
		});
		const accessToken = res?.accessToken;
		const refreshToken = res?.refreshToken;
		if (accessToken && refreshToken) {
			tokenStore.set(accessToken);
			tokenStore.setRefresh(refreshToken);
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
		} else throw new Error("Login failed: Missing tokens from backend.");
	};
	const register = async (data) => {
		const res = await authApi.register(data);
		if (res?.accessToken && res.refreshToken) {
			tokenStore.set(res.accessToken);
			tokenStore.setRefresh(res.refreshToken);
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
		} else throw new Error("Registration failed: Missing tokens from backend.");
	};
	const logout = async () => {
		try {
			await authApi.logout();
		} catch {}
		tokenStore.clear();
		setUser(null);
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
