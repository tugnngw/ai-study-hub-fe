// =============================================================
// PLAN / SUBSCRIPTION
// =============================================================
export interface Plan {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  durationDays: number;
  storageGb: number;
  aiQuestions: number;
  flashcardLimit: number;     // 0: disabled, -1: unlimited, >0: limited count
  questionLimit: number;      // 0: disabled, -1: unlimited, >0: limited count  
  summaryLimit: number;       // 0: disabled, -1: unlimited, >0: limited count
  features?: string[];
  isPopular: boolean;
  displayOrder: number;
  isActive: boolean;
  tagline?: string | null;
  activeSubscriptionCount?: number;
}

export interface QuotaDetails {
  planName: string;
  storageGb: number;
  aiQuestions: number;
  flashcardLimit: number;
  questionLimit: number;
  summaryLimit: number;
  flashcardRemaining: number;  // -1: unlimited, 0: disabled/exceeded, >0: remaining count
  questionRemaining: number;
  summaryRemaining: number;
  subscriptionEndDate: string;
  status: "ACTIVE" | "NO_SUBSCRIPTION" | "NO_PLAN" | "EXPIRED";
}