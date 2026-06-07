# CHANGELOG — Petit Elle

본 프로젝트의 주요 변경 사항을 기록한다. 형식은 [Keep a Changelog](https://keepachangelog.com/ko/) 를 따른다.

## [Unreleased]

### 배포 확정 + 관리자 탐색 UX 강화 — 2026-06-07 (6차 세션)
#### Changed (배포 문서, workers.dev 확정)
- 최종 배포 전략 확정: Cloudflare Workers + OpenNext, 무료 `petit-elle.<계정>.workers.dev`.
  유료 도메인 미구매 → 기존 `petit-elle.pages.dev`(옛 Pages) 중단/삭제 대상으로 명시.
- `DEPLOYMENT.md` 갱신 + `CLOUDFLARE_ACTION_PLAN.md` 신규(대시보드 실행 순서).
- 정적 export 후퇴 금지 원칙 명문화(Server Actions·동적 라우트·관리자·예약 유지).
#### Changed (관리자 UX, Mock 범위)
- 예약관리: 상태 탭별 건수 배지, 프로그램 드롭다운 필터, 검색 지우기(X), "총 N건" 합계 + 필터 초기화.
- 고객관리: 세그먼트 필터(전체/단골5회+/일반), "총 N명" 합계.
- 프로그램관리: 프로그램명 검색, 상태 필터(전체/노출중/숨김), "총 N개" 합계, 빈 결과 안내.
#### Docs
- `ADMIN_STATUS.md`(Admin UI 92%→94%), `PROJECT_AUDIT.md` 관리자 항목 갱신.
#### Quality
- typecheck 0 / lint 0 / build 30 routes ✅.

### 완성도 감사 + UX 개선 — 2026-06-07 (5차 세션)
#### Added (문서 8종)
- `PROJECT_STATUS.md`, `PROJECT_AUDIT.md`, `ADMIN_STATUS.md`, `RESERVATION_STATUS.md`,
  `SEO_REPORT.md`, `ACCESSIBILITY_REPORT.md`, `REFACTOR_REPORT.md`, `OPEN_ITEMS.md`
#### Changed (관리자 UX, Mock 범위)
- 고객관리: 검색 + 정렬(예약많은순/최근방문/이름) — `AdminCustomersManager`
- 프로그램관리: 정렬(기본/가격↑↓/이름) 추가
- 일정관리: "모두 가능/모두 마감" 빠른 토글 추가
#### Fixed (코드 정리)
- 미사용 import 제거(`Plus`, `Button`), 중복 `END_BY_START`→`SLOT_END_BY_START` 통합
- noUnusedLocals/Parameters 0, ESLint 0, typecheck 0 확인

### Cloudflare 배포 전환 (OpenNext) — 2026-06-07 (4차 세션)
#### 분석
- 신고된 "CSS/Tailwind 전체 미적용"은 **로컬 정상**, **Cloudflare 정적 배포 오구성**이 원인 (BUG_REPORT 참고).
- 기존 Pages 정적 프로젝트가 옛 `index.html`/무스타일 노출.
#### Added
- **Cloudflare Workers + OpenNext 배포 구성**: `@opennextjs/cloudflare`, `open-next.config.ts`, `wrangler.jsonc`(nodejs_compat)
- `package.json`: `cf:build`/`preview`/`deploy`/`cf-typegen` 스크립트
- `next.config.mjs`: `initOpenNextCloudflareForDev()`
- **DEPLOYMENT.md** (정적 배포 불가 이유, 명령어, 대시보드 설정, 도메인 전환, 옛 index.html 원인)
#### Verified
- typecheck 0 / lint 0 / `next build` 성공
- `pnpm cf:build` → `.open-next/worker.js` + assets/_next/static/css(bg-gold) 생성
- `pnpm preview`(workerd) → 라우트 200 + CSS 200 서빙 + 스크린샷 정상 렌더

### Mock 기반 V1 고도화 — 2026-06-07 (3차 세션)
#### Added
- **Service Layer 6종**: `program`/`reservation`/`customer`/`admin`/`slot`/`settings` (Mock 반환, Supabase 시그니처 설계)
- **Server Actions**: createReservation / approve·reject·cancel·complete·noShow / createSlot·setHoliday / createProgram·updateProgram·setProgramActive (zod 검증 + `ActionResult`)
- **zod 검증 스키마**: 예약폼/예약생성/프로그램폼/고객프로필/슬롯 (`src/lib/validations/*`)
- Mock 데이터 재구성 `src/lib/mock/*` (programs/reservations/customers/slots/notices/settings/admins) + `mockStore`(globalThis 공유)
- 타입 확장: `Admin`/`Notice`/`SiteSettings`/`BusinessHour`/`DashboardStats`/`ActionResult`, 슬롯 필드 확장
- `supabase/seed.sql`, `SUPABASE_SETUP_GUIDE.md`
#### Changed
- 예약 플로우: 수동검증 → **zod 검증** + `createReservationAction` 호출(로딩/에러 UI), 완료 페이지에 예약번호 표시
- 관리자: 예약 상세 액션바·프로그램 관리·일정(슬롯) 관리·설정 저장을 **서버 액션/검증**과 연결, UX 보강
- 마이페이지 프로필을 zod 검증 클라이언트 폼으로 전환
- 관리자/마이페이지 서버 컴포넌트를 **Service Layer 경유**로 마이그레이션
- `schema.sql` programs: `duration_options`/`benefits`/`is_signature` 컬럼 추가
- `.env.example` 섹션화 정리
#### Removed
- 미사용 shim `lib/dummy-data.ts` (서비스로 대체)
#### Verified
- typecheck 0 / ESLint 0 / build 성공 / 예약 생성→관리자 반영 E2E(CDP) 통과

### 검수 & 수정 — 2026-06-07 (2차 세션)
#### Added
- `BUG_REPORT.md` 전체 검수 보고서 (Critical/High/Medium/Low)
- `.eslintrc.json` (next/core-web-vitals)
#### Fixed
- **[High] Hero 풀블리드**: 고정 헤더로 인한 상단 ivory 여백 제거 (`-mt-[72px]` + `min-h-screen`)
- **[Low] 모바일 푸터**: 하단 고정 예약바가 카피라이트 가리지 않도록 `pb-20` 추가
- **[Low] 대시보드 최근예약 행**: `min-w-0`/`truncate` 방어 보강
#### Removed
- 미사용 `ui/card.tsx`, 미사용 `formatDuration`, 옛 placeholder `index.html`, 잔여 `.DS_Store`
#### Verified
- typecheck 0 / ESLint 0 / build 성공 / CDP 390px 실측 전 페이지 오버플로우 0

### Added — 2026-06-07
- 프로젝트 추적 문서: `DECISIONS.md`, `TODO.md`, `PROGRESS.md`, `CHANGELOG.md`
- Next.js 15 + TypeScript + Tailwind v3.4 프로젝트 스캐폴딩 및 디자인 시스템 토큰
- Pretendard / Cormorant Garamond 폰트, 이미지 에셋 18종 `public/` 배치
- 레이아웃: Header, Footer, FloatingActions, PageHeader, Section
- 공통 UI: Button, Card, Badge, Input/Textarea/Label, Accordion, States(Empty), ReservationStatusBadge
- 홈페이지 섹션 9종(Hero/BrandStory/Signature/Programs/Why/SpaceGallery/CTA/FAQ/Location)
- 서브 페이지: /programs, /programs/[slug](SSG), /space, /faq, /location, /login, /privacy, /terms, 404, error
- 예약 시스템 UI: 5단계 Stepper 플로우, 커스텀 Calendar, TimeSlotSelector, 완료 페이지
- 마이페이지: 예약 내역/상세/내 정보
- 관리자: 대시보드, 예약 관리(액션/필터/검색), 예약 상세, 일정 관리, 고객 관리, 프로그램 관리, 공지사항, 설정, 로그인
- Supabase 준비: `.env.example`, client 스텁, Service Layer, `supabase/schema.sql`, `supabase/rls.sql`
- SEO: 메타데이터, `sitemap.ts`, `robots.ts`, LocalBusiness JSON-LD
- 개발 서버 포트 8080 + LAN(0.0.0.0) 접속 설정

### Changed — 2026-06-07
- `package.json` dev/start 스크립트 포트 8080 적용
- `.gitignore` Next.js/node 표준 항목 보강

### Fixed — 2026-06-07
- Header 활성 메뉴 비교 타입 오류 수정 (typecheck 통과)
- pnpm 빌드 스크립트 승인(`pnpm-workspace.yaml` allowBuilds)으로 `next dev` 기동 실패 해결
