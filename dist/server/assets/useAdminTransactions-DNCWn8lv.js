import { t as paymentApi } from "./paymentApi-kco7ih9u.js";
import { t as adminKeys } from "./adminKeys-DApJpp5s.js";
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
