import { Heart, Sparkles, Leaf, type LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/ui/section";
import { WHY_FEATURES } from "@/constants/content";

const ICONS: Record<string, LucideIcon> = { Heart, Sparkles, Leaf };

export function WhySection() {
  return (
    <section className="section-pe bg-beige-light/40">
      <div className="container-pe">
        <SectionHeading eyebrow="Why Petit Elle" title="왜 Petit Elle일까요?" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {WHY_FEATURES.map((f) => {
            const Icon = ICONS[f.icon] ?? Sparkles;
            return (
              <div
                key={f.title}
                className="flex flex-col items-center rounded-card bg-white p-lg text-center shadow-card"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-beige-light text-gold">
                  <Icon className="h-7 w-7" strokeWidth={1.6} />
                </div>
                <h3 className="mt-5 text-card-title font-semibold text-brown">
                  {f.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
