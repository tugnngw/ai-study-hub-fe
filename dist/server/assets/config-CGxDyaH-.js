var SEMESTERS = Array.from({ length: 9 }, (_, i) => i + 1);
var MB_PER_GB = 1024;
var mbToGb = (mb) => mb / MB_PER_GB;
function formatStorage(gb) {
	if (gb == null || Number.isNaN(gb)) return "—";
	if (gb < 1) return `${Math.round(gb * MB_PER_GB)} MB`;
	return `${Number.isInteger(gb) ? gb : Number(gb.toFixed(2))} GB`;
}
//#endregion
export { mbToGb as i, SEMESTERS as n, formatStorage as r, MB_PER_GB as t };
