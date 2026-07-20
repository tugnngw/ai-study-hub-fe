import { r as tokenStore } from "./api-vGJ7qemV.js";
import { n as authApi, t as accountApi } from "./realApi-Id31-bN7.js";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
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
        if (err?.status === 401 || err?.status === 403)
          try {
            await refresh();
            setUser(await accountApi.me());
          } catch {
            console.error("Refresh token failed. Clearing tokens and user.");
            tokenStore.clear();
            setUser(null);
          }
        else {
          console.error("Error initializing auth:", err);
          setUser(null);
        }
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
        clearInterval(this);
        return;
      }
      try {
        const res = await authApi.refresh();
        if (res?.accessToken && res.refreshToken) {
          tokenStore.set(res.accessToken);
          tokenStore.setRefresh(res.refreshToken);
          console.log("Tokens refreshed successfully in background.");
        } else {
          console.error(
            "Token refresh failed: Backend did not return new tokens.",
          );
          tokenStore.clear();
          setUser(null);
        }
      } catch (err) {
        console.error("Error during periodic token refresh:", err);
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
      password,
    });
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
        createdAt: /* @__PURE__ */ new Date().toISOString(),
        updatedAt: /* @__PURE__ */ new Date().toISOString(),
      });
      console.log("Login successful. Tokens stored.");
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
        createdAt: /* @__PURE__ */ new Date().toISOString(),
        updatedAt: /* @__PURE__ */ new Date().toISOString(),
      });
      console.log("Registration successful. Tokens stored.");
    } else throw new Error("Registration failed: Missing tokens from backend.");
  };
  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error(
        "Logout API call failed, but clearing local tokens anyway:",
        error,
      );
    }
    tokenStore.clear();
    setUser(null);
    console.log("User logged out. Tokens cleared.");
    console.log("DEBUG: After logout - tokens cleared:", {
      authToken: tokenStore.get(),
      refreshToken: tokenStore.getRefresh(),
    });
    if (typeof window !== "undefined") window.location.href = "/auth/login";
  };
  const refresh = useCallback(async () => {
    if (!tokenStore.getRefresh()) {
      console.warn("No refresh token available. Cannot refresh access token.");
      throw new Error("No refresh token available.");
    }
    try {
      const res = await authApi.refresh();
      if (res?.accessToken && res.refreshToken) {
        tokenStore.set(res.accessToken);
        tokenStore.setRefresh(res.refreshToken);
        console.log("Tokens refreshed successfully.");
        try {
          setUser(await accountApi.me());
          return;
        } catch (userFetchError) {
          console.error(
            "Failed to fetch user info after token refresh:",
            userFetchError,
          );
        }
      } else {
        console.error("Refresh failed: Backend did not return new tokens.");
        throw new Error("Refresh failed: Backend response invalid.");
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
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
      resetPassword,
    },
    children,
  });
}
function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
//#endregion
export { useAuth as n, AuthProvider as t };
