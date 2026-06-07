"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Search, Check, X, CheckCheck, UserX, Ban, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { ReservationStatusBadge } from "@/components/ui/reservation-status-badge";
import type { Reservation, ReservationStatus } from "@/types";

const FILTERS: { label: string; value: ReservationStatus | "ALL" }[] = [
  { label: "전체", value: "ALL" },
  { label: "승인 대기", value: "PENDING" },
  { label: "예약 확정", value: "APPROVED" },
  { label: "방문 완료", value: "COMPLETED" },
  { label: "노쇼", value: "NO_SHOW" },
  { label: "취소/거절", value: "CANCELLED" },
];

export function AdminReservationsManager({
  initial,
}: {
  initial: Reservation[];
}) {
  const [reservations, setReservations] = useState(initial);
  const [filter, setFilter] = useState<ReservationStatus | "ALL">("ALL");
  const [programFilter, setProgramFilter] = useState<string>("ALL");
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const programOptions = useMemo(
    () =>
      Array.from(new Set(reservations.map((r) => r.programTitle))).sort((a, b) =>
        a.localeCompare(b, "ko")
      ),
    [reservations]
  );

  const counts = useMemo(() => {
    const matchStatus = (r: Reservation, value: ReservationStatus | "ALL") =>
      value === "ALL"
        ? true
        : value === "CANCELLED"
        ? r.status === "CANCELLED" || r.status === "REJECTED"
        : r.status === value;
    return FILTERS.reduce<Record<string, number>>((acc, f) => {
      acc[f.value] = reservations.filter((r) => matchStatus(r, f.value)).length;
      return acc;
    }, {});
  }, [reservations]);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2400);
  }

  function updateStatus(id: string, status: ReservationStatus, label: string) {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
    showToast(label);
  }

  const filtered = useMemo(() => {
    return reservations.filter((r) => {
      const matchFilter =
        filter === "ALL"
          ? true
          : filter === "CANCELLED"
          ? r.status === "CANCELLED" || r.status === "REJECTED"
          : r.status === filter;
      const matchProgram =
        programFilter === "ALL" || r.programTitle === programFilter;
      const q = query.trim().toLowerCase();
      const matchQuery =
        !q ||
        r.customerName.toLowerCase().includes(q) ||
        r.customerPhone.includes(q) ||
        r.reservationNumber.toLowerCase().includes(q) ||
        r.programTitle.toLowerCase().includes(q);
      return matchFilter && matchProgram && matchQuery;
    });
  }, [reservations, filter, programFilter, query]);

  return (
    <div>
      {/* Toast */}
      {toast && (
        <div className="fixed left-1/2 top-20 z-50 flex -translate-x-1/2 items-center gap-2 rounded-pill bg-brown px-5 py-3 text-sm text-ivory shadow-hover">
          <CheckCircle2 className="h-4 w-4 text-success" />
          {toast}
        </div>
      )}

      {/* Controls */}
      <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-pill px-4 py-2 text-sm font-medium transition-colors",
                filter === f.value
                  ? "bg-gold text-white"
                  : "bg-white text-brown/80 hover:bg-beige-light/60"
              )}
            >
              {f.label}
              <span
                className={cn(
                  "rounded-pill px-1.5 text-xs tabular-nums",
                  filter === f.value ? "bg-white/25 text-white" : "bg-beige-light/70 text-muted"
                )}
              >
                {counts[f.value] ?? 0}
              </span>
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-2 sm:flex-row md:items-center">
          <select
            value={programFilter}
            onChange={(e) => setProgramFilter(e.target.value)}
            className="h-11 rounded-input border border-line bg-white px-3 text-sm text-brown focus:border-gold focus:outline-none"
            aria-label="프로그램 필터"
          >
            <option value="ALL">전체 프로그램</option>
            {programOptions.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <div className="relative sm:w-72">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="고객명, 연락처, 예약번호 검색"
              className="h-11 pl-10 pr-9"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="검색어 지우기"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-brown"
              >
                <XCircle className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Result summary */}
      <p className="mb-3 text-sm text-muted">
        총 <span className="font-semibold text-brown">{filtered.length}</span>건
        {(filter !== "ALL" || programFilter !== "ALL" || query.trim()) && (
          <button
            type="button"
            onClick={() => {
              setFilter("ALL");
              setProgramFilter("ALL");
              setQuery("");
            }}
            className="ml-2 text-gold hover:underline"
          >
            필터 초기화
          </button>
        )}
      </p>

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-card border border-line bg-white shadow-card lg:block">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-line bg-beige-light/30 text-xs uppercase tracking-wider text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">예약번호</th>
              <th className="px-4 py-3 font-medium">고객명</th>
              <th className="px-4 py-3 font-medium">연락처</th>
              <th className="px-4 py-3 font-medium">프로그램</th>
              <th className="px-4 py-3 font-medium">예약일시</th>
              <th className="px-4 py-3 font-medium">상태</th>
              <th className="px-4 py-3 font-medium">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {filtered.map((r) => (
              <tr key={r.id} className="hover:bg-beige-light/20">
                <td className="px-4 py-3">
                  <Link href={`/admin/reservations/${r.id}`} className="text-gold hover:underline">
                    {r.reservationNumber}
                  </Link>
                </td>
                <td className="px-4 py-3 font-medium text-brown">{r.customerName}</td>
                <td className="px-4 py-3 text-muted">{r.customerPhone}</td>
                <td className="px-4 py-3 text-brown">{r.programTitle}</td>
                <td className="px-4 py-3 text-muted">
                  {format(new Date(r.date), "M.d(EEE)", { locale: ko })} {r.time}
                </td>
                <td className="px-4 py-3">
                  <ReservationStatusBadge status={r.status} />
                </td>
                <td className="px-4 py-3">
                  <RowActions reservation={r} onUpdate={updateStatus} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="py-12 text-center text-sm text-muted">
            조건에 맞는 예약이 없습니다.
          </p>
        )}
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 lg:hidden">
        {filtered.map((r) => (
          <div key={r.id} className="rounded-card border border-line bg-white p-4 shadow-card">
            <div className="flex items-center justify-between">
              <Link href={`/admin/reservations/${r.id}`} className="text-xs text-gold">
                {r.reservationNumber}
              </Link>
              <ReservationStatusBadge status={r.status} />
            </div>
            <p className="mt-2 font-semibold text-brown">
              {r.customerName} <span className="text-sm font-normal text-muted">{r.customerPhone}</span>
            </p>
            <p className="mt-1 text-sm text-muted">
              {r.programTitle} · {format(new Date(r.date), "M월 d일(EEE)", { locale: ko })} {r.time}
            </p>
            <div className="mt-3">
              <RowActions reservation={r} onUpdate={updateStatus} />
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="py-12 text-center text-sm text-muted">조건에 맞는 예약이 없습니다.</p>
        )}
      </div>
    </div>
  );
}

