// src/features/shares/components/ItemIcon.tsx
import { Folder, FileText } from "lucide-react";

export function ItemIcon({ isDocument }: { isDocument?: boolean }) {
  if (isDocument) {
    return (
      <div className="h-9 w-9 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
        <FileText className="h-4.5 w-4.5" />
      </div>
    );
  }
  return (
    <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
      <Folder className="h-4.5 w-4.5" />
    </div>
  );
}
