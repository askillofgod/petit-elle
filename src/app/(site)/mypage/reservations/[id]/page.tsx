import { notFound } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { ChevronLeft } from "lucide-react";
import { ReservationStatusBadge } from "@/components/ui/reservation-status-badge";
import { Button } from "@/components/ui/button";
import { getReservation } from "@/services/reservation.service";

export const metadata = { title: "예약 상세" };

export default async function MyReservationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const reservation = await getReservation(id);
  if (!reservation) notFound();

  const prettyDate = format(new Date(reservation.date), "yyyy년 M월 d일 (EEE)", {
    locale: ko,
  });
  const canCancel =
    reservation.status === "PENDING" || reservation.status === "APPROVED";

  return (
    <div>
      <Link
        href="/mypage/reservations"
        className="inline-flex items-center gap-1 text-sm text-muted hover:text-gold"
      >
        <ChevronLeft className="h-4 w-4" /> 예약 내역
      </Link>

      <div className="mt-4 flex items-center justify-between">
        <h2 className="text-card-title font-semibold text-brown">예약 상세</h2>
        <ReservationStatusBadge status={reservation.status} />
      </div>

      <div className="mt-6 overflow-hidden rounded-card border border-line bg-white shadow-card">
        <dl className="divide-y divide-line text-sm">
          <Row label="예약번호" value={reservation.reservationNumber} />
          <Row label="프로그램" value={reservation.programTitle} />
          <Row label="예약 날짜" value={prettyDate} />
          <Row label="예약 시간" value={reservation.time} />
          <Row label="예약자" value={reservation.customerName} />
          <Row label="연락처" value={reservation.customerPhone} />
          {reservation.requestNote && (
            <Row label="요청사항" value={reservation.requestNote} />
          )}
        </dl>
      </div>

      {reservation.status === "PENDING" && (
        <p className="mt-4 rounded-input bg-beige-light/50 p-4 text-xs leading-relaxed text-muted">
          관리자 확인 후 예약이 확정됩니다. 확정 결과는 연락처로 안내드립니다.
        </p>
      )}

      <div className="mt-6 flex gap-3">
        <Button href="/reservation" variant="secondary">
          재예약하기
        </Button>
        {canCancel && (
          <Button variant="ghost" className="text-error hover:bg-error/10">
            예약 취소 요청
          </Button>
        )}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 px-md py-4">
      <dt className="shrink-0 text-muted">{label}</dt>
      <dd className="text-right font-medium text-brown">{value}</dd>
    </div>
  );
}
