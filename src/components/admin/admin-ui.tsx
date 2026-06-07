import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/** 관리자 페이지 제목 블록 */
export function AdminPageTitle({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-xl font-semibold text-brown md:text-2xl">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted">{description}</p>}
      </div>
      {action}
    </div>
  );
}

/** 대시보드 통계 카드 */
export function AdminStatCard({
  label,
  value,
  icon: Icon,
  accent,
}: {
  label: string;
  value: number | string;
  icon: LucideIcon;
  accent?: "gold" | "warning" | "success" | "error" | "muted";
}) {
  const accentClass = {
    gold: "bg-gold/12 text-gold",
    warning: "bg-warning/14 text-warning",
    success: "bg-success/12 text-success",
    error: "bg-error/12 text-error",
    muted: "bg-muted/12 text-muted",
  }[accent ?? "gold"];

  return (
    <div className="rounded-card border border-line bg-white p-5 shadow-card">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted">{label}</span>
        <span className={cn("flex h-9 w-9 items-center justify-center rounded-full", accentClass)}>
          <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
        </span>
      </div>
      <p className="mt-3 text-3xl font-semibold text-brown">{value}</p>
    </div>
  );
}

/** 관리자 카드 컨테이너 */
export function AdminCard({
  title,
  children,
  className,
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-card border border-line bg-white shadow-card", className)}>
      {title && (
        <div className="border-b border-line px-5 py-4">
          <h2 className="font-semibold text-brown">{title}</h2>
        </div>
      )}
      {children}
    </div>
  );
}
