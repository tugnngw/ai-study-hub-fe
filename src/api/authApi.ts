export interface LoginSession {
  id: number;
  device: string;
  deviceType: 'desktop' | 'mobile';
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

let mockSessions: LoginSession[] = [
  { id: 1, device: 'Chrome trên Windows', deviceType: 'desktop', location: 'Hà Nội, Việt Nam', lastActive: 'Đang hoạt động', isCurrent: true },
  { id: 2, device: 'Safari trên iPhone', deviceType: 'mobile', location: 'Hà Nội, Việt Nam', lastActive: '2 giờ trước', isCurrent: false },
  { id: 3, device: 'Chrome trên macOS', deviceType: 'desktop', location: 'TP.HCM, Việt Nam', lastActive: '3 ngày trước', isCurrent: false },
];

let mock2FAEnabled = false;

export const authApi = {
  login: (username: string, password: string): Promise<{ success: boolean; role: 'admin' | 'user' }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (username === 'admin') resolve({ success: true, role: 'admin' });
        else resolve({ success: true, role: 'user' });
      }, 300);
    });
  },

  register: (formData: any): Promise<boolean> => {
    return Promise.resolve(true);
  },

  sendOtp: (email: string): Promise<boolean> => {
    return Promise.resolve(true);
  },

  verifyOtp: (otp: string): Promise<boolean> => {
    return Promise.resolve(true);
  },

  changePassword: (input: { currentPassword: string; newPassword: string }): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!input.currentPassword || !input.newPassword) reject(new Error('Thiếu thông tin'));
        else resolve(true);
      }, 400);
    });
  },

  get2FAStatus: (): Promise<boolean> => Promise.resolve(mock2FAEnabled),

  toggle2FA: (enabled: boolean): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        mock2FAEnabled = enabled;
        resolve(enabled);
      }, 300);
    });
  },

  getSessions: (): Promise<LoginSession[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...mockSessions]), 250);
    });
  },

  revokeSession: (id: number): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        mockSessions = mockSessions.filter((s) => s.isCurrent || s.id !== id);
        resolve(true);
      }, 250);
    });
  },
};
