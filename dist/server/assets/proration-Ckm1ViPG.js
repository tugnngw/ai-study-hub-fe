//#region src/features/payment/proration.ts
function remainingDaysUntil(expiresAt) {
	if (!expiresAt) return 0;
	const end = new Date(expiresAt).getTime();
	const now = Date.now();
	if (Number.isNaN(end) || end <= now) return 0;
	return Math.ceil((end - now) / 864e5);
}
function remainingValue(currentPrice, currentDurationDays, remainingDays) {
	const duration = currentDurationDays || 30;
	return Math.round(currentPrice * remainingDays / duration);
}
/**
* Tính số tiền phải trả khi nâng cấp giữa chừng.
* @param current  gói hiện tại 
* @param target   gói muốn nâng lên 
* @param expiresAt thời điểm hết hạn của gói hiện tại
*/
function computeUpgrade(current, target, expiresAt) {
	const remainingDays = remainingDaysUntil(expiresAt);
	const currentDuration = current?.durationDays || 30;
	const targetDuration = target.durationDays || 30;
	const rv = current ? remainingValue(current.price, currentDuration, remainingDays) : 0;
	return {
		remainingDays,
		remainingValue: rv,
		amountDue: Math.max(0, target.price - rv),
		daysCovered: targetDuration
	};
}
//#endregion
export { remainingDaysUntil as n, computeUpgrade as t };
