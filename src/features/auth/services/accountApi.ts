// src/features/auth/services/accountApi.ts
// Account API — current user profile

import { api } from "@/lib/api";
import type { User } from "@/lib/types";

export const accountApi = {
  me: () => api<User>("/api/account/me"),
};
