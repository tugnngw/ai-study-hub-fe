// src/lib/auth.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { User, RegisterRequest, AuthResponse } from "./types";
import { authApi, accountApi } from "./realApi";
import { tokenStore } from "./api";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
  reloadUser: () => Promise<void>;
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
        const u = await accountApi.me();
        setUser(u);
      } catch (err: any) {
        console.error("Auth initialization failed, clearing session:", err);
        tokenStore.clear();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // --- Periodically refresh token (every 10 min) ---
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
    }, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // --- Authentication Functions ---
  const login = async (username: string, password: string) => {
    // Clear old tokens
    tokenStore.clear();

    const res: AuthResponse = await authApi.login({ username, password });

    const accessToken = res?.accessToken;
    const refreshToken = res?.refreshToken;

    if (accessToken && refreshToken) {
      // Lưu token
      tokenStore.set(accessToken);
      tokenStore.setRefresh(refreshToken);

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
    const res: AuthResponse = await authApi.register(data);
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
    } catch {
      // Ignore logout API error
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
        } catch {
          // User fetch failed, but token is refreshed
        }
      } else {
        throw new Error("Refresh failed: Backend response invalid.");
      }
    } catch (error) {
      tokenStore.clear();
      setUser(null);
      throw error;
    }
  }, []);

  const reloadUser = async () => {
    try {
      const u = await accountApi.me();
      setUser(u);
    } catch (error) {
      console.error("Reload user failed:", error);
      throw error;
    }
  };

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
            reloadUser,
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