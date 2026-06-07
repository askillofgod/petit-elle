"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { NAV_ITEMS, SITE } from "@/constants/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 라우트 변경 시 모바일 메뉴 닫기
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-ivory/80 shadow-header backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="container-pe flex h-[72px] items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-baseline gap-1.5" aria-label="Petit Elle 홈">
          <span className="font-serif text-2xl font-semibold tracking-tight text-brown md:text-[28px]">
            Petit Elle
          </span>
          <span className="hidden text-xs tracking-[0.25em] text-gold sm:inline">
            쁘띠엘
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium text-brown/90 transition-colors hover:text-gold",
                pathname.startsWith(item.href) && "text-gold"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/login"
            className="text-sm font-medium text-brown/80 transition-colors hover:text-gold"
          >
            로그인
          </Link>
          <Button href="/reservation" size="sm">
            온라인 예약하기
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full text-brown lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "overflow-hidden border-t border-line/60 bg-ivory/95 backdrop-blur-md transition-[max-height,opacity] duration-300 lg:hidden",
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="container-pe flex flex-col gap-1 py-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-input px-3 py-3 text-base font-medium text-brown hover:bg-beige/20"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/login"
            className="rounded-input px-3 py-3 text-base font-medium text-brown hover:bg-beige/20"
          >
            로그인
          </Link>
          <Button href="/reservation" size="lg" className="mt-2 w-full">
            온라인 예약하기
          </Button>
          <a
            href={SITE.phoneHref}
            className="mt-1 px-3 py-2 text-center text-sm text-muted"
          >
            전화 문의 {SITE.phone}
          </a>
        </nav>
      </div>
    </header>
  );
}
