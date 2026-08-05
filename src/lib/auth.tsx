// src/lib/auth.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import type { User, RegisterRequest } from "@/lib/types";
import { authApi, accountApi } from "./realApi";
import { tokenStore, refreshTokens, sessionFailed } from "./api";
import { useQueryClient } from "@tanstack/react-query";

interface AuthContextValue {
  user: User | null;
  /** Đúng khi đang xác định phiên (khởi tạo / refresh) — guard dừng render. */
  isInitializing: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (data: RegisterRequest) => Promise<{ needsVerification: boolean }>;
  logout: () => Promise<void>;
  reloadUser: () => Promise<void>;
  updateProfile: (data: { fullName?: string; email?: string }) => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  verifyResetOtp: (email: string, otp: string) => Promise<void>;
  resetPassword: (email: string, otp: string, newPassword: string) => Promise<void>;
}

interface AuthResponse {
  userId: string;
  username: string;
  email: string | null;
  fullName: string;
  role: "USER" | "ADMIN";
  accessToken?: string;
  refreshToken?: string;
  expiresIn: number;
  emailVerified: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const queryClient = useQueryClient();
  const logoutRef = useRef<() => void>(() => {});

  // --- Initial Auth Check ---
  // Có access token → xác thực qua /me.
  // Có access token + refresh token → thử refresh rồi xác thực lại.
  // Không có token nào → kết thúc khởi tạo ngay, không gọi network.
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const accessToken = tokenStore.get();
        if (!accessToken) {
          setUser(null);
          return;
        }

        try {
          const u = await accountApi.me();
          setUser(u);
          return;
        } catch {
          // Access token lỗi (hết hạn / không hợp lệ) → thử refresh.
        }

        if (!tokenStore.getRefresh()) {
          // Không có refresh token → không thể phục hồi phiên.
          tokenStore.clear();
          setUser(null);
          return;
        }

        const refreshed = await refreshTokens();
        if (!refreshed) {
          tokenStore.clear();
          setUser(null);
          return;
        }

        try {
          const u = await accountApi.me();
          setUser(u);
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

  // --- Lắng nghe sự kiện session failed (refresh thất bại trong api layer) ---
  useEffect(() => {
    const handleSessionFailed = () => {
      setUser(null);
      logoutRef.current();
    };
    window.addEventListener("auth:unauthorized", handleSessionFailed);
    return () => window.removeEventListener("auth:unauthorized", handleSessionFailed);
  }, []);

  // --- Authentication Functions ---
  const login = async (username: string, password: string) => {
    const res: AuthResponse = await authApi.login({ username, password });

    const accessToken = res?.accessToken;
    const refreshToken = res?.refreshToken;

    if (!accessToken || !refreshToken) {
      throw new Error("Login failed: Missing tokens from backend.");
    }

    tokenStore.set(accessToken);
    tokenStore.setRefresh(refreshToken);
    // Reset single-fire guard của auth:unauthorized cho phiên mới.
    window.dispatchEvent(new CustomEvent("auth:login-success"));

    try {
      const fullUser = await accountApi.me();
      setUser(fullUser);
    } catch {
      // API /me hỏng nhưng token hợp lệ — dùng dữ liệu từ login response.
      const userObj: User = {
        id: res.userId,
        username: res.username,
        email: res.email ?? "",
        fullName: res.fullName,
        role: res.role,
        status: "ACTIVE",
        plan: "FREE",
        emailVerified: res.emailVerified ?? false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setUser(userObj);
    }
  };

  const register = async (data: RegisterRequest): Promise<{ needsVerification: boolean }> => {
    const res: AuthResponse = await authApi.register(data);

    if (!res?.accessToken || !res.refreshToken) {
      // Có email → cần xác thực, backend không cấp token.
      return { needsVerification: true };
    }

    // Không có email → auto-login (existing flow).
    tokenStore.set(res.accessToken);
    tokenStore.setRefresh(res.refreshToken);
    window.dispatchEvent(new CustomEvent("auth:login-success"));

    try {
      const fullUser = await accountApi.me();
      setUser(fullUser);
    } catch {
      const userObj: User = {
        id: res.userId,
        username: res.username,
        email: res.email ?? "",
        fullName: res.fullName,
        role: res.role,
        status: "ACTIVE",
        plan: "FREE",
        emailVerified: res.emailVerified ?? false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setUser(userObj);
    }
    return { needsVerification: false };
  };

  const logout = async () => {
    // Gọi backend dù stateless JWT (logout là no-op) — giữ API contract,
    // sẵn sàng khi backend thêm refresh-token revocation.
    try {
      await authApi.logout();
    } catch {
      // Không chặn logout khi API lỗi.
    }

    tokenStore.clear();
    setUser(null);
    queryClient.clear();
    if (typeof window !== "undefined") {
      window.location.href = "/auth/login";
    }
  };

  // lưu logout vào ref để listener session-failed dùng được mà không tạo
  // dependency vòng (logout chưa tồn tại lúc effect đăng ký).
  logoutRef.current = logout;

  const reloadUser = useCallback(async () => {
    try {
      const u = await accountApi.me();
      setUser(u);
    } catch (error) {
      console.error("Reload user failed:", error);
      throw error;
    }
  }, []);

  const updateProfile = async (data: { fullName?: string; email?: string }) => {
    await accountApi.updateProfile(data);
    await reloadUser();
  };

  const requestPasswordReset = async (email: string) => {
    await authApi.requestPasswordReset(email);
  };

  const verifyResetOtp = async (email: string, otp: string) => {
    await authApi.verifyResetOtp(email, otp);
  };

  const resetPassword = async (email: string, otp: string, newPassword: string) => {
    await authApi.resetPassword(email, otp, newPassword);
  };

  return (
      <AuthContext.Provider
          value={{
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
