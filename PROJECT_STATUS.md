# PROJECT_STATUS.md — Petit Elle 프로젝트 상태 (한눈에)

- 최종 업데이트: 2026-06-07
- 한 줄 요약: **Mock 기반 V1 완성. UI/플로우/관리자 동작. 실서비스 오픈은 Supabase 연동 + 인증 + 실데이터 필요.**

---

## ✅ 완료 (DONE)
- **홈페이지** 9개 섹션 + 반응형 + Hero 풀블리드
- **공개 페이지**: 프로그램(목록/상세 SSG), 공간, FAQ, 오시는길, 로그인(UI), 약관/개인정보, 404/error
- **예약 플로우** 5단계(zod 검증 + 서버 액션 + 완료/예약번호) — E2E 검증
- **마이페이지**: 예약 내역/상세/내 정보(검증 폼)
- **관리자**: 대시보드, 예약관리(검색·필터·상태 액션), 예약 상세, 일정관리(슬롯/휴무/빠른토글), 고객관리(검색·정렬), 프로그램관리(정렬·CRUD·노출), 공지, 설정
- **아키텍처**: Service Layer 6종 + Server Actions + zod, 도메인 타입 중앙화
- **SEO**: metadata/sitemap/robots/JSON-LD(홈)
- **디자인 시스템**: Tailwind 토큰, 폰트, 이미지 최적화(sharp)
- **배포 구성**: Cloudflare Workers + OpenNext (cf:build/preview 검증)
- **문서**: 기획 15종 + 상태/감사 문서 다수

## 🔄 진행중 / 부분 (PARTIAL)
- 설정 저장(더미 토스트 → 액션 배선 필요)
- 고객 취소 요청 버튼(미배선), 고객 상세 페이지(미구현)
- 프로그램 이미지 업로드(미구현)
- JSON-LD/canonical 확장, 전용 OG 이미지
- 접근성: 골드 대비(AA) 결정 대기

## ⏳ 남은 작업 (TODO — 오픈 핵심)
1. **Supabase 연동**: schema/seed/rls 적용 → services 내부 Mock→쿼리 교체
2. **인증**: 카카오 OAuth(고객) + 관리자 이메일 로그인 + `middleware`로 `/admin` 보호
3. **예약 트랜잭션**: 슬롯 동시성/중복 예약 방지(RPC)
4. **실데이터 교체**: 주소/전화/가격/이미지/도메인 (OPEN_ITEMS.md)
5. GA4 / Search Console, 약관 검토

---

## 📦 GitHub 상태
- 원격: `https://github.com/askillofgod/petit-elle.git` (branch `main`)
- 정책: 기능 단위/빌드 성공 후 commit+push (Conventional Commits)
- 최근 흐름: v1 UI+감사 → service/action/zod → OpenNext 전환 → 감사 문서/UX 개선
- 상태: 본 문서 커밋 시점 기준 동기화

## 🚀 배포 상태
- 방식: **Cloudflare Workers + OpenNext** (`@opennextjs/cloudflare`)
- 로컬 검증: `pnpm cf:build` ✅, `pnpm preview`(workerd) 라우트 200 + CSS 200 ✅
- 대시보드 작업 남음(계정 필요): Workers Git 연결, 환경변수, **기존 Pages 정적 프로젝트 정리**(옛 index.html 출처)
- ⚠️ 정적 배포(Pages static / `output:'export'`) **금지** — SSR 앱

## 🗄️ DB 상태
- 현재: **Mock**(`src/lib/mock/*`, globalThis 영속) — 서버 재시작 시 초기화
- 준비됨: `supabase/schema.sql`·`seed.sql`·`rls.sql`, `SUPABASE_SETUP_GUIDE.md`, `.env.example`
- 실제 연결: 미완 (URL/Key 확보 후 진행)

---

## 🧪 품질 게이트 (2026-06-07)
| 검사 | 결과 |
|---|---|
| `pnpm typecheck` | ✅ 0 |
| `pnpm lint` | ✅ 0 |
| `pnpm build` | ✅ (30/30) |
| `pnpm cf:build` (OpenNext) | ✅ |
| `pnpm preview` (워커 CSS/라우트) | ✅ |
| 미사용 코드 스캔 | ✅ 0 |

## 📚 문서 인덱스
- 기획: `doc/01~15`
- 상태/감사: `PROJECT_STATUS.md`(본 문서), `PROJECT_AUDIT.md`, `ADMIN_STATUS.md`, `RESERVATION_STATUS.md`, `SEO_REPORT.md`, `ACCESSIBILITY_REPORT.md`, `REFACTOR_REPORT.md`, `BUG_REPORT.md`
- 운영/연동: `OPEN_ITEMS.md`, `DEPLOYMENT.md`, `SUPABASE_SETUP_GUIDE.md`
- 추적: `TODO.md`, `PROGRESS.md`, `DECISIONS.md`, `CHANGELOG.md`
