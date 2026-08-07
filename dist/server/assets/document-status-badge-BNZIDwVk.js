import { a as statusLabel, i as statusBadgeClasses } from "./DocumentViewer-BRNxCtPs.js";
import { t as Badge } from "./badge-CXVSNBvN.js";
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
