"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Input, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { customerProfileSchema } from "@/lib/validations/customer.schema";
import type { Customer } from "@/types";

export function ProfileForm({ customer }: { customer: Customer }) {
  const [form, setForm] = useState({
    name: customer.name,
    phone: customer.phone,
    email: customer.email ?? "",
    marketingAgreement: true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  function save() {
    const result = customerProfileSchema.safeParse(form);
    if (!result.success) {
      const e: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && !e[key]) e[key] = issue.message;
      }
      setErrors(e);
      setSaved(false);
      return;
    }
    setErrors({});
    // Mock 저장 — 실제 연동 시 updateCustomerProfileAction 호출
    setSaved(true);
    setTimeout(() => setSaved(false), 2600);
  }

  return (
    <div className="max-w-md space-y-5 rounded-card border border-line bg-white p-lg shadow-card">
      <div>
        <Label htmlFor="p-name">이름</Label>
        <Input
          id="p-name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        {errors.name && <p className="mt-1.5 text-xs text-error">{errors.name}</p>}
      </div>
      <div>
        <Label htmlFor="p-phone">연락처</Label>
        <Input
          id="p-phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        {errors.phone && <p className="mt-1.5 text-xs text-error">{errors.phone}</p>}
      </div>
      <div>
        <Label htmlFor="p-email">이메일</Label>
        <Input
          id="p-email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        {errors.email && <p className="mt-1.5 text-xs text-error">{errors.email}</p>}
      </div>
      <label className="flex items-center gap-3 text-sm text-brown">
        <input
          type="checkbox"
          className="h-5 w-5 accent-gold"
          checked={form.marketingAgreement}
          onChange={(e) => setForm({ ...form, marketingAgreement: e.target.checked })}
        />
        마케팅 정보 수신에 동의합니다.
      </label>

      {saved && (
        <p className="flex items-center gap-2 rounded-input bg-success/10 px-4 py-2.5 text-sm text-success">
          <CheckCircle2 className="h-4 w-4" /> 저장되었습니다.
        </p>
      )}

      <Button size="lg" className="w-full" onClick={save}>
        저장하기
      </Button>
    </div>
  );
}
