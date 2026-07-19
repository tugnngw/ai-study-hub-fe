<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
// =============================================================
// auth.tsx — AuthContext. Gọi thẳng BE thật (không còn mock).
// =============================================================

=======
// src/lib/auth.tsx
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
// src/lib/auth.tsx
>>>>>>> origin/AI-Study-fix
=======
// src/lib/auth.tsx
>>>>>>> origin/test/share-document-cloudinary
=======
// src/lib/auth.tsx
>>>>>>> origin/uichange
import {
  createContext,
  useContext,
  useState,
  useEffect,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
  useCallback,
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
  useCallback,
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
  type ReactNode,
} from "react";
import type { User, RegisterRequest } from "./types";
import { authApi, accountApi } from "./realApi";
import { tokenStore } from "./api";

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
// Nguồn auth: luôn là API thật.
const authSource = {
  login: authApi.login,
  register: authApi.register,
  logout: authApi.logout,
  me: accountApi.me,
};

=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
<<<<<<< HEAD
<<<<<<< HEAD
  login: (username: string, password: string) => Promise<User>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
=======
=======
>>>>>>> origin/AI-Study-fix
interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean; // True if user is logged in, false otherwise
  login: (username: string, password: string) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>; // Hàm này sẽ làm mới access token và có thể cả refresh token
  requestPasswordReset: (email: string) => Promise<void>;
  verifyResetOtp: (email: string, otp: string) => Promise<void>;
  resetPassword: (email: string, password: string) => Promise<void>;
<<<<<<< HEAD
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
>>>>>>> origin/AI-Study-fix
=======
=======
>>>>>>> origin/uichange
  login: (username: string, password: string) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  verifyResetOtp: (email: string, otp: string) => Promise<void>;
  resetPassword: (email: string, password: string) => Promise<void>;
