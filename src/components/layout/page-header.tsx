import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Crumb = { label: string; href?: string };

export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumbs,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: Crumb[];
}) {
  return (
    <div className="bg-beige-light/40">
      <div className="container-pe py-xl text-center">
        {breadcrumbs && (
          <nav className="mb-5 flex items-center justify-center gap-1.5 text-xs text-muted">
            {breadcrumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {c.href ? (
                  <Link href={c.href} className="hover:text-gold">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-brown">{c.label}</span>
                )}
                {i < breadcrumbs.length - 1 && (
                  <ChevronRight className="h-3 w-3" />
                )}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 className="mt-3 text-section font-semibold text-brown">{title}</h1>
        {description && (
          <p className="mx-auto mt-4 max-w-2xl text-body text-muted">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
