// src/lib/auth.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { User, RegisterRequest } from "@/features/auth/types/auth.types";
import { authApi, accountApi } from "./realApi";
import { tokenStore } from "./api";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (data: RegisterRequest) => Promise<{ needsVerification: boolean }>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
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

interface RefreshResponse {
  accessToken: string;
  refreshToken?: string;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Reset the logout guard flag whenever auth state is refreshed
  const resetLogoutGuard = useCallback(() => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("auth:login-success"));
    }
  }, []);

  // --- Initial Auth Check ---
  useEffect(() => {
    const initializeAuth = async () => {
      const accessToken = tokenStore.get();

      // Nếu không có access token, người dùng chưa đăng nhập
      if (!accessToken) {
        setIsLoading(false);
        setUser(null);
        resetLogoutGuard();
        return;
      }

      try {
        // Validate token by calling /me endpoint
        const u = await accountApi.me();
        setUser(u);
        console.log("✅ Auth initialized, user:", u.username);
      } catch (err: any) {
        // Token is invalid or expired
        console.warn("⚠️ Token validation failed during init:", err.status);
        tokenStore.clear();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [resetLogoutGuard]);

  // --- Listen for token changes (auto-logout when token cleared) ---
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "auth_token" || e.key === "refresh_token") {
        // Only logout if the token was actually cleared/set to null
        if (e.newValue === null) {
          console.log("🔔 Token cleared in another tab, clearing local user state");
          setUser(null);
        }
        // If token was updated to a new value, we don't need to do anything
        // tokenStore.get() will return the correct value on next access
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // --- Listen for sessionStorage changes within same tab ---
  useEffect(() => {
    const handleSessionChange = () => {
      const token = tokenStore.get();
      if (!token && user) {
        console.log("⚠️ Session cleared, logging out");
        setUser(null);
      }
    };

    window.addEventListener("storage", handleSessionChange);
    return () => window.removeEventListener("storage", handleSessionChange);
  }, [user]);

  // --- Listen for forced logout event from api.ts (refresh failed) ---
  // Clears local auth state only — navigation is the router's job.
  useEffect(() => {
    const handleForcedLogout = () => {
      console.log("🔴 Forced logout due to refresh failure");
      tokenStore.clear();
      setUser(null);
    };

    window.addEventListener("auth:logout", handleForcedLogout);
    return () => window.removeEventListener("auth:logout", handleForcedLogout);
  }, []);

  // --- Periodically refresh token (every 10 min) ---
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
          resetLogoutGuard();
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
    }, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, [resetLogoutGuard]);

  // --- Authentication Functions ---
  const login = async (username: string, password: string) => {
    const res: AuthResponse = await authApi.login({ username, password });

    const accessToken = res?.accessToken;
    const refreshToken = res?.refreshToken;

    if (accessToken && refreshToken) {
      tokenStore.set(accessToken);
      tokenStore.setRefresh(refreshToken);
      resetLogoutGuard();

      try {
        const fullUser = await accountApi.me();
        setUser(fullUser);
        console.log("✅ Login success, user loaded with storageGb:", fullUser.storageGb);
      } catch (error) {
        console.error("Failed to fetch full user info after login:", error);
        const userObj: User = {
          id: res.userId,
          username: res.username,
          email: res.email ?? "",
          fullName: res.fullName,
          role: res.role,
          status: "ACTIVE",
          authProvider: "LOCAL",
          emailVerified: res.emailVerified ?? false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setUser(userObj);
      }
    } else {
      throw new Error("Login failed: Missing tokens from backend.");
    }
  };

  const register = async (data: RegisterRequest): Promise<{ needsVerification: boolean }> => {
    const res: AuthResponse = await authApi.register(data);

    if (res?.accessToken && res.refreshToken) {
      // No email → auto-login (existing flow)
      tokenStore.set(res.accessToken);
      tokenStore.setRefresh(res.refreshToken);
      resetLogoutGuard();

      try {
        const fullUser = await accountApi.me();
        setUser(fullUser);
        console.log("✅ Register success, user loaded with storageGb:", fullUser.storageGb);
      } catch (error) {
        console.error("Failed to fetch full user info after register:", error);
        const userObj: User = {
          id: res.userId,
          username: res.username,
          email: res.email ?? "",
          fullName: res.fullName,
          role: res.role,
          status: "ACTIVE",
          authProvider: "LOCAL",
          emailVerified: res.emailVerified ?? false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setUser(userObj);
      }
      return { needsVerification: false };
    }

    // Email provided → needs verification, no tokens issued
    return { needsVerification: true };
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch {
      // Ignore logout API error
    }

    // Clear session immediately
    tokenStore.clear();
    setUser(null);
    console.log("✅ Logged out successfully");

    // Redirect to login page
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
        resetLogoutGuard();

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
  }, [resetLogoutGuard]);

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
            isLoading,
            isAuthenticated: !!user,
            login,
            register,
            logout,
            refresh,
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
