<<<<<<< HEAD
<<<<<<< HEAD
// TODO(backend): api<T>("/api/admin/premium...")
import type { PremiumRequestItem, PremiumStats, PremiumDecision } from "../types/admin.types";
const empty: PremiumStats = { totalPremiumUsers:0,totalPremiumTrend:0,pendingRequests:0,pendingRequestsTrend:0,revenueThisMonth:0,revenueTrend:0,expiredSubscriptions:0,expiredTrend:0 };
export const premiumApi = {
  getStats: (): Promise<PremiumStats> => Promise.resolve({ ...empty }),
  getRequests: (): Promise<PremiumRequestItem[]> => Promise.resolve([]),
  decide: (_id: number, _d: PremiumDecision): Promise<boolean> => Promise.resolve(true),
=======
=======
>>>>>>> origin/update/feature/AI/Quiz
import { api } from "@/lib/api";
import type { PremiumRequestItem, PremiumStats, PremiumDecision } from "../types/admin.types";
export const premiumApi = {
  getStats: () => api<PremiumStats>("/api/admin/premium/stats"),
  getRequests: () => api<PremiumRequestItem[]>("/api/admin/premium/requests"),
  decide: (id: number, decision: PremiumDecision) =>
    api<boolean>(`/api/admin/premium/requests/${id}/decision`, { method: "POST", body: { decision } }),
<<<<<<< HEAD
>>>>>>> origin/update/feature/share
=======
>>>>>>> origin/update/feature/AI/Quiz
};
