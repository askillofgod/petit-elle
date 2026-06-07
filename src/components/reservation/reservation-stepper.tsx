import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = ["프로그램", "날짜", "시간", "정보 입력", "확인"];

export function ReservationStepper({ current }: { current: number }) {
  return (
    <ol className="flex items-center justify-center gap-1 md:gap-2">
      {STEPS.map((label, i) => {
        const stepNum = i + 1;
        const done = stepNum < current;
        const active = stepNum === current;
        return (
          <li key={label} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <span
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors md:h-9 md:w-9",
                  done && "bg-gold text-white",
                  active && "bg-gold text-white ring-4 ring-gold/20",
                  !done && !active && "bg-beige-light text-muted"
                )}
              >
                {done ? <Check className="h-4 w-4" /> : stepNum}
              </span>
              <span
                className={cn(
                  "hidden text-xs sm:block",
                  active ? "font-medium text-brown" : "text-muted"
                )}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <span
                className={cn(
                  "mx-1 h-px w-6 md:w-12",
                  done ? "bg-gold" : "bg-line"
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
