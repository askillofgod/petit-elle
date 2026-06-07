import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SITE } from "@/constants/site";

export function HeroSection() {
  return (
    <section className="relative -mt-[72px] min-h-screen w-full overflow-hidden">
      {/* 배경 이미지 + 오버레이 */}
      <Image
        src="/images/hero/hero-main.jpg"
        alt="Petit Elle 프라이빗 힐링 공간에서 휴식하는 여성 고객"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ivory/95 via-ivory/70 to-ivory/20 md:to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-ivory/60 to-transparent md:from-ivory/10" />

      {/* 콘텐츠 */}
      <div className="container-pe relative flex min-h-screen items-center">
        <div className="max-w-xl animate-fade-up pb-24 pt-[120px]">
          <span className="eyebrow">{SITE.eyebrow}</span>
          <h1 className="mt-4 text-hero font-medium leading-tight text-brown">
            <span className="block">그녀를 위한</span>
            <span className="block">작은 휴식 공간</span>
            <span className="mt-2 block font-serif text-gold">Petit Elle</span>
          </h1>
          <p className="mt-6 max-w-md text-body text-muted">
            바쁜 일상 속에서 잠시 멈추고, 온전히 나를 위한 시간을 가져보세요.
            따뜻한 공간과 섬세한 케어로 몸과 마음의 균형을 찾아드립니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/reservation" size="lg">
              온라인 예약하기
            </Button>
            <Button href="/programs" variant="secondary" size="lg">
              프로그램 보기
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
