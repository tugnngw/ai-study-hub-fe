import { a as statusLabel, i as statusBadgeClasses } from "./DocumentViewer-Cuff7KT2.js";
import { t as Badge } from "./badge-B88iE6YQ.js";
import { jsx } from "react/jsx-runtime";
//#region src/components/ui/document-status-badge.tsx
/** Reusable status badge for documents. Shows color-coded label. */
function DocumentStatusBadge({ status, className = "" }) {
	return /* @__PURE__ */ jsx(Badge, {
		className: `${statusBadgeClasses(status)} ${className}`,
		children: statusLabel(status)
	});
}
//#endregion
export { DocumentStatusBadge as t };
