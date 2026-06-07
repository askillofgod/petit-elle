# TODO.md — Petit Elle 작업 목록

> 상태: `[ ]` 미완료 · `[~]` 진행중 · `[x]` 완료
> 우선순위: P0(최우선) > P1 > P2

---

## P0 — 프로젝트 기반 ✅
- [x] Next.js 15 + TypeScript + Tailwind v3 수동 스캐폴딩
- [x] 의존성 설치 (pnpm) + 빌드 스크립트 승인
- [x] 디자인 시스템 토큰 적용 (컬러/폰트/spacing/radius/shadow)
- [x] 폰트 적용 (Pretendard, Cormorant Garamond)
- [x] 전역 레이아웃 (layout.tsx, globals.css)
- [x] 이미지 에셋 처리 및 public 배치
- [x] 더미 데이터 / 상수 / 타입 정의

## P0 — 홈페이지 (1순위) ✅
- [x] Header (데스크탑/모바일, 스크롤 동작)
- [x] Footer
- [x] HeroSection / BrandStory / SignatureProgram / Program(Card)
- [x] WhyPetitElle / SpaceGallery / ReservationCTA / FAQ / Location
- [x] TopButton / FloatingReservationButton

## P1 — 공통 UI 컴포넌트 ✅
- [x] Button / Card / Badge / Input / Textarea / Label / Accordion
- [x] EmptyState / ReservationStatusBadge / Section / Toast(관리자 인라인)
- [ ] Modal / Select / Tabs (현재 미사용 — 필요 시 추가)

## P1 — 서브 페이지 ✅
- [x] /programs + /programs/[slug] (SSG)
- [x] /space / /faq / /location / /login
- [x] /privacy / /terms / 404 / error

## P1 — 예약 시스템 UI (2순위) ✅
- [x] /reservation — 5단계 Stepper 플로우 + 검증
- [x] ProgramSelector / ReservationCalendar / TimeSlotSelector / Summary
- [x] /reservation/complete

## P1 — 마이페이지 ✅
- [x] /mypage / reservations / [id] / profile

## P1 — 관리자 페이지 (3순위) ✅
- [x] AdminLayout (Sidebar + Header)
- [x] /admin 대시보드 / /admin/login
- [x] /admin/reservations + [id] (필터/검색/액션)
- [x] /admin/calendar / customers / programs / notices / settings

## P2 — Supabase 연동 준비 (4순위) ✅
- [x] Service Layer 6종 (program/reservation/customer/admin/slot/settings)
- [x] Server Actions (예약/슬롯/프로그램) + zod 검증 스키마
- [x] Mock 재구성(src/lib/mock/*) + globalThis 공유 스토어
- [x] Supabase client 스텁 + .env.example 정리
- [x] DB 스키마 SQL(보강) + seed.sql + RLS 초안 + SUPABASE_SETUP_GUIDE.md

## 실제 Supabase 연결 시 작업 (URL/Key 확보 후) 🔌
- [ ] Supabase 프로젝트 생성, .env.local 설정
- [ ] schema.sql → seed.sql → rls.sql 적용
- [ ] `@supabase/supabase-js`, `@supabase/ssr` 설치 + client 구현 활성화
- [ ] services/* 내부 Mock → Supabase 쿼리 교체 (시그니처 유지), mockStore 제거
- [ ] 카카오 OAuth(Supabase Auth) + 관리자 인증 + `middleware.ts`(/admin 보호)
- [ ] 예약 생성 트랜잭션(RPC) + 슬롯 동시성(중복 예약 방지)
- [ ] (선택) Realtime 관리자 예약 목록

## P2 — SEO (5순위) ✅
- [x] Metadata API (페이지별 title/description/OG/canonical)
- [x] sitemap.ts / robots.ts / JSON-LD(LocalBusiness)
- [ ] 전용 OG 이미지(현재 공간 사진 재사용 → 텍스트 포함 전용 제작 권장)

## P2 — 성능 (6순위) ✅(기본)
- [x] next/image 최적화 + sharp / 폰트 preconnect
- [x] 프로덕션 빌드 성공 / 타입체크 통과
- [ ] 실측 Lighthouse 90+ 점검 (배포 후)

---

## 다음 단계 / 백로그
- [ ] 실제 Supabase 프로젝트 생성 → schema/rls 적용 → Service Layer 실연결
- [ ] 카카오 OAuth(Supabase Auth) 실연동, 관리자 인증/미들웨어 보호
- [ ] 예약 생성/상태변경 Server Action + 슬롯 동시성 제어(중복 방지)
- [ ] 네이버 지도 SDK 실제 임베드(/location)
- [ ] Cloudflare Pages 배포(@cloudflare/next-on-pages) + GA4/Search Console
- [ ] 임시값 확정: 주소/전화/이메일/가격(시그니처 159k vs 179k 운영자 확인)
- [ ] Modal/Select/Tabs 등 잔여 UI, 관리자 활동로그 화면
