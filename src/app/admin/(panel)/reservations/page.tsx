import { AdminPageTitle } from "@/components/admin/admin-ui";
import { AdminReservationsManager } from "@/components/admin/admin-reservations-manager";
import { DUMMY_RESERVATIONS } from "@/lib/dummy-data";

export const metadata = { title: "예약 관리" };

export default function AdminReservationsPage() {
  const sorted = [...DUMMY_RESERVATIONS].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt)
  );
  return (
    <>
      <AdminPageTitle
        title="예약 관리"
        description="예약을 확인하고 승인·거절·방문완료 처리를 할 수 있습니다."
      />
      <AdminReservationsManager initial={sorted} />
    </>
  );
}
