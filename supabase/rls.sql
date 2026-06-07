-- Petit Elle Row Level Security (RLS) 초안
-- 05_DATABASE_SPEC.md 18번: 회원은 본인 예약만, 관리자만 전체 조회
-- 실제 적용 전 Supabase Auth 연동 및 admins 매핑 확정 필요.

alter table users enable row level security;
alter table reservations enable row level security;
alter table programs enable row level security;
alter table reservation_slots enable row level security;
alter table notices enable row level security;

-- 관리자 판별 헬퍼 (auth.jwt() email 이 admins 에 존재)
create or replace function is_admin()
returns boolean as $$
  select exists (
    select 1 from admins
    where email = (auth.jwt() ->> 'email') and is_active = true
  );
$$ language sql stable security definer;

-- programs: 공개 읽기(활성), 관리자 전체
create policy programs_public_read on programs
  for select using (is_active = true or is_admin());
create policy programs_admin_write on programs
  for all using (is_admin()) with check (is_admin());

-- reservation_slots: 공개 읽기(가능), 관리자 전체
create policy slots_public_read on reservation_slots
  for select using (status = 'AVAILABLE' or is_admin());
create policy slots_admin_write on reservation_slots
  for all using (is_admin()) with check (is_admin());

-- notices: 공개 읽기(노출), 관리자 전체
create policy notices_public_read on notices
  for select using (is_visible = true or is_admin());
create policy notices_admin_write on notices
  for all using (is_admin()) with check (is_admin());

-- users: 본인만, 관리자 전체
create policy users_self on users
  for select using (auth.uid() = id or is_admin());
create policy users_self_update on users
  for update using (auth.uid() = id);

-- reservations: 본인만 조회, 관리자 전체 / 본인 생성 가능
create policy reservations_self_read on reservations
  for select using (auth.uid() = user_id or is_admin());
create policy reservations_insert on reservations
  for insert with check (auth.uid() = user_id or user_id is null);
create policy reservations_admin_update on reservations
  for update using (is_admin());
