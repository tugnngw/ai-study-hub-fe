// src/features/shares/components/ItemIcon.tsx
import { Folder } from "lucide-react";

// Chỉ chia sẻ folder -> icon thư mục.
export function ItemIcon() {
  return (
    <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
      <Folder className="h-4.5 w-4.5" />
    </div>
  );
}
