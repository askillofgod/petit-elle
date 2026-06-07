// Mock 데이터 집약 진입점 (Supabase 연동 전 데이터 소스)
// 서비스 레이어(src/services)만 이 모듈을 참조한다.
export { PROGRAMS, getProgramBySlug } from "./programs.mock";
export { RESERVATIONS, MY_USER_ID } from "./reservations.mock";
export { CUSTOMERS } from "./customers.mock";
export { SLOTS, DEFAULT_SLOT_TIMES } from "./slots.mock";
export { NOTICES } from "./notices.mock";
export { SITE_SETTINGS, BUSINESS_HOURS, ADMINS } from "./settings.mock";
