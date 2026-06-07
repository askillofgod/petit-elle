import { Input, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const metadata = { title: "내 정보" };

// 더미 로그인 사용자
const ME = {
  name: "김서연",
  phone: "010-1234-5678",
  email: "seoyeon@example.com",
};

export default function ProfilePage() {
  return (
    <div>
      <h2 className="text-card-title font-semibold text-brown">내 정보</h2>
      <p className="mt-1 text-sm text-muted">회원 정보를 확인하고 수정할 수 있습니다.</p>

      <div className="mt-6 max-w-md space-y-5 rounded-card border border-line bg-white p-lg shadow-card">
        <div>
          <Label htmlFor="p-name">이름</Label>
          <Input id="p-name" defaultValue={ME.name} />
        </div>
        <div>
          <Label htmlFor="p-phone">연락처</Label>
          <Input id="p-phone" defaultValue={ME.phone} />
        </div>
        <div>
          <Label htmlFor="p-email">이메일</Label>
          <Input id="p-email" type="email" defaultValue={ME.email} />
        </div>
        <label className="flex items-center gap-3 text-sm text-brown">
          <input type="checkbox" className="h-5 w-5 accent-gold" defaultChecked />
          마케팅 정보 수신에 동의합니다.
        </label>
        <Button size="lg" className="w-full">
          저장하기
        </Button>
      </div>
    </div>
  );
}
