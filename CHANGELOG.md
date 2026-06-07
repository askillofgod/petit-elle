# CHANGELOG — Petit Elle

본 프로젝트의 주요 변경 사항을 기록한다. 형식은 [Keep a Changelog](https://keepachangelog.com/ko/) 를 따른다.

## [Unreleased]

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
