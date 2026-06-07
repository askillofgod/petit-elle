import { AdminPageTitle, AdminCard } from "@/components/admin/admin-ui";
import { Input, Label } from "@/components/ui/input";
import { AdminSettingsSave } from "@/components/admin/admin-settings-save";
import { getSettings } from "@/services/settings.service";

export const metadata = { title: "사이트 설정" };

export default async function AdminSettingsPage() {
  const SITE = await getSettings();
  return (
    <>
      <AdminPageTitle title="사이트 설정" description="기본 정보, 연락처, SNS, 운영시간을 관리합니다." />

      <div className="grid max-w-4xl gap-6 lg:grid-cols-2">
        <AdminCard title="기본 정보">
          <div className="space-y-4 p-5">
            <Field label="상호명" defaultValue={SITE.siteName} />
            <Field label="대표자명" defaultValue={SITE.representative} />
            <Field label="전화번호" defaultValue={SITE.phone} />
            <Field label="이메일" defaultValue={SITE.email} />
            <Field label="주소" defaultValue={SITE.address} />
          </div>
        </AdminCard>

        <AdminCard title="SNS 채널">
          <div className="space-y-4 p-5">
            <Field label="인스타그램" defaultValue={SITE.instagramUrl} />
            <Field label="네이버 블로그" defaultValue={SITE.blogUrl} />
            <Field label="카카오 채널" defaultValue={SITE.kakaoChannelUrl} />
          </div>
        </AdminCard>

        <AdminCard title="운영시간">
          <div className="space-y-4 p-5">
            <Field label="평일 (월~토)" defaultValue="11:00 ~ 21:00" />
            <Field label="휴무" defaultValue={SITE.closedDay} />
            <Field label="주차" defaultValue={SITE.parking} />
          </div>
        </AdminCard>
      </div>

      <div className="mt-6 max-w-4xl">
        <AdminSettingsSave />
      </div>
    </>
  );
}

function Field({ label, defaultValue }: { label: string; defaultValue: string }) {
  return (
    <div>
      <Label>{label}</Label>
      <Input defaultValue={defaultValue} />
    </div>
  );
}
