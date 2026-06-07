// Petit Elle 공통 도메인 타입 — 05_DATABASE_SPEC.md 기준
//
// 설계 원칙:
// - 앱 내부는 camelCase 도메인 타입을 사용한다.
// - Supabase 연동 시 서비스 레이어(src/services)가 snake_case DB row → 도메인 타입으로 매핑한다.
// - 일부 타입은 조인/집계 결과를 담는 "뷰 모델"이다 (주석으로 표기).

export type ReservationStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "CANCELLED"
  | "COMPLETED"
  | "NO_SHOW";

export type SlotStatus = "AVAILABLE" | "BLOCKED" | "CLOSED";

export type AdminRole = "SUPER_ADMIN" | "ADMIN";

/** programs 테이블 매핑. durations 는 duration_options(integer[]) 와 매핑된다. */
export interface Program {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  /** 효과/특징 리스트 → programs.benefits (text[]) */
  benefits: string[];
  /** 분 단위 옵션 → programs.duration_options (integer[]). 단일이면 길이 1 */
  durations: number[];
  /** 기준가 → programs.price */
  price: number;
  thumbnail: string;
  displayOrder: number;
  isActive: boolean;
  /** programs.is_signature */
  isSignature?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/** reservation_slots 테이블 매핑. */
export interface ReservationSlot {
  id: string;
  date: string; // slot_date (YYYY-MM-DD)
  startTime: string; // start_time (HH:mm)
  endTime: string; // end_time (HH:mm)
  maxCapacity: number; // max_capacity
  currentCount: number; // current_reservation_count
  status: SlotStatus;
  memo?: string;
}

/**
 * reservations 조회 뷰 모델.
 * DB 상 date/time/programTitle 은 slot/program 조인으로 채워진다.
 */
export interface Reservation {
  id: string;
  reservationNumber: string; // PE202606070001
  userId?: string;
  programId: string;
  programTitle: string; // join programs.title
  slotId?: string;
  date: string; // join slot.slot_date (YYYY-MM-DD)
  time: string; // join slot.start_time (HH:mm)
  customerName: string;
  customerPhone: string;
  requestNote?: string;
  status: ReservationStatus;
  approvedAt?: string;
  cancelledAt?: string;
  completedAt?: string;
  createdAt: string; // ISO
}

/**
 * 고객 목록 뷰 모델 (users + 예약 집계).
 * reservationCount / lastVisitAt 는 reservations 집계로 계산된다.
 */
export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  reservationCount: number;
  lastVisitAt?: string;
  createdAt: string;
}

/** admins 테이블 매핑. */
export interface Admin {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  isActive: boolean;
}

/** notices 테이블 매핑. */
export interface Notice {
  id: string;
  title: string;
  content: string;
  isVisible: boolean;
  createdAt: string;
}

/** business_hours 테이블 매핑. dayOfWeek: 0=일 ~ 6=토 */
export interface BusinessHour {
  dayOfWeek: number;
  openTime: string | null;
  closeTime: string | null;
  isOpen: boolean;
}

/** settings 테이블 매핑 (단일 row). */
export interface SiteSettings {
  siteName: string;
  representative: string;
  phone: string;
  email: string;
  address: string;
  addressDetail?: string;
  instagramUrl: string;
  blogUrl: string;
  kakaoChannelUrl: string;
  businessHours: string;
  closedDay: string;
  parking: string;
}

/** 관리자 대시보드 통계 (집계 결과). */
export interface DashboardStats {
  todayReservations: number;
  pending: number;
  completed: number;
  newCustomers: number;
  noShow: number;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  span?: "wide" | "tall" | "normal";
}

/**
 * 서버 액션 표준 반환 타입.
 * 실제 Supabase 연동 후에도 동일 시그니처를 유지한다.
 */
export type ActionResult<T = void> =
  | { ok: true; data: T; message?: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };
