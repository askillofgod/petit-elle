import { Phone, MessageCircle, CalendarHeart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/constants/site";

export function ReservationCtaSection() {
  return (
    <section className="relative section-pe bg-brown text-ivory">
      <div className="container-pe text-center">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-beige">
          Reservation
        </span>
        <h2 className="mx-auto mt-4 max-w-2xl text-section font-semibold text-ivory">
          지금 예약 가능한 시간을 확인해보세요
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-body text-ivory/75">
          온라인 예약을 통해 편리하게 예약 신청이 가능합니다. 예약 신청 후
          관리자의 확인을 거쳐 예약이 확정됩니다.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button href="/reservation" size="lg" className="bg-gold hover:bg-gold-dark">
            <CalendarHeart className="h-5 w-5" />
            온라인 예약하기
          </Button>
          <a
            href={SITE.social.kakao}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-[52px] items-center justify-center gap-2 rounded-pill border border-ivory/30 px-8 text-base font-medium text-ivory transition-colors hover:bg-ivory/10"
          >
            <MessageCircle className="h-5 w-5" />
            카카오 상담하기
          </a>
          <a
            href={SITE.phoneHref}
            className="inline-flex h-[52px] items-center justify-center gap-2 rounded-pill border border-ivory/30 px-8 text-base font-medium text-ivory transition-colors hover:bg-ivory/10"
          >
            <Phone className="h-5 w-5" />
            전화 상담하기
          </a>
        </div>
      </div>
    </section>
  );
}
