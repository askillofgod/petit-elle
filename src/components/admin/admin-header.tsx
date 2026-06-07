"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, UserCircle2, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { ADMIN_NAV } from "@/constants/site";

export function AdminHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/90 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-input text-brown hover:bg-beige-light/60 lg:hidden"
            aria-label="메뉴"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <span className="font-serif text-lg font-semibold text-brown lg:hidden">
            Petit Elle Admin
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-2 text-sm text-brown sm:flex">
            <UserCircle2 className="h-5 w-5 text-gold" />
            정영순 원장
          </span>
          <Link
            href="/admin/login"
            className="flex items-center gap-1.5 rounded-pill px-3 py-2 text-sm text-muted hover:bg-beige-light/60"
          >
            <LogOut className="h-4 w-4" /> 로그아웃
          </Link>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {open && (
        <nav className="border-t border-line bg-white px-3 py-3 lg:hidden">
          {ADMIN_NAV.map((item) => {
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "block rounded-input px-3 py-2.5 text-sm font-medium",
                  active ? "bg-gold/12 text-gold" : "text-brown/80"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
