import { t as e } from "./useQuery-B1LFZ_NG.js";
import { t } from "./useMutation-DACFodZO.js";
import {
  _ as n,
  d as r,
  f as i,
  g as a,
  h as o,
  p as s,
} from "./index-CDVqwL1-.js";
var c = { all: [`folders`], detail: (e) => [`folders`, e] };
function l() {
  return e({ queryKey: c.all, queryFn: () => s.list() });
}
function u(t) {
  return e({
    queryKey: c.detail(t),
    queryFn: () => s.getById(t),
    enabled: !!t && t > 0,
  });
}
function d() {
  let e = n();
  return t({
    mutationFn: (e) => s.create(e),
    onSuccess: () => e.invalidateQueries({ queryKey: c.all }),
  });
}
function f() {
  let e = n();
  return t({
    mutationFn: ({ id: e, ...t }) => s.update(e, t),
    onSuccess: (t, n) => {
      (e.invalidateQueries({ queryKey: c.all }),
        e.invalidateQueries({ queryKey: c.detail(n.id) }));
    },
  });
}
function p() {
  let e = n();
  return t({
    mutationFn: (e) => s.delete(e),
    onSuccess: () => e.invalidateQueries({ queryKey: c.all }),
  });
}
var m = {
  all: [`documents`],
  byFolder: (e) => [`documents`, `folder`, e],
  detail: (e) => [`documents`, e],
  trash: [`documents`, `trash`],
};
function h() {
  return e({ queryKey: m.all, queryFn: () => r.list() });
}
function g(t) {
  return e({
    queryKey: m.byFolder(t),
    queryFn: () => r.listByFolder(t),
    enabled: !!t,
  });
}
function _(t) {
  let n = !!t;
  return (
    console.log(`[TRACE-4] useDocument id:`, t, `enabled:`, n),
    e({
      queryKey: m.detail(t),
      queryFn: () => (
        console.log(`[TRACE-5] queryFn executing for id:`, t),
        r.getById(t)
      ),
      enabled: n,
      refetchInterval: (e) =>
        e.state.data?.status === `processing`
          ? (console.log(`[Polling] Document is processing, polling every 3s`),
            3e3)
          : !1,
      refetchOnWindowFocus: (e) => e.state.data?.status === `processing`,
    })
  );
}
function v() {
  let e = n();
  return t({
    mutationFn: async (e) => {
      let t = await r.upload(e);
      return (await Promise.all(t.map((e) => o.processDocument(e.id))), t);
    },
    onSuccess: (t, n) => {
      (e.invalidateQueries({ queryKey: m.all }),
        n.folderId &&
          e.invalidateQueries({ queryKey: m.byFolder(n.folderId) }));
    },
  });
}
function y() {
  let e = n();
  return t({
    mutationFn: (e) => r.delete(e),
    onSuccess: () => e.invalidateQueries({ queryKey: m.all }),
  });
}
function b() {
  return t({ mutationFn: (e) => r.getDownloadUrl(e) });
}
function x() {
  return e({ queryKey: m.trash, queryFn: () => r.listTrash() });
}
function S() {
  let e = n();
  return t({
    mutationFn: (e) => r.restoreFromTrash(e),
    onSuccess: () => {
      (e.invalidateQueries({ queryKey: m.trash }),
        e.invalidateQueries({ queryKey: m.all }));
    },
  });
}
function C() {
  let e = n();
  return t({
    mutationFn: (e) => r.emptyTrash(e),
    onSuccess: () => {
      e.invalidateQueries({ queryKey: m.trash });
    },
  });
}
var w = {
  all: [`shared`],
  owned: [`shared-owned`],
  info: (e) => [`share-info`, e],
};
function T() {
  return e({ queryKey: w.all, queryFn: () => a.listSharedWithMe() });
}
function E() {
  return t({ mutationFn: (e) => a.report(e) });
}
function D() {
  return t({ mutationFn: (e) => o.ask(e) });
}
var O = { byDocument: (e) => [`flashcard`, `document`, e] };
function k(t) {
  return e({
    queryKey: O.byDocument(t),
    queryFn: () => i.listByDocument(t),
    enabled: !!t,
  });
}
function A() {
  let e = n();
  return t({
    mutationFn: (e) => i.generate(e),
    onSuccess: (t, n) => e.invalidateQueries({ queryKey: O.byDocument(n) }),
  });
}
function j() {
  return t({
    mutationFn: ({ flashcardId: e, status: t }) => i.updateProgress(e, t),
  });
}
export {
  x as _,
  _ as a,
  v as b,
  b as c,
  u as d,
  l as f,
  T as g,
  S as h,
  p as i,
  C as l,
  E as m,
  d as n,
  h as o,
  A as p,
  y as r,
  g as s,
  D as t,
  k as u,
  j as v,
  f as y,
};
