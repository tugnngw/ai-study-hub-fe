type ErrorReportOptions = {
<<<<<<< HEAD
<<<<<<< HEAD
  mechanism?: "manual" | "onerror" | "unhandledrejection" | "react_error_boundary";
=======
=======
>>>>>>> origin/AI-Study-fix
  mechanism?:
    | "manual"
    | "onerror"
    | "unhandledrejection"
    | "react_error_boundary";
<<<<<<< HEAD
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
>>>>>>> origin/AI-Study-fix
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
<<<<<<< HEAD
export function reportClientError(error: unknown, context: Record<string, unknown> = {}) {
=======
=======
>>>>>>> origin/AI-Study-fix
export function reportClientError(
  error: unknown,
  context: Record<string, unknown> = {},
) {
<<<<<<< HEAD
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
>>>>>>> origin/AI-Study-fix
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
