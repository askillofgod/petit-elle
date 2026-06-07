# CLOUDFLARE_ACTION_PLAN.md — Petit Elle 배포 실행 계획 (A안 확정)

> **최종 전략(확정 2026-06-07): 갈래 A — Cloudflare Workers + OpenNext**, 무료 `*.workers.dev`.
> 근거/대안 비교: `CLOUDFLARE_REALITY_CHECK.md` · 배포 원리: `DEPLOYMENT.md`
> 코드/설정 작업은 완료 — 남은 것은 **Cloudflare 대시보드 작업**뿐이다.

---

## 0. 결론 (한눈에)

| 항목 | 값 |
|---|---|
| 배포 방식 | `@opennextjs/cloudflare` → Cloudflare **Workers** (`wrangler deploy`) |
| Worker 이름 | `petit-elle` (`wrangler.jsonc` 의 `name`) |
| **최종 운영 주소** | **`https://petit-elle.<계정명>.workers.dev`** |
| `<계정명>` | 계정 서브도메인(계정당 1개). 대시보드 Workers & Pages 에서 확인/설정 |
| 유료 커스텀 도메인 | **구매 안 함** (workers.dev 가 곧 운영 주소) |
| `petit-elle.pages.dev` | **주소 포기.** Pages 프로젝트는 **Git 연동 해제**만(삭제는 나중 선택) |
| 유지하는 기능 | Server Actions · 동적 라우트 · 관리자 · 예약 (SSR) |

---

## 1. 불변 원칙 (A안 가드레일)

- ❌ `output: 'export'` 추가 금지 (정적화 시 SSR/Server Actions 붕괴).
- ❌ `@cloudflare/next-on-pages` 회귀 금지 (B안 — pages.dev 보존용이나 채택 안 함).
- ❌ Pages 프로젝트 **삭제 강제 금지** — 우선 **Git 연동 해제**만. 삭제는 사용자가 나중에.
- ✅ 주소는 `workers.dev` 로 바뀌어도 무방. **기능 100% 유지가 최우선**.

---

## 2. 사전 확인 (이미 완료된 코드 작업)

- [x] `@opennextjs/cloudflare` + `wrangler` 설치 (Workers 어댑터)
- [x] `open-next.config.ts` — `defineCloudflareConfig`
- [x] `wrangler.jsonc` — `name=petit-elle`, `main=.open-next/worker.js`,
      `assets=.open-next/assets`, `nodejs_compat` + `global_fetch_strictly_public`
- [x] `next.config.mjs` — `initOpenNextCloudflareForDev()`
- [x] scripts: `cf:build` / `preview` / `deploy` / `cf-typegen`
- [x] 로컬 검증: `pnpm preview` 로 `/`, `/programs`, `/reservation`, `/admin*` 200 + CSS 200

---

## 3. 실행 순서 — 대시보드 클릭 단위

> 순서 중요: **STEP A(Pages 연동 해제) → STEP B(Workers 연결·배포) → STEP C(검증)**.
> A 를 먼저 해야 같은 repo 가 Pages·Workers 양쪽에서 동시 빌드되는 혼선을 막는다.

### STEP A — 기존 Pages 프로젝트 `petit-elle` 의 **Git 연동 해제** (삭제 아님)

목표: push 마다 도는 **깨진 Pages 자동배포를 멈춘다.** 프로젝트 자체는 남긴다.

1. 브라우저에서 **https://dash.cloudflare.com** 로그인.
2. 좌측 메뉴 **Workers & Pages** 클릭.
3. 목록에서 **`petit-elle`** 중 **타입이 `Pages` 인 항목** 클릭.
   (같은 이름의 Worker 가 아직 없을 수 있음. 여기선 **Pages** 배지가 붙은 것.)
4. 상단 탭 **Settings** 클릭.
5. **Builds & deployments**(또는 **Build**) 섹션으로 스크롤.
6. **Git repository / Git integration** 항목에서 **`Disconnect`**(연동 해제) 클릭.
   - 확인 팝업이 뜨면 **Disconnect** 재확인.
   - ※ 이 동작은 빌드 자동화만 끊는다. 기존 배포물/프로젝트는 남는다.
7. (해제 후) 이제부터 GitHub `main` 에 push 해도 **이 Pages 프로젝트는 빌드되지 않는다.**

> 만약 `Disconnect` 버튼이 안 보이면: **Settings → Builds & deployments → Branch control**
> 에서 **Automatic deployments 를 Disabled** 로 바꿔도 동일하게 자동배포가 멈춘다.
> (둘 중 가능한 쪽으로 하면 됨.)

