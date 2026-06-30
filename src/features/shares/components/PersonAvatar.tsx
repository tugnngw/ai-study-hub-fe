// src/features/shares/components/PersonAvatar.tsx
import type { SharePerson } from "../types/share.types";
import { avatarColor, initial } from "./avatar-utils";

export function PersonAvatar({ person, size = 28 }: { person: SharePerson; size?: number }) {
  const { name, avatarUrl } = person;
  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={name}
        title={name}
        className="rounded-full object-cover ring-2 ring-background shrink-0"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      className="inline-flex items-center justify-center rounded-full font-semibold text-[11px] text-foreground/70 ring-2 ring-background shrink-0"
      style={{ width: size, height: size, backgroundColor: avatarColor(name) }}
      title={name}
    >
      {initial(name)}
    </span>
  );
}
