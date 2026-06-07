import type { FaqItem, GalleryImage } from "@/types";

// FAQ — 09_PAGE_CONTENT.md SECTION 08
export const FAQS: FaqItem[] = [
  {
    question: "예약은 어떻게 진행되나요?",
    answer:
      "온라인 예약 또는 전화 상담을 통해 예약 신청이 가능합니다. 예약 신청 후 관리자의 확인을 거쳐 예약이 확정됩니다.",
  },
  {
    question: "주차가 가능한가요?",
    answer: "주차 공간이 마련되어 있습니다. 방문 전 안내를 참고해주세요.",
  },
  {
    question: "남성도 이용 가능한가요?",
    answer: "Petit Elle은 여성 고객 전용 공간으로 운영됩니다.",
  },
  {
    question: "당일 예약도 가능한가요?",
    answer: "예약 가능한 시간에 한하여 가능합니다.",
  },
  {
    question: "예약 변경은 가능한가요?",
    answer: "예약일 하루 전까지 변경 가능합니다.",
  },
];

// 공간 갤러리 — public/images/space
export const GALLERY: GalleryImage[] = [
  { src: "/images/space/space-overview.jpg", alt: "Petit Elle 전체 공간 전경", span: "wide" },
  { src: "/images/space/space-lobby.jpg", alt: "Petit Elle 리셉션 로비" },
  { src: "/images/space/space-lounge.jpg", alt: "Petit Elle 휴식 공간" },
  { src: "/images/space/space-room.jpg", alt: "Petit Elle 프라이빗 관리실" },
  { src: "/images/space/space-consult.jpg", alt: "Petit Elle 상담 공간" },
  { src: "/images/space/space-hallway.jpg", alt: "Petit Elle 복도" },
  { src: "/images/space/space-intro.jpg", alt: "Petit Elle 공간 디테일" },
];

// Why Petit Elle — 09 SECTION 05
export const WHY_FEATURES = [
  {
    icon: "Heart",
    title: "여성 전용 공간",
    description: "오직 여성 고객만을 위한 안전하고 편안한 공간",
  },
  {
    icon: "Sparkles",
    title: "1:1 예약 케어",
    description: "예약제로 운영되는 프라이빗 맞춤 케어",
  },
  {
    icon: "Leaf",
    title: "편안한 휴식",
    description: "몸과 마음이 회복되는 힐링 중심 프로그램",
  },
] as const;
