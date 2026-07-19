// Captures the original Error out-of-band so server.ts can recover the stack
// when h3 has already swallowed the throw into a generic 500 Response.

let lastCapturedError: { error: unknown; at: number } | undefined;
const TTL_MS = 5_000;

function record(error: unknown) {
  lastCapturedError = { error, at: Date.now() };
}

if (typeof globalThis.addEventListener === "function") {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  globalThis.addEventListener("error", (event) => record((event as ErrorEvent).error ?? event));
=======
  globalThis.addEventListener("error", (event) =>
    record((event as ErrorEvent).error ?? event),
  );
>>>>>>> origin/Ai-Study-fix-folder-refactor
=======
  globalThis.addEventListener("error", (event) =>
    record((event as ErrorEvent).error ?? event),
  );
>>>>>>> origin/AI-Study-fix
=======
  globalThis.addEventListener("error", (event) =>
    record((event as ErrorEvent).error ?? event),
  );
>>>>>>> origin/test/share-document-cloudinary
=======
  globalThis.addEventListener("error", (event) =>
    record((event as ErrorEvent).error ?? event),
  );
>>>>>>> origin/uichange
=======
  globalThis.addEventListener("error", (event) =>
    record((event as ErrorEvent).error ?? event),
  );
>>>>>>> origin/admin-added
=======
  globalThis.addEventListener("error", (event) =>
    record((event as ErrorEvent).error ?? event),
  );
>>>>>>> origin/update/feature/share
=======
  globalThis.addEventListener("error", (event) =>
    record((event as ErrorEvent).error ?? event),
  );
>>>>>>> origin/update/feature/AI/Quiz
=======
  globalThis.addEventListener("error", (event) =>
    record((event as ErrorEvent).error ?? event),
  );
>>>>>>> origin/Flashcards-fix
=======
  globalThis.addEventListener("error", (event) =>
    record((event as ErrorEvent).error ?? event),
  );
>>>>>>> origin/admin-added-fix
  globalThis.addEventListener("unhandledrejection", (event) =>
    record((event as PromiseRejectionEvent).reason),
  );
}

export function consumeLastCapturedError(): unknown {
  if (!lastCapturedError) return undefined;
  if (Date.now() - lastCapturedError.at > TTL_MS) {
    lastCapturedError = undefined;
    return undefined;
  }
  const { error } = lastCapturedError;
  lastCapturedError = undefined;
  return error;
}
