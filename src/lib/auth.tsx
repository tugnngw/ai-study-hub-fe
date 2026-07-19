// =============================================================
// auth.tsx — AuthContext. Gọi thẳng BE thật (không còn mock).
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

// Nguồn auth: luôn là API thật.
const authSource = {
  login: authApi.login,
  register: authApi.register,
  logout: authApi.logout,
  me: accountApi.me,
};

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<User>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Khi app khởi động: nếu đã có token → lấy thông tin user
  useEffect(() => {
    const token = tokenStore.get();
    if (!token) {
      setIsLoading(false);
      return;
    }
    authSource
      .me()
      .then(setUser)
      .catch(() => tokenStore.clear())
      .finally(() => setIsLoading(false));
  }, []);

  const login = async (username: string, password: string) => {
    const res = await authSource.login({ username, password });
    setUser(res.user);
    return res.user;
  };

  const register = async (data: RegisterRequest) => {
    await authSource.register(data);
    // Sau khi đăng ký, user cần login riêng (hoặc auto-login nếu BE trả token)
  };

  const logout = async () => {
    await authSource.logout();
    setUser(null);
  };

  const refresh = async () => {
    try {
      const u = await authSource.me();
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
