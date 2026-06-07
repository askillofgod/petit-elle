import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Accordion } from "@/components/ui/accordion";
import { ReservationCtaSection } from "@/components/sections/reservation-cta-section";
import { FAQS } from "@/constants/content";

export const metadata: Metadata = {
  title: "자주 묻는 질문",
  description: "Petit Elle 예약, 주차, 이용 안내 등 고객님이 자주 묻는 질문을 모았습니다.",
};

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        title="자주 묻는 질문"
        breadcrumbs={[{ label: "홈", href: "/" }, { label: "FAQ" }]}
      />
      <section className="section-pe bg-ivory">
        <div className="mx-auto max-w-3xl container-pe">
          <Accordion items={FAQS} />
        </div>
      </section>
      <ReservationCtaSection />
    </>
  );
}
