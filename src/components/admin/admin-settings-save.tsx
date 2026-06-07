"use client";

import { useState, useTransition } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdminSettingsSave() {
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  function save() {
    startTransition(async () => {
      // Mock 저장 — 실제 연동 시 updateSettingsAction 호출
      await new Promise((r) => setTimeout(r, 400));
      setSaved(true);
      setTimeout(() => setSaved(false), 2600);
    });
  }

  return (
    <div className="flex items-center gap-4">
      <Button size="lg" onClick={save} disabled={isPending}>
        {isPending && <Loader2 className="h-4 w-4 animate-spin" />} 설정 저장
      </Button>
      {saved && (
        <span className="flex items-center gap-1.5 text-sm text-success">
          <CheckCircle2 className="h-4 w-4" /> 저장되었습니다.
        </span>
      )}
    </div>
  );
}
