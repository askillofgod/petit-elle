// 사이트 전역 설정 — 09_PAGE_CONTENT.md / 01_PROJECT_OVERVIEW.md 기준 (임시값)

export const SITE = {
  name: "Petit Elle",
  nameKo: "쁘띠엘",
  slogan: "그녀를 위한 작은 휴식 공간",
  eyebrow: "Private Healing Studio For Women",
  description:
    "강북구 여성전용 마사지 & 에스테틱. 프라이빗 공간에서 즐기는 프리미엄 힐링 케어. 온라인 예약 가능.",
  url: "https://petit-elle.co.kr",
  // 연락처 (임시)
  phone: "02-900-1234",
  phoneHref: "tel:02-900-1234",
  email: "contact@petit-elle.co.kr",
  address: "서울특별시 강북구 도봉로 315",
  addressDetail: "Petit Elle (임시 주소)",
  representative: "정영순",
  businessHours: "월요일 ~ 토요일 11:00 ~ 21:00",
  closedDay: "일요일 휴무",
  parking: "주차 가능",
  // 소셜 (임시)
  social: {
    instagram: "https://instagram.com/petit.elle",
    blog: "https://blog.naver.com/petit-elle",
    kakao: "https://pf.kakao.com/_petitelle",
  },
} as const;

export const NAV_ITEMS = [
  { label: "프로그램", href: "/programs" },
  { label: "공간소개", href: "/space" },
  { label: "예약하기", href: "/reservation" },
  { label: "FAQ", href: "/faq" },
  { label: "오시는길", href: "/location" },
] as const;

// 관리자 사이드바 메뉴 — 07/10 기준
export const ADMIN_NAV = [
  { label: "대시보드", href: "/admin", icon: "LayoutDashboard" },
  { label: "예약 관리", href: "/admin/reservations", icon: "CalendarCheck" },
  { label: "일정 관리", href: "/admin/calendar", icon: "CalendarDays" },
  { label: "고객 관리", href: "/admin/customers", icon: "Users" },
  { label: "프로그램 관리", href: "/admin/programs", icon: "Sparkles" },
  { label: "공지사항", href: "/admin/notices", icon: "Megaphone" },
  { label: "설정", href: "/admin/settings", icon: "Settings" },
] as const;

// 예약 가능 기본 시간 슬롯 — 02 PRD 11번
export const DEFAULT_TIME_SLOTS = [
  "11:00",
  "12:30",
  "14:00",
  "15:30",
  "17:00",
  "18:30",
  "20:00",
] as const;
