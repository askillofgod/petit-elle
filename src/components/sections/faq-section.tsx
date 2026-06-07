import { SectionHeading } from "@/components/ui/section";
import { Accordion } from "@/components/ui/accordion";
import { FAQS } from "@/constants/content";

export function FaqSection() {
  return (
    <section className="section-pe bg-ivory">
      <div className="container-pe">
        <SectionHeading eyebrow="FAQ" title="자주 묻는 질문" />
        <div className="mx-auto mt-12 max-w-3xl">
          <Accordion items={FAQS} />
        </div>
      </div>
    </section>
  );
}
