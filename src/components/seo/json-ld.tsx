import { SITE } from "@/constants/site";

// LocalBusiness 구조화 데이터 — 검색 노출 강화 (SEO)
export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    name: SITE.name,
    alternateName: SITE.nameKo,
    description: SITE.description,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    image: `${SITE.url}/images/og/og-image.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address,
      addressLocality: "강북구",
      addressRegion: "서울특별시",
      addressCountry: "KR",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "11:00",
        closes: "21:00",
      },
    ],
    priceRange: "₩₩",
    sameAs: [SITE.social.instagram, SITE.social.blog, SITE.social.kakao],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
