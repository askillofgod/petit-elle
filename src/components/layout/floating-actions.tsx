"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

// 디자인 시스템 22. Floating UI — TopButton + 모바일 하단 고정 예약 버튼
export function FloatingActions() {
  const [show, setShow] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 예약/관리자 페이지에서는 모바일 고정 예약 버튼 숨김
  const hideReserveBar =
    pathname.startsWith("/reservation") || pathname.startsWith("/admin");

  return (
    <>
      {/* Top button */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="맨 위로"
        className={cn(
          "fixed right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white/90 text-brown shadow-card backdrop-blur transition-all duration-300 hover:bg-white",
          show ? "opacity-100" : "pointer-events-none opacity-0",
          hideReserveBar ? "bottom-5" : "bottom-[84px] lg:bottom-5"
        )}
      >
        <ArrowUp className="h-5 w-5" />
      </button>

      {/* 모바일 하단 고정 예약 버튼 */}
      {!hideReserveBar && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ivory/95 p-3 backdrop-blur-md lg:hidden">
          <Link
            href="/reservation"
            className="flex h-12 w-full items-center justify-center rounded-pill bg-gold text-base font-medium text-white shadow-sm active:bg-gold-dark"
          >
            온라인 예약하기
          </Link>
        </div>
      )}
    </>
  );
}
