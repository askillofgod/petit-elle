import Link from "next/link";
import { Input, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "관리자 로그인",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-beige-light/30 px-6">
      <div className="w-full max-w-sm rounded-card bg-white p-lg shadow-card">
        <div className="text-center">
          <p className="font-serif text-2xl font-semibold text-brown">Petit Elle</p>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-gold">Admin</p>
        </div>

        <form className="mt-8 space-y-4">
          <div>
            <Label htmlFor="email">이메일</Label>
            <Input id="email" type="email" placeholder="admin@petit-elle.co.kr" />
          </div>
          <div>
            <Label htmlFor="password">비밀번호</Label>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>
          <Button href="/admin" size="lg" className="w-full">
            로그인
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/" className="text-xs text-muted hover:text-gold">
            ← 홈페이지로 이동
          </Link>
        </div>
      </div>
    </main>
  );
}
