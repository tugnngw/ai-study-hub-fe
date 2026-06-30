import { t as e } from "./jsx-runtime-D0Gpvp3q.js";
import { t } from "./index-CDVqwL1-.js";
import { a as n } from "./queries-DL6sGd2E.js";
import { t as r } from "./skeleton-BEGUT5fr.js";
import { t as i } from "./document-workspace-B4uaRRMY.js";
var a = e();
function o() {
  let { id: e } = t.useParams();
  console.log(`[TRACE-1] Route param id:`, e, `type:`, typeof e);
  let o = e;
  console.log(`[TRACE-2] Converted docId:`, o, `isNaN:`, isNaN(o));
  let s = n(o);
  return s.isLoading
    ? (0, a.jsx)(r, { className: `h-[calc(100vh-8rem)] w-full` })
    : s.data
      ? (0, a.jsx)(i, { folderId: s.data.folderId || ``, docId: o })
      : (0, a.jsx)(`div`, {
          className: `text-sm text-muted-foreground`,
          children: `Document not found.`,
        });
}
export { o as component };
