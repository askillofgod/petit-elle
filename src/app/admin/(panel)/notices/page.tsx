import { AdminPageTitle } from "@/components/admin/admin-ui";
import { AdminNoticesManager } from "@/components/admin/admin-notices-manager";
import { listNotices } from "@/services/settings.service";

export const metadata = { title: "공지사항 관리" };

export default async function AdminNoticesPage() {
  const notices = await listNotices();
  return (
    <>
      <AdminPageTitle
        title="공지사항 관리"
        description="고객에게 노출되는 공지사항을 등록·관리합니다."
      />
      <AdminNoticesManager initial={notices} />
    </>
  );
}
