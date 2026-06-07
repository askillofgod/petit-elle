import Image from "next/image";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { GALLERY } from "@/constants/content";

export function SpaceGallerySection() {
  // 홈에서는 대표 6장만 노출
  const images = GALLERY.slice(0, 6);

  return (
    <section className="section-pe bg-ivory">
      <div className="container-pe">
        <SectionHeading
          eyebrow="Space"
          title="공간 소개"
          description="은은한 조명과 차분한 분위기 속에서 편안한 휴식을 경험해보세요. Petit Elle은 고객의 편안함을 최우선으로 생각합니다."
        />
        <div className="mt-12 grid auto-rows-[200px] grid-cols-2 gap-4 md:auto-rows-[240px] md:grid-cols-4">
          {images.map((img, i) => (
            <div
              key={img.src}
              className={cn(
                "relative overflow-hidden rounded-image shadow-card",
                // 첫 이미지를 크게
                i === 0 && "col-span-2 row-span-2"
              )}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button href="/space" variant="secondary" size="lg">
            공간 전체 보기
          </Button>
        </div>
      </div>
    </section>
  );
}
