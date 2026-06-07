# RESERVATION_STATUS.md — 예약 시스템 감사

- 작성일: 2026-06-07
- 기준: Mock V1 (Service Layer + Server Actions + zod). Supabase 미연결.
- 범례: **DONE** · **PARTIAL** · **TODO**

---

## 기능별 상태

### 1. 예약 신청 — DONE (Mock)
- `/reservation` 5단계 스테퍼: 프로그램 → 날짜 → 시간 → 정보입력 → 확인.
- 검증: `reservationFormSchema`(zod) — 이름/연락처(휴대폰 정규식)/개인정보 동의.
- 제출: `createReservationAction`(zod 재검증) → `reservation.service.createReservation` → 예약번호 `PE+YYYYMMDD+순번` 생성 → `/reservation/complete` 이동(번호 표시).
- E2E(CDP) 검증: 생성 예약이 관리자 목록에 반영됨.
- 비고: 날짜 캘린더(일요일/과거 비활성), 시간 슬롯은 결정적 Mock 가용성.
- TODO(연동): 슬롯 실재고 검증·동시성(중복 방지) 트랜잭션.

### 2. 예약 확인 — DONE (Mock)
- 고객: `/reservation/complete`(접수 요약+번호), `/mypage/reservations/[id]`(상세).
- 관리자: `/admin/reservations`(목록/검색/필터), `/admin/reservations/[id]`(상세).

### 3. 예약 취소 — PARTIAL
- 관리자: 취소 액션 **DONE**(`cancelReservationAction`, 상태→CANCELLED).
- 고객(마이페이지): "예약 취소 요청" 버튼 존재하나 **동작 미배선(TODO)** — 클릭 시 액션 호출 없음.
- TODO: `requestCancelAction`(고객) 또는 상태→취소요청 흐름.

### 4. 예약 상태 변경 — DONE (Mock)
- 상태값: PENDING / APPROVED / REJECTED / CANCELLED / COMPLETED / NO_SHOW.
- 관리자 상세 액션바 + 목록 행 액션. 서버 액션이 `updateReservationStatus` 호출, `approvedAt/cancelledAt/completedAt` 타임스탬프 기록, revalidatePath.
- 상태 배지(ReservationStatusBadge) 색상 매핑(디자인 시스템 25).

### 5. 예약 승인 프로세스 — DONE (Mock)
- 흐름: 고객 신청(PENDING) → 관리자 확인 → 승인(APPROVED)/거절(REJECTED).
- 대시보드 "승인 대기" 카운트 + 목록 필터로 대기건 즉시 확인.
- TODO(연동): 승인 시 고객 알림(문자/알림톡) — V2.

### 6. 마이페이지 조회 — DONE (Mock)
- `/mypage/reservations`: 내 예약 목록(상태 배지) — `listMyReservations(userId=c1 가정)`.
- `/mypage/reservations/[id]`: 상세(예약번호/프로그램/일시/요청사항).
- 빈 상태(EmptyState) 처리. 재예약 버튼.
- TODO(연동): 로그인 사용자 기준 실제 필터(현재 Mock 사용자 c1 고정).

---

## 상태 요약표

| 기능 | 상태 | 비고 |
|---|---|---|
| 예약 신청 | DONE | zod+서버액션, 번호 생성 |
| 예약 확인 | DONE | 고객/관리자 양쪽 |
| 예약 취소(관리자) | DONE | cancelReservationAction |
| 예약 취소(고객) | PARTIAL | 버튼만, 액션 미배선 |
| 상태 변경 | DONE | 5종 액션 + 타임스탬프 |
| 승인 프로세스 | DONE | 대기→승인/거절 |
| 마이페이지 조회 | DONE | 사용자 고정(Mock) |

## 연동 시 필수 (TODO)
- 슬롯 동시성/중복 예약 방지(RPC 트랜잭션)
- 고객 취소 요청 흐름
- 로그인 사용자 기준 마이페이지
- 상태 변경 알림(V2)
