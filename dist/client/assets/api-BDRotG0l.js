var e = `http://localhost:4040`,
  t = `auth_token`,
  n = `refresh_token`,
  r = {
    get: () => (typeof window > `u` ? null : localStorage.getItem(t)),
    set: (e) => localStorage.setItem(t, e),
    clear: () => {
      (localStorage.removeItem(t), localStorage.removeItem(n));
    },
    getRefresh: () => (typeof window > `u` ? null : localStorage.getItem(n)),
    setRefresh: (e) => localStorage.setItem(n, e),
  },
  i = class extends Error {
    status;
    data;
    constructor(e, t, n) {
      (super(t), (this.status = e), (this.data = n));
    }
  },
  a = null;
async function o() {
  let t = r.getRefresh();
  if (!t) return !1;
  try {
    let n = await fetch(`${e}/api/auth/refresh`, {
      method: `POST`,
      headers: { "Content-Type": `application/json` },
      body: JSON.stringify({ refreshToken: t }),
    });
    if (!n.ok) return !1;
    let i = await n.json(),
      a = i?.data ?? i,
      o = a?.accessToken,
      s = a?.refreshToken;
    return o ? (r.set(o), s && r.setRefresh(s), !0) : !1;
  } catch {
    return !1;
  }
}
async function s(t, n = {}) {
  let s = async () => {
      let i = r.get();
      console.log(`🔑 api request`, {
        path: t,
        tokenPresent: !!i,
        tokenLength: i?.length,
      });
      let a = { ...(n.headers ?? {}) };
      i && (a.Authorization = `Bearer ${i}`);
      let o;
      return (
        n.formData
          ? (o = n.formData)
          : n.body !== void 0 &&
            ((a[`Content-Type`] = `application/json`),
            (o = JSON.stringify(n.body))),
        fetch(`${e}${t}`, { method: n.method ?? `GET`, headers: a, body: o })
      );
    },
    c = await s();
  if (c.status === 401)
    if (
      ((a ||= o().finally(() => {
        a = null;
      })),
      await a)
    )
      c = await s();
    else throw (r.clear(), new i(401, `Session expired. Please log in again.`));
  let l = (c.headers.get(`content-type`) ?? ``).includes(`application/json`)
    ? await c.json().catch(() => null)
    : null;
  if (!c.ok) {
    let e =
      (l && typeof l == `object` && `message` in l && String(l.message)) ||
      `Request failed (${c.status})`;
    throw new i(c.status, e, l);
  }
  return l?.data === void 0 ? l : l.data;
}
export { s as n, r, e as t };
