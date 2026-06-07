import Link from "next/link";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import {
  CalendarCheck,
  Clock3,
  CheckCircle2,
  UserPlus,
  UserX,
  ChevronRight,
} from "lucide-react";
import { AdminPageTitle, AdminStatCard, AdminCard } from "@/components/admin/admin-ui";
import { ReservationStatusBadge } from "@/components/ui/reservation-status-badge";
import { getDashboardStats, listReservations } from "@/services/reservation.service";

export default async function AdminDashboardPage() {
  const [stats, reservations] = await Promise.all([
    getDashboardStats(),
    listReservations(),
  ]);
  const recent = reservations.slice(0, 6);

  return (
    <>
      <AdminPageTitle
        title="대시보드"
        description="오늘의 예약 현황을 한눈에 확인하세요."
      />

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <AdminStatCard label="오늘 예약" value={stats.todayReservations} icon={CalendarCheck} accent="gold" />
        <AdminStatCard label="승인 대기" value={stats.pending} icon={Clock3} accent="warning" />
        <AdminStatCard label="예약 완료" value={stats.completed} icon={CheckCircle2} accent="success" />
        <AdminStatCard label="신규 고객" value={stats.newCustomers} icon={UserPlus} accent="gold" />
        <AdminStatCard label="노쇼" value={stats.noShow} icon={UserX} accent="muted" />
      </div>

      {/* Recent reservations */}
      <div className="mt-6">
        <AdminCard>
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <h2 className="font-semibold text-brown">최근 예약</h2>
            <Link
              href="/admin/reservations"
              className="flex items-center gap-1 text-sm text-gold hover:underline"
            >
              전체보기 <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="divide-y divide-line">
            {recent.map((r) => (
              <Link
                key={r.id}
                href={`/admin/reservations/${r.id}`}
                className="flex items-center gap-4 px-5 py-4 hover:bg-beige-light/30"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="shrink-0 font-medium text-brown">{r.customerName}</span>
                    <span className="truncate text-xs text-muted">{r.reservationNumber}</span>
                  </div>
                  <p className="mt-0.5 truncate text-sm text-muted">
                    {r.programTitle} · {format(new Date(r.date), "M월 d일 (EEE)", { locale: ko })} {r.time}
                  </p>
                </div>
                <ReservationStatusBadge status={r.status} />
              </Link>
            ))}
          </div>
        </AdminCard>
      </div>
    </>
  );
}
