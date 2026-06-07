"use client";

import { cn } from "@/lib/utils";
import { DEFAULT_TIME_SLOTS } from "@/constants/site";

/** 날짜 문자열 기반으로 결정적 더미 가용성 생성 (일부 시간 마감 처리) */
function getDisabledSlots(dateStr: string): Set<string> {
  const seed = dateStr
    .split("-")
    .reduce((acc, n) => acc + parseInt(n, 10), 0);
  const disabled = new Set<string>();
  DEFAULT_TIME_SLOTS.forEach((slot, i) => {
    if ((seed + i) % 3 === 0) disabled.add(slot);
  });
  return disabled;
}

export function TimeSlotSelector({
  date,
  selected,
  onSelect,
}: {
  date: string;
  selected: string | null;
  onSelect: (time: string) => void;
}) {
  const disabledSlots = getDisabledSlots(date);

  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
      {DEFAULT_TIME_SLOTS.map((slot) => {
        const disabled = disabledSlots.has(slot);
        const isSelected = selected === slot;
        return (
          <button
            key={slot}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(slot)}
            className={cn(
              "h-12 rounded-input border text-sm font-medium transition-colors",
              disabled &&
                "cursor-not-allowed border-line bg-beige-light/30 text-muted/40 line-through",
              !disabled &&
                !isSelected &&
                "border-line bg-white text-brown hover:border-gold hover:bg-gold/5",
              isSelected && "border-gold bg-gold text-white"
            )}
          >
            {slot}
          </button>
        );
      })}
    </div>
  );
}
