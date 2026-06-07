import { Badge, type BadgeProps } from "@/components/ui/badge";
import type { ReservationStatus } from "@/types";

// 디자인 시스템 25. Reservation Status Badge
const STATUS_MAP: Record<
  ReservationStatus,
  { label: string; variant: BadgeProps["variant"] }
> = {
  PENDING: { label: "승인 대기", variant: "warning" },
  APPROVED: { label: "예약 확정", variant: "success" },
  REJECTED: { label: "예약 거절", variant: "error" },
  CANCELLED: { label: "예약 취소", variant: "muted" },
  COMPLETED: { label: "방문 완료", variant: "default" },
  NO_SHOW: { label: "노쇼", variant: "error" },
};

export function ReservationStatusBadge({
  status,
}: {
  status: ReservationStatus;
}) {
  const { label, variant } = STATUS_MAP[status];
  return <Badge variant={variant}>{label}</Badge>;
}

export { STATUS_MAP };
