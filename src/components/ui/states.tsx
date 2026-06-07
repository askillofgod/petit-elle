import Link from "next/link";
import { Inbox, type LucideIcon } from "lucide-react";

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  actionLabel,
  actionHref,
}: {
  icon?: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-card border border-dashed border-line bg-white/50 px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-beige-light text-gold">
        <Icon className="h-7 w-7" strokeWidth={1.6} />
      </div>
      <p className="mt-4 font-medium text-brown">{title}</p>
      {description && <p className="mt-2 text-sm text-muted">{description}</p>}
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="mt-6 inline-flex h-11 items-center justify-center rounded-pill bg-gold px-6 text-sm font-medium text-white hover:bg-gold-dark"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
