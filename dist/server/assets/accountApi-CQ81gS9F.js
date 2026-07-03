import { n as api } from "./api-WaaweWSf.js";
//#region src/features/auth/services/accountApi.ts
var accountApi = { me: () => api("/api/account/me") };
//#endregion
export { accountApi as t };
