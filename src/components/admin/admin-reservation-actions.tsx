"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, X, CheckCheck, UserX, Ban, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReservationStatusBadge } from "@/components/ui/reservation-status-badge";
import type { ActionResult, Reservation, ReservationStatus } from "@/types";
import {
  approveReservationAction,
  rejectReservationAction,
  completeReservationAction,
  noShowReservationAction,
  cancelReservationAction,
} from "@/app/actions/reservation.actions";

export function AdminReservationActions({
  id,
  initialStatus,
}: {
  id: string;
  initialStatus: ReservationStatus;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<ReservationStatus>(initialStatus);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  function run(action: () => Promise<ActionResult<Reservation>>) {
    startTransition(async () => {
      const res = await action();
      if (res.ok) {
        setStatus(res.data.status);
        setMsg({ ok: true, text: res.message ?? "처리되었습니다." });
        router.refresh();
      } else {
        setMsg({ ok: false, text: res.error });
      }
      setTimeout(() => setMsg(null), 2600);
    });
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
            <Button size="sm" disabled={isPending} onClick={() => run(() => approveReservationAction(id))}>
              <Check className="h-4 w-4" /> 승인
            </Button>
            <Button size="sm" variant="danger" disabled={isPending} onClick={() => run(() => rejectReservationAction(id))}>
              <X className="h-4 w-4" /> 거절
            </Button>
          </>
        )}
        {status === "APPROVED" && (
          <>
            <Button size="sm" disabled={isPending} onClick={() => run(() => completeReservationAction(id))}>
              <CheckCheck className="h-4 w-4" /> 방문 완료
            </Button>
            <Button size="sm" variant="secondary" disabled={isPending} onClick={() => run(() => noShowReservationAction(id))}>
              <UserX className="h-4 w-4" /> 노쇼
            </Button>
            <Button size="sm" variant="danger" disabled={isPending} onClick={() => run(() => cancelReservationAction(id))}>
              <Ban className="h-4 w-4" /> 취소
            </Button>
          </>
        )}
        {!["PENDING", "APPROVED"].includes(status) && (
          <p className="text-sm text-muted">추가 처리가 필요하지 않은 상태입니다.</p>
        )}
        {isPending && <Loader2 className="h-5 w-5 animate-spin self-center text-gold" />}
      </div>

      {msg && (
        <p
          className={`mt-4 rounded-input px-4 py-2.5 text-sm ${
            msg.ok ? "bg-success/10 text-success" : "bg-error/10 text-error"
          }`}
        >
          {msg.text}
        </p>
      )}
    </div>
  );
}
