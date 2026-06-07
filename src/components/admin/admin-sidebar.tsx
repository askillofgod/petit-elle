"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarCheck,
  CalendarDays,
  Users,
  Sparkles,
  Megaphone,
  Settings,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ADMIN_NAV } from "@/constants/site";

const ICONS: Record<string, LucideIcon> = {
  LayoutDashboard,
  CalendarCheck,
  CalendarDays,
  Users,
  Sparkles,
  Megaphone,
  Settings,
};

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-60 shrink-0 border-r border-line bg-white lg:block">
      <div className="flex h-16 items-center px-6">
        <Link href="/admin" className="font-serif text-xl font-semibold text-brown">
          Petit Elle
          <span className="ml-2 align-middle text-[10px] uppercase tracking-widest text-gold">
            Admin
          </span>
        </Link>
      </div>
      <nav className="px-3 py-4">
        {ADMIN_NAV.map((item) => {
          const Icon = ICONS[item.icon] ?? LayoutDashboard;
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "mb-1 flex items-center gap-3 rounded-input px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-gold/12 text-gold"
                  : "text-brown/80 hover:bg-beige-light/60"
              )}
            >
              <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
