// src/features/admin/hooks/adminKeys.ts
// React Query key factory for the admin feature.

export const adminKeys = {
  all: ["admin"] as const,
  dashboardStats: () => [...adminKeys.all, "dashboard", "stats"] as const,
  dashboardActivity: () => [...adminKeys.all, "dashboard", "activity"] as const,
  users: () => [...adminKeys.all, "users"] as const,
  reportedFiles: () => [...adminKeys.all, "reported-files"] as const,
  approvals: () => [...adminKeys.all, "approvals"] as const,
<<<<<<< HEAD
<<<<<<< HEAD
  deletedFiles: () => [...adminKeys.all, "trash", "files"] as const,
  deletedAccounts: () => [...adminKeys.all, "trash", "accounts"] as const,
=======
=======
>>>>>>> origin/final/demo-v1
  documents: (tab?: string) => [...adminKeys.all, "documents", tab ?? "all"] as const,
  deletedFiles: () => [...adminKeys.all, "trash", "files"] as const,
  deletedAccounts: () => [...adminKeys.all, "trash", "accounts"] as const,
  reportHistory: () => [...adminKeys.all, "report-history"] as const,
<<<<<<< HEAD
>>>>>>> origin/Flashcars
  premiumStats: () => [...adminKeys.all, "premium", "stats"] as const,
  premiumRequests: () => [...adminKeys.all, "premium", "requests"] as const,
  transactions: () => [...adminKeys.all, "payment", "transactions"] as const,
  planOptions: () => [...adminKeys.all, "payment", "plans"] as const,
  topUpMethods: () => [...adminKeys.all, "payment", "topup-methods"] as const,
  bankInfo: () => [...adminKeys.all, "payment", "bank-info"] as const,
<<<<<<< HEAD
};
=======
};
>>>>>>> origin/Flashcars
=======
  premiumStats: () => [...adminKeys.all, "premium", "stats"] as const,
  premiumRequests: () => [...adminKeys.all, "premium", "requests"] as const,
  transactions: (page?: number, size?: number) => [...adminKeys.all, "payment", "transactions", page ?? 0, size ?? 20] as const,
  transactionsByUser: (accountId: string, page?: number, size?: number) => [...adminKeys.all, "payment", "transactions", "user", accountId, page ?? 0, size ?? 20] as const,
  transactionsByStatus: (status: string, page?: number, size?: number) => [...adminKeys.all, "payment", "transactions", "status", status, page ?? 0, size ?? 20] as const,
  planOptions: () => [...adminKeys.all, "payment", "plans"] as const,
  adminPlans: () => [...adminKeys.all, "plans", "admin"] as const,
};
>>>>>>> origin/final/demo-v1
