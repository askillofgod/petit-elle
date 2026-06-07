import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/layout/page-header";
import { ReservationCtaSection } from "@/components/sections/reservation-cta-section";
import { GALLERY } from "@/constants/content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "공간 소개",
  description:
    "은은한 조명과 차분한 분위기. Petit Elle의 프라이빗 힐링 공간을 만나보세요. 리셉션, 관리실, 휴식 공간까지.",
};

export default function SpacePage() {
  return (
    <>
      <PageHeader
        eyebrow="Space"
        title="공간 소개"
        description="은은한 조명과 차분한 분위기 속에서 편안한 휴식을 경험해보세요. Petit Elle은 고객의 편안함을 최우선으로 생각합니다."
        breadcrumbs={[{ label: "홈", href: "/" }, { label: "공간소개" }]}
      />

      <section className="section-pe bg-ivory">
        <div className="container-pe">
          <div className="grid auto-rows-[220px] grid-cols-2 gap-4 md:auto-rows-[260px] md:grid-cols-3">
            {GALLERY.map((img, i) => (
              <div
                key={img.src}
                className={cn(
                  "relative overflow-hidden rounded-image shadow-card",
                  i === 0 && "col-span-2 row-span-2"
                )}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 분위기 카피 */}
      <section className="section-pe bg-beige-light/40">
        <div className="container-pe grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden rounded-image shadow-card">
            <Image
              src="/images/brand/brand-interior.jpg"
              alt="Petit Elle 따뜻한 인테리어 디테일"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <span className="eyebrow">Atmosphere</span>
            <h2 className="mt-4 text-section font-semibold text-brown">
              온전히 나를 위한 시간
            </h2>
            <div className="mt-6 space-y-5 text-body text-muted">
              <p>
                웜 베이지와 아이보리 톤으로 채워진 공간은 들어서는 순간부터
                마음을 편안하게 합니다.
              </p>
              <p>
                은은한 간접조명과 자연광이 어우러진 프라이빗 룸에서, 누구의
                방해도 받지 않는 온전한 휴식을 누려보세요.
              </p>
              <p>
                Petit Elle은 마사지샵이 아닌, 당신을 위한 작은 힐링 스튜디오입니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ReservationCtaSection />
    </>
  );
}
