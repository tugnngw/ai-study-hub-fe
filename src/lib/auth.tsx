// src/lib/auth.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { User, RegisterRequest } from "./types";
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
  requestPasswordReset: (email: string) => Promise<void>;
  verifyResetOtp: (email: string, otp: string) => Promise<void>;
  resetPassword: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = tokenStore.get();
    if (!token) {
      setIsLoading(false);
      return;
    }
    accountApi
      .me()
      .then(setUser)
      .catch((err) => {
        if (err?.status === 401 || err?.status === 403) {
          tokenStore.clear();
          setUser(null);
        } else {
          setIsLoading(false); // Giữ nguyên user (có thể đã có từ trước) nếu lỗi server
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  const login = async (username: string, password: string) => {
    tokenStore.clear(); // Clear any old token before setting new
    const res = await authApi.login({ username, password });
    // Backend returns AuthResponse directly as res (flat structure: userId, username, email, etc.)
    const userObj: User = {
      id: res.userId,
      username: res.username,
      email: res.email,
      fullName: res.fullName,
      role: res.role,
      status: "ACTIVE", // Fallback defaults
      authProvider: "LOCAL",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setUser(userObj);
  };

  const register = async (data: RegisterRequest) => {
    await authApi.register(data);
  };

  const logout = async () => {
    await authApi.logout();
    setUser(null);
  };

  const refresh = async () => {
    try {
      const u = await accountApi.me();
      setUser(u);
    } catch {
      setUser(null);
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
