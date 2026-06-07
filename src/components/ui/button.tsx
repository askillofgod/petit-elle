import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// 디자인 시스템 15. Button System — pill 형태, 높이 52px+
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-pill font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ivory disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap",
  {
    variants: {
      variant: {
        // Primary: 예약 CTA
        primary: "bg-gold text-white shadow-sm hover:bg-gold-dark hover:shadow-hover",
        // Secondary: 보조 (테두리)
        secondary:
          "border border-gold bg-transparent text-brown hover:bg-gold/10",
        // Ghost / text
        ghost: "bg-transparent text-brown hover:bg-beige/20",
        // 부드러운 베이지 채움
        soft: "bg-beige-light text-brown hover:bg-beige",
        // 위험 (관리자 거절/삭제)
        danger: "bg-error text-white hover:opacity-90",
        link: "text-gold underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        sm: "h-10 px-4 text-sm",
        md: "h-12 px-6 text-sm md:text-base",
        lg: "h-[52px] px-8 text-base",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** 지정 시 next/link로 렌더 */
  href?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, href, children, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size }), className);
    if (href) {
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }
    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
