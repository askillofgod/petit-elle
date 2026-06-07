# SEO_REPORT.md — SEO 최종 감사

- 작성일: 2026-06-07 · 범례: ✅ 적용 · ⚠️ 부분/개선여지 · ❌ 미적용

---

## 항목별

### metadata — ✅
- 루트 `app/layout.tsx`: `metadataBase`(SITE.url), title 템플릿(`%s | Petit Elle 쁘띠엘`), description, keywords, robots(index/follow), viewport(themeColor).
- 페이지별 `metadata` export: programs/space/faq/location/login/privacy/terms/reservation/mypage/admin 등 title·description 지정.
- 프로그램 상세: `generateMetadata`로 동적 title/description/OG.

### Open Graph — ✅
- 루트 OG: type/locale(ko_KR)/url/siteName/title/description + `og-image.jpg`(1200×630).
- 프로그램 상세: OG images = 프로그램 썸네일.
- ⚠️ 전용 OG 이미지(텍스트 포함 브랜드 OG)는 공간 사진 재사용 중 → 전용 제작 권장.

### robots.txt — ✅
- `app/robots.ts`: allow `/`, disallow `/admin`,`/mypage`,`/reservation/complete`, sitemap 링크.

### sitemap.xml — ✅
- `app/sitemap.ts`: 정적 9경로 + 프로그램 4경로, priority/changeFrequency 설정.

### structured data (JSON-LD) — ⚠️
- 홈에 `HealthAndBeautyBusiness`(이름/주소/전화/영업시간/지도가격대/sameAs) 적용.
- ⚠️ 개선여지: 프로그램에 `Service`/`Offer`, FAQ 페이지에 `FAQPage`, 사이트 `WebSite`(sitelinks searchbox) 스키마 추가 가능.

### canonical — ⚠️
- 루트에 `alternates.canonical = SITE.url` 적용.
- ⚠️ 페이지별 canonical 미지정(자동 파생 아님). 각 페이지 metadata에 `alternates: { canonical: '/path' }` 추가 권장(metadataBase 기준 절대경로화됨).

---

## 종합
| 항목 | 상태 |
|---|---|
| metadata | ✅ |
| Open Graph | ✅ (전용 OG 이미지 권장) |
| robots.txt | ✅ |
| sitemap.xml | ✅ |
| JSON-LD | ⚠️ (홈만, 확장 권장) |
| canonical | ⚠️ (페이지별 추가 권장) |
| H1/시맨틱 | ✅ 페이지당 H1 1개, 섹션 H2 |
| 이미지 alt | ✅ (ACCESSIBILITY_REPORT 참고) |

## 권장 개선 (오픈 전, 선택)
1. 페이지별 `alternates.canonical` 추가
2. 텍스트 포함 전용 OG 이미지 제작(`/images/og/og-image.jpg` 교체)
3. FAQPage / Service(Offer) JSON-LD 추가
4. 실제 도메인 확정 후 `SITE.url`·`NEXT_PUBLIC_SITE_URL` 갱신
5. GA4 / Search Console 등록(env: `GA_MEASUREMENT_ID`)
