import Image from "next/image";
import { Button } from "@/components/ui/button";

export function BrandStorySection() {
  return (
    <section className="section-pe bg-ivory">
      <div className="container-pe grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/5] overflow-hidden rounded-image shadow-card">
          <Image
            src="/images/brand/brand-tea.jpg"
            alt="Petit Elle 따뜻한 공간에서 차를 마시며 휴식하는 모습"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div>
          <span className="eyebrow">Brand Story</span>
          <h2 className="mt-4 text-section font-semibold text-brown">
            Petit Elle 이야기
          </h2>
          <div className="mt-6 space-y-5 text-body text-muted">
            <p>
              누군가를 위해 바쁘게 살아가는 시간 속에서 오롯이 나를 위한 휴식은
              점점 사라지고 있습니다.
            </p>
            <p>
              Petit Elle은 몸의 피로뿐만 아니라 마음까지 편안해질 수 있는
              프라이빗 힐링 공간을 만들고자 시작되었습니다.
            </p>
            <p>
              은은한 조명과 편안한 공간 속에서 당신만의 휴식 시간을 경험해보세요.
            </p>
          </div>
          <div className="mt-8">
            <Button href="/space" variant="ghost">
              공간 더 알아보기 →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
