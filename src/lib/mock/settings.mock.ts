import type { Admin, BusinessHour, SiteSettings } from "@/types";
import { SITE } from "@/constants/site";

// 사이트 설정 Mock (settings 단일 row). 기본값은 constants/site 와 동기화.
export const SITE_SETTINGS: SiteSettings = {
  siteName: SITE.name,
  representative: SITE.representative,
  phone: SITE.phone,
  email: SITE.email,
  address: SITE.address,
  addressDetail: SITE.addressDetail,
  instagramUrl: SITE.social.instagram,
  blogUrl: SITE.social.blog,
  kakaoChannelUrl: SITE.social.kakao,
  businessHours: SITE.businessHours,
  closedDay: SITE.closedDay,
  parking: SITE.parking,
};

// 운영시간 Mock (0=일 ~ 6=토). 월~토 11:00~21:00, 일 휴무
export const BUSINESS_HOURS: BusinessHour[] = [
  { dayOfWeek: 0, openTime: null, closeTime: null, isOpen: false },
  { dayOfWeek: 1, openTime: "11:00", closeTime: "21:00", isOpen: true },
  { dayOfWeek: 2, openTime: "11:00", closeTime: "21:00", isOpen: true },
  { dayOfWeek: 3, openTime: "11:00", closeTime: "21:00", isOpen: true },
  { dayOfWeek: 4, openTime: "11:00", closeTime: "21:00", isOpen: true },
  { dayOfWeek: 5, openTime: "11:00", closeTime: "21:00", isOpen: true },
  { dayOfWeek: 6, openTime: "11:00", closeTime: "21:00", isOpen: true },
];

// 관리자 Mock (admins). 실제 인증은 Supabase Auth 연동 시 적용.
export const ADMINS: Admin[] = [
  {
    id: "a1",
    email: "admin@petit-elle.co.kr",
    name: "정영순",
    role: "SUPER_ADMIN",
    isActive: true,
  },
];
