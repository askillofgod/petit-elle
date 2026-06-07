// Petit Elle 공통 타입 — 05_DATABASE_SPEC.md 기준

export type ReservationStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "CANCELLED"
  | "COMPLETED"
  | "NO_SHOW";

export type SlotStatus = "AVAILABLE" | "BLOCKED" | "CLOSED";

export interface Program {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  /** 효과/특징 리스트 (상세 페이지) */
  benefits: string[];
  /** 분 단위 옵션. 단일이면 길이 1 */
  durations: number[];
  /** 최저가(기준가) */
  price: number;
  thumbnail: string;
  displayOrder: number;
  isActive: boolean;
  /** 대표 프로그램 여부 */
  isSignature?: boolean;
}

export interface ReservationSlot {
  id: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  status: SlotStatus;
}

export interface Reservation {
  id: string;
  reservationNumber: string; // PE202606070001
  programId: string;
  programTitle: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  customerName: string;
  customerPhone: string;
  requestNote?: string;
  status: ReservationStatus;
  createdAt: string; // ISO
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  reservationCount: number;
  lastVisitAt?: string;
  createdAt: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  /** 갤러리 레이아웃에서 차지하는 비중 */
  span?: "wide" | "tall" | "normal";
}
