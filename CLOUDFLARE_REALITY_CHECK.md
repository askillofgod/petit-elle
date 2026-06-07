# CLOUDFLARE_REALITY_CHECK.md — 현 상태 정밀 점검

> 작성: 2026-06-07 · 목적: "petit-elle.pages.dev 프로젝트가 아직 GitHub와 연결되어 있다"는
> 제보에 따라, **추측이 아닌 실제 프로젝트/설정 근거**로 배포 구조를 재점검한다.
> "Pages를 삭제한다"가 결론이 아니라, **"Pages를 유지하며 해결 가능한가"를 먼저 검증**한다.

---

## 0. 점검 방식 — 무엇을 확인할 수 있고, 무엇은 확인 불가한가

| 구분 | 확인 가능 여부 | 근거 |
|---|---|---|
| 저장소 내부 구조(어댑터/빌드산출물/설정) | ✅ **검증 완료** | 로컬 파일·node_modules 직접 확인 |
| Cloudflare 대시보드 설정(Pages 빌드 명령/출력 경로 등) | ⚠️ **직접 확인 불가** | wrangler 미인증(아래 §8 명령으로 본인이 확정) |

> 저는 현재 Cloudflare 계정에 인증되어 있지 않습니다(`wrangler whoami` → not authenticated).
> 따라서 대시보드 값(Framework Preset/Build Command/Output Dir)은 **읽을 수 없습니다.**
> 대신 저장소 근거로 강하게 추론하고, 본인이 1분 만에 확정할 명령(§8)을 제공합니다.

---

## 1. petit-elle.pages.dev 는 Pages 프로젝트인가, Workers 인가 — **Pages 프로젝트**

**근거(확정):**
- `*.pages.dev` 호스트네임은 **Cloudflare Pages 프로젝트 전용**이다.
  Workers 는 `*.workers.dev` 를 받는다. **Worker 를 `*.pages.dev` 로 서빙하는 것은 불가능**하다.
- 따라서 `petit-elle.pages.dev` 는 정의상 **Pages 프로젝트**다. (제품 표면이 다름)

→ 즉 현재 대시보드에는 **Pages 프로젝트 `petit-elle`** 가 존재하고, 그게 Git 에 연결돼 있다.
   (이건 우리가 만들려는 Workers 배포와 **별개의 프로젝트**다.)

---

## 2. 현재 GitHub Push 가 Pages 배포를 발생시키는가 — **거의 확실히 YES (대시보드 확인 필요)**

**근거:**
- 저장소에는 **CI 워크플로가 없다**: `.github/workflows` 없음 → GitHub Actions 가 배포하는 게 아니다.
- 그렇다면 push→배포는 **Cloudflare Pages 의 Git 연동(자동 빌드)** 으로만 설명된다.
  Pages 프로젝트가 `main` 에 연결돼 있으면 **push 마다 Pages 빌드가 자동 실행**된다.

**문제:** 이 저장소는 이제 **Workers 용 설정**(`wrangler.jsonc` 의 `main` + `assets`)을 갖는다.
Pages 빌드는 이 구조를 실행할 수 없어, **옛 Build Command/Output Dir 설정대로 정적/구식 산출물**을
내보낸다 → 그래서 `petit-elle.pages.dev` 가 **옛 index.html / 무스타일 페이지**로 보이는 것이다.
(DEPLOYMENT.md §1 에 기술된 증상과 일치.)

→ **확정 명령은 §8.** `wrangler pages deployment list` 로 최근 push 가 Pages 배포를 만들었는지 즉시 확인 가능.

---

## 3. Cloudflare Pages 설정(Framework/Build Command/Output Dir) — **대시보드에서 본인 확인 필요**

저장소에는 Pages 설정을 고정하는 파일이 **없다**:
- `wrangler.jsonc` 에 `pages_build_output_dir` **없음** (= 이 파일은 Pages 설정이 아니라 **Workers 설정**).
- `_routes.json` / `_worker.js` / `functions/` / `_redirects` / `_headers` **모두 없음** (Pages 라우팅 산출물 부재).

즉 Pages 빌드 설정은 **전적으로 대시보드 값**에 의존한다. 다음을 확인하세요(Workers & Pages → `petit-elle`(Pages) → Settings → Builds & deployments):
- **Framework preset**: (Next.js? None?)
- **Build command**: (예: `npx next build` 또는 `npm run build` 또는 공란)
- **Build output directory**: (예: `.next` / `out` / `.vercel/output/static`)

