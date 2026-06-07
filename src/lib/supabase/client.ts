/**
 * Supabase 클라이언트 스텁.
 *
 * 현재 v1 UI 단계에서는 더미 데이터를 사용하므로 실제 연결을 만들지 않는다.
 * Supabase 연동 단계에서 아래 절차로 활성화한다.
 *
 *   1) pnpm add @supabase/supabase-js @supabase/ssr
 *   2) .env.local 에 NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY 설정
 *   3) 아래 createBrowserClient / createServerClient 구현 주석 해제
 *
 * 모든 DB 접근은 src/services/* (Service Layer)를 경유한다. (04_SYSTEM_ARCHITECTURE.md 14)
 */

export const SUPABASE_ENV = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
};

export const isSupabaseConfigured = Boolean(
  SUPABASE_ENV.url && SUPABASE_ENV.anonKey
);

// 연동 단계 참고용 구현 예시 (의존성 설치 후 활성화)
//
// import { createBrowserClient } from "@supabase/ssr";
// export function getBrowserClient() {
//   return createBrowserClient(SUPABASE_ENV.url, SUPABASE_ENV.anonKey);
// }
