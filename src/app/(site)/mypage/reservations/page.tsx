import { CalendarHeart } from "lucide-react";
import { EmptyState } from "@/components/ui/states";
import { ReservationListCard } from "@/components/reservation/reservation-list-card";
import { listMyReservations } from "@/services/reservation.service";

export const metadata = { title: "내 예약" };

export default async function MyReservationsPage() {
  const reservations = await listMyReservations();

  return (
    <div>
      <h2 className="text-card-title font-semibold text-brown">내 예약</h2>
      <p className="mt-1 text-sm text-muted">
        예약 신청 내역과 상태를 확인할 수 있습니다.
      </p>

      <div className="mt-6">
        {reservations.length === 0 ? (
          <EmptyState
            icon={CalendarHeart}
            title="아직 예약 내역이 없습니다."
            description="원하시는 프로그램으로 첫 예약을 신청해보세요."
            actionLabel="예약하러 가기"
            actionHref="/reservation"
          />
        ) : (
          <div className="space-y-4">
            {reservations.map((r) => (
              <ReservationListCard key={r.id} reservation={r} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
