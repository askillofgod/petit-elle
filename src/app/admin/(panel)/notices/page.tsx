import { AdminPageTitle } from "@/components/admin/admin-ui";
import { AdminNoticesManager } from "@/components/admin/admin-notices-manager";

export const metadata = { title: "공지사항 관리" };

const INITIAL_NOTICES = [
  {
    id: "n1",
    title: "6월 운영시간 안내",
    content: "6월 한 달간 정상 운영합니다. 일요일은 휴무입니다.",
    isVisible: true,
    createdAt: "2026-06-01",
  },
  {
    id: "n2",
    title: "시그니처 케어 신규 오픈",
    content: "바디와 페이스를 함께 관리하는 시그니처 케어가 새롭게 추가되었습니다.",
    isVisible: true,
    createdAt: "2026-05-20",
  },
];

export default function AdminNoticesPage() {
  return (
    <>
      <AdminPageTitle
        title="공지사항 관리"
        description="고객에게 노출되는 공지사항을 등록·관리합니다."
      />
      <AdminNoticesManager initial={INITIAL_NOTICES} />
    </>
  );
}
