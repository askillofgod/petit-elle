"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { ChevronLeft, Clock, Check, Loader2 } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Label } from "@/components/ui/input";
import { ReservationStepper } from "@/components/reservation/reservation-stepper";
import { ReservationCalendar } from "@/components/reservation/reservation-calendar";
import { TimeSlotSelector } from "@/components/reservation/time-slot-selector";
import { PROGRAMS } from "@/constants/programs";
import { reservationFormSchema } from "@/lib/validations/reservation.schema";
import { createReservationAction } from "@/app/actions/reservation.actions";

type FormState = {
  name: string;
  phone: string;
  note: string;
  agree: boolean;
};

export function ReservationFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSlug = searchParams.get("program");

  const [step, setStep] = useState(initialSlug ? 2 : 1);
  const [slug, setSlug] = useState<string | null>(initialSlug);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    note: "",
    agree: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const program = useMemo(
    () => PROGRAMS.find((p) => p.slug === slug) ?? null,
    [slug]
  );

  const go = (n: number) => setStep(n);

  // zod 기반 폼 검증 (lib/validations/reservation.schema)
  function validateForm() {
    const result = reservationFormSchema.safeParse(form);
    if (result.success) {
      setErrors({});
      return true;
    }
    const e: Partial<Record<keyof FormState, string>> = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0] as keyof FormState | undefined;
      if (key && !e[key]) e[key] = issue.message;
    }
    setErrors(e);
    return false;
  }

  // 서버 액션 호출 → 성공 시 완료 페이지로 이동 (실제 Supabase 연동 시 액션 내부만 교체됨)
  function submit() {
    if (!program || !date || !time) return;
    setSubmitError(null);
    startTransition(async () => {
      const res = await createReservationAction({
        programId: program.id,
        date,
        time,
        customerName: form.name,
        customerPhone: form.phone,
        requestNote: form.note || undefined,
      });
      if (!res.ok) {
        setSubmitError(res.error);
        return;
      }
      const params = new URLSearchParams({
        no: res.data.reservationNumber,
        program: program.title,
        date,
        time,
        name: form.name,
      });
      router.push(`/reservation/complete?${params.toString()}`);
    });
  }

  const prettyDate = date
    ? format(new Date(date), "M월 d일 (EEE)", { locale: ko })
    : "";

  return (
    <div className="mx-auto max-w-3xl">
      <ReservationStepper current={step} />

      <div className="mt-10">
        {/* STEP 1 — 프로그램 선택 */}
        {step === 1 && (
          <StepWrap title="프로그램 선택" guide="원하시는 프로그램을 선택해주세요.">
            <div className="grid gap-4 sm:grid-cols-2">
              {PROGRAMS.map((p) => {
                const isSel = slug === p.slug;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSlug(p.slug)}
                    className={cn(
                      "flex gap-4 rounded-card border bg-white p-3 text-left transition-all",
                      isSel
                        ? "border-gold ring-2 ring-gold/20"
                        : "border-line hover:border-gold/50"
                    )}
                  >
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-input">
                      <Image
                        src={p.thumbnail}
                        alt={p.title}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-brown">{p.title}</h3>
                        {isSel && <Check className="h-4 w-4 text-gold" />}
                      </div>
                      <p className="mt-1 line-clamp-2 text-xs text-muted">
                        {p.shortDescription}
                      </p>
                      <p className="mt-1.5 text-sm font-semibold text-gold">
                        {p.durations.length > 1
                          ? `${formatPrice(p.price)} ~`
                          : formatPrice(p.price)}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
            <NavButtons
              onNext={() => go(2)}
              nextDisabled={!slug}
              backHidden
            />
          </StepWrap>
        )}

        {/* STEP 2 — 날짜 선택 */}
        {step === 2 && (
          <StepWrap title="날짜 선택" guide="예약 가능한 날짜를 선택해주세요.">
            <ReservationCalendar
              selected={date}
              onSelect={(d) => setDate(d)}
            />
            <NavButtons
              onBack={() => go(1)}
              onNext={() => go(3)}
              nextDisabled={!date}
            />
          </StepWrap>
        )}

        {/* STEP 3 — 시간 선택 */}
        {step === 3 && date && (
          <StepWrap title="시간 선택" guide="예약 가능한 시간을 선택해주세요.">
            <p className="mb-4 text-sm font-medium text-brown">{prettyDate}</p>
            <TimeSlotSelector date={date} selected={time} onSelect={setTime} />
            <NavButtons
              onBack={() => go(2)}
              onNext={() => go(4)}
              nextDisabled={!time}
            />
          </StepWrap>
        )}

        {/* STEP 4 — 고객 정보 */}
        {step === 4 && (
          <StepWrap title="고객 정보 입력" guide="예약자 정보를 입력해주세요.">
            <div className="space-y-5">
              <div>
                <Label htmlFor="name">이름 *</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="홍길동"
                />
                {errors.name && (
                  <p className="mt-1.5 text-xs text-error">{errors.name}</p>
                )}
              </div>
              <div>
                <Label htmlFor="phone">연락처 *</Label>
                <Input
                  id="phone"
                  inputMode="numeric"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="010-1234-5678"
                />
                {errors.phone && (
                  <p className="mt-1.5 text-xs text-error">{errors.phone}</p>
                )}
              </div>
              <div>
                <Label htmlFor="note">요청사항</Label>
                <Textarea
                  id="note"
                  value={form.note}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
                  placeholder="원하시는 케어나 특이사항을 자유롭게 적어주세요. (선택)"
                />
              </div>
              <label className="flex items-start gap-3 text-sm text-brown">
                <input
                  type="checkbox"
                  checked={form.agree}
                  onChange={(e) =>
                    setForm({ ...form, agree: e.target.checked })
                  }
                  className="mt-0.5 h-5 w-5 shrink-0 accent-gold"
                />
                <span>
                  개인정보 수집·이용에 동의합니다. (예약 접수 및 확인 목적)
                </span>
              </label>
              {errors.agree && (
                <p className="-mt-2 text-xs text-error">{errors.agree}</p>
              )}
            </div>
            <NavButtons
              onBack={() => go(3)}
              onNext={() => {
                if (validateForm()) go(5);
              }}
            />
          </StepWrap>
        )}

        {/* STEP 5 — 확인 */}
        {step === 5 && program && date && time && (
          <StepWrap title="예약 확인" guide="선택하신 예약 정보를 확인해주세요.">
            <div className="overflow-hidden rounded-card border border-line bg-white shadow-card">
              <div className="flex gap-4 border-b border-line p-md">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-input">
                  <Image
                    src={program.thumbnail}
                    alt={program.title}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-brown">{program.title}</h3>
                  <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted">
                    <Clock className="h-4 w-4 text-gold" />
                    {program.durations.join(" / ")}분
                  </p>
                  <p className="mt-1 text-sm font-semibold text-gold">
                    {formatPrice(program.price)}
                    {program.durations.length > 1 && " ~"}
                  </p>
                </div>
              </div>
              <dl className="divide-y divide-line text-sm">
                <SummaryRow label="예약 날짜" value={prettyDate} />
                <SummaryRow label="예약 시간" value={time} />
                <SummaryRow label="예약자" value={form.name} />
                <SummaryRow label="연락처" value={form.phone} />
                {form.note && <SummaryRow label="요청사항" value={form.note} />}
              </dl>
            </div>
            <p className="mt-4 rounded-input bg-beige-light/50 p-4 text-xs leading-relaxed text-muted">
              예약 신청 후 관리자의 확인을 거쳐 예약이 확정됩니다. 확정 결과는
              연락처로 안내드립니다.
            </p>
            {submitError && (
              <p className="mt-3 rounded-input bg-error/10 px-4 py-3 text-sm text-error">
                {submitError}
              </p>
            )}
            <NavButtons
              onBack={() => go(4)}
              onNext={submit}
              nextLabel={isPending ? "신청 중..." : "예약 신청하기"}
              nextDisabled={isPending}
              loading={isPending}
            />
          </StepWrap>
        )}
      </div>
    </div>
  );
}

function StepWrap({
  title,
  guide,
  children,
}: {
  title: string;
  guide: string;
  children: React.ReactNode;
}) {
  return (
    <div className="animate-fade-in">
      <h2 className="text-card-title font-semibold text-brown">{title}</h2>
      <p className="mt-1 text-sm text-muted">{guide}</p>
      <div className="mt-6">{children}</div>
    </div>
  );
}

function NavButtons({
  onBack,
  onNext,
  nextDisabled,
  nextLabel = "다음",
  backHidden,
  loading,
}: {
  onBack?: () => void;
  onNext: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
  backHidden?: boolean;
  loading?: boolean;
}) {
  return (
    <div className="mt-8 flex gap-3">
      {!backHidden && (
        <Button variant="secondary" size="lg" onClick={onBack} disabled={loading}>
          <ChevronLeft className="h-4 w-4" /> 이전
        </Button>
      )}
      <Button
        size="lg"
        onClick={onNext}
        disabled={nextDisabled}
        className="flex-1"
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {nextLabel}
      </Button>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 px-md py-3.5">
      <dt className="shrink-0 text-muted">{label}</dt>
      <dd className="text-right font-medium text-brown">{value}</dd>
    </div>
  );
}
