// =============================================================
// auth.tsx — AuthContext wired to real API
// =============================================================
// Thay file này cho src/lib/auth.tsx hiện tại.
// Set VITE_USE_MOCK=false trong .env để dùng BE thật.
// =============================================================

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

const USE_MOCK = (import.meta.env.VITE_USE_MOCK ?? "true") === "true";

// ------ Mock user giữ nguyên khi USE_MOCK=true ------
const MOCK_USER: User = {
  id: "00000000-0000-0000-0000-000000000001",
  username: "demo_user",
  email: "demo@aistudyhub.app",
  fullName: "Nguyễn Văn Demo",
  role: "USER",
  status: "ACTIVE",
  authProvider: "LOCAL",
  createdAt: new Date().toISOString(),
};

// ----------------------------------------------------------------

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(USE_MOCK ? MOCK_USER : null);
  const [isLoading, setIsLoading] = useState(!USE_MOCK);

  // Khi app khởi động: nếu đã có token → lấy thông tin user
  useEffect(() => {
    if (USE_MOCK) return;
    const token = tokenStore.get();
    if (!token) {
      setIsLoading(false);
      return;
    }
    accountApi
      .me()
      .then(setUser)
      .catch(() => tokenStore.clear())
      .finally(() => setIsLoading(false));
  }, []);

  const login = async (username: string, password: string) => {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 500));
      setUser({ ...MOCK_USER, username });
      return;
    }
    // REAL:
    const res = await authApi.login({ username, password });
    setUser(res.user);
  };

  const register = async (data: RegisterRequest) => {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 500));
      return;
    }
    // REAL:
    await authApi.register(data);
    // Sau khi đăng ký, user cần login riêng (hoặc auto-login nếu BE trả token)
  };

  const logout = async () => {
    if (!USE_MOCK) await authApi.logout();
    setUser(null);
  };

  const refresh = async () => {
    if (USE_MOCK) return;
    try {
      const u = await accountApi.me();
      setUser(u);
    } catch {
      setUser(null);
    }
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

// Re-export type để các component không cần import lại
export type { RegisterRequest };
