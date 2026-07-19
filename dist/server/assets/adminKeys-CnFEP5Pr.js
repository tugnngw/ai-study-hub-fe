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
	transactions: () => [
		...adminKeys.all,
		"payment",
		"transactions"
	],
	planOptions: () => [
		...adminKeys.all,
		"payment",
		"plans"
	],
	topUpMethods: () => [
		...adminKeys.all,
		"payment",
		"topup-methods"
	],
	bankInfo: () => [
		...adminKeys.all,
		"payment",
		"bank-info"
	]
};
//#endregion
export { adminKeys as t };
