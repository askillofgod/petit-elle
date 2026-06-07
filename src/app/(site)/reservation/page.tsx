import type { Metadata } from "next";
import { Suspense } from "react";
import { ReservationFlow } from "@/components/reservation/reservation-flow";

export const metadata: Metadata = {
  title: "온라인 예약",
  description: "Petit Elle 온라인 예약. 프로그램, 날짜, 시간을 선택하고 간편하게 예약하세요.",
};

export default function ReservationPage() {
  return (
    <section className="section-pe bg-ivory">
      <div className="container-pe">
        <div className="mb-10 text-center">
          <span className="eyebrow">Reservation</span>
          <h1 className="mt-3 text-section font-semibold text-brown">온라인 예약</h1>
          <p className="mt-3 text-body text-muted">
            예약 가능한 날짜와 시간을 선택해주세요.
          </p>
        </div>
        <Suspense fallback={<div className="py-20 text-center text-muted">불러오는 중...</div>}>
          <ReservationFlow />
        </Suspense>
      </div>
    </section>
  );
}
