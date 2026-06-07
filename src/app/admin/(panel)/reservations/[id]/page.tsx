import { notFound } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { ChevronLeft } from "lucide-react";
import { AdminCard } from "@/components/admin/admin-ui";
import { AdminReservationActions } from "@/components/admin/admin-reservation-actions";
import { DUMMY_RESERVATIONS } from "@/lib/dummy-data";

export const metadata = { title: "예약 상세" };

export default async function AdminReservationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const r = DUMMY_RESERVATIONS.find((x) => x.id === id);
  if (!r) notFound();

  const prettyDate = format(new Date(r.date), "yyyy년 M월 d일 (EEE)", { locale: ko });
  const createdAt = format(new Date(r.createdAt), "yyyy.MM.dd HH:mm");

  return (
    <>
      <Link
        href="/admin/reservations"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted hover:text-gold"
      >
        <ChevronLeft className="h-4 w-4" /> 예약 관리
      </Link>

      <h1 className="text-xl font-semibold text-brown md:text-2xl">
        예약 상세 <span className="ml-2 text-base font-normal text-muted">{r.reservationNumber}</span>
      </h1>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AdminCard title="예약 정보">
            <dl className="divide-y divide-line text-sm">
              <Row label="고객명" value={r.customerName} />
              <Row label="연락처" value={r.customerPhone} />
              <Row label="프로그램" value={r.programTitle} />
              <Row label="예약 날짜" value={prettyDate} />
              <Row label="예약 시간" value={r.time} />
              <Row label="요청사항" value={r.requestNote ?? "—"} />
              <Row label="신청일시" value={createdAt} />
            </dl>
          </AdminCard>
        </div>
        <div>
          <AdminReservationActions initialStatus={r.status} />
        </div>
      </div>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 px-5 py-4">
      <dt className="shrink-0 text-muted">{label}</dt>
      <dd className="text-right font-medium text-brown">{value}</dd>
    </div>
  );
}
