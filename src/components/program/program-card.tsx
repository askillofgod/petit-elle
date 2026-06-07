import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import type { Program } from "@/types";

export function ProgramCard({ program }: { program: Program }) {
  const durationLabel = program.durations.map((d) => `${d}분`).join(" / ");
  const priceLabel =
    program.durations.length > 1
      ? `${formatPrice(program.price)} ~`
      : formatPrice(program.price);

  return (
    <article className="group flex flex-col overflow-hidden rounded-card border border-line/60 bg-white shadow-card lift">
      <Link href={`/programs/${program.slug}`} className="relative block aspect-[4/3] overflow-hidden">
        <Image
          src={program.thumbnail}
          alt={`Petit Elle ${program.title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col p-md md:p-lg">
        <h3 className="text-card-title font-semibold text-brown">{program.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {program.shortDescription}
        </p>
        <div className="mt-4 flex items-center gap-2 text-sm text-muted">
          <Clock className="h-4 w-4 text-gold" />
          <span>{durationLabel}</span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-semibold text-gold">{priceLabel}</span>
          <Button
            href={`/reservation?program=${program.slug}`}
            variant="secondary"
            size="sm"
          >
            예약하기
          </Button>
        </div>
      </div>
    </article>
  );
}
