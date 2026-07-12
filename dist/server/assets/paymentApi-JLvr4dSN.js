import { n as api } from "./api-DeanpG7g.js";
//#region src/features/admin/services/paymentApi.ts
var PLAN_ID_MAP = {
	PRO: 2,
	PLUS: 3
};
var paymentApi = {
	adminGetPlans: () => api("/api/admin/plans"),
	adminUpdatePlan: (id, body) => api(`/api/admin/plans/${id}`, {
		method: "PUT",
		body
	}),
	getPlans: async () => {
		try {
			return await api("/api/plans");
		} catch {
			return await api("/api/admin/plans");
		}
	},
	getUpgradeQuote: (planId, days) => api(`/api/payment/quote?planId=${planId}&days=${days}`),
	createPaymentByDays: (planId, days) => api("/api/payment/create", {
		method: "POST",
		body: {
			planId,
			days
		}
	}),
	getPlanOptions: async () => {
		return (await api("/api/payment/plans")).filter((p) => p.name !== "Free" && p.name !== "Basic" && p.isActive).map((p) => {
			const isPremium = p.name === "Premium";
			return {
				id: isPremium ? "PLUS" : "PRO",
				name: p.name,
				price: p.price,
				tagline: p.description || "",
				features: [
					`Lưu trữ ${p.storageGb} GB`,
					p.aiQuestions > 9999 ? "Không giới hạn câu hỏi AI" : `${p.aiQuestions} câu hỏi AI`,
					isPremium ? "Hỗ trợ 24/7" : "Hỗ trợ ưu tiên",
					isPremium ? "Ưu tiên cao nhất" : "Xử lý nhanh"
				],
				highlighted: isPremium
			};
		});
	},
	createPayment: (planId) => api("/api/payment/create", {
		method: "POST",
		body: { planId: PLAN_ID_MAP[planId] || 2 }
	}),
	getTransactions: () => api("/api/payment/my-transactions"),
	getAllTransactions: (page = 0, size = 20) => api(`/api/admin/transactions?page=${page}&size=${size}`),
	getTransactionsByUser: (accountId, page = 0, size = 20) => api(`/api/admin/transactions/user/${accountId}?page=${page}&size=${size}`),
	getTransactionsByStatus: (status, page = 0, size = 20) => api(`/api/admin/transactions/status/${status}?page=${page}&size=${size}`)
};
//#endregion
export { paymentApi as t };
