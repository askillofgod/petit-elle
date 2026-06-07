import { AdminPageTitle } from "@/components/admin/admin-ui";
import { AdminProgramsManager } from "@/components/admin/admin-programs-manager";
import { listPrograms } from "@/services/program.service";

export const metadata = { title: "프로그램 관리" };

export default async function AdminProgramsPage() {
  const programs = await listPrograms();
  return (
    <>
      <AdminPageTitle
        title="프로그램 관리"
        description="프로그램을 등록·수정하고 노출 여부를 관리할 수 있습니다."
      />
      <AdminProgramsManager initial={programs} />
    </>
  );
}
