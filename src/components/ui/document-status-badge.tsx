import { Badge } from "@/components/ui/badge";
import {
  statusLabel,
  statusBadgeClasses,
  type DocStatus,
} from "@/lib/document-status";

interface Props {
  status: string | null | undefined;
  className?: string;
}

/** Reusable status badge for documents. Shows color-coded label. */
export function DocumentStatusBadge({ status, className = "" }: Props) {
  return (
    <Badge className={`${statusBadgeClasses(status)} ${className}`}>
      {statusLabel(status)}
    </Badge>
  );
}