이 세 값이 현재 무엇인지에 따라 Pages 가 무엇을 서빙 중인지 결정된다.
**우리 저장소 기준으로는 어떤 값이어도 SSR 앱이 정상 동작할 수 없다**(아래 §4).

---

## 4. 현재 OpenNext 구조에서 Cloudflare **Pages** 로 배포 가능한가 — **불가능 (확정)**

**근거(코드·패키지 직접 확인):**
- 이 프로젝트의 어댑터는 **`@opennextjs/cloudflare` v1.19.11** 하나뿐이다.
  (`@cloudflare/next-on-pages` **미설치**.)
- 빌드 산출물은 **Workers 엔트리**다: `.open-next/worker.js` + `.open-next/assets`.
- `opennextjs-cloudflare deploy` 내부 구현 = `runWrangler(["deploy", ...])` = **`wrangler deploy`(Workers)**.
  → `dist/cli/commands/deploy.js` 에서 직접 확인함. **Pages 배포 경로가 없다.**

**결론:** **`@opennextjs/cloudflare`(OpenNext) 는 Workers 전용**이다.
Pages 프로젝트는 `.open-next/worker.js` 를 실행할 수 없으므로, **현재 구조 그대로는 Pages 로 배포 불가**.

> ⚠️ 흔한 오해 정정: **"Cloudflare Pages + OpenNext" 라는 조합은 존재하지 않는다.**
> - Pages 용 Next 어댑터 = `@cloudflare/next-on-pages` (별도 도구)
> - Workers 용 Next 어댑터 = `@opennextjs/cloudflare` (현재 사용 중)
> 둘은 **상호 배타적**이며 같이 쓰지 않는다.

---

## 5. Workers 배포가 실제로 필요한 상태인가 — **재검토 결과: 어댑터 선택의 문제**

지금 "Workers 가 필요"한 이유는 본질이 아니라 **현재 어댑터가 OpenNext(=Workers 전용)이기 때문**이다.
선택지는 두 갈래로 정리된다:

- **A안. 그대로 Workers**: 어댑터 변경 없음. 주소 = `petit-elle.<계정>.workers.dev`.
  Pages 프로젝트는 더 이상 쓰지 않음(Git 연동만 끊으면 깨진 자동배포 중단).
- **B안. Pages 유지(URL 보존)**: 어댑터를 **`@cloudflare/next-on-pages` 로 교체**.
  주소 = `petit-elle.pages.dev` 유지 가능. 단, 대가가 있음(§6).

즉 "Workers 가 반드시 필요"한 게 아니라, **`petit-elle.pages.dev` 를 살릴지(B) / workers.dev 로 갈지(A)** 의 결정이다.

---

## 6. Pages 로 `petit-elle.pages.dev` 유지가 가능한가 — **가능. 단 어댑터 교체(next-on-pages) 필요**

**가능 여부: 조건부 YES.**
`petit-elle.pages.dev` 를 그대로 유지하려면 **Pages 프로젝트를 계속 쓰면 되고**, 그러려면
빌드를 **`@cloudflare/next-on-pages`** 로 바꾸면 된다. 이 도구는 SSR·Server Actions·동적 라우트를
**Pages Functions(엣지 런타임)** 위에서 실행한다 → 기능 유지하며 pages.dev 보존 가능.

**대가 / 제약(반드시 인지):**
1. **엣지 런타임 강제**: 모든 서버 라우트/액션에 `export const runtime = "edge"` 필요.
   현재는 `nodejs_compat`(Node 호환) 기반 → 일부 Node API 사용 시 수정·재검증 필요.
2. **next-on-pages 는 Cloudflare 가 유지보수 모드로 전환**한 도구다.
   Cloudflare 공식 권장은 신규/이전 프로젝트 모두 **OpenNext(Workers) 로 이동**.
   즉 B안은 **공식 권장의 반대 방향**(미래 지향성↓).
3. 빌드 설정 교체: Build command `npx @cloudflare/next-on-pages@1`,
   Output dir `.vercel/output/static`, `nodejs_compat` 플래그.
4. 우리가 이미 검증한 OpenNext 빌드/프리뷰 자산은 **재사용 불가**(다른 산출물 체계).

**불가능한 것(명확히):**
- OpenNext(Workers) 산출물을 Pages 프로젝트에 올리는 것 → **불가**.
- 현재 Workers 배포 결과를 `petit-elle.pages.dev` 호스트네임으로 서빙 → **불가**(.pages.dev 는 Pages 전용).

---

## 7. 최종 추천 배포 방식 (현 대시보드 구조 기준)

