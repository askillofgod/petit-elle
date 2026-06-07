# DECISIONS.md — Petit Elle 기술 의사결정 기록

> 모든 주요/사소한 기술 결정을 기록한다. 날짜는 절대값으로 기록.

---

## 2026-06-07 — 프로젝트 재개 및 구현 착수

### D-001. 프로젝트 스캐폴딩 방식
- **결정:** `create-next-app` 대신 **수동 스캐폴딩**으로 Next.js 15 프로젝트 구성.
- **이유:** 루트에 기획 문서(`doc/`), 이미지 에셋, `index.html`이 이미 존재하여 `create-next-app`이 디렉터리 충돌로 중단됨. 버전·설정을 직접 통제하기 위함.

### D-002. 패키지 매니저
- **결정:** `pnpm` 사용 (04_SYSTEM_ARCHITECTURE.md 명시).

### D-003. Tailwind 버전
- **결정:** **Tailwind CSS v3.4** + 클래식 `tailwind.config.ts` + CSS 변수 토큰.
- **이유:** shadcn/ui 및 디자인 시스템(06)의 토큰 구조와 가장 안정적으로 호환. v4 대비 리스크 최소화.

### D-004. 배포 타깃과 렌더링 모드
- **결정:** v1에서는 **표준 Next.js(App Router) SSR/RSC** 유지. `output: 'export'` 정적 내보내기는 채택하지 않음.
- **이유:** 예약/관리자 인터랙션과 추후 Supabase Server Actions를 위해 서버 기능이 필요. Cloudflare Pages는 `@cloudflare/next-on-pages`로 SSR 지원. 배포 어댑터는 Supabase 연동 단계에서 확정.

### D-005. 데이터 소스
- **결정:** Supabase 연동 전까지 **더미 데이터**를 `src/lib/dummy-data.ts` 및 `src/constants`에 정의하고 Service Layer 인터페이스를 통해 주입.
- **이유:** 15_ASSET_GUIDE.md "텍스트는 현재 더미 데이터를 사용한다" 지침 준수. 추후 Supabase 교체 시 Service Layer만 변경.

### D-006. 이미지 처리
- **결정:** 루트의 한글 파일명 PNG 에셋을 macOS `sips`로 리사이즈 후 **영문 kebab/underscore 파일명**으로 `public/images/{hero,space,program,brand,og}`에 배치. (cwebp/magick 미설치 → 우선 최적화된 JPG/PNG, 추후 webp 변환 여지)
- **이유:** 15_ASSET_GUIDE.md 파일 네이밍·폴더 구조·SEO 규칙 준수.

### D-007. 폰트
- **결정:** 한글 **Pretendard**(CDN/`next/font` 로컬), 영문 액센트 **Cormorant Garamond**(`next/font/google`).
- **이유:** 06_DESIGN_SYSTEM.md 명시.

### D-008. 시그니처 케어 가격 불일치 처리
- **결정:** **179,000원 / 120분**으로 통일 (09_PAGE_CONTENT.md, 07_COMPONENT_SPEC.md 기준).
- **이유:** 01_PROJECT_OVERVIEW.md는 159,000원으로 기재되어 있으나 더 최신/구체 문서인 페이지 콘텐츠·컴포넌트 사양을 우선 적용. (임시 가격이므로 추후 운영자 확정 필요)

### D-009. 상태 관리
- **결정:** 예약 플로우 등 클라이언트 다단계 상태는 React `useState`/`useReducer` + URL 동기화 최소화. 전역 스토어(zustand 등)는 도입하지 않음(v1 범위 과함).

### D-010. 인증
- **결정:** v1 UI 단계에서는 카카오/관리자 로그인 **UI만 구현**, 실제 인증은 Supabase 연동 단계로 연기. 관리자/마이페이지는 더미 세션 가정으로 화면 구성.

### D-011. 폰트 로딩 방식
- **결정:** `next/font/google` 대신 **CDN `<link>`**(Pretendard jsDelivr, Cormorant Google Fonts).
- **이유:** 빌드 환경 네트워크 의존/실패 리스크 회피. `--font-*` CSS 변수로 Tailwind와 연결.

