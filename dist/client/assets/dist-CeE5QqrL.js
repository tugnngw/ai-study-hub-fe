import { o as e } from "./chunk-CMxvf4Kt.js";
import { n as t } from "./jsx-runtime-D0Gpvp3q.js";
var n = e(t(), 1),
  r = globalThis?.document ? n.useLayoutEffect : () => {};
function i(e) {
  let t = n.useRef(e);
  return (
    n.useEffect(() => {
      t.current = e;
    }),
    n.useMemo(
      () =>
        (...e) =>
          t.current?.(...e),
      [],
    )
  );
}
export { r as n, i as t };
