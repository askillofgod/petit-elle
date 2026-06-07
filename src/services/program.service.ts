/**
 * Program Service Layer
 *
 * 현재는 Mock 데이터를 반환한다. Supabase 연동 시 이 파일의 내부 구현만 교체하고
 * (예: supabase.from("programs").select(...) → mapProgramRow), 시그니처는 유지한다.
 * UI/Server Action 은 항상 이 레이어를 경유한다. (직접 DB 접근 금지 — 04 ARCHITECTURE 14)
 */
import { PROGRAMS, getProgramBySlug } from "@/lib/mock/programs.mock";
import { mockStore } from "@/lib/mock/store";
import type { Program } from "@/types";
import type { ProgramFormParsed } from "@/lib/validations/program.schema";

// Mock 상태 (비영속). 연동 후 제거.
const store = mockStore<Program[]>("programs", () => [...PROGRAMS]);

export async function listPrograms(opts?: {
  activeOnly?: boolean;
}): Promise<Program[]> {
  const all = [...store].sort((a, b) => a.displayOrder - b.displayOrder);
  return opts?.activeOnly ? all.filter((p) => p.isActive) : all;
}

export async function getProgram(slug: string): Promise<Program | null> {
  return store.find((p) => p.slug === slug) ?? getProgramBySlug(slug) ?? null;
}

export async function getProgramById(id: string): Promise<Program | null> {
  return store.find((p) => p.id === id) ?? null;
}

export async function getSignatureProgram(): Promise<Program | null> {
  return store.find((p) => p.isSignature) ?? store[0] ?? null;
}

export async function createProgram(input: ProgramFormParsed): Promise<Program> {
  const program: Program = {
    id: `prog-${Date.now()}`,
    slug: input.title.replace(/\s+/g, "-").toLowerCase(),
    title: input.title,
    shortDescription: input.shortDescription,
    description: input.shortDescription,
    benefits: [],
    durations: input.durations,
    price: input.price,
    thumbnail: "/images/program/program-relaxing.jpg",
    displayOrder: store.length + 1,
    isActive: true,
  };
  store.push(program);
  return program;
}

export async function updateProgram(
  id: string,
  input: Partial<ProgramFormParsed>
): Promise<Program | null> {
  const idx = store.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  store[idx] = {
    ...store[idx],
    ...(input.title !== undefined && { title: input.title }),
    ...(input.shortDescription !== undefined && {
      shortDescription: input.shortDescription,
    }),
    ...(input.durations !== undefined && { durations: input.durations }),
    ...(input.price !== undefined && { price: input.price }),
  };
  return store[idx];
}

export async function setProgramActive(
  id: string,
  isActive: boolean
): Promise<void> {
  const p = store.find((x) => x.id === id);
  if (p) p.isActive = isActive;
}