상황을 한 줄로: **두 갈래 중 택1. 둘 다 "기능 100% 유지"는 가능**하다. 차이는 **URL 과 도구 방향성**.

### 갈래 A — Workers + OpenNext (현재 구조 유지) · 권장
- **주소:** `petit-elle.<계정>.workers.dev`
- **장점:** 어댑터 교체 없음, 이미 빌드·프리뷰 검증 완료, Node 호환, **Cloudflare 공식 권장 방향**.
- **할 일:**
  1. 새 **Worker** 프로젝트로 배포(`wrangler deploy` 또는 대시보드 Workers→Connect to Git).
  2. **기존 Pages 프로젝트 `petit-elle` 의 Git 연동을 끊는다**(Settings→Builds→Disconnect).
     → 이렇게 하면 **삭제하지 않아도** push 마다 깨진 Pages 빌드가 도는 문제는 멈춘다.
  3. (선택) 혼동 방지를 위해 Pages 프로젝트는 이후 삭제하거나 휴면 상태로 둔다.
- **"Pages 유지하며 해결"의 답:** Git 연동만 해제하면 **Pages 프로젝트 자체는 남겨둔 채** 문제 해결. 삭제 강제 아님.

### 갈래 B — Pages + next-on-pages (URL `petit-elle.pages.dev` 보존)
- **주소:** `petit-elle.pages.dev` (그대로)
- **장점:** 이미 공유했을 수 있는 주소 유지, Pages 프로젝트/연동 재활용.
- **대가:** 어댑터 교체(`@opennextjs/cloudflare`→`@cloudflare/next-on-pages`), **엣지 런타임 전환 + 전 라우트 재검증**,
  유지보수 모드 도구 채택(미래 지향성↓).
- **할 일(요약):**
  1. `@cloudflare/next-on-pages` 도입, `@opennextjs/cloudflare` 제거.
  2. 동적 라우트/Server Actions 에 `export const runtime = "edge"` 부여 + 동작 재검증.
  3. Pages 대시보드: Build command `npx @cloudflare/next-on-pages@1`,
     Output `.vercel/output/static`, compat flag `nodejs_compat`.
  4. `wrangler.jsonc`(Workers 설정) 제거/대체.

### 권장
- **유료 도메인 미구매 + 공식 지원·Node 호환 우선이면 → A안(Workers, workers.dev).**
  (이전 세션에서 workers.dev 수용은 이미 합의됨.)
- **`petit-elle.pages.dev` 주소 보존이 기능보다 더 중요한 요구라면 → B안**(엣지 전환 비용 감수).

> 어느 쪽이든 **공통 선결 과제: 지금 Git 에 물려 깨진 자동배포를 내는 Pages 연동을 정리**해야 한다
> (A=연동 해제 / B=빌드 설정 교체). 방치하면 push 마다 `petit-elle.pages.dev` 가 계속 깨진 화면을 낸다.

---

## 8. 본인이 1분 만에 사실 확정하는 명령 (인증 후)

```bash
# 1) 로그인 (브라우저 OAuth — 본인만 가능)
npx wrangler login

# 2) Pages 프로젝트 존재/연동 확인  → petit-elle 가 목록에 보이면 §1 확정
npx wrangler pages project list

# 3) 최근 Pages 배포가 push 로 생겼는지 확인  → §2 확정
npx wrangler pages deployment list --project-name=petit-elle

# 4) 계정 서브도메인(=최종 workers.dev 주소의 빈칸) 확인
npx wrangler whoami
#   배포까지 해서 실제 URL 확정:  npm run deploy   → 출력의 https://petit-elle.<sub>.workers.dev
```

위 2)·3) 출력의 **Framework/Build command/Output dir** 및 배포 트리거 여부를 알려주시면,
§3 의 빈칸을 실제 값으로 채워 이 문서를 확정 갱신하겠습니다.

---

## 9. 한 줄 결론
- `petit-elle.pages.dev` = **Pages 프로젝트**이며, **현재 OpenNext(Workers) 구조로는 거기에 배포 불가**.
- **Pages 유지 자체는 가능**하지만, 그러려면 **next-on-pages 로 어댑터를 바꿔야**(엣지 전환 비용) 한다.
- 삭제는 필수가 아니다 — **A안(Git 연동 해제)** 만으로도 "Pages 를 남긴 채" 깨진 배포를 멈출 수 있다.
- 추천: **A안(Workers, workers.dev)**. pages.dev 보존이 절대 요건일 때만 **B안(next-on-pages)**.
