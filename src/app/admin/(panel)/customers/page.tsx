import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { AdminPageTitle, AdminCard } from "@/components/admin/admin-ui";
import { Badge } from "@/components/ui/badge";
import { DUMMY_CUSTOMERS } from "@/lib/dummy-data";

export const metadata = { title: "고객 관리" };

export default function AdminCustomersPage() {
  return (
    <>
      <AdminPageTitle
        title="고객 관리"
        description="방문 고객 정보와 예약 이력을 확인할 수 있습니다."
      />

      {/* Desktop table */}
      <AdminCard className="hidden overflow-hidden lg:block">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-line bg-beige-light/30 text-xs uppercase tracking-wider text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">고객명</th>
              <th className="px-4 py-3 font-medium">연락처</th>
              <th className="px-4 py-3 font-medium">예약 횟수</th>
              <th className="px-4 py-3 font-medium">최근 방문일</th>
              <th className="px-4 py-3 font-medium">가입일</th>
              <th className="px-4 py-3 font-medium">상태</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {DUMMY_CUSTOMERS.map((c) => (
              <tr key={c.id} className="hover:bg-beige-light/20">
                <td className="px-4 py-3 font-medium text-brown">{c.name}</td>
                <td className="px-4 py-3 text-muted">{c.phone}</td>
                <td className="px-4 py-3 text-brown">{c.reservationCount}회</td>
                <td className="px-4 py-3 text-muted">
                  {c.lastVisitAt
                    ? format(new Date(c.lastVisitAt), "yyyy.MM.dd")
                    : "—"}
                </td>
                <td className="px-4 py-3 text-muted">
                  {format(new Date(c.createdAt), "yyyy.MM.dd")}
                </td>
                <td className="px-4 py-3">
                  {c.reservationCount >= 5 ? (
                    <Badge variant="gold">단골</Badge>
                  ) : (
                    <Badge variant="default">일반</Badge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </AdminCard>

      {/* Mobile cards */}
      <div className="space-y-3 lg:hidden">
        {DUMMY_CUSTOMERS.map((c) => (
          <div key={c.id} className="rounded-card border border-line bg-white p-4 shadow-card">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-brown">{c.name}</p>
              {c.reservationCount >= 5 ? (
                <Badge variant="gold">단골</Badge>
              ) : (
                <Badge variant="default">일반</Badge>
              )}
            </div>
            <p className="mt-1 text-sm text-muted">{c.phone}</p>
            <p className="mt-2 text-sm text-muted">
              예약 {c.reservationCount}회 · 최근{" "}
              {c.lastVisitAt ? format(new Date(c.lastVisitAt), "yyyy.MM.dd") : "—"}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
