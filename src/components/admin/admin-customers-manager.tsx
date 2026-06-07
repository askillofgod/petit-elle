"use client";

import { useMemo, useState } from "react";
import { format } from "date-fns";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { AdminCard } from "@/components/admin/admin-ui";
import { Badge } from "@/components/ui/badge";
import type { Customer } from "@/types";

type SortKey = "visits" | "recent" | "name";
type Segment = "ALL" | "regular" | "normal";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "visits", label: "예약 많은순" },
  { key: "recent", label: "최근 방문순" },
  { key: "name", label: "이름순" },
];
const SEGMENTS: { key: Segment; label: string }[] = [
  { key: "ALL", label: "전체" },
  { key: "regular", label: "단골(5회+)" },
  { key: "normal", label: "일반" },
];

export function AdminCustomersManager({ initial }: { initial: Customer[] }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("visits");
  const [segment, setSegment] = useState<Segment>("ALL");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = initial.filter((c) => {
      const matchQuery =
        !q || c.name.toLowerCase().includes(q) || c.phone.includes(q);
      const matchSegment =
        segment === "ALL"
          ? true
          : segment === "regular"
          ? c.reservationCount >= 5
          : c.reservationCount < 5;
      return matchQuery && matchSegment;
    });
    const sorted = [...filtered].sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name, "ko");
      if (sort === "recent")
        return (b.lastVisitAt ?? "").localeCompare(a.lastVisitAt ?? "");
      return b.reservationCount - a.reservationCount;
    });
    return sorted;
  }, [initial, query, sort, segment]);

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {SORTS.map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => setSort(s.key)}
              className={cn(
                "rounded-pill px-4 py-2 text-sm font-medium transition-colors",
                sort === s.key
                  ? "bg-gold text-white"
                  : "bg-white text-brown/80 hover:bg-beige-light/60"
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
        <div className="relative md:w-72">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="고객명, 연락처 검색"
            className="h-11 pl-10"
          />
        </div>
      </div>

      {/* Segment filter + result count */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {SEGMENTS.map((s) => (
          <button
            key={s.key}
            type="button"
            onClick={() => setSegment(s.key)}
            className={cn(
              "rounded-pill px-3 py-1.5 text-xs font-medium transition-colors",
              segment === s.key
                ? "bg-brown text-ivory"
                : "bg-white text-brown/70 hover:bg-beige-light/60"
            )}
          >
            {s.label}
          </button>
        ))}
        <span className="ml-auto text-sm text-muted">
          총 <span className="font-semibold text-brown">{rows.length}</span>명
        </span>
      </div>

      {/* Desktop table */}
      <AdminCard className="hidden overflow-hidden lg:block">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-line bg-beige-light/30 text-xs uppercase tracking-wider text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">고객명</th>
              <th className="px-4 py-3 font-medium">연락처</th>
              <th className="px-4 py-3 font-medium">예약 횟수</th>
              <th className="px-4 py-3 font-medium">최근 방문일</th>
              <th className="px-4 py-3 font-medium">가입일</th>
              <th className="px-4 py-3 font-medium">상태</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((c) => (
              <tr key={c.id} className="hover:bg-beige-light/20">
                <td className="px-4 py-3 font-medium text-brown">{c.name}</td>
                <td className="px-4 py-3 text-muted">{c.phone}</td>
                <td className="px-4 py-3 text-brown">{c.reservationCount}회</td>
                <td className="px-4 py-3 text-muted">
                  {c.lastVisitAt ? format(new Date(c.lastVisitAt), "yyyy.MM.dd") : "—"}
                </td>
                <td className="px-4 py-3 text-muted">
                  {format(new Date(c.createdAt), "yyyy.MM.dd")}
                </td>
                <td className="px-4 py-3">
                  {c.reservationCount >= 5 ? (
                    <Badge variant="gold">단골</Badge>
                  ) : (
                    <Badge variant="default">일반</Badge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && (
          <p className="py-12 text-center text-sm text-muted">검색 결과가 없습니다.</p>
        )}
      </AdminCard>

      {/* Mobile cards */}
      <div className="space-y-3 lg:hidden">
        {rows.map((c) => (
          <div key={c.id} className="rounded-card border border-line bg-white p-4 shadow-card">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-brown">{c.name}</p>
              {c.reservationCount >= 5 ? (
                <Badge variant="gold">단골</Badge>
              ) : (
                <Badge variant="default">일반</Badge>
              )}
            </div>
            <p className="mt-1 text-sm text-muted">{c.phone}</p>
            <p className="mt-2 text-sm text-muted">
              예약 {c.reservationCount}회 · 최근{" "}
              {c.lastVisitAt ? format(new Date(c.lastVisitAt), "yyyy.MM.dd") : "—"}
            </p>
          </div>
        ))}
        {rows.length === 0 && (
          <p className="py-12 text-center text-sm text-muted">검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
