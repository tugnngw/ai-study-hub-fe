import { r as api } from "./api-716fJUbz.js";
//#region src/features/admin/services/paymentApi.ts
var paymentApi = {
	adminGetPlans: () => api("/api/admin/plans"),
	adminGetPlanById: (id) => api(`/api/admin/plans/${id}`),
	adminCreatePlan: (body) => api("/api/admin/plans", {
		method: "POST",
		body
	}),
	adminUpdatePlan: (id, body) => api(`/api/admin/plans/${id}`, {
		method: "PUT",
		body
	}),
	adminDeletePlan: (id) => api(`/api/admin/plans/${id}`, { method: "DELETE" }),
	adminRestorePlan: (id) => api(`/api/admin/plans/${id}/restore`, { method: "PATCH" }),
	getPlans: async () => {
		try {
			return await api("/api/plans");
		} catch {
			return await api("/api/admin/plans");
		}
	},
	getPlanOptions: async () => {
		return (await api("/api/payment/plans")).filter((p) => p.name !== "Free" && p.name !== "Basic" && p.isActive).map((p) => {
			const isPremium = p.name === "Premium";
			return {
				id: p.id,
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
		body: { planId }
	}),
	getMySubscription: () => api("/api/payment/my-subscription"),
	getTransactionStatus: (orderCode) => api(`/api/payment/status/${orderCode}`),
	getTransactions: () => api("/api/payment/my-transactions"),
	getAllTransactions: (page = 0, size = 20) => api(`/api/admin/transactions?page=${page}&size=${size}`),
	getTransactionsByUser: (accountId, page = 0, size = 20) => api(`/api/admin/transactions/user/${accountId}?page=${page}&size=${size}`),
	getTransactionsByStatus: (status, page = 0, size = 20) => api(`/api/admin/transactions/status/${status}?page=${page}&size=${size}`)
};
//#endregion
export { paymentApi as t };
