import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-ivory px-6 text-center">
      <p className="font-serif text-7xl font-semibold text-beige">404</p>
      <h1 className="mt-4 text-card-title font-semibold text-brown">
        요청하신 페이지를 찾을 수 없습니다.
      </h1>
      <p className="mt-3 text-body text-muted">
        주소가 변경되었거나 삭제되어 페이지를 찾을 수 없습니다.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-12 items-center justify-center rounded-pill bg-gold px-8 text-base font-medium text-white hover:bg-gold-dark"
      >
        홈으로 이동
      </Link>
    </main>
  );
}
