/**
 * Customer Service Layer
 * users + 예약 집계 뷰 모델 반환. 현재 Mock 기반.
 */
import { CUSTOMERS } from "@/lib/mock/customers.mock";
import { listReservations } from "@/services/reservation.service";
import type { Customer, Reservation } from "@/types";

export async function listCustomers(query?: string): Promise<Customer[]> {
  const all = [...CUSTOMERS].sort((a, b) => b.reservationCount - a.reservationCount);
  const q = query?.trim().toLowerCase();
  if (!q) return all;
  return all.filter(
    (c) => c.name.toLowerCase().includes(q) || c.phone.includes(q)
  );
}

export async function getCustomer(id: string): Promise<Customer | null> {
  return CUSTOMERS.find((c) => c.id === id) ?? null;
}

export async function getCustomerReservations(
  customerId: string
): Promise<Reservation[]> {
  const all = await listReservations();
  return all.filter((r) => r.userId === customerId);
}

export async function updateCustomerProfile(
  id: string,
  input: { name?: string; phone?: string; email?: string; marketingAgreement?: boolean }
): Promise<Customer | null> {
  const c = CUSTOMERS.find((x) => x.id === id);
  if (!c) return null;
  if (input.name !== undefined) c.name = input.name;
  if (input.phone !== undefined) c.phone = input.phone;
  if (input.email !== undefined) c.email = input.email;
  return c;
}
