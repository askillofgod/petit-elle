import type { ReservationSlot } from "@/types";

// 기본 시간대 — 02 PRD 11번
export const DEFAULT_SLOT_TIMES = [
  "11:00",
  "12:30",
  "14:00",
  "15:30",
  "17:00",
  "18:30",
  "20:00",
] as const;

// 시작시간 → 종료시간 매핑 (슬롯 서비스에서도 재사용)
export const SLOT_END_BY_START: Record<string, string> = {
  "11:00": "12:00",
  "12:30": "13:30",
  "14:00": "15:00",
  "15:30": "16:30",
  "17:00": "18:00",
  "18:30": "19:30",
  "20:00": "21:00",
};

function buildSlots(date: string, blocked: string[] = []): ReservationSlot[] {
  return DEFAULT_SLOT_TIMES.map((t) => ({
    id: `s-${date.slice(5).replace("-", "")}-${t.replace(":", "")}`,
    date,
    startTime: t,
    endTime: SLOT_END_BY_START[t] ?? t,
    maxCapacity: 1,
    currentCount: 0,
    status: blocked.includes(t) ? "BLOCKED" : "AVAILABLE",
  }));
}

// 슬롯 Mock (관리자 일정관리 시연용)
export const SLOTS: ReservationSlot[] = [
  ...buildSlots("2026-06-08", ["12:30"]),
  ...buildSlots("2026-06-09", ["20:00"]),
  ...buildSlots("2026-06-10"),
];
