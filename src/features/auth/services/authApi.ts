// src/features/auth/services/authApi.ts
// Authentication API client — login, register, password reset, refresh

import { api, tokenStore, attemptRefresh } from "@/lib/api";
import type { LoginRequest, RegisterRequest } from "@/lib/types";

export const authApi = {
  register: (data: RegisterRequest) =>
    api<void>("/api/auth/register", { method: "POST", body: data }),

  login: async (data: LoginRequest): Promise<any> => {
    const res = await api<any>("/api/auth/login", {
      method: "POST",
      body: data,
    });

    const token = res?.accessToken ?? res?.token;
    if (token) {
      tokenStore.set(token);
    }

    if (res?.refreshToken) tokenStore.setRefresh(res.refreshToken);
    return res;
  },

  refresh: (): Promise<{ accessToken: string; refreshToken?: string }> =>
    attemptRefresh().then(() => {
      // Get the new tokens from tokenStore after refresh
      const accessToken = tokenStore.get();
      const refreshToken = tokenStore.getRefresh();
      if (!accessToken) {
        throw new Error("Refresh failed: No access token after refresh");
      }
      return { accessToken, refreshToken: refreshToken ?? undefined };
    }),

  logout: async (): Promise<void> => {
    await api("/api/auth/logout", { method: "POST" }).catch(() => {});
    tokenStore.clear();
  },

  requestPasswordReset: (email: string) =>
    api<void>("/api/auth/request-reset", { method: "POST", body: { email } }),

  verifyResetOtp: (email: string, otp: string) =>
    api<void>("/api/auth/verify-otp", { method: "POST", body: { email, otp } }),

  resetPassword: (email: string, newPassword: string) =>
    api<void>("/api/auth/reset-password", {
      method: "POST",
      body: { email, password: newPassword },
    }),
};
