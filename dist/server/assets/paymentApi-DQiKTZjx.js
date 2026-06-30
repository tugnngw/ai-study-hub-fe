import { n as api } from "./api-WaaweWSf.js";
//#region src/features/admin/services/paymentApi.ts
var PLAN_OPTIONS = [{
	id: "PLUS",
	name: "Premium Plus",
	price: 99e3,
	tagline: "Phù hợp cho cá nhân học tập nghiêm túc",
	features: [
		"Lưu trữ 50 GB",
		"Tải lên không giới hạn",
		"Trợ lý AI cơ bản",
		"Không quảng cáo"
	]
}, {
	id: "PRO",
	name: "Premium Pro",
	price: 199e3,
	tagline: "Toàn bộ tính năng, dành cho người dùng chuyên sâu",
	features: [
		"Lưu trữ 200 GB",
		"Trợ lý AI nâng cao",
		"Ưu tiên xử lý",
		"Hỗ trợ 24/7",
		"Chia sẻ nhóm"
	],
	highlighted: true
}];
var TOP_UP_METHODS = [{
	id: "bank",
	category: "CHUYỂN KHOẢN",
	title: "Nạp qua ngân hàng ACB",
	description: "Chuyển khoản với nội dung — hệ thống tự động cộng tiền ngay sau 1 phút.",
	instant: true,
	recommended: true
}, {
	id: "card",
	category: "THẺ ĐIỆN THOẠI",
	title: "Nạp thẻ cào",
	description: "Hỗ trợ Viettel, Vinaphone, Mobifone, Zing, Garena – tự động cộng số dư.",
	instant: true
}];
var BANK_INFO = {
	bankName: "ACB Bank",
	bankShort: "ACB",
	accountName: "NGO THI HUYEN",
	accountNumber: "22554141",
	transferContent: "W23758B"
};
var paymentApi = {
	getTransactions: () => api("/api/payment/transactions"),
	getPlanOptions: () => Promise.resolve([...PLAN_OPTIONS]),
	getTopUpMethods: () => Promise.resolve([...TOP_UP_METHODS]),
	getBankInfo: () => Promise.resolve({ ...BANK_INFO })
};
//#endregion
export { paymentApi as t };
