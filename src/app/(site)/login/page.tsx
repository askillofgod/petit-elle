import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "로그인",
  description: "Petit Elle 카카오 간편 로그인",
};

export default function LoginPage() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-ivory py-xl">
      <div className="container-pe">
        <div className="mx-auto max-w-md rounded-card bg-white p-lg text-center shadow-card md:p-xl">
          <p className="font-serif text-3xl font-semibold text-brown">Petit Elle</p>
          <p className="mt-2 text-sm text-muted">그녀를 위한 작은 휴식 공간</p>

          <h1 className="mt-10 text-card-title font-semibold text-brown">
            간편하게 로그인하고
            <br />내 예약을 관리하세요
          </h1>

          <button
            type="button"
            className="mt-8 flex h-[52px] w-full items-center justify-center gap-2 rounded-pill bg-[#FEE500] text-base font-medium text-[#191600] transition-opacity hover:opacity-90"
          >
            <MessageCircle className="h-5 w-5" />
            카카오로 시작하기
          </button>

          <p className="mt-5 text-xs leading-relaxed text-muted">
            로그인 시{" "}
            <Link href="/terms" className="underline hover:text-gold">
              이용약관
            </Link>{" "}
            및{" "}
            <Link href="/privacy" className="underline hover:text-gold">
              개인정보처리방침
            </Link>
            에 동의하게 됩니다.
          </p>

          <div className="mt-8 border-t border-line pt-6">
            <p className="text-sm text-muted">로그인 없이도 예약할 수 있어요</p>
            <Link
              href="/reservation"
              className="mt-2 inline-block text-sm font-medium text-gold hover:underline"
            >
              비회원으로 예약하기 →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
