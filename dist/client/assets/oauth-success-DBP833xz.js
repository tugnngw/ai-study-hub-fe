import { o as e } from "./chunk-CMxvf4Kt.js";
import { n as t, t as n } from "./jsx-runtime-D0Gpvp3q.js";
import { r } from "./api-BDRotG0l.js";
import { I as i, u as a } from "./index-CDVqwL1-.js";
import { t as o } from "./loader-circle-gML4jCQ4.js";
var s = e(t()),
  c = n();
function l() {
  let e = i(),
    { refresh: t } = a(),
    n = (0, s.useRef)(!1);
  return (
    (0, s.useEffect)(() => {
      n.current ||
        ((n.current = !0),
        (async () => {
          (console.log(`=============== OAUTH DEBUG ===============`),
            console.log(`Full URL:`, window.location.href),
            console.log(`Search params:`, window.location.search));
          let n = new URLSearchParams(window.location.search),
            i = n.get(`access_token`),
            a = n.get(`user_id`),
            o = n.get(`refresh_token`);
          (console.log(`Parsed parameters:`),
            console.log(
              `  accessToken:`,
              i ? `${i.substring(0, 20)}...` : `NULL`,
            ),
            console.log(
              `  refreshToken:`,
              o ? `${o.substring(0, 20)}...` : `NULL`,
            ),
            console.log(`  userId:`, a),
            console.log(`All URL parameters:`));
          for (let [e, t] of n.entries())
            console.log(`  ${e}: ${String(t).substring(0, 30)}...`);
          if (
            (console.log(`=========================================`),
            !i || !o || !a)
          ) {
            (console.error(
              `OAuth failed: Missing access token, refresh token, or user ID in URL.`,
            ),
              console.error(
                `Missing: ${i ? `` : `accessToken `}${o ? `` : `refreshToken `}${a ? `` : `userId`}`,
              ),
              e({ to: `/auth/login`, replace: !0 }));
            return;
          }
          (r.set(i),
            r.setRefresh(o),
            localStorage.setItem(`user_id`, a),
            console.log(`OAuth successful. Tokens and user ID stored.`));
          try {
            await t();
          } catch (t) {
            (console.error(`Failed to fetch user info after OAuth success:`, t),
              e({ to: `/auth/login`, replace: !0 }));
            return;
          }
          e({ to: `/dashboard`, replace: !0 });
        })());
    }, []),
    (0, c.jsx)(`div`, {
      className: `min-h-screen flex items-center justify-center bg-background`,
      children: (0, c.jsxs)(`div`, {
        className: `flex flex-col items-center gap-4`,
        children: [
          (0, c.jsx)(o, { className: `h-12 w-12 animate-spin text-primary` }),
          (0, c.jsx)(`p`, {
            className: `text-sm text-muted-foreground`,
            children: `Đang xử lý đăng nhập...`,
          }),
        ],
      }),
    })
  );
}
export { l as component };
