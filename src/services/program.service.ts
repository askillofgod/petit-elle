/**
 * Program Service Layer
 * 현재는 더미 데이터를 반환한다. Supabase 연동 시 내부 구현만 교체한다.
 * UI/Server Action 은 항상 이 레이어를 경유해야 한다. (직접 DB 접근 금지)
 */
import { PROGRAMS, getProgramBySlug } from "@/constants/programs";
import type { Program } from "@/types";

export async function listPrograms(opts?: {
  activeOnly?: boolean;
}): Promise<Program[]> {
  const all = [...PROGRAMS].sort((a, b) => a.displayOrder - b.displayOrder);
  return opts?.activeOnly ? all.filter((p) => p.isActive) : all;
}

export async function getProgram(slug: string): Promise<Program | null> {
  return getProgramBySlug(slug) ?? null;
}
