"use client";

import { useState } from "react";
import Image from "next/image";
import { Pencil, Plus } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Label } from "@/components/ui/input";
import { AdminCard } from "@/components/admin/admin-ui";
import { Badge } from "@/components/ui/badge";
import type { Program } from "@/types";

export function AdminProgramsManager({ initial }: { initial: Program[] }) {
  const [programs, setPrograms] = useState(initial);
  const [editing, setEditing] = useState<Program | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  function toggleActive(id: string) {
    setPrograms((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p))
    );
  }

  function flash(m: string) {
    setMsg(m);
    setTimeout(() => setMsg(null), 2400);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      {/* List */}
      <div className="space-y-3">
        {programs.map((p) => (
          <div
            key={p.id}
            className="flex items-center gap-4 rounded-card border border-line bg-white p-3 shadow-card"
          >
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-input">
              <Image src={p.thumbnail} alt={p.title} fill sizes="64px" className="object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-brown">{p.title}</h3>
                {p.isSignature && <Badge variant="gold">대표</Badge>}
                {!p.isActive && <Badge variant="muted">비활성</Badge>}
              </div>
              <p className="mt-0.5 text-sm text-muted">
                {p.durations.join("/")}분 · {formatPrice(p.price)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => toggleActive(p.id)}
                className={cn(
                  "rounded-pill px-3 py-1.5 text-xs font-medium",
                  p.isActive
                    ? "bg-success/12 text-success"
                    : "bg-muted/12 text-muted"
                )}
              >
                {p.isActive ? "노출중" : "숨김"}
              </button>
              <Button size="sm" variant="ghost" onClick={() => setEditing(p)}>
                <Pencil className="h-4 w-4" /> 수정
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit form */}
      <div>
        <AdminCard title={editing ? "프로그램 수정" : "프로그램 등록"}>
          <div className="space-y-4 p-5">
            {msg && (
              <p className="rounded-input bg-success/10 px-4 py-2.5 text-sm text-success">
                {msg}
              </p>
            )}
            <div>
              <Label>프로그램명</Label>
              <Input defaultValue={editing?.title ?? ""} placeholder="프로그램명" />
            </div>
            <div>
              <Label>설명</Label>
              <Textarea defaultValue={editing?.shortDescription ?? ""} placeholder="간단 설명" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>소요시간(분)</Label>
                <Input defaultValue={editing?.durations.join(",") ?? ""} placeholder="60,90" />
              </div>
              <div>
                <Label>가격(원)</Label>
                <Input defaultValue={editing?.price ?? ""} placeholder="89000" />
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <Button
                className="flex-1"
                onClick={() => flash(editing ? "수정되었습니다." : "등록되었습니다.")}
              >
                {editing ? "수정 저장" : <><Plus className="h-4 w-4" /> 등록</>}
              </Button>
              {editing && (
                <Button variant="secondary" onClick={() => setEditing(null)}>
                  새 등록
                </Button>
              )}
            </div>
          </div>
        </AdminCard>
      </div>
    </div>
  );
}
