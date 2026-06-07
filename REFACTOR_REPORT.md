# REFACTOR_REPORT.md — 코드 품질 / 리팩터링 감사

- 작성일: 2026-06-07
- 검사: `tsc --noEmit`, `tsc --noUnusedLocals --noUnusedParameters`, `next lint`, 정적 grep

---

## 1. 이번에 정리한 항목 ✅

| 항목 | 조치 |
|---|---|
| 미사용 import `Plus` (admin-programs-manager) | 제거 |
| 미사용 import `Button` (admin-reservations-manager) | 제거 |
| 중복 `END_BY_START` 맵 (slots.mock + slot.service) | `SLOT_END_BY_START` 로 통합, service가 import |
| 고객 테이블 마크업 page 내 중복 | `AdminCustomersManager` 로 일원화(검색/정렬 포함) |

검사 결과: **noUnusedLocals/Parameters 0건**, ESLint 0 경고, typecheck 0.

## 2. 이전 세션 정리분(참고)
- 미사용 `ui/card.tsx`, `formatDuration`, `lib/dummy-data.ts` shim, 옛 `index.html`, `.DS_Store` 제거 완료(BUG_REPORT 참고).

---

## 3. 의도적 미사용 (제거하지 않음 — Service Layer 스캐폴딩)
아래는 **Supabase 연동 시 즉시 사용할 인터페이스**로, 의도적으로 선작성됨. 제거하지 않음.
- `customer.service`: `getCustomer`, `getCustomerReservations`, `updateCustomerProfile`
- `admin.service`: `getAdminByEmail`, `verifyAdminCredentials`, `getCurrentAdmin`, `logActivity`
- `slot.service`: `listSlotsByDate`, `listAvailableTimes`, `setSlotStatus`
- `settings.service`: `getBusinessHours`, `createNotice`, `setNoticeVisible`, `deleteNotice`, `updateSettings`

> 근거: 04_SYSTEM_ARCHITECTURE "모든 DB 접근은 Service Layer 경유". 시그니처를 미리 고정해 두면
> 연동 시 UI/액션 변경 없이 서비스 내부만 교체 가능(D-018/019).

## 4. 남은 경미한 중복 / 개선 여지 (낮은 우선순위)
- `Row`/`SummaryRow`(라벨-값 행) 패턴이 여러 파일에 소규모 반복 → 공용 `<DescRow>` 추출 가능(가독성 영향 적어 보류).
- 서버 액션의 `fieldErrors` 수집 로직: `program.actions`는 헬퍼화, `reservation.actions`는 인라인 → 공용 `zodFieldErrors()` 유틸로 통합 가능.
- `notices` 관리: 페이지는 service에서 로드하나 매니저는 로컬 상태로 변이(서버 액션 미사용) → 일관성 위해 액션화 가능.
- `phone` 정규식이 reservation/customer 스키마에 중복 → 공용 상수화 가능.

## 5. 구조 평가
- 폴더 구조(04 준수): `app / components(layout·ui·sections·program·reservation·admin·seo·mypage) / services / lib(mock·validations·supabase) / constants / types`.
- 데이터 흐름 단방향: UI → Action(zod) → Service → Mock(globalThis). ✅
- 타입 안정성: 도메인 타입 중앙화(`types/index.ts`), `ActionResult<T>` 표준. ✅

## 결론
즉시 정리 가능한 dead code/unused는 모두 제거 완료. 남은 항목은 "선택적 가독성 개선"이며 기능/품질 게이트에 영향 없음.
