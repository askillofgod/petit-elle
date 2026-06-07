/**
 * Reservation Service Layer
 *
 * 현재는 Mock 데이터 기반. Supabase 연동 시 내부 구현만 교체한다.
 * 예약 생성 시 slot/program 조인 및 슬롯 카운트 증가는 연동 단계에서 트랜잭션 처리.
 */
import { RESERVATIONS, MY_USER_ID } from "@/lib/mock/reservations.mock";
import { mockStore } from "@/lib/mock/store";
import { getProgramById } from "@/services/program.service";
import type {
  DashboardStats,
  Reservation,
  ReservationStatus,
} from "@/types";
import type { CreateReservationInput } from "@/lib/validations/reservation.schema";

const store = mockStore<Reservation[]>("reservations", () => [...RESERVATIONS]);

/** 예약번호 생성: PE + YYYYMMDD + 4자리 순번 (05 DATABASE_SPEC 15) */
export function generateReservationNumber(date: Date, seq: number): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `PE${y}${m}${d}${String(seq).padStart(4, "0")}`;
}

export async function listReservations(filter?: {
  status?: ReservationStatus;
}): Promise<Reservation[]> {
  const all = [...store].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return filter?.status ? all.filter((r) => r.status === filter.status) : all;
}

export async function getReservation(id: string): Promise<Reservation | null> {
  return store.find((r) => r.id === id) ?? null;
}

export async function listMyReservations(
  userId: string = MY_USER_ID
): Promise<Reservation[]> {
  return [...store]
    .filter((r) => r.userId === userId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function createReservation(
  input: CreateReservationInput
): Promise<Reservation> {
  const program = await getProgramById(input.programId);
  const now = new Date();
  const todaySeq =
    store.filter((r) => r.createdAt.slice(0, 10) === now.toISOString().slice(0, 10))
      .length + 1;
  const reservation: Reservation = {
    id: `r-${Date.now()}`,
    reservationNumber: generateReservationNumber(now, todaySeq),
    programId: input.programId,
    programTitle: program?.title ?? "프로그램",
    date: input.date,
    time: input.time,
    customerName: input.customerName,
    customerPhone: input.customerPhone,
    requestNote: input.requestNote,
    status: "PENDING",
    createdAt: now.toISOString(),
  };
  store.unshift(reservation);
  return reservation;
}

export async function updateReservationStatus(
  id: string,
  status: ReservationStatus
): Promise<Reservation | null> {
  const r = store.find((x) => x.id === id);
  if (!r) return null;
  r.status = status;
  const nowIso = new Date().toISOString();
  if (status === "APPROVED") r.approvedAt = nowIso;
  if (status === "CANCELLED" || status === "REJECTED") r.cancelledAt = nowIso;
  if (status === "COMPLETED") r.completedAt = nowIso;
  return r;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const today = new Date().toISOString().slice(0, 10);
  return {
    todayReservations: store.filter((r) => r.date === today).length || 8,
    pending: store.filter((r) => r.status === "PENDING").length,
    completed: store.filter((r) => r.status === "COMPLETED").length,
    newCustomers: 2,
    noShow: store.filter((r) => r.status === "NO_SHOW").length,
  };
}
