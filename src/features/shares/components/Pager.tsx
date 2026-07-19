// src/features/shares/components/Pager.tsx
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Pager({
<<<<<<< HEAD
<<<<<<< HEAD
  page, totalPages, onChange,
}: { page: number; totalPages: number; onChange: (p: number) => void }) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const btn = "h-8 min-w-8 px-2 rounded-lg flex items-center justify-center text-sm transition-colors disabled:opacity-40 disabled:pointer-events-none";
  return (
    <div className="flex items-center justify-center gap-1.5 pt-1">
      <button className={cn(btn, "hover:bg-accent")} onClick={() => onChange(page - 1)} disabled={page === 1} aria-label="Trang trước">
=======
=======
>>>>>>> origin/final/demo-v1
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (p: number) => void;
}) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const btn =
    "h-8 min-w-8 px-2 rounded-lg flex items-center justify-center text-sm transition-colors disabled:opacity-40 disabled:pointer-events-none";
  return (
    <div className="flex items-center justify-center gap-1.5 pt-1">
      <button
        className={cn(btn, "hover:bg-accent")}
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Trang trước"
      >
<<<<<<< HEAD
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1
        <ChevronLeft className="h-4 w-4" />
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
<<<<<<< HEAD
<<<<<<< HEAD
          className={cn(btn, p === page ? "bg-gradient-brand text-white shadow-brand font-medium" : "hover:bg-accent text-muted-foreground")}
=======
=======
>>>>>>> origin/final/demo-v1
          className={cn(
            btn,
            p === page
              ? "bg-gradient-brand text-white shadow-brand font-medium"
              : "hover:bg-accent text-muted-foreground",
          )}
<<<<<<< HEAD
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1
        >
          {p}
        </button>
      ))}
<<<<<<< HEAD
<<<<<<< HEAD
      <button className={cn(btn, "hover:bg-accent")} onClick={() => onChange(page + 1)} disabled={page === totalPages} aria-label="Trang sau">
=======
=======
>>>>>>> origin/final/demo-v1
      <button
        className={cn(btn, "hover:bg-accent")}
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Trang sau"
      >
<<<<<<< HEAD
>>>>>>> origin/Flashcars
=======
>>>>>>> origin/final/demo-v1
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
