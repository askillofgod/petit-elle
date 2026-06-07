# BUG_REPORT.md — Petit Elle 전체 검수 보고서

---

# 🔥 긴급 점검 (2026-06-07) — "CSS/Tailwind 전체 미적용" 신고 분석

## 결론: 로컬 코드는 정상. 원인은 **Cloudflare 배포 구성**.

### 1) 로컬 검증 — 정상 (코드 수정 불필요)
신고 증상(기본 브라우저 스타일, 파란 링크, Tailwind 전무)을 로컬에서 정밀 검증한 결과 **로컬은 완전 정상**:
- `src/app/layout.tsx` → `import "./globals.css";` 루트 레이아웃에 정상 위치 ✅
- `src/app/globals.css` 위치/내용 정상, `postcss.config.mjs`(tailwindcss+autoprefixer) 정상 ✅
- `tailwind.config.ts` content 경로(app/components/features) 정상 ✅
- `rm -rf .next && pnpm build` → CSS 청크 생성: `.next/static/css/adbcafc6bd772c99.css` (29.9KB)
  - 포함 확인: `.bg-gold{...rgb(184 141 122)}`, pill `9999px`, gold `#b88d7a`, preflight `border-box` ✅
- dev 서버: HTML에 `<link rel="stylesheet" href="/_next/static/css/app/layout.css">` 존재, 해당 CSS **200 / 43KB** 로드 ✅
- **헤드리스 스크린샷(/, /programs)**: 골드 pill 버튼·헤더·serif 타이틀·카드 radius/shadow·풀블리드 Hero 모두 정상 렌더, 링크 파란색 아님 ✅

→ **localhost:8080 의 CSS/Tailwind 는 문제 없음.**

### 2) 진짜 원인 — Cloudflare Pages 가 SSR 빌드를 정적으로 서빙
이 앱은 **Server Actions + 동적 라우트**를 쓰는 **SSR 앱**(`output:'export'` 아님, 산출물 `.next`).
CF Pages 를 정적 프리셋(예: 출력 디렉터리 `.next`/`out`)으로 배포하면:
- 페이지 HTML 은 `/_next/static/css/...` 를 참조하지만, 정적 서빙 경로 매핑이 어긋나 **CSS 가 404** → 페이지가 무스타일로 노출 (= 신고 증상과 정확히 일치).
- 프로젝트에 CF 어댑터 구성(`@cloudflare/next-on-pages`, `wrangler.toml`, `_routes.json`)이 **전무**했음.

### 3) 수정 — Cloudflare Workers + OpenNext 배포로 전환 (검증 완료)
> 최초에 `@cloudflare/next-on-pages`(Pages)로 구성해 검증했으나, 해당 패키지가 **deprecated**이고
> 사용자 지침에 따라 **공식 권장 `@opennextjs/cloudflare`(Workers)** 방식으로 최종 전환.

- `@opennextjs/cloudflare` + `wrangler` 설치, `pnpm-workspace.yaml` allowBuilds(esbuild/workerd) 승인.
- `open-next.config.ts`(`defineCloudflareConfig`), `wrangler.jsonc`(`main=.open-next/worker.js`,
  `assets=.open-next/assets`, `nodejs_compat`+`global_fetch_strictly_public`), `next.config.mjs`에
  `initOpenNextCloudflareForDev()` 추가.
- `package.json` 스크립트: `cf:build` / `preview` / `deploy` / `cf-typegen`. `.gitignore`에 `.open-next` 등 추가.
- **`pnpm cf:build` 성공** → 산출물 검증:
  - `.open-next/worker.js` 생성 ✅
  - `.open-next/assets/_next/static/css/adbcafc6bd772c99.css`(+`bg-gold` 포함) ✅
- **`pnpm preview`(workerd, 프로덕션 동등) 검증**:
  - `/`,`/programs`,`/reservation`,`/admin`,`/admin/reservations` 모두 **200** ✅
  - 워커가 CSS 를 `/_next/static/css/*.css` 로 **200(29.9KB, bg-gold 포함)** 서빙 ✅
  - 헤드리스 스크린샷: 골드 버튼·헤더·Hero 풀블리드 등 **완전 정상 렌더** ✅

