//#region src/features/payment/proration.ts
var CYCLE_DAYS = 30;
function remainingDaysUntil(expiresAt) {
	if (!expiresAt) return 0;
	const end = new Date(expiresAt).getTime();
	const now = Date.now();
	if (Number.isNaN(end) || end <= now) return 0;
	return Math.ceil((end - now) / 864e5);
}
function remainingValue(currentPrice, remainingDays) {
	return Math.round(currentPrice * remainingDays / CYCLE_DAYS);
}
/**
* Tính số tiền phải trả khi nâng cấp giữa chừng.
* @param current  gói hiện tại (giá 30 ngày)
* @param target   gói muốn nâng lên (giá 30 ngày)
* @param expiresAt thời điểm hết hạn của gói hiện tại
*/
function computeUpgrade(current, target, expiresAt) {
	const remainingDays = remainingDaysUntil(expiresAt);
	const rv = current ? remainingValue(current.price, remainingDays) : 0;
	return {
		remainingDays,
		remainingValue: rv,
		amountDue: Math.max(0, target.price - rv),
		daysCovered: remainingDays > 0 ? remainingDays : CYCLE_DAYS
	};
}
/**
* Mua mới theo số ngày người dùng chọn (không đổi gói — chỉ FREE → trả phí,
* hoặc gia hạn cùng gói). Giá = đơn giá/ngày * số ngày.
*/
function priceForDays(planPrice, days) {
	const daily = planPrice / CYCLE_DAYS;
	return Math.round(daily * days);
}
//#endregion
export { priceForDays as n, remainingDaysUntil as r, computeUpgrade as t };
