"use server";

import { revalidatePath } from "next/cache";
import {
  createReservation,
  updateReservationStatus,
} from "@/services/reservation.service";
import { createReservationSchema } from "@/lib/validations/reservation.schema";
import type { ActionResult, Reservation, ReservationStatus } from "@/types";

/**
 * 예약 생성. 현재 Mock 서비스에 저장.
 * 실제 연동 시: 슬롯 잠금 → reservations insert → 슬롯 카운트 증가 (트랜잭션).
 */
export async function createReservationAction(
  input: unknown
): Promise<ActionResult<{ id: string; reservationNumber: string }>> {
  const parsed = createReservationSchema.safeParse(input);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { ok: false, error: "입력값을 확인해주세요.", fieldErrors };
  }

  try {
    const reservation = await createReservation(parsed.data);
    revalidatePath("/admin/reservations");
    revalidatePath("/admin");
    return {
      ok: true,
      data: { id: reservation.id, reservationNumber: reservation.reservationNumber },
      message: "예약 신청이 접수되었습니다.",
    };
  } catch {
    return { ok: false, error: "예약 처리 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요." };
  }
}

async function changeStatus(
  id: string,
  status: ReservationStatus,
  successMsg: string
): Promise<ActionResult<Reservation>> {
  try {
    const updated = await updateReservationStatus(id, status);
    if (!updated) return { ok: false, error: "예약을 찾을 수 없습니다." };
    revalidatePath("/admin/reservations");
    revalidatePath(`/admin/reservations/${id}`);
    revalidatePath("/admin");
    revalidatePath("/mypage/reservations");
    return { ok: true, data: updated, message: successMsg };
  } catch {
    return { ok: false, error: "처리 중 문제가 발생했습니다." };
  }
}

export async function approveReservationAction(id: string) {
  return changeStatus(id, "APPROVED", "예약을 승인했습니다.");
}
export async function rejectReservationAction(id: string) {
  return changeStatus(id, "REJECTED", "예약을 거절했습니다.");
}
export async function cancelReservationAction(id: string) {
  return changeStatus(id, "CANCELLED", "예약을 취소했습니다.");
}
export async function completeReservationAction(id: string) {
  return changeStatus(id, "COMPLETED", "방문 완료 처리했습니다.");
}
export async function noShowReservationAction(id: string) {
  return changeStatus(id, "NO_SHOW", "노쇼 처리했습니다.");
}
