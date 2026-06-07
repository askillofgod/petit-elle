"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Pencil, Loader2 } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Label } from "@/components/ui/input";
import { AdminCard } from "@/components/admin/admin-ui";
import { Badge } from "@/components/ui/badge";
import type { Program } from "@/types";
import {
  createProgramAction,
  updateProgramAction,
  setProgramActiveAction,
} from "@/app/actions/program.actions";

type FormValues = { title: string; shortDescription: string; durations: string; price: string };
const EMPTY: FormValues = { title: "", shortDescription: "", durations: "", price: "" };

type SortKey = "order" | "priceAsc" | "priceDesc" | "name";
const SORTS: { key: SortKey; label: string }[] = [
  { key: "order", label: "기본순" },
  { key: "priceAsc", label: "가격↑" },
  { key: "priceDesc", label: "가격↓" },
  { key: "name", label: "이름순" },
];

export function AdminProgramsManager({ initial }: { initial: Program[] }) {
  const router = useRouter();
  const [programs, setPrograms] = useState(initial);
  const [sort, setSort] = useState<SortKey>("order");

  const sortedPrograms = useMemo(() => {
    const arr = [...programs];
    arr.sort((a, b) => {
      if (sort === "priceAsc") return a.price - b.price;
      if (sort === "priceDesc") return b.price - a.price;
      if (sort === "name") return a.title.localeCompare(b.title, "ko");
      return a.displayOrder - b.displayOrder;
    });
    return arr;
  }, [programs, sort]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  function flash(ok: boolean, text: string) {
    setMsg({ ok, text });
    setTimeout(() => setMsg(null), 2600);
  }

  function startEdit(p: Program) {
    setEditingId(p.id);
    setForm({
      title: p.title,
      shortDescription: p.shortDescription,
      durations: p.durations.join(","),
      price: String(p.price),
    });
    setErrors({});
  }

  function reset() {
    setEditingId(null);
    setForm(EMPTY);
    setErrors({});
  }

  function toggleActive(p: Program) {
    const next = !p.isActive;
    setPrograms((prev) => prev.map((x) => (x.id === p.id ? { ...x, isActive: next } : x)));
    startTransition(async () => {
      await setProgramActiveAction(p.id, next);
      router.refresh();
    });
  }

  function save() {
    setErrors({});
    startTransition(async () => {
      const res = editingId
        ? await updateProgramAction(editingId, form)
        : await createProgramAction(form);
      if (!res.ok) {
        if (res.fieldErrors) setErrors(res.fieldErrors);
        flash(false, res.error);
        return;
      }
      // 로컬 목록 갱신
      setPrograms((prev) => {
        const exists = prev.some((p) => p.id === res.data.id);
        return exists
          ? prev.map((p) => (p.id === res.data.id ? res.data : p))
          : [...prev, res.data];
      });
      flash(true, res.message ?? "저장되었습니다.");
      reset();
      router.refresh();
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      {/* List */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted">정렬</span>
          {SORTS.map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => setSort(s.key)}
              className={cn(
                "rounded-pill px-3 py-1.5 text-xs font-medium transition-colors",
                sort === s.key
                  ? "bg-gold text-white"
                  : "bg-white text-brown/80 hover:bg-beige-light/60"
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
        {sortedPrograms.map((p) => (
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
                onClick={() => toggleActive(p)}
                disabled={isPending}
                className={cn(
                  "rounded-pill px-3 py-1.5 text-xs font-medium disabled:opacity-50",
                  p.isActive ? "bg-success/12 text-success" : "bg-muted/12 text-muted"
                )}
              >
                {p.isActive ? "노출중" : "숨김"}
              </button>
              <Button size="sm" variant="ghost" onClick={() => startEdit(p)}>
                <Pencil className="h-4 w-4" /> 수정
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit form */}
      <div>
        <AdminCard title={editingId ? "프로그램 수정" : "프로그램 등록"}>
          <div className="space-y-4 p-5">
            {msg && (
              <p
                className={cn(
                  "rounded-input px-4 py-2.5 text-sm",
                  msg.ok ? "bg-success/10 text-success" : "bg-error/10 text-error"
                )}
              >
                {msg.text}
              </p>
            )}
            <Field
              label="프로그램명"
              value={form.title}
              onChange={(v) => setForm({ ...form, title: v })}
              error={errors.title}
              placeholder="프로그램명"
            />
            <div>
              <Label>설명</Label>
              <Textarea
                value={form.shortDescription}
                onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                placeholder="간단 설명"
              />
              {errors.shortDescription && (
                <p className="mt-1.5 text-xs text-error">{errors.shortDescription}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field
                label="소요시간(분)"
                value={form.durations}
                onChange={(v) => setForm({ ...form, durations: v })}
                error={errors.durations}
                placeholder="60,90"
              />
              <Field
                label="가격(원)"
                value={form.price}
                onChange={(v) => setForm({ ...form, price: v })}
                error={errors.price}
                placeholder="89000"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <Button className="flex-1" onClick={save} disabled={isPending}>
                {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                {editingId ? "수정 저장" : "등록"}
              </Button>
              {editingId && (
                <Button variant="secondary" onClick={reset} disabled={isPending}>
                  취소
                </Button>
              )}
            </div>
          </div>
        </AdminCard>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
      {error && <p className="mt-1.5 text-xs text-error">{error}</p>}
    </div>
  );
}
