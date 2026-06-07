import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "이용약관",
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <PageHeader
        title="이용약관"
        breadcrumbs={[{ label: "홈", href: "/" }, { label: "이용약관" }]}
      />
      <section className="section-pe bg-ivory">
        <div className="container-pe mx-auto max-w-3xl space-y-8 text-muted">
          <p className="text-sm">
            본 약관은 Petit Elle이 제공하는 예약 서비스의 이용 조건 및 절차에 관한
            사항을 규정합니다. 아래 내용은 임시 예시 문안입니다.
          </p>
          <Article title="제1조 (목적)">
            본 약관은 회사가 제공하는 온라인 예약 서비스의 이용과 관련하여 회사와
            이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
          </Article>
          <Article title="제2조 (예약 및 승인)">
            예약은 신청 후 관리자의 확인을 거쳐 확정됩니다. 예약 가능 시간에 한하여
            예약이 가능하며, 예약 확정 전에는 방문이 보장되지 않습니다.
          </Article>
          <Article title="제3조 (예약 변경 및 취소)">
            예약 변경 및 취소는 예약일 하루 전까지 가능합니다. 무단 미방문(노쇼)이
            반복될 경우 예약이 제한될 수 있습니다.
          </Article>
          <Article title="제4조 (이용자의 의무)">
            이용자는 정확한 정보를 제공해야 하며, 타인의 정보를 도용해서는 안 됩니다.
          </Article>
          <Article title="제5조 (서비스의 변경 및 중단)">
            회사는 운영상 필요에 따라 서비스의 내용을 변경하거나 중단할 수 있습니다.
          </Article>
          <p className="text-xs">본 약관은 2026년 6월 7일부터 적용됩니다. (임시)</p>
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
