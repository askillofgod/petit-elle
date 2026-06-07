import Image from "next/image";
import { Clock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { PROGRAMS } from "@/constants/programs";

export function SignatureSection() {
  const signature = PROGRAMS.find((p) => p.isSignature) ?? PROGRAMS[0];

  return (
    <section className="section-pe bg-beige-light/40">
      <div className="container-pe grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 lg:order-1">
          <span className="eyebrow">Petit Elle Signature Care</span>
          <h2 className="mt-4 font-serif text-section font-semibold text-brown">
            시그니처 케어
          </h2>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-2 text-sm text-muted">
              <Clock className="h-4 w-4 text-gold" /> 120분
            </span>
            <span className="text-2xl font-semibold text-gold">
              {formatPrice(signature.price)}
            </span>
          </div>
          <p className="mt-6 text-body text-muted">{signature.description}</p>
          <ul className="mt-6 space-y-3">
            {signature.benefits.map((b) => (
              <li key={b} className="flex items-start gap-3 text-brown">
                <Check className="mt-1 h-4 w-4 shrink-0 text-gold" />
                <span className="text-sm md:text-base">{b}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button href={`/reservation?program=${signature.slug}`} size="lg">
              예약하기
            </Button>
          </div>
        </div>
        <div className="relative order-1 aspect-[4/3] overflow-hidden rounded-image shadow-card lg:order-2">
          <Image
            src={signature.thumbnail}
            alt="Petit Elle 시그니처 케어 프라이빗 관리실"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
