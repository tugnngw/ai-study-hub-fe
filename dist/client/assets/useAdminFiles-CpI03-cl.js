import { t as e } from "./useQuery-B1LFZ_NG.js";
import { t } from "./useMutation-DACFodZO.js";
import { n } from "./api-BDRotG0l.js";
import { _ as r } from "./index-CDVqwL1-.js";
import { t as i } from "./adminKeys-C_-9jrwr.js";
var a = {
  getReportedFiles: () => n(`/api/admin/files/reported`),
  handleReportDecision: (e, t) =>
    n(`/api/admin/files/${e}/decision`, {
      method: `POST`,
      body: { decision: t },
    }),
  getDeletedFiles: () => n(`/api/admin/trash/files`),
  getDeletedAccounts: () => n(`/api/admin/trash/accounts`),
  permanentDelete: (e, t) =>
    n(`/api/admin/trash/${t}/${e}`, { method: `DELETE` }),
  restoreItem: (e, t) =>
    n(`/api/admin/trash/${t}/${e}/restore`, { method: `POST` }),
};
function o() {
  return e({
    queryKey: i.reportedFiles(),
    queryFn: () => a.getReportedFiles(),
  });
}
function s() {
  let e = r();
  return t({
    mutationFn: ({ id: e, decision: t }) => a.handleReportDecision(e, t),
    onSuccess: () => e.invalidateQueries({ queryKey: i.reportedFiles() }),
  });
}
function c() {
  return e({ queryKey: i.deletedFiles(), queryFn: () => a.getDeletedFiles() });
}
function l() {
  return e({
    queryKey: i.deletedAccounts(),
    queryFn: () => a.getDeletedAccounts(),
  });
}
function u() {
  let e = r();
  return t({
    mutationFn: ({ id: e, type: t }) => a.permanentDelete(e, t),
    onSuccess: () => {
      (e.invalidateQueries({ queryKey: i.deletedFiles() }),
        e.invalidateQueries({ queryKey: i.deletedAccounts() }));
    },
  });
}
function d() {
  let e = r();
  return t({
    mutationFn: ({ id: e, type: t }) => a.restoreItem(e, t),
    onSuccess: () => {
      (e.invalidateQueries({ queryKey: i.deletedFiles() }),
        e.invalidateQueries({ queryKey: i.deletedAccounts() }));
    },
  });
}
export { o as a, u as i, c as n, d as o, s as r, l as t };
