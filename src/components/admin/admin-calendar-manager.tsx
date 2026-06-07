"use client";

import { useState } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Plus, CalendarOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ReservationCalendar } from "@/components/reservation/reservation-calendar";
import { AdminCard } from "@/components/admin/admin-ui";
import { DEFAULT_TIME_SLOTS } from "@/constants/site";

type SlotState = Record<string, "AVAILABLE" | "BLOCKED">;

export function AdminCalendarManager() {
  const [date, setDate] = useState<string | null>(null);
  const [slots, setSlots] = useState<SlotState>(() =>
    Object.fromEntries(DEFAULT_TIME_SLOTS.map((s) => [s, "AVAILABLE"]))
  );
  const [customTime, setCustomTime] = useState("");
  const [holiday, setHoliday] = useState(false);

  function toggleSlot(time: string) {
    setSlots((prev) => ({
      ...prev,
      [time]: prev[time] === "AVAILABLE" ? "BLOCKED" : "AVAILABLE",
    }));
  }

  function addCustom() {
    const t = customTime.trim();
    if (/^\d{2}:\d{2}$/.test(t) && !(t in slots)) {
      setSlots((prev) => ({ ...prev, [t]: "AVAILABLE" }));
      setCustomTime("");
    }
  }

  const sortedTimes = Object.keys(slots).sort();

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div>
        <ReservationCalendar selected={date} onSelect={setDate} />
      </div>

      <div>
        <AdminCard title={date ? `${format(new Date(date), "M월 d일 (EEE)", { locale: ko })} 일정` : "날짜를 선택하세요"}>
          {!date ? (
            <p className="px-5 py-12 text-center text-sm text-muted">
              왼쪽 달력에서 일정을 관리할 날짜를 선택해주세요.
            </p>
          ) : holiday ? (
            <div className="px-5 py-10 text-center">
              <CalendarOff className="mx-auto h-8 w-8 text-error" />
              <p className="mt-3 text-sm font-medium text-brown">휴무일로 등록됨</p>
              <Button variant="ghost" size="sm" className="mt-3" onClick={() => setHoliday(false)}>
                휴무 해제
              </Button>
            </div>
          ) : (
            <div className="p-5">
              <p className="mb-3 text-sm text-muted">
                시간을 눌러 예약 가능/마감을 전환할 수 있습니다.
              </p>
              <div className="grid grid-cols-3 gap-2">
                {sortedTimes.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => toggleSlot(t)}
                    className={cn(
                      "h-11 rounded-input border text-sm font-medium transition-colors",
                      slots[t] === "AVAILABLE"
                        ? "border-gold/40 bg-gold/10 text-gold"
                        : "border-line bg-beige-light/30 text-muted line-through"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="mt-4 flex gap-2">
                <Input
                  value={customTime}
                  onChange={(e) => setCustomTime(e.target.value)}
                  placeholder="예: 19:00"
                  className="h-11"
                />
                <Button variant="secondary" onClick={addCustom} className="h-11 shrink-0">
                  <Plus className="h-4 w-4" /> 시간 추가
                </Button>
              </div>

              <div className="mt-5 flex gap-2 border-t border-line pt-4">
                <Button size="sm" className="flex-1">저장</Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-error hover:bg-error/10"
                  onClick={() => setHoliday(true)}
                >
                  <CalendarOff className="h-4 w-4" /> 휴무일 등록
                </Button>
              </div>
            </div>
          )}
        </AdminCard>
      </div>
    </div>
  );
}
