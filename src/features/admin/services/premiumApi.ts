// TODO(backend): api<T>("/api/admin/premium...")
import type { PremiumRequestItem, PremiumStats, PremiumDecision } from "../types/admin.types";
const empty: PremiumStats = { totalPremiumUsers:0,totalPremiumTrend:0,pendingRequests:0,pendingRequestsTrend:0,revenueThisMonth:0,revenueTrend:0,expiredSubscriptions:0,expiredTrend:0 };
export const premiumApi = {
  getStats: (): Promise<PremiumStats> => Promise.resolve({ ...empty }),
  getRequests: (): Promise<PremiumRequestItem[]> => Promise.resolve([]),
  decide: (_id: number, _d: PremiumDecision): Promise<boolean> => Promise.resolve(true),
};
