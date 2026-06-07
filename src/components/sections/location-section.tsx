import { MapPin, Phone, Clock, Car, Navigation } from "lucide-react";
import { SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { SITE } from "@/constants/site";

export function LocationSection() {
  const mapQuery = encodeURIComponent(`${SITE.address} ${SITE.name}`);
  const naverMap = `https://map.naver.com/v5/search/${mapQuery}`;

  return (
    <section className="section-pe bg-beige-light/40">
      <div className="container-pe">
        <SectionHeading eyebrow="Location" title="오시는 길" />
        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          {/* Map placeholder */}
          <div className="relative overflow-hidden rounded-image bg-beige-light shadow-card lg:col-span-3">
            <div className="flex aspect-[16/10] w-full flex-col items-center justify-center gap-3 text-brown/70">
              <MapPin className="h-10 w-10 text-gold" />
              <p className="text-sm">{SITE.address}</p>
              <p className="text-xs text-muted">지도는 실제 위치 확정 후 연동됩니다</p>
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-5 rounded-card bg-white p-lg shadow-card lg:col-span-2">
            <InfoRow icon={MapPin} label="주소">
              {SITE.address}
              <br />
              <span className="text-sm text-muted">{SITE.addressDetail}</span>
            </InfoRow>
            <InfoRow icon={Phone} label="전화">
              <a href={SITE.phoneHref} className="hover:text-gold">
                {SITE.phone}
              </a>
            </InfoRow>
            <InfoRow icon={Clock} label="운영시간">
              {SITE.businessHours}
              <br />
              <span className="text-sm text-muted">{SITE.closedDay}</span>
            </InfoRow>
            <InfoRow icon={Car} label="주차">
              {SITE.parking}
            </InfoRow>

            <div className="mt-2 flex flex-wrap gap-3">
              <a
                href={naverMap}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-pill bg-gold px-5 text-sm font-medium text-white hover:bg-gold-dark"
              >
                <Navigation className="h-4 w-4" /> 길찾기
              </a>
              <Button href={SITE.phoneHref} variant="secondary" className="flex-1">
                <Phone className="h-4 w-4" /> 전화하기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof MapPin;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.7} />
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-muted">
          {label}
        </p>
        <p className="mt-1 text-brown">{children}</p>
      </div>
    </div>
  );
}
