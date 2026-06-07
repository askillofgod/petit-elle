import { AdminPageTitle } from "@/components/admin/admin-ui";
import { AdminCustomersManager } from "@/components/admin/admin-customers-manager";
import { listCustomers } from "@/services/customer.service";

export const metadata = { title: "고객 관리" };

export default async function AdminCustomersPage() {
  const customers = await listCustomers();
  return (
    <>
      <AdminPageTitle
        title="고객 관리"
        description="방문 고객 정보와 예약 이력을 검색·정렬할 수 있습니다."
      />
      <AdminCustomersManager initial={customers} />
    </>
  );
}
