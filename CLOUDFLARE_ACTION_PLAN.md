# CLOUDFLARE_ACTION_PLAN.md — Petit Elle 배포 실행 계획

> 최종 전략(확정): **Cloudflare Workers + OpenNext**, 무료 **`*.workers.dev`** 주소 사용.
> 코드/설정 작업은 완료 — 남은 것은 **Cloudflare 대시보드 작업**뿐이다.
> 배경·이유 상세는 `DEPLOYMENT.md` 참고.

---

## 0. 결론 (한눈에)

| 항목 | 값 |
|---|---|
| 배포 방식 | `@opennextjs/cloudflare` → Cloudflare **Workers** |
| Worker 이름 | `petit-elle` (`wrangler.jsonc` 의 `name`) |
| **최종 운영 주소** | **`https://petit-elle.<계정-서브도메인>.workers.dev`** |
| 유료 커스텀 도메인 | **구매 안 함** (workers.dev 가 곧 운영 주소) |
| 유지하는 기능 | Server Actions · 동적 라우트 · 관리자 페이지 · 예약 구조 (SSR) |
| 폐기 대상 | **기존 Pages 프로젝트 `petit-elle.pages.dev`** (중단/삭제) |

> `<계정-서브도메인>` 은 Cloudflare 계정마다 하나. Workers & Pages 를 처음 쓸 때
> `your-name.workers.dev` 형태로 설정/확인된다. 이 값이 정해지면 위 표의 빈칸을 채운다.

---

## 1. 정적 export 로 후퇴하지 않는다 (불변 원칙)

- `petit-elle.pages.dev` 주소를 살리려고 `output: 'export'` 로 되돌리면
  Server Actions·동적 SSR 라우트(`/admin/reservations/[id]`, `/mypage/reservations/[id]`)·
  예약 처리가 **전부 깨진다.**
- 따라서 주소는 `workers.dev` 로 바뀌어도 무방하며, **기능 유지가 최우선**이다.
- 이 원칙은 향후 작업에서도 변경 금지.

---

## 2. 사전 확인 (이미 완료된 코드 작업)

- [x] `@opennextjs/cloudflare` + `wrangler` 설치
- [x] `open-next.config.ts` — `defineCloudflareConfig`
- [x] `wrangler.jsonc` — `name=petit-elle`, `main=.open-next/worker.js`,
      `assets=.open-next/assets`, `nodejs_compat` + `global_fetch_strictly_public`
- [x] `next.config.mjs` — `initOpenNextCloudflareForDev()`
- [x] scripts: `cf:build` / `preview` / `deploy` / `cf-typegen`
- [x] 로컬 검증(2026-06-07): `pnpm preview` 로 `/`, `/programs`, `/reservation`, `/admin*`
      200 + CSS 200 서빙 확인

---

## 3. 대시보드 작업 (남은 일 — 순서대로)

### STEP 1 — 계정 서브도메인 확정
1. Cloudflare 대시보드 → **Workers & Pages**.
2. 최초 진입 시 `*.workers.dev` 서브도메인 설정/확인 → 값 기록.
3. 최종 주소 확정: **`petit-elle.<계정-서브도메인>.workers.dev`**.

### STEP 2 — 배포 (둘 중 택1)

**방식 A — Git 연동 (권장, Workers Builds)**
1. **Create → Workers → Connect to Git**.
2. 저장소 `askillofgod/petit-elle`, 브랜치 `main`.
3. Build 설정:
   - Build command: `pnpm cf:build`
   - Deploy command: `npx wrangler deploy`
4. **Settings → Variables**: `NEXT_PUBLIC_*` 등록 (현재 Mock 기반 — Supabase 키 없이 동작).
5. 저장 → 첫 배포 → `petit-elle.<…>.workers.dev` 접속 확인.

**방식 B — 로컬/CI 직접 배포**
```bash
npx wrangler login
pnpm deploy        # = cf:build + wrangler deploy
```

### STEP 3 — 기존 Pages 프로젝트 정리
1. Workers & Pages 목록에서 **Pages 프로젝트 `petit-elle`(`petit-elle.pages.dev`)** 찾기.
2. **사용 중단 또는 삭제** — 옛 `index.html` / 무스타일 페이지의 출처.
3. 혼동 방지를 위해 Workers 쪽 `petit-elle` 만 운영으로 남긴다.

### STEP 4 — 배포 후 점검
- [ ] `petit-elle.<…>.workers.dev` 에서 홈/프로그램/예약/관리자 페이지 정상 + CSS 정상
- [ ] 강력 새로고침(Cmd/Ctrl+Shift+R), 필요 시 CF 캐시 Purge
- [ ] `petit-elle.pages.dev` 가 더 이상 노출/접속되지 않음 확인

---

## 4. 확정 주소가 정해진 뒤 (선택 후속)

- `src/constants/site.ts` 의 `url`(현재 `https://petit-elle.co.kr`)과 OG/canonical 을
  실제 운영 주소(`…workers.dev`)와 맞출지 검토. SEO 정합성 목적이며 운영 중요도는 낮음.
- 유료 도메인을 사게 되면 그때 Worker 에 커스텀 도메인 라우트만 추가하면 됨(코드 변경 불필요).

---

## 5. 참고 문서
- 배포 원리·명령어·트러블슈팅: `DEPLOYMENT.md`
- 남은 작업 체크박스: `TODO.md` (Cloudflare 배포 섹션)
- Supabase 실제 연동: `SUPABASE_SETUP_GUIDE.md`
