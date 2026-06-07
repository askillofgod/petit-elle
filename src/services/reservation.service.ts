/**
 * Reservation Service Layer
 * 현재는 더미 데이터를 반환/조작한다. Supabase 연동 시 내부 구현만 교체한다.
 */
import { DUMMY_RESERVATIONS, MY_RESERVATIONS } from "@/lib/dummy-data";
import type { Reservation, ReservationStatus } from "@/types";

export interface CreateReservationInput {
  programId: string;
  programTitle: string;
  date: string;
  time: string;
  customerName: string;
  customerPhone: string;
  requestNote?: string;
}

/** 예약번호 생성: PE + YYYYMMDD + 4자리 순번 (05_DATABASE_SPEC.md 15) */
export function generateReservationNumber(date: Date, seq: number): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `PE${y}${m}${d}${String(seq).padStart(4, "0")}`;
}

export async function listReservations(filter?: {
  status?: ReservationStatus;
}): Promise<Reservation[]> {
  const all = [...DUMMY_RESERVATIONS].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt)
  );
  return filter?.status ? all.filter((r) => r.status === filter.status) : all;
}

export async function getReservation(id: string): Promise<Reservation | null> {
  return DUMMY_RESERVATIONS.find((r) => r.id === id) ?? null;
}

export async function listMyReservations(): Promise<Reservation[]> {
  return MY_RESERVATIONS;
}

// 연동 단계 구현 예정: createReservation / updateReservationStatus
// export async function createReservation(input: CreateReservationInput): Promise<Reservation> { ... }
// export async function updateReservationStatus(id: string, status: ReservationStatus): Promise<void> { ... }
