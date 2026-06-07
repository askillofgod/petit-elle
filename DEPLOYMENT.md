# DEPLOYMENT.md — Petit Elle 배포 가이드 (Cloudflare Workers + OpenNext)

## 0. 한 줄 요약
이 앱은 **Next.js 15 App Router + Server Actions + 동적 SSR 라우트**를 쓰는 **SSR 앱**입니다.
→ **Cloudflare Pages 정적 배포(out / 단순 .next)로는 배포 불가.**
→ **`@opennextjs/cloudflare` 로 Cloudflare Workers 에 배포**합니다.

---

## 1. 왜 정적 배포(Cloudflare Pages static)가 안 되는가

- `next.config.mjs` 에 `output: 'export'` 없음 (의도적 — Server Actions 와 호환 불가).
- 빌드 산출물은 `out/` 이 아니라 `.next/` (SSR).
- 동적 SSR 라우트 존재: `/admin/reservations/[id]`, `/mypage/reservations/[id]`.
- Server Actions 존재: `src/app/actions/*`.

정적 프리셋으로 배포하면 페이지 HTML 이 참조하는 `/_next/static/css/*.css` 경로가
정적 서빙 경로와 어긋나 **CSS 가 404 → 무스타일 페이지**가 된다.
(로컬 `localhost:8080` 의 CSS 는 정상 — 문제는 배포 방식이었음.)

### 기존 Pages 프로젝트가 "예전 index.html" 을 보여주는 이유
- 최초 커밋(`a82dc14`)의 테스트용 `index.html` 이 루트에 있었고(현재는 삭제됨),
  기존 Cloudflare **Pages** 프로젝트가 **정적 프리셋**으로 그 시점의 산출물(또는 빈 정적 루트의
  `index.html`)을 캐시/서빙 중이기 때문이다.
- Pages 프로젝트는 SSR 산출물을 실행할 수 없어 최신 앱이 반영되지 않는다.
- **해결: 정적 Pages 배포를 중단하고 아래 Workers(OpenNext) 배포로 전환**한다.
  (기존 Pages 프로젝트는 삭제하거나 사용 중단. 커스텀 도메인은 새 Worker 로 이전.)

---

## 2. 구성 파일

| 파일 | 역할 |
|---|---|
| `open-next.config.ts` | OpenNext Cloudflare 어댑터 설정 (`defineCloudflareConfig`) |
| `wrangler.jsonc` | Worker 설정: `main=.open-next/worker.js`, `assets=.open-next/assets`, `nodejs_compat` |
| `next.config.mjs` | `initOpenNextCloudflareForDev()` 로 로컬 dev 에서 CF 컨텍스트 접근 |
| `package.json` scripts | `cf:build` / `preview` / `deploy` / `cf-typegen` |

빌드 산출물(`.open-next/`, `.vercel/`, `.wrangler/`)은 `.gitignore` 처리됨.

---

## 3. 명령어

```bash
# 로컬 개발 (일반 Next.js dev, 8080)
pnpm dev

# OpenNext 빌드만
pnpm cf:build            # = opennextjs-cloudflare build  → .open-next/ 생성

# 로컬 프로덕션 미리보기 (workerd 로 Worker 실행)
pnpm preview             # build + preview (기본 http://localhost:8787, 포트 변경: --port)

# 배포 (Cloudflare 계정 인증 필요)
pnpm deploy              # build + wrangler deploy
# 최초 1회: npx wrangler login

# (선택) 바인딩 타입 생성
pnpm cf-typegen
```

검증 완료(2026-06-07): `cf:build` 성공 → `.open-next/worker.js` + `.open-next/assets/_next/static/css/*.css` 생성,
`pnpm preview` 워커가 `/`, `/programs`, `/reservation`, `/admin*` 200 응답 + CSS 200 서빙 확인.

---

## 4. Cloudflare 대시보드 설정

### 방식 A — Git 연동 (권장, Workers Builds)
1. Cloudflare 대시보드 → **Workers & Pages → Create → Workers → Connect to Git**
2. 저장소 `askillofgod/petit-elle`, 브랜치 `main` 선택
3. Build 설정:
   - **Build command**: `pnpm cf:build` (또는 `npx opennextjs-cloudflare build`)
   - **Deploy command**: `npx wrangler deploy`
   - (Wrangler 가 `wrangler.jsonc` 를 읽어 `main`/`assets`/compat flags 적용)
4. **Settings → Variables**: `NEXT_PUBLIC_SITE_URL` 등 환경변수 등록
   (현재 Mock 기반이라 Supabase 키 없이도 동작)
5. 저장 후 첫 배포 실행 → `*.workers.dev` 주소 확인

### 방식 B — 로컬/CI 에서 직접 배포
```bash
npx wrangler login
pnpm deploy
```

### compatibility
- `compatibility_date`: `2025-03-25`
- `compatibility_flags`: `["nodejs_compat", "global_fetch_strictly_public"]` (wrangler.jsonc 에 설정됨)

---

## 5. GitHub 연결 시 주의사항
- `main` 브랜치 푸시마다 배포되도록 Workers Builds 연결.
- 빌드에 `pnpm` 사용 → CI 의 패키지 매니저를 pnpm 으로 인식하는지 확인(`pnpm-lock.yaml` 존재).
- `pnpm-workspace.yaml` 의 `allowBuilds`(esbuild/workerd/sharp) 가 빌드 스크립트 실행을 허용.
- `.env.local`/Secrets 는 커밋 금지. 환경변수는 대시보드에서 주입.

---

## 6. 도메인 전환 체크리스트
- [ ] 새 Worker 배포 성공(`*.workers.dev` 확인)
- [ ] 기존 Cloudflare **Pages** 프로젝트 사용 중단/삭제 (옛 index.html 출처)
- [ ] 커스텀 도메인을 새 Worker 라우트로 연결
- [ ] 배포 후 강력 새로고침 / 필요 시 CF 캐시 Purge

---

## 7. 추후 (Supabase 연동 시)
- `wrangler.jsonc` 에 환경변수/시크릿 추가 (`NEXT_PUBLIC_SUPABASE_URL` 등)
- 캐시(R2/KV)·ISR 필요 시 `open-next.config.ts` 에 incrementalCache 구성
- 자세한 내용은 `SUPABASE_SETUP_GUIDE.md` 참고
