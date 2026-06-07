"use server";

import { revalidatePath } from "next/cache";
import { createSlots, setHoliday } from "@/services/slot.service";
import { createSlotSchema } from "@/lib/validations/slot.schema";
import type { ActionResult, ReservationSlot } from "@/types";

/** 예약 가능 시간(슬롯) 생성 */
export async function createSlotAction(
  input: unknown
): Promise<ActionResult<ReservationSlot[]>> {
  const parsed = createSlotSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "입력값을 확인해주세요." };
  }
  try {
    const slots = await createSlots(parsed.data);
    revalidatePath("/admin/calendar");
    return { ok: true, data: slots, message: `${slots.length}개 시간이 저장되었습니다.` };
  } catch {
    return { ok: false, error: "일정 저장 중 문제가 발생했습니다." };
  }
}

/** 휴무일 등록 */
export async function setHolidayAction(date: string): Promise<ActionResult> {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return { ok: false, error: "날짜를 선택해주세요." };
  }
  try {
    await setHoliday(date);
    revalidatePath("/admin/calendar");
    return { ok: true, data: undefined, message: "휴무일로 등록했습니다." };
  } catch {
    return { ok: false, error: "처리 중 문제가 발생했습니다." };
  }
}
