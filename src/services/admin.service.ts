/**
 * Admin Service Layer
 * 관리자 인증/활동 로그. 현재 Mock. Supabase Auth 연동 시 교체.
 */
import { ADMINS } from "@/lib/mock/settings.mock";
import type { Admin } from "@/types";

export async function getAdminByEmail(email: string): Promise<Admin | null> {
  return ADMINS.find((a) => a.email === email && a.isActive) ?? null;
}

/**
 * 관리자 로그인 검증 (Mock).
 * 실제 연동 시 Supabase Auth(email/password) + admins 테이블 매핑으로 교체.
 */
export async function verifyAdminCredentials(
  email: string,
  _password: string
): Promise<Admin | null> {
  // Mock: 활성 관리자 이메일이면 통과
  return getAdminByEmail(email);
}

/** 현재 로그인 관리자 (Mock: 첫 번째 활성 관리자) */
export async function getCurrentAdmin(): Promise<Admin | null> {
  return ADMINS.find((a) => a.isActive) ?? null;
}

/** 활동 로그 기록 (Mock: no-op). 연동 시 activity_logs insert */
export async function logActivity(input: {
  adminId: string;
  action: string;
  targetType?: string;
  targetId?: string;
  description?: string;
}): Promise<void> {
  // no-op (Mock). 연동 시 supabase.from("activity_logs").insert(...)
  void input;
}
