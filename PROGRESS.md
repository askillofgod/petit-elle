# PROGRESS.md — Petit Elle 진행 상황

> 최신 항목이 위로 오도록 기록.

---

## 2026-06-07 (5차) — 완성도 감사 + 관리자 UX 개선

- 감사 문서 8종 작성(PROJECT_STATUS/AUDIT, ADMIN/RESERVATION_STATUS, SEO/ACCESSIBILITY/REFACTOR_REPORT, OPEN_ITEMS).
  - 항목별 DONE/PARTIAL/TODO 분류, Admin UI 92%·Function 70%·DB 0% 평가.
- 관리자 UX(Mock): 고객 검색/정렬, 프로그램 정렬, 슬롯 모두 가능/마감 토글.
- 코드 정리: 미사용 import 2건 제거, END_BY_START 중복 통합 → unused 0.
- 품질: typecheck 0 / lint 0 / build 30/30 / cf:build OK.
- 발견(향후): 골드 대비 AA 미달(결정 필요), 설정 저장 액션 미배선, 고객 상세 페이지 부재.

---

## 2026-06-07 (3차) — Mock 기반 V1 고도화 (Supabase 교체 용이 구조)

### 아키텍처
- UI → Server Action(zod 검증) → Service Layer → Mock(globalThis 공유) 구조 확립.
- 데이터 교체 지점은 `src/services/*` 내부뿐. UI/액션/검증/타입 불변.

### 구현
- Service Layer 6종 + Server Actions(예약/슬롯/프로그램) + zod 검증 스키마 작성.
- Mock 재구성(`src/lib/mock/*`) + 타입 확장(Admin/Notice/SiteSettings/BusinessHour/ActionResult 등).
- 예약 플로우 zod + createReservationAction 연결(로딩/에러), 완료페이지 예약번호 표시.
- 관리자 상세 액션바·프로그램·일정·설정 + 마이페이지 프로필을 액션/검증과 연결.
- 관리자/마이페이지 페이지를 서비스 경유로 마이그레이션.
- supabase: schema 보강 + seed.sql + SUPABASE_SETUP_GUIDE.md + .env.example 정리.

### 검증
- typecheck 0 / ESLint 0 / build 성공.
- **E2E(CDP)**: 예약 생성(서버액션)→완료 페이지(예약번호 PE…)→관리자 목록 반영 확인.

---

## 2026-06-07 (2차) — 전체 검수 + GitHub 백업 정책

### 전체 검수 완료 → `BUG_REPORT.md` 작성
- 29개 라우트 HTTP 점검(200/307/404 정상), typecheck 0, ESLint 0(.eslintrc 신규), build 성공.
- **CDP로 실제 390px 모바일 실측** → 전 페이지 가로 오버플로우 0건.
- 발견: Critical 0 / High 1 / Medium 2 / Low 다수 → 전부 수정 또는 처리.

### 수정 내역
- [High] Hero 풀블리드(`-mt-[72px]`), [M1] 미사용 card.tsx 삭제, [M2] 폰트 lint 경고 처리.
- [Low] 푸터 모바일 여백, 대시보드 truncate 보강, index.html/DS_Store/formatDuration 제거.
- 구형 headless 스크린샷의 가짜 오버플로우는 CDP 실측으로 무효 확인.

### GitHub 백업 정책 적용
- 원격 연결 확인: `origin = github.com/askillofgod/petit-elle.git`, main, 인증 정상.
- 정책: typecheck→build→add→commit→push, Conventional Commits.

---

## 2026-06-07

### 세션 재개 — 현황 분석 완료
- 맥 재부팅으로 종료된 세션 재개.
- **분석 결과:** `doc/` 기획 문서 15종은 완성되어 있으나, 실제 Next.js 구현은 미시작 상태였음.
  - 루트에 placeholder `index.html`, 한글 파일명 이미지 에셋 다수, 로고 SVG 2종 존재.
  - `package.json`, `src/`, `node_modules` 없음. 추적 문서(TODO/PROGRESS/DECISIONS/CHANGELOG) 미존재 → 신규 생성.
- 환경: Node v24.14.1, pnpm 11.5.2. 이미지 도구는 `sips`만 사용 가능.
- 기획 문서 정독 완료(개요/PRD/IA/시스템·DB·디자인·컴포넌트/페이지콘텐츠/관리자/에셋).

### 프로젝트 기반 구축 ✅
- Next.js 15 + TypeScript + Tailwind v3.4 수동 스캐폴딩 (configs, tsconfig, eslint).
- 의존성 설치(pnpm). `pnpm-workspace.yaml` allowBuilds로 sharp/unrs-resolver 빌드 승인.
- 디자인 시스템 토큰 전면 적용(컬러/타이포 clamp/spacing/radius/shadow) — `tailwind.config.ts`, `globals.css`.
- 폰트: Pretendard + Cormorant Garamond CDN 로딩.
- 이미지 18장 `sips`로 리사이즈·변환 후 `public/images/{hero,space,program,brand,og}` 배치(영문명).
- 타입(`src/types`), 상수(`site/programs/content`), 더미 데이터(`lib/dummy-data`) 정의.

### 홈페이지 (1순위) ✅
- 레이아웃: Header(스크롤 반응/모바일 드로어), Footer, FloatingActions(TopButton + 모바일 고정 예약바).
- 섹션 9종: Hero / BrandStory / Signature / Programs / Why / SpaceGallery / ReservationCTA / FAQ(Accordion) / Location.
- 공통 UI: Button/Card/Badge/Input/Textarea/Label/Accordion/Section/States/ReservationStatusBadge.

### 서브 페이지 ✅
- /programs, /programs/[slug](SSG), /space, /faq, /location, /login, /privacy, /terms, 404, error.

### 예약 시스템 UI (2순위) ✅
- /reservation: 5단계 Stepper 플로우(프로그램→날짜→시간→정보→확인) + 검증.
- 커스텀 ReservationCalendar(일요일 휴무/과거 비활성), TimeSlotSelector(결정적 더미 가용성).
- /reservation/complete 완료 페이지(쿼리 기반 요약).

### 마이페이지 ✅
- /mypage(→reservations 리다이렉트), 예약내역/상세/내정보.

### 관리자 페이지 (3순위) ✅
- (panel) 라우트 그룹 + Sidebar/Header. /admin 대시보드(StatCard+최근예약).
- 예약관리(검색/필터/승인·거절·완료·노쇼 액션+토스트), 예약상세(액션바).
- 일정관리(슬롯 토글/휴무 등록), 고객관리, 프로그램관리(노출토글/수정폼), 공지사항(CRUD), 설정, 관리자 로그인.

### Supabase 연동 준비 (4순위) ✅
- `.env.example`, `src/lib/supabase/client.ts` 스텁, Service Layer(`program`/`reservation`).
- `supabase/schema.sql`(10테이블+트리거), `supabase/rls.sql`(RLS 초안).

### SEO (5순위) ✅
- 루트 Metadata(title/description/OG/canonical/keywords), 페이지별 metadata.
- `sitemap.ts`, `robots.ts`, LocalBusiness JSON-LD.

### 성능/검증 (6순위) ✅
- next/image 전면 사용 + sharp 빌드. 폰트 preconnect.
- **타입체크 통과**, **프로덕션 빌드 성공**(전 라우트, 프로그램 SSG, 공유 JS ~105KB).

### 개발 서버
- 포트 **8080**, `-H 0.0.0.0`로 LAN 접속 허용. localhost/LAN 모두 200 확인.
