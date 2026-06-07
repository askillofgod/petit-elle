"use server";

import { revalidatePath } from "next/cache";
import {
  createProgram,
  updateProgram,
  setProgramActive,
} from "@/services/program.service";
import { programFormSchema } from "@/lib/validations/program.schema";
import type { ActionResult, Program } from "@/types";

function collectFieldErrors(
  issues: { path: PropertyKey[]; message: string }[]
): Record<string, string> {
  const fieldErrors: Record<string, string> = {};
  for (const issue of issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !fieldErrors[key]) fieldErrors[key] = issue.message;
  }
  return fieldErrors;
}

/** 프로그램 등록 */
export async function createProgramAction(
  input: unknown
): Promise<ActionResult<Program>> {
  const parsed = programFormSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: "입력값을 확인해주세요.",
      fieldErrors: collectFieldErrors(parsed.error.issues),
    };
  }
  try {
    const program = await createProgram(parsed.data);
    revalidatePath("/admin/programs");
    revalidatePath("/programs");
    return { ok: true, data: program, message: "프로그램이 등록되었습니다." };
  } catch {
    return { ok: false, error: "등록 중 문제가 발생했습니다." };
  }
}

/** 프로그램 수정 */
export async function updateProgramAction(
  id: string,
  input: unknown
): Promise<ActionResult<Program>> {
  const parsed = programFormSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: "입력값을 확인해주세요.",
      fieldErrors: collectFieldErrors(parsed.error.issues),
    };
  }
  try {
    const program = await updateProgram(id, parsed.data);
    if (!program) return { ok: false, error: "프로그램을 찾을 수 없습니다." };
    revalidatePath("/admin/programs");
    revalidatePath(`/programs/${program.slug}`);
    return { ok: true, data: program, message: "프로그램이 수정되었습니다." };
  } catch {
    return { ok: false, error: "수정 중 문제가 발생했습니다." };
  }
}

/** 프로그램 노출 토글 */
export async function setProgramActiveAction(
  id: string,
  isActive: boolean
): Promise<ActionResult> {
  try {
    await setProgramActive(id, isActive);
    revalidatePath("/admin/programs");
    revalidatePath("/programs");
    return { ok: true, data: undefined };
  } catch {
    return { ok: false, error: "처리 중 문제가 발생했습니다." };
  }
}
