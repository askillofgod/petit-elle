# 05_DATABASE_SPEC.md

# Petit Elle Database Specification
## Database Design & ERD

Version: 1.0

---

# 1. 문서 목적

본 문서는 Petit Elle 서비스의 데이터베이스 구조를 정의한다.

모든 예약, 고객, 관리자, 프로그램 데이터는 본 문서를 기준으로 설계한다.

---

# 2. Database Information

Database

PostgreSQL

---

Platform

Supabase

---

Timezone

Asia/Seoul

---

Character Set

UTF-8

---

# 3. Database ERD

users

↓

reservations

↓

reservation_slots

---

programs

↓

reservations

---

admins

↓

reservations

---

settings

---

notices

---

activity_logs

---

# 4. users

고객 정보

---

Table Name

users

---

id

uuid

PK

default uuid_generate_v4()

---

kakao_id

varchar(255)

unique

nullable

---

name

varchar(100)

not null

---

phone

varchar(30)

not null

---

email

varchar(255)

nullable

---

profile_image

text

nullable

---

marketing_agreement

boolean

default false

---

last_login_at

timestamp

nullable

---

created_at

timestamp

default now()

---

updated_at

timestamp

default now()

---

# 5. admins

관리자 정보

---

Table Name

admins

---

id

uuid

PK

---

email

varchar(255)

unique

---

name

varchar(100)

---

role

varchar(50)

default 'SUPER_ADMIN'

---

is_active

boolean

default true

---

created_at

timestamp

---

updated_at

timestamp

---

# 6. programs

프로그램 정보

---

Table Name

programs

---

id

uuid

PK

---

slug

varchar(255)

unique

---

title

varchar(255)

---

short_description

text

---

description

text

---

duration_minutes

integer

---

price

integer

---

thumbnail

text

---

display_order

integer

---

is_active

boolean

default true

---

created_at

timestamp

---

updated_at

timestamp

---

# 7. reservation_slots

예약 가능 시간

---

Table Name

reservation_slots

---

id

uuid

PK

---

slot_date

date

---

start_time

time

---

end_time

time

---

max_capacity

integer

default 1

---

current_reservation_count

integer

default 0

---

status

varchar(50)

---

값

AVAILABLE

BLOCKED

CLOSED

---

memo

text

nullable

---

created_by

uuid

FK admins.id

---

created_at

timestamp

---

updated_at

timestamp

---

# 8. reservations

예약 정보

---

Table Name

reservations

---

id

uuid

PK

---

reservation_number

varchar(50)

unique

---

예시

PE202606070001

---

user_id

uuid

FK users.id

---

program_id

uuid

FK programs.id

---

slot_id

uuid

FK reservation_slots.id

---

customer_name

varchar(100)

---

customer_phone

varchar(30)

---

request_note

text

nullable

---

status

varchar(50)

---

값

PENDING

APPROVED

REJECTED

CANCELLED

COMPLETED

NO_SHOW

---

approved_by

uuid

FK admins.id

nullable

---

approved_at

timestamp

nullable

---

cancelled_at

timestamp

nullable

---

completed_at

timestamp

nullable

---

created_at

timestamp

---

updated_at

timestamp

---

# 9. notices

공지사항

---

Table Name

notices

---

id

uuid

PK

---

title

varchar(255)

---

content

text

---

is_visible

boolean

default true

---

created_at

timestamp

---

updated_at

timestamp

---

# 10. business_hours

운영시간

---

Table Name

business_hours

---

id

uuid

PK

---

day_of_week

integer

---

0

일요일

1

월요일

2

화요일

3

수요일

4

목요일

5

금요일

6

토요일

---

open_time

time

nullable

---

close_time

time

nullable

---

is_open

boolean

---

# 11. holidays

휴무일

---

Table Name

holidays

---

id

uuid

PK

---

holiday_date

date

---

title

varchar(255)

---

description

text

nullable

---

created_at

timestamp

---

# 12. settings

사이트 설정

---

Table Name

settings

---

id

uuid

PK

---

site_name

varchar(255)

---

phone

varchar(50)

---

email

varchar(255)

---

address

text

---

instagram_url

text

---

blog_url

text

---

kakao_channel_url

text

---

updated_at

timestamp

---

# 13. activity_logs

관리자 활동 로그

---

Table Name

activity_logs

---

id

uuid

PK

---

admin_id

uuid

FK admins.id

---

action

varchar(255)

---

예시

예약승인

예약취소

프로그램수정

설정변경

---

target_type

varchar(255)

---

target_id

uuid

---

description

text

---

created_at

timestamp

---

# 14. 인덱스 전략

users

phone

kakao_id

---

reservations

reservation_number

status

created_at

---

reservation_slots

slot_date

status

---

programs

slug

is_active

---

# 15. 예약번호 생성 규칙

형식

PE + YYYYMMDD + 순번

---

예시

PE202606070001

PE202606070002

PE202606070003

---

# 16. Soft Delete 정책

실제 삭제 금지

---

deleted_at 컬럼 사용

Version 2 적용

---

# 17. 데이터 보관 정책

예약 데이터

영구 보관

---

고객 데이터

영구 보관

---

로그 데이터

2년 보관

---

# 18. 보안 정책

RLS 적용

(Row Level Security)

---

회원은 본인 예약만 조회 가능

---

관리자만 전체 조회 가능

---

# 19. 향후 추가 예정 테이블

Version 2

---

reviews

고객 후기

---

packages

패키지 상품

---

memberships

회원등급

---

payments

결제

---

notification_logs

알림 이력

---

crm_notes

고객 관리 메모

---

# 20. 성공 기준

예약 중복 발생 0건

---

데이터 무결성 유지

---

관리자 예약 처리 속도 향상

---

예약 상태 실시간 반영

---

End of Document