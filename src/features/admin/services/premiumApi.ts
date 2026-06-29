import { api } from "@/lib/api";
import type { PremiumRequestItem, PremiumStats, PremiumDecision } from "../types/admin.types";
export const premiumApi = {
  getStats: () => api<PremiumStats>("/api/admin/premium/stats"),
  getRequests: () => api<PremiumRequestItem[]>("/api/admin/premium/requests"),
  decide: (id: number, decision: PremiumDecision) =>
    api<boolean>(`/api/admin/premium/requests/${id}/decision`, { method: "POST", body: { decision } }),
};
