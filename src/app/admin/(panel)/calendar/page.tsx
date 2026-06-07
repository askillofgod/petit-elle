import { AdminPageTitle } from "@/components/admin/admin-ui";
import { AdminCalendarManager } from "@/components/admin/admin-calendar-manager";

export const metadata = { title: "일정 관리" };

export default function AdminCalendarPage() {
  return (
    <>
      <AdminPageTitle
        title="일정 관리"
        description="예약 가능한 시간을 생성하고 휴무일을 등록할 수 있습니다."
      />
      <AdminCalendarManager />
    </>
  );
}