### D-012. 라우트 그룹 구조
- **결정:** 공개+마이페이지는 `app/(site)`(Header/Footer 포함), 관리자 대시보드는 `app/admin/(panel)`(사이드바 셸), 관리자 로그인은 `(panel)` 밖 `app/admin/login`에 배치.
- **이유:** 로그인 화면에 관리자 셸이 노출되지 않도록 레이아웃을 분리.

### D-013. pnpm 빌드 스크립트 승인
- **결정:** `pnpm-workspace.yaml`의 `allowBuilds`로 `sharp`, `unrs-resolver` 빌드 승인. `.npmrc`에 `verify-deps-before-run=false`.
- **이유:** pnpm 11은 미승인 빌드 스크립트가 있으면 `next dev` 사전 점검에서 install이 실패. sharp는 `next/image` 최적화에 사용.

### D-014. 개발 서버 포트/호스트 (사용자 요청)
- **결정:** dev/start 스크립트를 `next ... -H 0.0.0.0 -p 8080`로 설정.
- **이유:** 8080 사용 + 아이폰 등 동일 Wi-Fi 기기에서 LAN IP로 접속 가능하도록.

### D-015. ESLint 설정
- **결정:** `.eslintrc.json`에 `next/core-web-vitals` 적용.
- **이유:** `next lint`가 미설정 시 대화형 프롬프트로 중단됨. 표준 규칙으로 비대화형 검사 가능하게 함.

### D-016. 모바일 검증 방법 (CDP 실측)
- **결정:** 모바일 반응형은 구형 `chrome --headless --screenshot`(최소 창 ~500px 강제) 대신 **Chrome DevTools Protocol로 디바이스 메트릭(390px)을 오버라이드**하여 `scrollWidth/offenders`를 실측.
- **이유:** 구형 headless 스크린샷은 작은 폭을 클리핑해 가짜 오버플로우를 유발. CDP 실측이 정확.

### D-018. Mock ↔ DB 정합 & 매핑 전략
- **결정:** 앱은 camelCase 도메인 타입 사용, 서비스 레이어가 snake_case DB row ↔ 도메인 매핑 담당. `Program.durations`↔`duration_options`, `benefits`/`is_signature` 컬럼 schema 추가. `Reservation`/`Customer`는 조인·집계 뷰 모델로 명시.
- **이유:** UI를 건드리지 않고 서비스 내부만 교체하면 Supabase 전환 완료되도록.

### D-019. Server Actions + zod
- **결정:** 모든 변이는 `src/app/actions/*`("use server") → zod 검증 → 서비스 호출 → `ActionResult<T>` 반환. 폼 검증은 동일 zod 스키마(`src/lib/validations/*`)를 클라이언트/서버 공용.
- **이유:** 검증·에러 처리 일원화, 실제 연동 시 액션 시그니처 유지한 채 서비스 내부만 교체.

### D-020. Mock 공유 스토어 (globalThis)
- **결정:** Mock 변이 상태를 `globalThis.__PE_MOCK_STORE__`에 보관(`src/lib/mock/store.ts`).
- **이유:** Next dev에서 라우트별 서버 번들이 모듈 인스턴스를 분리 → 일반 모듈 변수는 라우트 간 공유 안 됨. 예약 생성이 관리자 목록에 즉시 반영되도록. **Mock 한정**, Supabase 연동 후 제거.

### D-021. 데이터 접근 경로 (constants/programs shim)
- **결정:** 클라이언트 컴포넌트의 동기 import 를 위해 `constants/programs.ts`는 `lib/mock/programs.mock`을 재export하는 shim 유지. 서버는 `program.service` 사용 권장.
- **이유:** 클라이언트에서 async 서비스 호출은 부적합 → 정적 프로그램 데이터는 동기 import 허용.

### D-017. GitHub 백업 정책 (사용자 요청)
- **결정:** 기능 단위/30분 이상 작업/빌드 성공 시 커밋, 푸시 순서는 `typecheck → build → git add → commit → push`. 커밋 메시지는 Conventional Commits(`feat:`/`fix:`/`refactor:` 등).
- **상태:** GitHub 원격 연결 확인됨 — `origin = https://github.com/askillofgod/petit-elle.git`, 브랜치 `main`, 인증 정상(ls-remote 성공).
