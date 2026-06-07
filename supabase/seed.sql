-- Petit Elle Seed Data
-- 개발/스테이징 초기 데이터. 운영 적용 전 값(주소/전화/가격 등은 임시)을 검토할 것.
-- 적용: schema.sql 실행 후 본 파일 실행. (재실행 안전하도록 on conflict 처리)

-- =========================================================
-- admins
-- =========================================================
insert into admins (id, email, name, role, is_active) values
  ('a0000000-0000-0000-0000-000000000001', 'admin@petit-elle.co.kr', '정영순', 'SUPER_ADMIN', true)
on conflict (email) do nothing;

-- =========================================================
-- settings (단일 row)
-- =========================================================
insert into settings (id, site_name, phone, email, address, instagram_url, blog_url, kakao_channel_url)
values (
  's0000000-0000-0000-0000-000000000001',
  'Petit Elle',
  '02-900-1234',
  'contact@petit-elle.co.kr',
  '서울특별시 강북구 도봉로 315',
  'https://instagram.com/petit.elle',
  'https://blog.naver.com/petit-elle',
  'https://pf.kakao.com/_petitelle'
) on conflict (id) do nothing;

-- =========================================================
-- business_hours (0=일 ~ 6=토). 월~토 11:00~21:00, 일 휴무
-- =========================================================
insert into business_hours (day_of_week, open_time, close_time, is_open) values
  (0, null, null, false),
  (1, '11:00', '21:00', true),
  (2, '11:00', '21:00', true),
  (3, '11:00', '21:00', true),
  (4, '11:00', '21:00', true),
  (5, '11:00', '21:00', true),
  (6, '11:00', '21:00', true)
on conflict do nothing;

-- =========================================================
-- programs
-- =========================================================
insert into programs (slug, title, short_description, description, duration_minutes, duration_options, benefits, price, thumbnail, display_order, is_active, is_signature) values
  ('signature-care', '시그니처 케어',
   '바디와 페이스를 함께 관리하는 프리미엄 프로그램',
   '바디와 페이스를 함께 관리하는 Petit Elle 대표 프로그램입니다. 전신의 긴장을 부드럽게 이완하고 몸과 마음이 편안해지는 시간을 제공합니다.',
   120, '{120}', '{"전신 긴장 이완과 깊은 휴식","바디 + 페이스 통합 집중 관리","1:1 프라이빗 맞춤 케어","프리미엄 아로마 오일 사용"}',
   179000, '/images/program/program-signature.jpg', 1, true, true),
  ('relaxing-body', '릴렉싱 바디 케어',
   '전신 피로 완화와 긴장 이완을 위한 프로그램',
   '전신의 피로를 완화하고 굳어진 근육의 긴장을 부드럽게 풀어주는 프로그램입니다. 목과 어깨, 등의 뭉침을 집중적으로 관리합니다.',
   60, '{60,90}', '{"전신 피로 완화","목·어깨 집중 이완","혈액순환 개선","깊은 이완과 수면의 질 향상"}',
   89000, '/images/program/program-relaxing.jpg', 2, true, false),
  ('aroma-therapy', '아로마 테라피',
   '아로마 오일을 활용한 심신 안정 프로그램',
   '엄선된 아로마 오일의 향과 부드러운 터치로 심신을 안정시키는 프로그램입니다. 스트레스 해소와 마음의 평온에 집중합니다.',
   60, '{60,90}', '{"심신 안정과 스트레스 해소","엄선된 천연 아로마 오일","부드러운 림프 순환 케어","마음의 균형 회복"}',
   99000, '/images/program/program-aroma.jpg', 3, true, false),
  ('face-care', '페이스 케어',
   '피부 컨디션 개선을 위한 집중 관리',
   '피부 컨디션을 개선하고 맑고 생기 있는 안색을 되찾아주는 집중 관리 프로그램입니다. 피부 타입에 맞춘 섬세한 케어를 제공합니다.',
   50, '{50,80}', '{"피부 컨디션 개선","피부 타입별 맞춤 관리","탄력과 생기 회복","수분 집중 케어"}',
   79000, '/images/program/program-face.jpg', 4, true, false)
on conflict (slug) do nothing;

-- =========================================================
-- notices
-- =========================================================
insert into notices (title, content, is_visible) values
  ('6월 운영시간 안내', '6월 한 달간 정상 운영합니다. 일요일은 휴무입니다.', true),
  ('시그니처 케어 신규 오픈', '바디와 페이스를 함께 관리하는 시그니처 케어가 새롭게 추가되었습니다.', true)
on conflict do nothing;

-- =========================================================
-- 참고: users / reservations / reservation_slots 시드는 실제 운영 데이터이므로
-- 개발 편의를 위한 샘플만 필요 시 추가한다. (Mock UI 단계에서는 앱 내 Mock 데이터로 충분)
