// src/features/admin/hooks/adminKeys.ts
// React Query key factory for the admin feature.

export const adminKeys = {
  all: ["admin"] as const,
  dashboardStats: () => [...adminKeys.all, "dashboard", "stats"] as const,
  dashboardActivity: () => [...adminKeys.all, "dashboard", "activity"] as const,
  users: () => [...adminKeys.all, "users"] as const,
  reportedFiles: () => [...adminKeys.all, "reported-files"] as const,
  approvals: () => [...adminKeys.all, "approvals"] as const,
  documents: (tab?: string) => [...adminKeys.all, "documents", tab ?? "all"] as const,
  deletedFiles: () => [...adminKeys.all, "trash", "files"] as const,
  deletedAccounts: () => [...adminKeys.all, "trash", "accounts"] as const,
  reportHistory: () => [...adminKeys.all, "report-history"] as const,
  premiumStats: () => [...adminKeys.all, "premium", "stats"] as const,
  premiumRequests: () => [...adminKeys.all, "premium", "requests"] as const,
  transactions: () => [...adminKeys.all, "payment", "transactions"] as const,
  planOptions: () => [...adminKeys.all, "payment", "plans"] as const,
  topUpMethods: () => [...adminKeys.all, "payment", "topup-methods"] as const,
  bankInfo: () => [...adminKeys.all, "payment", "bank-info"] as const,
};