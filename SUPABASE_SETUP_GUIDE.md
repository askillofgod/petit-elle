# SUPABASE_SETUP_GUIDE.md — Petit Elle Supabase 연동 가이드

> 현재 V1 은 **Mock 데이터**로 완전히 동작합니다. 이 문서는 추후 실제 Supabase를
> 연결할 때 따라야 할 절차와, "교체 지점"을 정리한 것입니다.

---

## 0. 현재 구조 한눈에 보기

```
UI (page/component)
  └─ Server Action (src/app/actions/*)        ← 입력 검증(zod) + 표준 ActionResult
       └─ Service Layer (src/services/*)       ← 유일한 데이터 접근 지점 (교체 대상)
            └─ Mock (src/lib/mock/*)           ← 지금은 여기서 반환
                 ↓ (연동 후)
            └─ Supabase (src/lib/supabase/*)   ← row(snake_case) → 도메인 타입(camelCase) 매핑
```

**핵심: 데이터 소스를 바꿀 때 수정하는 곳은 `src/services/*` 내부 구현뿐이다.**
UI·액션·검증·타입은 그대로 둔다.

---

## 1. Supabase 프로젝트 생성

1. https://supabase.com → New Project (Region: `Northeast Asia (Seoul)` 권장)
2. Project Settings → API 에서 아래 값 확보
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` → `SUPABASE_SERVICE_ROLE_KEY` (서버 전용, 노출 금지)

---

## 2. 스키마 / 시드 / RLS 적용

Supabase 대시보드 → SQL Editor 에서 순서대로 실행:

1. `supabase/schema.sql`  — 테이블 + 인덱스 + updated_at 트리거
2. `supabase/seed.sql`    — admins / settings / business_hours / programs / notices 초기 데이터
3. `supabase/rls.sql`     — Row Level Security 정책 (Auth 연동 후 적용 권장)

> CLI 사용 시: `supabase db push` 또는 `psql "$DATABASE_URL" -f supabase/schema.sql` 등.

---

## 3. 환경변수 설정

```bash
cp .env.example .env.local
# .env.local 에 2단계에서 확보한 값 입력
```

---

## 4. 패키지 설치 및 클라이언트 구현

```bash
pnpm add @supabase/supabase-js @supabase/ssr
```

`src/lib/supabase/client.ts` 의 주석 처리된 `createBrowserClient` / `createServerClient`
구현을 활성화한다. (브라우저용 / 서버용 / service_role용 클라이언트 분리)

---

## 5. 서비스 레이어 교체 (Mock → Supabase)

각 `src/services/*.service.ts` 의 함수 내부만 교체한다. 예시:

```ts
// Before (Mock)
export async function listPrograms() {
  return [...store].sort((a, b) => a.displayOrder - b.displayOrder);
}

// After (Supabase)
export async function listPrograms() {
  const supabase = getServerClient();
  const { data, error } = await supabase
    .from("programs")
    .select("*")
    .order("display_order");
  if (error) throw error;
  return (data ?? []).map(mapProgramRow); // snake_case → 도메인 타입
}
```

### row → 도메인 매핑 가이드 (snake_case → camelCase)
| DB 컬럼 | 도메인 필드 |
|---|---|
| `programs.duration_options` | `Program.durations` |
| `programs.benefits` | `Program.benefits` |
| `programs.is_signature` | `Program.isSignature` |
| `reservation_slots.slot_date` | `ReservationSlot.date` |
| `reservation_slots.start_time` | `ReservationSlot.startTime` |
| `reservations` + join `programs.title` | `Reservation.programTitle` |
| `reservations` + join slot `slot_date/start_time` | `Reservation.date/time` |

> `Reservation` / `Customer` 는 조인·집계 뷰 모델이다. SELECT 시 join/aggregate 로 채운다.

---

## 6. 인증 연동

- **고객**: 카카오 OAuth → Supabase Auth (`signInWithOAuth({ provider: 'kakao' })`).
  - 카카오 디벨로퍼스에서 앱 생성 → Redirect URI 등록 → `KAKAO_CLIENT_ID/SECRET`.
- **관리자**: 이메일/비밀번호 Supabase Auth + `admins` 테이블 매핑.
  - `src/services/admin.service.ts` 의 `verifyAdminCredentials` 교체.
  - `/admin/*` 보호: `middleware.ts` 추가하여 세션·admins 확인 후 비로그인 차단.

---

## 7. 예약 트랜잭션 주의사항

`createReservationAction` → `reservation.service.createReservation` 교체 시:
1. 슬롯 잠금/검증 (`reservation_slots.status = 'AVAILABLE'`, `current < max`)
2. `reservations` insert
3. `reservation_slots.current_reservation_count` 증가
→ **RPC(Postgres 함수) 또는 트랜잭션으로 원자적 처리**하여 중복 예약(동시성) 방지.
예약번호는 `PE+YYYYMMDD+순번` (`generateReservationNumber` 재사용 또는 DB 시퀀스).

---

## 8. 교체 체크리스트

- [ ] `.env.local` 설정
- [ ] schema.sql / seed.sql / rls.sql 적용
- [ ] `@supabase/supabase-js`, `@supabase/ssr` 설치 + client 구현
- [ ] services/* 내부 Mock → Supabase 쿼리로 교체 (시그니처 유지)
- [ ] Mock 상태(store) 제거 (`src/lib/mock/*` 는 seed 로 이관)
- [ ] 카카오 OAuth / 관리자 인증 / `middleware.ts`
- [ ] 예약 생성 트랜잭션(RPC) + 슬롯 동시성
- [ ] Realtime(선택): 관리자 예약 목록 실시간 반영

---

## 부록: 관련 파일
- 타입: `src/types/index.ts`
- 검증: `src/lib/validations/*`
- 서비스: `src/services/*`
- 액션: `src/app/actions/*`
- Mock: `src/lib/mock/*`
- DB: `supabase/schema.sql`, `supabase/seed.sql`, `supabase/rls.sql`
