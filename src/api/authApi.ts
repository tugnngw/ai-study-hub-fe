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
  }
};