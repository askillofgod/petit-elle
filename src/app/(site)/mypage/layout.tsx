import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";

const MENU = [
  { label: "내 예약", href: "/mypage/reservations" },
  { label: "내 정보", href: "/mypage/profile" },
];

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader
        eyebrow="My Page"
        title="마이페이지"
        breadcrumbs={[{ label: "홈", href: "/" }, { label: "마이페이지" }]}
      />
      <section className="section-pe bg-ivory">
        <div className="container-pe grid gap-8 lg:grid-cols-[220px_1fr]">
          <aside>
            <nav className="flex gap-2 lg:flex-col">
              {MENU.map((m) => (
                <Link
                  key={m.href}
                  href={m.href}
                  className="rounded-input px-4 py-3 text-sm font-medium text-brown transition-colors hover:bg-beige-light/60"
                >
                  {m.label}
                </Link>
              ))}
            </nav>
          </aside>
          <div>{children}</div>
        </div>
      </section>
    </>
  );
}
