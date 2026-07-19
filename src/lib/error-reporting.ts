type ErrorReportOptions = {
<<<<<<< HEAD
  mechanism?: "manual" | "onerror" | "unhandledrejection" | "react_error_boundary";
=======
  mechanism?:
    | "manual"
    | "onerror"
    | "unhandledrejection"
    | "react_error_boundary";
>>>>>>> origin/Ai-Study-fix-folder-refactor
  handled?: boolean;
  severity?: "error" | "warning" | "info";
};

type ErrorReportingEvents = {
  captureException?: (
    error: unknown,
    context?: Record<string, unknown>,
    options?: ErrorReportOptions,
  ) => void;
};

declare global {
  interface Window {
    __errorReportingEvents?: ErrorReportingEvents;
  }
}

<<<<<<< HEAD
export function reportClientError(error: unknown, context: Record<string, unknown> = {}) {
=======
export function reportClientError(
  error: unknown,
  context: Record<string, unknown> = {},
) {
>>>>>>> origin/Ai-Study-fix-folder-refactor
  if (typeof window === "undefined") return;
  window.__errorReportingEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context,
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error",
    },
  );
}
