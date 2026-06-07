import { ProfileForm } from "@/components/mypage/profile-form";
import { getCustomer } from "@/services/customer.service";
import { MY_USER_ID } from "@/lib/mock/reservations.mock";

export const metadata = { title: "내 정보" };

export default async function ProfilePage() {
  const customer = await getCustomer(MY_USER_ID);

  return (
    <div>
      <h2 className="text-card-title font-semibold text-brown">내 정보</h2>
      <p className="mt-1 text-sm text-muted">회원 정보를 확인하고 수정할 수 있습니다.</p>
      <div className="mt-6">
        {customer ? (
          <ProfileForm customer={customer} />
        ) : (
          <p className="text-muted">고객 정보를 불러올 수 없습니다.</p>
        )}
      </div>
    </div>
  );
}
