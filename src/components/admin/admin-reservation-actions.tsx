"use client";

import { useState } from "react";
import { Check, X, CheckCheck, UserX, Ban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReservationStatusBadge } from "@/components/ui/reservation-status-badge";
import type { ReservationStatus } from "@/types";

export function AdminReservationActions({
  initialStatus,
}: {
  initialStatus: ReservationStatus;
}) {
  const [status, setStatus] = useState<ReservationStatus>(initialStatus);
  const [msg, setMsg] = useState<string | null>(null);

  function update(next: ReservationStatus, label: string) {
    setStatus(next);
    setMsg(label);
    setTimeout(() => setMsg(null), 2400);
  }

  return (
    <div className="rounded-card border border-line bg-white p-5 shadow-card">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted">현재 상태</span>
        <ReservationStatusBadge status={status} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {status === "PENDING" && (
          <>
            <Button size="sm" onClick={() => update("APPROVED", "예약을 승인했습니다.")}>
              <Check className="h-4 w-4" /> 승인
            </Button>
            <Button size="sm" variant="danger" onClick={() => update("REJECTED", "예약을 거절했습니다.")}>
              <X className="h-4 w-4" /> 거절
            </Button>
          </>
        )}
        {status === "APPROVED" && (
          <>
            <Button size="sm" onClick={() => update("COMPLETED", "방문 완료 처리했습니다.")}>
              <CheckCheck className="h-4 w-4" /> 방문 완료
            </Button>
            <Button size="sm" variant="secondary" onClick={() => update("NO_SHOW", "노쇼 처리했습니다.")}>
              <UserX className="h-4 w-4" /> 노쇼
            </Button>
            <Button size="sm" variant="danger" onClick={() => update("CANCELLED", "예약을 취소했습니다.")}>
              <Ban className="h-4 w-4" /> 취소
            </Button>
          </>
        )}
        {!["PENDING", "APPROVED"].includes(status) && (
          <p className="text-sm text-muted">추가 처리가 필요하지 않은 상태입니다.</p>
        )}
      </div>

      {msg && (
        <p className="mt-4 rounded-input bg-success/10 px-4 py-2.5 text-sm text-success">
          {msg}
        </p>
      )}
    </div>
  );
}
