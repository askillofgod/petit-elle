# ADMIN_STATUS.md — 관리자 시스템 감사

- 작성일: 2026-06-07
- 기준: Mock 데이터 V1 (Supabase 미연결). 데이터 접근은 Service Layer 경유.
- 범례: **DONE**(완성) · **PARTIAL**(UI/Mock은 되나 실제 연동/일부 기능 미완) · **TODO**(미구현)

---

## 항목별 상태

### 1. 로그인 — PARTIAL
- `/admin/login` 이메일/비밀번호 폼 UI **DONE**.
- 실제 인증 없음: 로그인 버튼이 `/admin` 으로 이동만 함(검증 X). 비로그인 접근 차단(`middleware`) 없음.
- 서비스 스텁: `admin.service.verifyAdminCredentials` 존재(미연결).
- TODO: Supabase Auth(이메일/비번) + `middleware.ts` 보호 + 세션.

### 2. 대시보드 — DONE (데이터 Mock)
- `/admin` 통계 카드(오늘예약/승인대기/예약완료/신규고객/노쇼) + 최근 예약 6건.
- `reservation.service.getDashboardStats()` / `listReservations()` 경유.
- 모바일 반응형(2열 카드) 검증 완료. 통계는 Mock 집계.

### 3. 예약관리 — DONE (Mock)
- `/admin/reservations`: 테이블/모바일 카드, **상태 필터**(전체/대기/확정/완료/노쇼/취소·거절), **검색**(고객명·연락처·예약번호·프로그램), 행별 액션.
- `/admin/reservations/[id]`: 상세 + 액션바(승인/거절/완료/노쇼/취소) → **서버 액션** + `router.refresh` + revalidate.
- 액션: `approve/reject/cancel/complete/noShow ReservationAction` 모두 동작(Mock 영속 globalThis).
- TODO: 실제 DB 트랜잭션, 알림 발송.

### 4. 고객관리 — PARTIAL
- `/admin/customers`: 목록 + **검색**(이름·연락처) + **정렬**(예약많은순/최근방문/이름) **DONE**, 단골 배지.
- 고객 상세 페이지(`/admin/customers/[id]`) **미구현 (TODO)** — 예약 이력 뷰 등.
- 서비스: `getCustomer`/`getCustomerReservations`(미연결), `updateCustomerProfile`(미연결).

### 5. 일정관리 — DONE (Mock)
- `/admin/calendar`: 달력 날짜 선택 → 시간 슬롯 토글(가능/마감), **모두 가능/모두 마감**, 커스텀 시간 추가(zod 검증), **휴무일 등록**.
- 저장: `createSlotAction` / `setHolidayAction`(서버 액션, 검증).
- TODO: 슬롯 ↔ 예약 연동(예약 시 슬롯 카운트/마감), 반복 일정.

### 6. 프로그램관리 — PARTIAL
- `/admin/programs`: 목록 + **정렬**(기본/가격↑↓/이름) + 등록/수정 폼(zod) + **노출 토글** **DONE**.
- 액션: `createProgramAction`/`updateProgramAction`/`setProgramActiveAction`(검증·revalidate).
- 이미지 업로드 **미구현 (TODO)** — 현재 썸네일 고정. 삭제는 비활성화 정책(노출 토글)로 대체.

### 7. 설정 — PARTIAL
- `/admin/settings`: 기본정보·SNS·운영시간 폼 표시(`getSettings` 경유) + 저장 버튼(토스트) **DONE(UI)**.
- 실제 저장 미연결: `settings.service.updateSettings` 존재하나 폼→액션 미배선(현재 더미 토스트).
- TODO: `updateSettingsAction` + 폼 controlled 전환.

### (부가) 공지사항 — DONE (로컬 Mock)
- `/admin/notices`: 등록/노출토글/삭제(로컬 상태). 서비스(`listNotices` 등) 일부 연결.

---

## 종합 평가

| 지표 | 점수 | 근거 |
|---|---|---|
| **Admin UI %** | **92%** | 7개 메뉴 + 공지 모두 화면 완성, 반응형·토스트·로딩 처리. 고객 상세/이미지 업로더 UI만 미완 |
| **Admin Function %** | **70%** | 예약·일정·프로그램 변이 액션 동작(Mock). 미완: 실인증, 설정 저장 배선, 고객 상세, 이미지 업로드 |
| **Admin DB %** | **0%** | 전부 Mock(globalThis). Supabase 테이블/쿼리/RLS 미연결 (SQL·가이드만 준비) |

## 다음 우선순위 (Mock 범위)
1. 설정 저장 액션 배선(`updateSettingsAction`) — 폼 controlled화
2. 고객 상세 페이지 `/admin/customers/[id]` (예약 이력)
3. (연동 단계) 관리자 인증 + middleware, DB 연결
