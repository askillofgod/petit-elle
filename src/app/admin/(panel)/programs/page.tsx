import { AdminPageTitle } from "@/components/admin/admin-ui";
import { AdminProgramsManager } from "@/components/admin/admin-programs-manager";
import { PROGRAMS } from "@/constants/programs";

export const metadata = { title: "프로그램 관리" };

export default function AdminProgramsPage() {
  return (
    <>
      <AdminPageTitle
        title="프로그램 관리"
        description="프로그램을 등록·수정하고 노출 여부를 관리할 수 있습니다."
      />
      <AdminProgramsManager initial={PROGRAMS} />
    </>
  );
}
