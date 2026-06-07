-- Petit Elle Database Schema
-- 05_DATABASE_SPEC.md 기준 / PostgreSQL (Supabase)
-- Timezone: Asia/Seoul, Charset: UTF-8

create extension if not exists "uuid-ossp";

-- =========================================================
-- users (고객)
-- =========================================================
create table if not exists users (
  id uuid primary key default uuid_generate_v4(),
  kakao_id varchar(255) unique,
  name varchar(100) not null,
  phone varchar(30) not null,
  email varchar(255),
  profile_image text,
  marketing_agreement boolean default false,
  last_login_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists idx_users_phone on users(phone);
create index if not exists idx_users_kakao on users(kakao_id);

-- =========================================================
-- admins (관리자)
-- =========================================================
create table if not exists admins (
  id uuid primary key default uuid_generate_v4(),
  email varchar(255) unique not null,
  name varchar(100),
  role varchar(50) default 'SUPER_ADMIN',
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- =========================================================
-- programs (프로그램)
-- =========================================================
create table if not exists programs (
  id uuid primary key default uuid_generate_v4(),
  slug varchar(255) unique not null,
  title varchar(255) not null,
  short_description text,
  description text,
  duration_minutes integer,           -- 기준(대표) 소요시간
  duration_options integer[] default '{}', -- 선택 가능 소요시간 (도메인 Program.durations 매핑)
  benefits text[] default '{}',        -- 효과/특징 (도메인 Program.benefits 매핑)
  price integer,
  thumbnail text,
  display_order integer default 0,
  is_active boolean default true,
  is_signature boolean default false,  -- 대표 프로그램 여부
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists idx_programs_slug on programs(slug);
create index if not exists idx_programs_active on programs(is_active);

-- =========================================================
-- reservation_slots (예약 가능 시간)
-- =========================================================
create table if not exists reservation_slots (
  id uuid primary key default uuid_generate_v4(),
  slot_date date not null,
  start_time time not null,
  end_time time,
  max_capacity integer default 1,
  current_reservation_count integer default 0,
  status varchar(50) default 'AVAILABLE', -- AVAILABLE | BLOCKED | CLOSED
  memo text,
  created_by uuid references admins(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists idx_slots_date on reservation_slots(slot_date);
create index if not exists idx_slots_status on reservation_slots(status);

-- =========================================================
-- reservations (예약)
-- =========================================================
create table if not exists reservations (
  id uuid primary key default uuid_generate_v4(),
  reservation_number varchar(50) unique not null, -- PE202606070001
  user_id uuid references users(id),
  program_id uuid references programs(id),
  slot_id uuid references reservation_slots(id),
  customer_name varchar(100) not null,
  customer_phone varchar(30) not null,
  request_note text,
  status varchar(50) default 'PENDING', -- PENDING|APPROVED|REJECTED|CANCELLED|COMPLETED|NO_SHOW
  approved_by uuid references admins(id),
  approved_at timestamptz,
  cancelled_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists idx_res_number on reservations(reservation_number);
create index if not exists idx_res_status on reservations(status);
create index if not exists idx_res_created on reservations(created_at);

-- =========================================================
-- notices (공지사항)
-- =========================================================
create table if not exists notices (
  id uuid primary key default uuid_generate_v4(),
  title varchar(255) not null,
  content text,
  is_visible boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- =========================================================
-- business_hours (운영시간)
-- =========================================================
create table if not exists business_hours (
  id uuid primary key default uuid_generate_v4(),
  day_of_week integer not null, -- 0=일 ~ 6=토
  open_time time,
  close_time time,
  is_open boolean default true
);

-- =========================================================
-- holidays (휴무일)
-- =========================================================
create table if not exists holidays (
  id uuid primary key default uuid_generate_v4(),
  holiday_date date not null,
  title varchar(255),
  description text,
  created_at timestamptz default now()
);

-- =========================================================
-- settings (사이트 설정)
-- =========================================================
create table if not exists settings (
  id uuid primary key default uuid_generate_v4(),
  site_name varchar(255),
  phone varchar(50),
  email varchar(255),
  address text,
  instagram_url text,
  blog_url text,
  kakao_channel_url text,
  updated_at timestamptz default now()
);

-- =========================================================
-- activity_logs (관리자 활동 로그)
-- =========================================================
create table if not exists activity_logs (
  id uuid primary key default uuid_generate_v4(),
  admin_id uuid references admins(id),
  action varchar(255),
  target_type varchar(255),
  target_id uuid,
  description text,
  created_at timestamptz default now()
);

-- =========================================================
-- updated_at 자동 갱신 트리거
-- =========================================================
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

do $$
declare t text;
begin
  foreach t in array array['users','admins','programs','reservation_slots','reservations','notices']
  loop
    execute format(
      'drop trigger if exists trg_%1$s_updated on %1$s;
       create trigger trg_%1$s_updated before update on %1$s
       for each row execute function set_updated_at();', t);
  end loop;
end $$;
