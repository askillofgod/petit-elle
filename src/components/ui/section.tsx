import * as React from "react";
import { cn } from "@/lib/utils";

/** 표준 섹션 래퍼 (수직 리듬 + 컨테이너) */
export function Section({
  className,
  containerClassName,
  children,
  id,
}: {
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className={cn("section-pe", className)}>
      <div className={cn("container-pe", containerClassName)}>{children}</div>
    </section>
  );
}

/** 섹션 제목 블록 (eyebrow + title + description) */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  serif = false,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  serif?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2
        className={cn(
          "text-section font-semibold text-brown",
          serif && "font-serif"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "max-w-2xl text-body text-muted",
            align === "center" ? "mx-auto" : ""
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