### 4) Cloudflare 대시보드에서 적용할 설정 (배포 측 작업) — `DEPLOYMENT.md` 참고
- **방식 A (권장)**: Workers & Pages → Workers → Connect to Git → Build `pnpm cf:build`, Deploy `npx wrangler deploy`
- **방식 B**: `npx wrangler login && pnpm deploy`
- **기존 Pages 정적 프로젝트는 중단/삭제** (옛 index.html 출처). 커스텀 도메인을 새 Worker 로 이전.
- ⚠️ 본 환경엔 CF 계정/토큰이 없어 실제 배포·도메인 전환·캐시 Purge 는 사용자 측에서 진행.

### 검증 상태
- typecheck 0 / ESLint 0 / `next build` 성공 / **`cf:build`(OpenNext) 성공** / **`preview`(워커) CSS 서빙 + 라우트 200 + 스크린샷 정상**.

---

- 작성일: 2026-06-07
- 검수 범위: 전체 페이지/링크/타입/ESLint/빌드/모바일 반응형/예약 플로우/관리자/미사용 코드/SEO
- 검수 방법: 라우트 HTTP 점검(29개), `tsc --noEmit`, `next lint`, `next build`, Chrome DevTools Protocol(CDP) 기반 실측 + 스크린샷, 정적 참조 분석

---

## 0. 요약

| 항목 | 결과 |
|---|---|
| 전체 라우트 동작 | ✅ 29/29 정상 (200 / 307 리다이렉트 / 404 의도된 처리) |
| 깨진 import | ✅ 없음 (typecheck 통과로 보장) |
| TypeScript 에러 | ✅ 0건 |
| ESLint | ✅ 0 warning / 0 error (수정 후) |
| 빌드 | ✅ 성공 |
| 모바일 반응형(390px 실측) | ✅ 전 페이지 가로 오버플로우 0 |
| 예약 플로우 | ✅ 5단계 정상 동작 |
| 관리자 페이지 | ✅ 정상 (데스크탑/모바일) |
| 미사용 코드 | ⚠️ 일부 발견 → 정리 / 일부는 의도적 스캐폴딩 |
| SEO | ✅ 메타데이터/sitemap/robots/JSON-LD 정상 |

**결론: 자동 생성 과정에서 발생한 치명적(Critical) 버그는 없었음.** High 1건(Hero 풀블리드)·Medium 2건·Low 다수를 발견하여 모두 수정 또는 처리 완료.

---

## 1. 발견 이슈 및 우선순위별 처리

### 🔴 Critical — 0건
없음. (빌드/타입/라우트 모두 정상)

### 🟠 High — 1건 (수정 완료)

#### [H1] 홈 Hero가 고정 헤더 아래로 밀려 상단에 ivory 여백 발생 ✅ FIXED
- **증상:** `(site)/layout.tsx`의 `<main className="pt-[72px]">`로 인해 풀블리드여야 할 Hero가 72px 아래에서 시작 → 투명 헤더 뒤로 이미지가 차지 않고 상단에 베이지/아이보리 빈 띠가 생김. 디자인 사양("헤더가 Hero 위에 투명하게 오버레이, Hero 100vh") 위반.
- **원인:** 모든 페이지 공통 상단 패딩(72px)이 풀블리드 Hero에도 적용됨.
- **수정:** `hero-section.tsx` 섹션에 `-mt-[72px]` + `min-h-screen` 적용, 내부 콘텐츠는 `pt-[120px]`로 헤더 침범 방지. 다른 페이지는 기존 오프셋 유지.
- **검증:** 상단 스트립 재캡처로 이미지가 최상단까지 풀블리드되는 것 확인.

### 🟡 Medium — 2건 (수정 완료)

#### [M1] 미사용 컴포넌트 `ui/card.tsx` ✅ REMOVED
- **증상:** `Card/CardHeader/CardTitle/CardContent/CardFooter` 정의되었으나 참조 0건. (관리자 카드는 별도 `AdminCard` 사용)
- **수정:** `src/components/ui/card.tsx` 삭제. 깨진 import 없음 확인.

#### [M2] ESLint `@next/next/no-page-custom-font` 경고 ✅ RESOLVED
- **증상:** `layout.tsx`의 CDN 폰트 `<link>`에 대해 경고 발생.
- **판단:** App Router 루트 레이아웃의 `<link>`는 전역 적용되므로 사실상 오탐. 폰트 CDN 로딩은 의도된 결정(DECISIONS D-011, 빌드 네트워크 의존 회피).
- **수정:** 해당 블록에 의도 설명 주석 + `eslint-disable/enable` 적용 → lint 0 경고.

### 🟢 Low — 처리 완료 / 의도적 보존

#### [L1] 미사용 유틸 `formatDuration` ✅ REMOVED
- `lib/utils.ts`에서 참조 0건 → 삭제.

