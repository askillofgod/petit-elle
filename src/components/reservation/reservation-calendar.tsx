"use client";

import { useState } from "react";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isBefore,
  isSameDay,
  startOfMonth,
  startOfToday,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

/** 일요일 휴무 + 과거 날짜 비활성화 (운영정책 기준) */
function isDisabled(day: Date, today: Date) {
  if (isBefore(day, today)) return true;
  if (getDay(day) === 0) return true; // 일요일 휴무
  return false;
}

export function ReservationCalendar({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (dateStr: string) => void;
}) {
  const today = startOfToday();
  const [cursor, setCursor] = useState(startOfMonth(today));

  const monthStart = startOfMonth(cursor);
  const monthEnd = endOfMonth(cursor);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const leadingBlanks = getDay(monthStart);

  const canGoPrev = !isSameDay(monthStart, startOfMonth(today));

  return (
    <div className="rounded-card border border-line bg-white p-md shadow-card md:p-lg">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => canGoPrev && setCursor(addMonths(cursor, -1))}
          disabled={!canGoPrev}
          aria-label="이전 달"
          className="flex h-9 w-9 items-center justify-center rounded-full text-brown hover:bg-beige/20 disabled:opacity-30"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="text-base font-semibold text-brown">
          {format(cursor, "yyyy년 M월")}
        </span>
        <button
          type="button"
          onClick={() => setCursor(addMonths(cursor, 1))}
          aria-label="다음 달"
          className="flex h-9 w-9 items-center justify-center rounded-full text-brown hover:bg-beige/20"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1 text-center">
        {WEEKDAYS.map((d, i) => (
          <div
            key={d}
            className={cn(
              "py-2 text-xs font-medium",
              i === 0 ? "text-error/70" : "text-muted"
            )}
          >
            {d}
          </div>
        ))}

        {Array.from({ length: leadingBlanks }).map((_, i) => (
          <div key={`blank-${i}`} />
        ))}

        {days.map((day) => {
          const dateStr = format(day, "yyyy-MM-dd");
          const disabled = isDisabled(day, today);
          const isSelected = selected === dateStr;
          return (
            <button
              key={dateStr}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(dateStr)}
              className={cn(
                "relative mx-auto flex h-11 w-11 flex-col items-center justify-center rounded-full text-sm transition-colors",
                disabled && "cursor-not-allowed text-muted/30",
                !disabled && !isSelected && "text-brown hover:bg-beige/25",
                isSelected && "bg-gold font-semibold text-white"
              )}
            >
              {format(day, "d")}
              {/* 예약 가능 표시 점 */}
              {!disabled && !isSelected && (
                <span className="absolute bottom-1.5 h-1 w-1 rounded-full bg-gold" />
              )}
            </button>
          );
        })}
      </div>

      <p className="mt-4 flex items-center gap-2 text-xs text-muted">
        <span className="h-1.5 w-1.5 rounded-full bg-gold" /> 예약 가능 · 일요일은
        휴무입니다
      </p>
    </div>
  );
}
