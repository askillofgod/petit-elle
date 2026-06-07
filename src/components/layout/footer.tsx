import Link from "next/link";
import { Instagram, MessageCircle, Phone, Clock, MapPin } from "lucide-react";
import { SITE, NAV_ITEMS } from "@/constants/site";

export function Footer() {
  return (
    <footer className="bg-brown pb-20 text-ivory/90 lg:pb-0">
      {/* pb-20: 모바일 하단 고정 예약 버튼이 카피라이트를 가리지 않도록 여백 확보 */}
      <div className="container-pe py-xl">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <p className="font-serif text-2xl font-semibold text-ivory">Petit Elle</p>
            <p className="mt-3 text-sm leading-relaxed text-ivory/70">
              {SITE.slogan}
              <br />
              여성만을 위한 프라이빗 힐링 공간
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="인스타그램"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/25 transition-colors hover:bg-ivory/10"
              >
                <Instagram className="h-[18px] w-[18px]" />
              </a>
              <a
                href={SITE.social.kakao}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="카카오 채널"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/25 transition-colors hover:bg-ivory/10"
              >
                <MessageCircle className="h-[18px] w-[18px]" />
              </a>
              <a
                href={SITE.social.blog}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="네이버 블로그"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/25 text-xs font-bold transition-colors hover:bg-ivory/10"
              >
                blog
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-ivory/60">
              바로가기
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-ivory/80 hover:text-ivory">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-ivory/60">
              방문 안내
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-ivory/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-beige" />
                <span>{SITE.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-beige" />
                <a href={SITE.phoneHref} className="hover:text-ivory">
                  {SITE.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-beige" />
                <span>
                  {SITE.businessHours}
                  <br />
                  {SITE.closedDay}
                </span>
              </li>
            </ul>
          </div>

          {/* Policy */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-ivory/60">
              안내
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/terms" className="text-ivory/80 hover:text-ivory">
                  이용약관
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-ivory/80 hover:text-ivory">
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-ivory/80 hover:text-ivory">
                  자주 묻는 질문
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-ivory/15 pt-6 text-xs text-ivory/55">
          <p>
            상호 Petit Elle (쁘띠엘) · 대표 {SITE.representative} · {SITE.address}
          </p>
          <p className="mt-1">
            {SITE.email} · {SITE.phone}
          </p>
          <p className="mt-3">© Petit Elle. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
