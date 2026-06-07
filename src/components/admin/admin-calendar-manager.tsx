"use client";

import { useState, useTransition } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Plus, CalendarOff, Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ReservationCalendar } from "@/components/reservation/reservation-calendar";
import { AdminCard } from "@/components/admin/admin-ui";
import { DEFAULT_SLOT_TIMES } from "@/lib/mock/slots.mock";
import { timeStringSchema } from "@/lib/validations/slot.schema";
import { createSlotAction, setHolidayAction } from "@/app/actions/slot.actions";

type SlotState = Record<string, "AVAILABLE" | "BLOCKED">;

export function AdminCalendarManager() {
  const [date, setDate] = useState<string | null>(null);
  const [slots, setSlots] = useState<SlotState>(() =>
    Object.fromEntries(DEFAULT_SLOT_TIMES.map((s) => [s, "AVAILABLE"]))
  );
  const [customTime, setCustomTime] = useState("");
  const [timeError, setTimeError] = useState<string | null>(null);
  const [holiday, setHoliday] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  function flash(ok: boolean, text: string) {
    setMsg({ ok, text });
    setTimeout(() => setMsg(null), 2600);
  }

  function selectDate(d: string) {
    setDate(d);
    setHoliday(false);
    setSlots(Object.fromEntries(DEFAULT_SLOT_TIMES.map((s) => [s, "AVAILABLE"])));
  }

  function toggleSlot(time: string) {
    setSlots((prev) => ({
      ...prev,
      [time]: prev[time] === "AVAILABLE" ? "BLOCKED" : "AVAILABLE",
    }));
  }

  function addCustom() {
    const t = customTime.trim();
    const parsed = timeStringSchema.safeParse(t);
    if (!parsed.success) {
      setTimeError(parsed.error.issues[0]?.message ?? "올바른 시간을 입력해주세요.");
      return;
    }
    if (t in slots) {
      setTimeError("이미 추가된 시간입니다.");
      return;
    }
    setSlots((prev) => ({ ...prev, [t]: "AVAILABLE" }));
    setCustomTime("");
    setTimeError(null);
  }

  function saveSlots() {
    if (!date) return;
    const times = Object.entries(slots)
      .filter(([, v]) => v === "AVAILABLE")
      .map(([t]) => t)
      .sort();
    startTransition(async () => {
      const res = await createSlotAction({ date, times, maxCapacity: 1 });
      flash(res.ok, res.ok ? res.message ?? "저장되었습니다." : res.error);
    });
  }

  function registerHoliday() {
    if (!date) return;
    startTransition(async () => {
      const res = await setHolidayAction(date);
      if (res.ok) {
        setHoliday(true);
        flash(true, res.message ?? "휴무일로 등록했습니다.");
      } else {
        flash(false, res.error);
      }
    });
  }

  const sortedTimes = Object.keys(slots).sort();

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div>
        <ReservationCalendar selected={date} onSelect={selectDate} />
        {msg && (
          <p
            className={cn(
              "mt-4 flex items-center gap-2 rounded-input px-4 py-2.5 text-sm",
              msg.ok ? "bg-success/10 text-success" : "bg-error/10 text-error"
            )}
          >
            {msg.ok && <CheckCircle2 className="h-4 w-4" />}
            {msg.text}
          </p>
        )}
      </div>

      <div>
        <AdminCard
          title={
            date
              ? `${format(new Date(date), "M월 d일 (EEE)", { locale: ko })} 일정`
              : "날짜를 선택하세요"
          }
        >
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
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm text-muted">
                  시간을 눌러 가능(골드)/마감(회색) 전환
                </p>
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() =>
                      setSlots((prev) =>
                        Object.fromEntries(Object.keys(prev).map((t) => [t, "AVAILABLE"]))
                      )
                    }
                    className="rounded-pill bg-gold/10 px-3 py-1 text-xs font-medium text-gold hover:bg-gold/20"
                  >
                    모두 가능
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setSlots((prev) =>
                        Object.fromEntries(Object.keys(prev).map((t) => [t, "BLOCKED"]))
                      )
                    }
                    className="rounded-pill bg-beige-light px-3 py-1 text-xs font-medium text-muted hover:bg-line"
                  >
                    모두 마감
                  </button>
                </div>
              </div>
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

              <div className="mt-4">
                <div className="flex gap-2">
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
                {timeError && <p className="mt-1.5 text-xs text-error">{timeError}</p>}
              </div>

              <div className="mt-5 flex gap-2 border-t border-line pt-4">
                <Button size="sm" className="flex-1" onClick={saveSlots} disabled={isPending}>
                  {isPending && <Loader2 className="h-4 w-4 animate-spin" />} 저장
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-error hover:bg-error/10"
                  onClick={registerHoliday}
                  disabled={isPending}
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
