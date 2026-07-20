// src/features/auth/types/auth.types.ts
// Auth-specific types

export interface RegisterRequest {
  username: string;
  password: string;
  fullName?: string;
  email?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
  user: User;
}

export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  avatarUrl?: string | null;
  role: "USER" | "ADMIN";
  status: "ACTIVE" | "BANNED";
  authProvider: "LOCAL" | "GOOGLE";
  providerId?: string;
  emailVerified: boolean;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  version?: number;
}
