import type { Customer } from "@/types";

// 고객 Mock (users + 예약 집계 뷰 모델)
export const CUSTOMERS: Customer[] = [
  {
    id: "c1",
    name: "김서연",
    phone: "010-1234-5678",
    email: "seoyeon@example.com",
    reservationCount: 5,
    lastVisitAt: "2026-06-07",
    createdAt: "2025-11-02",
  },
  {
    id: "c2",
    name: "이지은",
    phone: "010-2345-6789",
    reservationCount: 3,
    lastVisitAt: "2026-05-28",
    createdAt: "2025-12-15",
  },
  {
    id: "c3",
    name: "박민지",
    phone: "010-3456-7890",
    reservationCount: 1,
    lastVisitAt: "2026-06-08",
    createdAt: "2026-06-06",
  },
  {
    id: "c4",
    name: "최유진",
    phone: "010-4567-8901",
    email: "yujin@example.com",
    reservationCount: 8,
    lastVisitAt: "2026-06-08",
    createdAt: "2025-08-20",
  },
  {
    id: "c5",
    name: "정하나",
    phone: "010-5678-9012",
    reservationCount: 2,
    lastVisitAt: "2026-06-05",
    createdAt: "2026-03-11",
  },
];
