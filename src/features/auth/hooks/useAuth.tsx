// src/features/auth/hooks/useAuth.tsx

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { User, RegisterRequest } from "../types/auth.types";
import { authApi, accountApi } from "../services";
import { tokenStore } from "@/lib/api";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean; // True if user is logged in, false otherwise
  login: (username: string, password: string) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>; // hàm này sẽ làm mới access token và có thể cả refresh token
  requestPasswordReset: (email: string) => Promise<void>;
  verifyResetOtp: (email: string, otp: string) => Promise<void>;
  resetPassword: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // --- Initial Auth Check ---
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
        const u = await accountApi.me(); // Fetch user info
        setUser(u);
      } catch (err: any) {
        if (err?.status === 401 || err?.status === 403) {
          try {
            await refresh(); // Call refresh token
            const u = await accountApi.me(); // Re-fetch user info
            setUser(u);
          } catch {
            tokenStore.clear();
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // --- Periodically refresh token (every 10 min) ---
  useEffect(() => {
    const interval = setInterval(
      async () => {
        if (!tokenStore.get() || !tokenStore.getRefresh()) {
          setUser(null);
          clearInterval(this);
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
        } catch (err: any) {
          tokenStore.clear();
          setUser(null);
        }
      },
      10 * 60 * 1000,
    ); // 10 minutes

    return () => clearInterval(interval);
  }, []);

  // --- Authentication Functions ---
  const login = async (username: string, password: string) => {
    tokenStore.clear();
    const res = await authApi.login({ username, password });
    if (res?.accessToken && res.refreshToken) {
      tokenStore.set(res.accessToken);
      tokenStore.setRefresh(res.refreshToken);
      const userObj: User = {
        id: res.userId,
        username: res.username,
        email: res.email,
        fullName: res.fullName,
        role: res.role,
        status: "ACTIVE",
        authProvider: "LOCAL",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setUser(userObj);
    } else {
      throw new Error("Login failed: Missing tokens from backend.");
    }
  };

  const register = async (data: RegisterRequest) => {
    const res = await authApi.register(data);
    if (res?.accessToken && res.refreshToken) {
      tokenStore.set(res.accessToken);
      tokenStore.setRefresh(res.refreshToken);
      const userObj: User = {
        id: res.userId,
        username: res.username,
        email: res.email,
        fullName: res.fullName,
        role: res.role,
        status: "ACTIVE",
        authProvider: "LOCAL",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setUser(userObj);
    } else {
      throw new Error("Registration failed: Missing tokens from backend.");
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error: any) {
      console.error(
        "Logout API call failed, but clearing local tokens anyway:",
        error,
      );
    }
    tokenStore.clear();
    setUser(null);
    if (typeof window !== "undefined") {
      window.location.href = "/auth/login";
    }
  };

  const refresh = useCallback(async () => {
    const refreshToken = tokenStore.getRefresh();
    if (!refreshToken) {
      throw new Error("No refresh token available.");
    }

    try {
      const res = await authApi.refresh();
      if (res?.accessToken && res.refreshToken) {
        tokenStore.set(res.accessToken);
        tokenStore.setRefresh(res.refreshToken);
        try {
          const u = await accountApi.me();
          setUser(u);
        } catch (userFetchError) {
          console.error(
            "Failed to fetch user info after token refresh:",
            userFetchError,
          );
        }
      } else {
        throw new Error("Refresh failed: Backend response invalid.");
      }
    } catch (error: any) {
      tokenStore.clear();
      setUser(null);
      throw error;
    }
  }, []);

  const requestPasswordReset = async (email: string) => {
    await authApi.requestPasswordReset(email);
  };

  const verifyResetOtp = async (email: string, otp: string) => {
    await authApi.verifyResetOtp(email, otp);
  };

  const resetPassword = async (email: string, password: string) => {
    await authApi.resetPassword(email, password);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        refresh,
        requestPasswordReset,
        verifyResetOtp,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export type { RegisterRequest };