#### [L2] 루트 placeholder `index.html` 잔존 ✅ REMOVED
- App Router 사용으로 불필요한 옛 테스트 파일 → 삭제.

#### [L3] 스크린샷 아티팩트로 인한 "가로 오버플로우 오인" ✅ 검증/무효
- 구형 `chrome --headless --screenshot`이 최소 창 너비 ~500px를 강제하여, 414px 이미지가 500px 렌더의 좌측만 캡처 → 우측 잘림처럼 보였음.
- **CDP로 실제 390px 에뮬레이션 측정 결과 전 페이지 `scrollWidth == innerWidth`, 오버플로우 요소 0건.** 실제 반응형 버그 아님.
- 부수적으로 대시보드 최근예약 행에 `min-w-0`/`truncate` 방어 보강(긴 예약번호 대비).

#### [L4] 모바일 하단 고정 예약바가 푸터 카피라이트 가림 가능성 ✅ FIXED
- 푸터에 `pb-20 lg:pb-0` 추가로 하단 여백 확보.

#### [L5] 의도적 미사용 스캐폴딩 — 보존 (NOT a bug)
- `services/*`(program/reservation), `lib/supabase/client.ts`, 일부 스펙 타입(`ReservationSlot`, `SlotStatus`, `CreateReservationInput`), `generateReservationNumber` 등은 **Supabase 연동 단계용 의도적 선작성**. 빌드/런타임 영향 없음. `TODO.md`에 연동 작업으로 기록됨.

#### [L6] 일부 더미 이미지 품질 (NOT a bug)
- 아로마 테라피 카드 이미지(`program-aroma.jpg`)가 메뉴/문서형으로 약함. 실제 운영 이미지 확보 시 교체 권장 → `TODO.md` 백로그.

---

## 2. 항목별 상세 검수 결과

### 2-1. 전체 페이지 동작 (29 라우트)
- 공개: `/`, `/programs`, `/programs/[4종]`, `/space`, `/faq`, `/location`, `/login`, `/reservation`, `/reservation/complete`, `/privacy`, `/terms` → 전부 200
- 마이페이지: `/mypage`(307→reservations), `/reservations`, `/reservations/[id]`, `/profile` → 정상
- 관리자: `/admin`, `/admin/login`, `/reservations`(+[id]), `/calendar`, `/customers`, `/programs`, `/notices`, `/settings` → 전부 200
- SEO: `/sitemap.xml`, `/robots.txt` → 200
- 존재하지 않는 슬러그 `/programs/nonexistent` → 404 (정상 처리)

### 2-2. 깨진 import / TypeScript
- `pnpm typecheck` 통과(0 에러) → 모든 import 경로 유효, 타입 정합성 확보.

### 2-3. ESLint
- `.eslintrc.json`(next/core-web-vitals) 신규 설정. 수정 후 `✔ No ESLint warnings or errors`.

### 2-4. 모바일 반응형 (CDP 390px 실측)
- `/`, `/reservation`, `/programs`, `/space`, `/admin` 모두 `scrollWidth==390`, offenders 0.
- 헤더 햄버거/모바일 드로어, 스테퍼, 통계카드 2열, 하단 고정 예약바 정상.

### 2-5. 예약 플로우
- 5단계(프로그램→날짜→시간→정보→확인) 상태 전이, 필드 검증(이름/연락처/동의), 쿼리 기반 완료 페이지 정상.
- 캘린더: 일요일/과거 비활성. 시간슬롯: 결정적 더미 가용성.

### 2-6. 관리자
- 대시보드 통계/최근예약, 예약관리(검색·필터·승인/거절/완료/노쇼+토스트), 상세 액션바, 일정·고객·프로그램·공지·설정 정상.

### 2-7. SEO
- 루트 metadata(title/description/keywords/OG/canonical), 페이지별 metadata, `sitemap.ts`(정적+프로그램), `robots.ts`(admin/mypage disallow), LocalBusiness JSON-LD 적용.

---

## 3. 후속 작업 (TODO.md 반영)
- 실제 Supabase 연결, 카카오 OAuth, 예약 트랜잭션/슬롯 동시성
- 네이버 지도 임베드, Cloudflare Pages 배포, GA4
- 더미값(주소/전화/이메일/가격/이미지) 운영 실데이터 교체

---

## 4. 최종 빌드 상태
- 모든 수정 반영 후 `pnpm typecheck` ✅ / `pnpm build` ✅ (본 보고서 하단 커밋 기준)
