import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Tailwind 클래스 병합 유틸 (shadcn 표준) */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** 원화 포맷: 179000 -> "179,000원" */
export function formatPrice(value: number): string {
  return `${value.toLocaleString("ko-KR")}원`;
}