function RowActions({
  reservation,
  onUpdate,
}: {
  reservation: Reservation;
  onUpdate: (id: string, status: ReservationStatus, label: string) => void;
}) {
  const { id, status } = reservation;

  if (status === "PENDING") {
    return (
      <div className="flex flex-wrap gap-2">
        <ActionBtn icon={Check} label="승인" tone="success" onClick={() => onUpdate(id, "APPROVED", "예약을 승인했습니다.")} />
        <ActionBtn icon={X} label="거절" tone="error" onClick={() => onUpdate(id, "REJECTED", "예약을 거절했습니다.")} />
      </div>
    );
  }
  if (status === "APPROVED") {
    return (
      <div className="flex flex-wrap gap-2">
        <ActionBtn icon={CheckCheck} label="방문완료" tone="success" onClick={() => onUpdate(id, "COMPLETED", "방문 완료 처리했습니다.")} />
        <ActionBtn icon={UserX} label="노쇼" tone="muted" onClick={() => onUpdate(id, "NO_SHOW", "노쇼 처리했습니다.")} />
        <ActionBtn icon={Ban} label="취소" tone="error" onClick={() => onUpdate(id, "CANCELLED", "예약을 취소했습니다.")} />
      </div>
    );
  }
  return (
    <Link href={`/admin/reservations/${id}`} className="text-sm text-muted hover:text-gold">
      상세보기
    </Link>
  );
}

function ActionBtn({
  icon: Icon,
  label,
  tone,
  onClick,
}: {
  icon: typeof Check;
  label: string;
  tone: "success" | "error" | "muted";
  onClick: () => void;
}) {
  const toneClass = {
    success: "border-success/40 text-success hover:bg-success/10",
    error: "border-error/40 text-error hover:bg-error/10",
    muted: "border-line text-muted hover:bg-beige-light/60",
  }[tone];
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1 rounded-pill border px-3 py-1.5 text-xs font-medium transition-colors",
        toneClass
      )}
    >
      <Icon className="h-3.5 w-3.5" /> {label}
    </button>
  );
}
