<<<<<<< HEAD
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/auth")({
  component: AuthLayout,
=======
import { createFileRoute, Outlet, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/auth")({
  component: AuthLayout,
  notFoundComponent: AuthNotFoundComponent,
>>>>>>> origin/test/share-document-cloudinary
});

function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-40">
        <div className="absolute top-0 -left-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 -right-32 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />
      </div>
      <div className="w-full max-w-md p-4">
        <Outlet />
      </div>
    </div>
  );
}
<<<<<<< HEAD
=======

function AuthNotFoundComponent() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-40">
        <div className="absolute top-0 -left-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 -right-32 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />
      </div>
      <div className="w-full max-w-md p-4 text-center">
        <h1 className="text-4xl font-bold text-foreground">404</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          This auth page doesn't exist.
        </p>
        <Link
          to="/auth/login"
          className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Back to login
        </Link>
      </div>
    </div>
  );
}
>>>>>>> origin/test/share-document-cloudinary
