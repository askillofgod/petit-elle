import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { ProgramCard } from "@/components/program/program-card";
import { ReservationCtaSection } from "@/components/sections/reservation-cta-section";
import { PROGRAMS } from "@/constants/programs";

export const metadata: Metadata = {
  title: "프로그램",
  description:
    "릴렉싱 바디 케어, 아로마 테라피, 페이스 케어, 시그니처 케어. Petit Elle의 프리미엄 힐링 프로그램을 만나보세요.",
};

export default function ProgramsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Programs"
        title="프로그램 안내"
        description="고객의 컨디션과 목적에 맞는 다양한 케어 프로그램을 제공합니다."
        breadcrumbs={[{ label: "홈", href: "/" }, { label: "프로그램" }]}
      />
      <section className="section-pe bg-ivory">
        <div className="container-pe grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROGRAMS.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      </section>
      <ReservationCtaSection />
    </>
  );
}
