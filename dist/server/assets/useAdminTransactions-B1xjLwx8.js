import { t as paymentApi } from "./paymentApi-BauICDwo.js";
import { t as adminKeys } from "./adminKeys-Zy-ojdDv.js";
import { useQuery } from "@tanstack/react-query";
//#region src/features/admin/hooks/useAdminTransactions.ts
function useAdminTransactions(page = 0, size = 20) {
	return useQuery({
		queryKey: adminKeys.transactions(page, size),
		queryFn: () => paymentApi.getAllTransactions(page, size)
	});
}
//#endregion
export { useAdminTransactions as t };
