"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-ivory px-6 text-center">
      <h1 className="text-card-title font-semibold text-brown">
        잠시 후 다시 시도해주세요.
      </h1>
      <p className="mt-3 text-body text-muted">
        서비스 이용 중 문제가 발생했습니다.
      </p>
      <div className="mt-8 flex gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex h-12 items-center justify-center rounded-pill border border-gold px-6 text-base font-medium text-brown hover:bg-gold/10"
        >
          다시 시도
        </button>
        <Link
          href="/"
          className="inline-flex h-12 items-center justify-center rounded-pill bg-gold px-6 text-base font-medium text-white hover:bg-gold-dark"
        >
          홈으로 이동
        </Link>
      </div>
    </main>
  );
}
