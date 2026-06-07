import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-pill px-3 py-1 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "bg-beige-light text-brown",
        gold: "bg-gold/12 text-gold",
        success: "bg-success/12 text-success",
        warning: "bg-warning/14 text-warning",
        error: "bg-error/12 text-error",
        muted: "bg-muted/12 text-muted",
        outline: "border border-line text-muted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