<<<<<<< HEAD
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  // Khi app khởi động: nếu đã có token → lấy thông tin user
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
  useEffect(() => {
    const token = tokenStore.get();
    if (!token) {
      setIsLoading(false);
      return;
    }
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> origin/uichange
    accountApi
      .me()
      .then((u) => {
        setUser(u);
      })
      .catch((err) => {
        if (err?.status === 401 || err?.status === 403) {
          tokenStore.clear();
          setUser(null);
        } else {
          setIsLoading(false); // Giữ nguyên user (có thể đã có từ trước) nếu lỗi server
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []); // Empty dependency array - OAuth callback executes only once on mount

  // ── Periodically refresh token (every 10 min) ─────────
  useEffect(() => {
    const interval = setInterval(async () => {
      if (!tokenStore.get()) return; // No token, skip
      try {
        const res = await authApi.refresh();
        if (res?.accessToken) {
          tokenStore.set(res.accessToken);
          if (res.refreshToken) tokenStore.setRefresh(res.refreshToken);
          // Re-fetch user info silently
          accountApi.me().then(setUser).catch(() => {});
        }
      } catch {
        // Refresh failed — will be caught by api() interceptor later
      }
    }, 10 * 60 * 1000); // 10 minutes

    return () => clearInterval(interval);
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
<<<<<<< HEAD
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
    setUser(null);
  };

  const refresh = async () => {
    try {
<<<<<<< HEAD
<<<<<<< HEAD
      const u = await authSource.me();
      setUser(u);
    } catch {
      setUser(null);
    }
=======
=======
>>>>>>> origin/AI-Study-fix
  // --- Initial Auth Check ---
  // Effect này chạy một lần khi component mount để kiểm tra token và load user
  useEffect(() => {
    const initializeAuth = async () => {
      const accessToken = tokenStore.get();
      const refreshToken = tokenStore.getRefresh(); // Lấy cả refresh token

      // Nếu không có cả hai token, user chưa đăng nhập
      if (!accessToken || !refreshToken) {
        setIsLoading(false);
        setUser(null);
        return;
      }

      // Khi có token, thử fetch user info bằng access token hiện tại
      try {
        const u = await accountApi.me(); // Fetch user info
        setUser(u);
      } catch (err: any) {
        // Nếu fetch user info thất bại (ví dụ: access token hết hạn), thử refresh token
        if (err?.status === 401 || err?.status === 403) {
          try {
            await refresh(); // Gọi hàm refresh để lấy token mới
            const u = await accountApi.me(); // Thử fetch user info lại với token mới
            setUser(u);
          } catch {
            // Nếu refresh cũng thất bại (ví dụ: refresh token hết hạn/invalid)
            console.error("Refresh token failed. Clearing tokens and user.");
            tokenStore.clear(); // Xóa hết token
            setUser(null);
          }
        } else {
          // Nếu lỗi khác không liên quan đến token hết hạn
          console.error("Error initializing auth:", err);
          setUser(null);
        }
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []); // Dependency array rỗng để chỉ chạy một lần khi mount

  // --- Periodically refresh token (every 10 min) ---
  // Effect này chạy định kỳ để làm mới access token và refresh token nếu chúng sắp hết hạn
  useEffect(() => {
    const interval = setInterval(async () => {
      // Chỉ refresh nếu có cả access và refresh token
      if (!tokenStore.get() || !tokenStore.getRefresh()) {
        // Nếu không có token, có thể user đã logout hoặc phiên hết hạn
        setUser(null);
        clearInterval(this); // Dừng interval nếu không có token
        return;
      }
      try {
        // Gọi API refresh token của backend
        const res = await authApi.refresh();
        if (res?.accessToken && res.refreshToken) {
          tokenStore.set(res.accessToken); // Lưu access token mới
          tokenStore.setRefresh(res.refreshToken); // Lưu refresh token mới
          console.log("Tokens refreshed successfully in background.");
          // Tùy chọn: Re-fetch user info để đảm bảo user context là mới nhất
          // accountApi.me().then(setUser).catch((err) => console.error("Failed to re-fetch user after refresh:", err));
        } else {
          console.error("Token refresh failed: Backend did not return new tokens.");
          tokenStore.clear(); // Xóa hết token
          setUser(null);
        }
      } catch (err: any) {
        // Xử lý lỗi khi gọi authApi.refresh() (ví dụ: refresh token hết hạn hoặc invalid)
        console.error("Error during periodic token refresh:", err);
        tokenStore.clear(); // Xóa hết token
        setUser(null);
        // Điều hướng về trang login nếu refresh token hết hạn hoặc invalid
        // window.location.href = "/auth/login";
      }
    }, 10 * 60 * 1000); // 10 phút = 600,000 ms

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []); // Dependency array rỗng để interval chạy độc lập sau khi mount

  // --- Authentication Functions ---
  const login = async (username: string, password: string) => {
    tokenStore.clear(); // Xóa token cũ trước khi đăng nhập mới
    const res = await authApi.login({ username, password });
    // Backend trả về AuthResponse trực tiếp (cấu trúc phẳng: userId, username, email, etc.)
    // Cần đảm bảo backend trả về cả refreshToken
    if (res?.accessToken && res.refreshToken) { // Kiểm tra cả 2 token
      tokenStore.set(res.accessToken);
      tokenStore.setRefresh(res.refreshToken); // Lưu refresh token

      // Giả định User type từ res (cần định nghĩa hoặc lấy từ Resopnse type)
      const userObj: User = {
        id: res.userId,
        username: res.username,
        email: res.email,
        fullName: res.fullName,
        role: res.role,
        // Fallback defaults nếu backend không trả về đủ thông tin
        status: "ACTIVE",
        authProvider: "LOCAL",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setUser(userObj);
      console.log('Login successful. Tokens stored.');
    } else {
      throw new Error("Login failed: Missing tokens from backend.");
    }
  };

  const register = async (data: RegisterRequest) => {
    // Backend register trả về AuthResponse, cần lấy token từ đó
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
      console.log('Registration successful. Tokens stored.');
    } else {
      throw new Error("Registration failed: Missing tokens from backend.");
    }
  };

  const logout = async () => {
    // Gọi logout API của backend để clear session/token trên server nếu cần
    try {
      await authApi.logout(); // Gọi API logout của backend
    } catch (error: any) {
      console.error("Logout API call failed, but clearing local tokens anyway:", error);
    }

    // Clear tokens and user context
    tokenStore.clear(); // Xóa cả access và refresh token khỏi localStorage
    setUser(null); // Xóa user context

    console.log('User logged out. Tokens cleared.');
    console.log('DEBUG: After logout - tokens cleared:', {
      authToken: tokenStore.get(),
      refreshToken: tokenStore.getRefresh(),
    });

    // Redirect về trang login sau khi logout để reset UI state hoàn toàn
    // IMPORTANT: Sử dụng window.location.href để hard reload, tránh state ghost
    if (typeof window !== 'undefined') {
      // Hard reload khi logout để reset all state
      window.location.href = "/auth/login";
    }
  };

  // Hàm refresh này chủ yếu được gọi bởi setInterval hoặc khi có lỗi 401/403
  // Nó sẽ làm mới access token và refresh token nếu có thể
  // Wrap với useCallback để tránh dependency thay đổi trong oauth-success
  const refresh = useCallback(async () => {
    const refreshToken = tokenStore.getRefresh();
    if (!refreshToken) {
      console.warn("No refresh token available. Cannot refresh access token.");
      throw new Error("No refresh token available.");
    }

    try {
      // Gọi API refresh token của backend
      // Backend sẽ trả về AuthResponse chứa accessToken và refreshToken mới
      const res = await authApi.refresh(); // authApi.refresh() sẽ sử dụng tokenStore.getRefresh() nội bộ
      if (res?.accessToken && res.refreshToken) {
        tokenStore.set(res.accessToken);
        tokenStore.setRefresh(res.refreshToken);
        console.log("Tokens refreshed successfully.");

        // Sau khi refresh token thành công, có thể fetch lại user info để cập nhật context
        try {
          const u = await accountApi.me();
          setUser(u);
          return; // Trả về để chỉ ra thành công
        } catch (userFetchError) {
          console.error("Failed to fetch user info after token refresh:", userFetchError);
          // Nếu fetch user info sau khi refresh thất bại, vẫn coi là refresh thành công
          // nhưng user context có thể cũ. Có thể không cần throw error ở đây.
        }
      } else {
        console.error("Refresh failed: Backend did not return new tokens.");
        throw new Error("Refresh failed: Backend response invalid.");
      }
    } catch (error: any) {
      console.error("Error refreshing token:", error);
      tokenStore.clear(); // Xóa hết token nếu refresh thất bại (token hết hạn/invalid)
      setUser(null);
      // Điều hướng về trang login nếu refresh token hết hạn hoặc invalid
      // if (error?.status === 401 || error?.status === 403) {
      //   window.location.href = "/auth/login";
      // }
      throw error; // Re-throw error để component gọi refresh biết là thất bại
    }
  }, []); // Empty deps: refresh function không thay đổi

=======
=======
>>>>>>> origin/uichange
      const u = await accountApi.me();
      setUser(u);
    } catch (err) {
      setUser(null);
    }
  };

<<<<<<< HEAD
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
  const requestPasswordReset = async (email: string) => {
    await authApi.requestPasswordReset(email);
  };

  const verifyResetOtp = async (email: string, otp: string) => {
    await authApi.verifyResetOtp(email, otp);
  };

  const resetPassword = async (email: string, password: string) => {
    await authApi.resetPassword(email, password);
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
        isAuthenticated: !!user,
        login,
        register,
        logout,
        refresh,
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> origin/AI-Study-fix
        // isAuthenticated: !!user && !!tokenStore.get(), // Xác thực khi có user VÀ có access token
        isAuthenticated: !!user, // Chỉ cần user tồn tại là coi như đã xác thực, vì user chỉ set khi có token hợp lệ
        login,
        register,
        logout,
        refresh, // Hàm refresh có thể cần được gọi khi có lỗi 401/403 hoặc định kỳ
        requestPasswordReset,
        verifyResetOtp,
        resetPassword,
<<<<<<< HEAD
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
>>>>>>> origin/AI-Study-fix
=======
        requestPasswordReset,
        verifyResetOtp,
        resetPassword,
>>>>>>> origin/test/share-document-cloudinary
=======
        requestPasswordReset,
        verifyResetOtp,
        resetPassword,
>>>>>>> origin/uichange
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

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
// Re-export type để các component không cần import lại
=======
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
>>>>>>> origin/AI-Study-fix
=======
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
export type { RegisterRequest };
