/**
 * Slot Service Layer
 * 예약 가능 시간(reservation_slots) 관리. 현재 Mock.
 */
import { SLOTS, DEFAULT_SLOT_TIMES, SLOT_END_BY_START } from "@/lib/mock/slots.mock";
import { mockStore } from "@/lib/mock/store";
import type { ReservationSlot, SlotStatus } from "@/types";
import type { CreateSlotInput } from "@/lib/validations/slot.schema";

const store = mockStore<ReservationSlot[]>("slots", () => [...SLOTS]);

export async function listSlotsByDate(date: string): Promise<ReservationSlot[]> {
  return store
    .filter((s) => s.date === date)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));
}

/** 고객 예약용: 해당 날짜의 예약 가능 시간 문자열 목록 */
export async function listAvailableTimes(date: string): Promise<string[]> {
  const slots = await listSlotsByDate(date);
  if (slots.length === 0) {
    // 슬롯 미생성일 경우 기본 시간대 노출 (Mock 편의)
    return [...DEFAULT_SLOT_TIMES];
  }
  return slots
    .filter((s) => s.status === "AVAILABLE" && s.currentCount < s.maxCapacity)
    .map((s) => s.startTime);
}

export async function createSlots(input: CreateSlotInput): Promise<ReservationSlot[]> {
  const created: ReservationSlot[] = input.times.map((t) => ({
    id: `s-${input.date.slice(5).replace("-", "")}-${t.replace(":", "")}`,
    date: input.date,
    startTime: t,
    endTime: SLOT_END_BY_START[t] ?? t,
    maxCapacity: input.maxCapacity ?? 1,
    currentCount: 0,
    status: "AVAILABLE",
  }));
  // 같은 날짜/시간 중복 제거 후 갱신
  for (const slot of created) {
    const idx = store.findIndex((s) => s.id === slot.id);
    if (idx >= 0) store[idx] = slot;
    else store.push(slot);
  }
  return created;
}

export async function setSlotStatus(
  id: string,
  status: SlotStatus
): Promise<void> {
  const s = store.find((x) => x.id === id);
  if (s) s.status = status;
}

/** 휴무일 등록: 해당 날짜 전체 슬롯 CLOSED 처리 */
export async function setHoliday(date: string): Promise<void> {
  store.forEach((s) => {
    if (s.date === date) s.status = "CLOSED";
  });
}
