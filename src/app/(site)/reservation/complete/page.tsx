import { Suspense } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { ReservationCompleteDetails } from "./details";

export const metadata = {
  title: "예약 신청 완료",
  robots: { index: false, follow: false },
};

export default function ReservationCompletePage() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-ivory py-xl">
      <div className="container-pe">
        <div className="mx-auto max-w-lg rounded-card bg-white p-lg text-center shadow-card md:p-xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/12">
            <CheckCircle2 className="h-9 w-9 text-success" strokeWidth={1.8} />
          </div>
          <h1 className="mt-6 text-card-title font-semibold text-brown">
            예약 신청이 완료되었습니다
          </h1>
          <p className="mt-3 text-body text-muted">
            관리자 확인 후 예약이 확정됩니다.
            <br />
            확정 결과는 입력하신 연락처로 안내드립니다.
          </p>

          <Suspense fallback={null}>
            <ReservationCompleteDetails />
          </Suspense>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex h-12 flex-1 items-center justify-center rounded-pill border border-gold px-6 text-base font-medium text-brown hover:bg-gold/10"
            >
              홈으로 이동
            </Link>
            <Link
              href="/mypage/reservations"
              className="inline-flex h-12 flex-1 items-center justify-center rounded-pill bg-gold px-6 text-base font-medium text-white hover:bg-gold-dark"
            >
              예약 내역 보기
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
