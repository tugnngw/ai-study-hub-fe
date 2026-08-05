import { i as tokenStore, r as refreshTokens } from "./api-BmsV1BBR.js";
import { n as authApi, t as accountApi } from "./realApi-zSE4Ojk_.js";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { jsx } from "react/jsx-runtime";
import { useQueryClient } from "@tanstack/react-query";
//#region src/lib/auth.tsx
var AuthContext = createContext(null);
function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [isInitializing, setIsInitializing] = useState(true);
	const queryClient = useQueryClient();
	const logoutRef = useRef(() => {});
	useEffect(() => {
		const initializeAuth = async () => {
			try {
				if (!tokenStore.get()) {
					setUser(null);
					return;
				}
				try {
					setUser(await accountApi.me());
					return;
				} catch {}
				if (!tokenStore.getRefresh()) {
					tokenStore.clear();
					setUser(null);
					return;
				}
				if (!await refreshTokens()) {
					tokenStore.clear();
					setUser(null);
					return;
				}
				try {
					setUser(await accountApi.me());
				} catch {
					tokenStore.clear();
					setUser(null);
				}
			} finally {
				setIsInitializing(false);
			}
		};
		initializeAuth();
	}, []);
	useEffect(() => {
		const handleSessionFailed = () => {
			setUser(null);
			logoutRef.current();
		};
		window.addEventListener("auth:unauthorized", handleSessionFailed);
		return () => window.removeEventListener("auth:unauthorized", handleSessionFailed);
	}, []);
	const login = async (username, password) => {
		const res = await authApi.login({
			username,
			password
		});
		const accessToken = res?.accessToken;
		const refreshToken = res?.refreshToken;
		if (!accessToken || !refreshToken) throw new Error("Login failed: Missing tokens from backend.");
		tokenStore.set(accessToken);
		tokenStore.setRefresh(refreshToken);
		window.dispatchEvent(new CustomEvent("auth:login-success"));
		try {
			setUser(await accountApi.me());
		} catch {
			setUser({
				id: res.userId,
				username: res.username,
				email: res.email ?? "",
				fullName: res.fullName,
				role: res.role,
				status: "ACTIVE",
				plan: "FREE",
				emailVerified: res.emailVerified ?? false,
				createdAt: (/* @__PURE__ */ new Date()).toISOString(),
				updatedAt: (/* @__PURE__ */ new Date()).toISOString()
			});
		}
	};
	const register = async (data) => {
		const res = await authApi.register(data);
		if (!res?.accessToken || !res.refreshToken) return { needsVerification: true };
		tokenStore.set(res.accessToken);
		tokenStore.setRefresh(res.refreshToken);
		window.dispatchEvent(new CustomEvent("auth:login-success"));
		try {
			setUser(await accountApi.me());
		} catch {
			setUser({
				id: res.userId,
				username: res.username,
				email: res.email ?? "",
				fullName: res.fullName,
				role: res.role,
				status: "ACTIVE",
				plan: "FREE",
				emailVerified: res.emailVerified ?? false,
				createdAt: (/* @__PURE__ */ new Date()).toISOString(),
				updatedAt: (/* @__PURE__ */ new Date()).toISOString()
			});
		}
		return { needsVerification: false };
	};
	const logout = async () => {
		try {
			await authApi.logout();
		} catch {}
		tokenStore.clear();
		setUser(null);
		queryClient.clear();
		if (typeof window !== "undefined") window.location.href = "/auth/login";
	};
	logoutRef.current = logout;
	const reloadUser = useCallback(async () => {
		try {
			setUser(await accountApi.me());
		} catch (error) {
			console.error("Reload user failed:", error);
			throw error;
		}
	}, []);
	const updateProfile = async (data) => {
		await accountApi.updateProfile(data);
		await reloadUser();
	};
	const requestPasswordReset = async (email) => {
		await authApi.requestPasswordReset(email);
	};
	const verifyResetOtp = async (email, otp) => {
		await authApi.verifyResetOtp(email, otp);
	};
	const resetPassword = async (email, otp, newPassword) => {
		await authApi.resetPassword(email, otp, newPassword);
	};
	return /* @__PURE__ */ jsx(AuthContext.Provider, {
		value: {
			user,
			isInitializing,
			isAuthenticated: !!user,
			login,
			register,
			logout,
			reloadUser,
			updateProfile,
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
