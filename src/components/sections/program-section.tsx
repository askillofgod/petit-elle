import { SectionHeading } from "@/components/ui/section";
import { ProgramCard } from "@/components/program/program-card";
import { Button } from "@/components/ui/button";
import { PROGRAMS } from "@/constants/programs";

export function ProgramSection() {
  return (
    <section className="section-pe bg-ivory">
      <div className="container-pe">
        <SectionHeading
          eyebrow="Programs"
          title="프로그램 안내"
          description="고객의 컨디션과 목적에 맞는 다양한 케어 프로그램을 제공합니다."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROGRAMS.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button href="/programs" variant="secondary" size="lg">
            전체 프로그램 보기
          </Button>
        </div>
      </div>
    </section>
  );
}
