//#region src/features/admin/hooks/adminKeys.ts
var adminKeys = {
	all: ["admin"],
	dashboardStats: () => [
		...adminKeys.all,
		"dashboard",
		"stats"
	],
	dashboardActivity: () => [
		...adminKeys.all,
		"dashboard",
		"activity"
	],
	users: () => [...adminKeys.all, "users"],
	reportedFiles: () => [...adminKeys.all, "reported-files"],
	approvals: () => [...adminKeys.all, "approvals"],
	documents: (tab) => [
		...adminKeys.all,
		"documents",
		tab ?? "all"
	],
	deletedFiles: () => [
		...adminKeys.all,
		"trash",
		"files"
	],
	deletedAccounts: () => [
		...adminKeys.all,
		"trash",
		"accounts"
	],
	reportHistory: () => [...adminKeys.all, "report-history"],
	premiumStats: () => [
		...adminKeys.all,
		"premium",
		"stats"
	],
	premiumRequests: () => [
		...adminKeys.all,
		"premium",
		"requests"
	],
	transactions: (page, size) => [
		...adminKeys.all,
		"payment",
		"transactions",
		page ?? 0,
		size ?? 20
	],
	transactionsByUser: (accountId, page, size) => [
		...adminKeys.all,
		"payment",
		"transactions",
		"user",
		accountId,
		page ?? 0,
		size ?? 20
	],
	transactionsByStatus: (status, page, size) => [
		...adminKeys.all,
		"payment",
		"transactions",
		"status",
		status,
		page ?? 0,
		size ?? 20
	],
	planOptions: () => [
		...adminKeys.all,
		"payment",
		"plans"
	]
};
//#endregion
export { adminKeys as t };
