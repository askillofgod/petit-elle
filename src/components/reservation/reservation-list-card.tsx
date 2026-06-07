import Link from "next/link";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Calendar, Clock, ChevronRight } from "lucide-react";
import { ReservationStatusBadge } from "@/components/ui/reservation-status-badge";
import type { Reservation } from "@/types";

export function ReservationListCard({ reservation }: { reservation: Reservation }) {
  const prettyDate = format(new Date(reservation.date), "yyyy년 M월 d일 (EEE)", {
    locale: ko,
  });

  return (
    <Link
      href={`/mypage/reservations/${reservation.id}`}
      className="flex items-center gap-4 rounded-card border border-line/70 bg-white p-md shadow-card transition-shadow hover:shadow-hover"
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <ReservationStatusBadge status={reservation.status} />
          <span className="text-xs text-muted">
            {reservation.reservationNumber}
          </span>
        </div>
        <h3 className="mt-2 font-semibold text-brown">
          {reservation.programTitle}
        </h3>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-gold" /> {prettyDate}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-gold" /> {reservation.time}
          </span>
        </div>
      </div>
      <ChevronRight className="h-5 w-5 shrink-0 text-muted" />
    </Link>
  );
}
