"use client";

import { useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

export function ReservationCompleteDetails() {
  const params = useSearchParams();
  const program = params.get("program");
  const date = params.get("date");
  const time = params.get("time");
  const name = params.get("name");

  if (!program && !date) return null;

  const prettyDate = date
    ? format(new Date(date), "yyyy년 M월 d일 (EEE)", { locale: ko })
    : null;

  return (
    <dl className="mt-6 space-y-2.5 rounded-input bg-beige-light/40 p-5 text-left text-sm">
      {program && <Row label="프로그램" value={program} />}
      {prettyDate && <Row label="예약 날짜" value={prettyDate} />}
      {time && <Row label="예약 시간" value={time} />}
      {name && <Row label="예약자" value={name} />}
      <Row label="상태" value="승인 대기" highlight />
    </dl>
  );
}

function Row({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted">{label}</dt>
      <dd className={highlight ? "font-semibold text-warning" : "font-medium text-brown"}>
        {value}
      </dd>
    </div>
  );
}
