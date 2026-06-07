import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        title="개인정보처리방침"
        breadcrumbs={[{ label: "홈", href: "/" }, { label: "개인정보처리방침" }]}
      />
      <section className="section-pe bg-ivory">
        <div className="container-pe mx-auto max-w-3xl space-y-8 text-muted">
          <p className="text-sm">
            Petit Elle(이하 &lsquo;회사&rsquo;)은 「개인정보 보호법」을 준수하며,
            이용자의 개인정보를 소중히 보호합니다. 본 방침은 임시 예시 문안이며,
            실제 운영 정보로 추후 갱신됩니다.
          </p>

          <Article title="1. 수집하는 개인정보 항목">
            예약 신청 시 이름, 연락처, 요청사항을 수집합니다. 카카오 로그인 이용 시
            카카오 계정 식별자, 프로필 정보(닉네임, 프로필 이미지)를 수집할 수 있습니다.
          </Article>
          <Article title="2. 개인정보의 수집 및 이용 목적">
            예약 접수 및 확인, 예약 관련 안내, 고객 문의 응대, 서비스 제공 및 개선을
            위해 이용합니다.
          </Article>
          <Article title="3. 개인정보의 보유 및 이용 기간">
            관련 법령에 따른 보존 의무가 있는 경우를 제외하고, 수집·이용 목적이 달성되면
            지체 없이 파기합니다. 예약 데이터는 관계 법령에 따라 보관될 수 있습니다.
          </Article>
          <Article title="4. 개인정보의 제3자 제공">
            회사는 이용자의 개인정보를 외부에 제공하지 않습니다. 단, 법령에 근거가 있는
            경우는 예외로 합니다.
          </Article>
          <Article title="5. 이용자의 권리">
            이용자는 언제든지 본인의 개인정보 열람, 정정, 삭제, 처리정지를 요청할 수
            있습니다.
          </Article>
          <Article title="6. 개인정보 보호책임자">
            성명 {SITE.representative} · 연락처 {SITE.phone} · 이메일 {SITE.email}
          </Article>

          <p className="text-xs">본 방침은 2026년 6월 7일부터 적용됩니다. (임시)</p>
        </div>
      </section>
    </>
  );
}

function Article({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-card-title font-semibold text-brown">{title}</h2>
      <p className="mt-3 text-sm leading-relaxed">{children}</p>
    </div>
  );
}
