import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Clock, Check, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProgramCard } from "@/components/program/program-card";
import { PROGRAMS, getProgramBySlug } from "@/constants/programs";
import { formatPrice } from "@/lib/utils";

export function generateStaticParams() {
  return PROGRAMS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgramBySlug(slug);
  if (!program) return { title: "프로그램" };
  return {
    title: program.title,
    description: program.shortDescription,
    openGraph: { images: [{ url: program.thumbnail }] },
  };
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = getProgramBySlug(slug);
  if (!program) notFound();

  const others = PROGRAMS.filter((p) => p.slug !== slug).slice(0, 3);
  const durationLabel = program.durations.map((d) => `${d}분`).join(" / ");

  return (
    <>
      {/* Breadcrumb */}
      <div className="container-pe pt-lg">
        <nav className="flex items-center gap-1.5 text-xs text-muted">
          <Link href="/" className="hover:text-gold">홈</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/programs" className="hover:text-gold">프로그램</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-brown">{program.title}</span>
        </nav>
      </div>

      <section className="section-pe pt-lg">
        <div className="container-pe grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-image shadow-card">
            <Image
              src={program.thumbnail}
              alt={`Petit Elle ${program.title}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            {program.isSignature && (
              <span className="eyebrow">Signature Care</span>
            )}
            <h1 className="mt-3 text-section font-semibold text-brown">
              {program.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center gap-2 text-sm text-muted">
                <Clock className="h-4 w-4 text-gold" /> {durationLabel}
              </span>
              <span className="text-2xl font-semibold text-gold">
                {program.durations.length > 1
                  ? `${formatPrice(program.price)} ~`
                  : formatPrice(program.price)}
              </span>
            </div>
            <p className="mt-6 text-body text-muted">{program.description}</p>

            <h2 className="mt-8 text-card-title font-semibold text-brown">
              이런 분께 추천해요
            </h2>
            <ul className="mt-4 space-y-3">
              {program.benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-brown">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-gold" />
                  <span className="text-sm md:text-base">{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={`/reservation?program=${program.slug}`} size="lg">
                예약하기
              </Button>
              <Button href="/programs" variant="secondary" size="lg">
                목록으로
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Other programs */}
      <section className="section-pe bg-beige-light/40">
        <div className="container-pe">
          <h2 className="text-card-title font-semibold text-brown">
            다른 프로그램도 둘러보세요
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((p) => (
              <ProgramCard key={p.id} program={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