> 삭제를 원할 때(나중에, 선택): Pages 프로젝트 → **Settings → 맨 아래 Delete project**.

### STEP B — **Workers** 새로 만들고 GitHub 연결 + 첫 배포

1. **Workers & Pages → 우측 상단 `Create`(또는 `Create application`)** 클릭.
2. **`Workers`** 탭 선택 → **`Connect to Git`**(또는 "Import a repository") 클릭.
   - 처음이면 **GitHub 앱 설치/권한 부여** 화면이 뜬다 → 계정 `askillofgod` 승인,
     저장소 접근에 **`petit-elle`** 포함.
3. 저장소 **`askillofgod/petit-elle`**, 브랜치 **`main`** 선택.
4. 프로젝트(Worker) 이름은 **`petit-elle`** 그대로 둔다. ← **최종 URL 의 앞부분**.
5. **Build 설정** 입력:
   - **Build command**: `pnpm cf:build`
   - **Deploy command**: `npx wrangler deploy`
   - (Framework preset 칸이 있으면 **None/Next.js** 무엇이든 위 두 명령이 우선. Wrangler 가
     `wrangler.jsonc` 의 `main`/`assets`/compat flags 를 자동 적용한다.)
6. **Environment variables**(선택): 지금은 Mock 기반이라 **없어도 배포된다.**
   필요 시 `NEXT_PUBLIC_SITE_URL` 등만 추가.
7. **`Save and Deploy`** 클릭 → 첫 빌드/배포 진행(로그 확인).
8. 성공하면 화면에 **`https://petit-elle.<계정명>.workers.dev`** 주소가 표시된다.
   - `<계정명>` 을 처음 정하라고 하면(서브도메인 미설정 계정) 원하는 이름으로 1회 설정.
   - 이 주소가 **최종 운영 URL**. 기록해 둔다.

> 대안(대시보드 대신 로컬에서 1회 배포):
> ```bash
> npx wrangler login        # 브라우저 OAuth (본인만 가능)
> pnpm deploy               # = cf:build + wrangler deploy
> ```
> 배포 성공 로그 끝에 동일하게 `https://petit-elle.<계정명>.workers.dev` 가 출력된다.

### STEP C — 배포 후 점검

1. **`https://petit-elle.<계정명>.workers.dev`** 접속:
   - [ ] 홈 `/` 정상 + **CSS 정상**(무스타일 아님)
   - [ ] `/programs`, `/reservation`(5단계), `/mypage/*` 정상
   - [ ] `/admin`, `/admin/reservations`(검색/필터/액션) 정상
2. [ ] 강력 새로고침(**Cmd/Ctrl + Shift + R**), 필요 시 CF 캐시 Purge.
3. [ ] `petit-elle.pages.dev` 는 더 이상 새로 배포되지 않음(STEP A 효과) — 방치 또는 나중 삭제.

---

## 4. 검증 명령어 (배포 전 로컬에서 — 모두 통과해야 함)

```bash
pnpm typecheck     # tsc --noEmit       (타입 0 에러)
pnpm lint          # next lint          (ESLint 0)
pnpm build         # next build         (SSR/SSG 라우트 정상 생성)
pnpm cf:build      # opennextjs-cloudflare build → .open-next/worker.js + assets
```

> `pnpm cf:build` 까지 통과하면 Workers 배포 산출물이 정상 생성된 것.
> (로컬 워커 미리보기까지 보려면 `pnpm preview` → http://localhost:8787)

---

## 5. 확정 주소가 정해진 뒤 (선택 후속)

- `src/constants/site.ts` 의 `url`(현재 `https://petit-elle.co.kr`)·OG/canonical 을
  실제 운영 주소(`…workers.dev`)와 맞출지 검토. SEO 정합성 목적, 운영 중요도 낮음.
- 유료 도메인을 사게 되면 그때 Worker 에 **Custom Domain** 라우트만 추가(코드 변경 불필요).
- 더 이상 필요 없으면 Pages 프로젝트 **Delete**(STEP A 의 비고 참고).

---

## 6. 참고 문서
- 결정 근거(Pages vs Workers 실측): `CLOUDFLARE_REALITY_CHECK.md`
- 배포 원리·명령어·트러블슈팅: `DEPLOYMENT.md`
- 남은 작업 체크박스: `TODO.md` (Cloudflare 배포 섹션)
- Supabase 실제 연동: `SUPABASE_SETUP_GUIDE.md`
