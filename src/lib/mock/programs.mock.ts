import type { Program } from "@/types";

// 프로그램 Mock — 09_PAGE_CONTENT.md SECTION 04 기준
// DB 매핑: durations → duration_options(integer[]), benefits → benefits(text[]), isSignature → is_signature
export const PROGRAMS: Program[] = [
  {
    id: "prog-signature",
    slug: "signature-care",
    title: "시그니처 케어",
    shortDescription: "바디와 페이스를 함께 관리하는 프리미엄 프로그램",
    description:
      "바디와 페이스를 함께 관리하는 Petit Elle 대표 프로그램입니다. 전신의 긴장을 부드럽게 이완하고 몸과 마음이 편안해지는 시간을 제공합니다.",
    benefits: [
      "전신 긴장 이완과 깊은 휴식",
      "바디 + 페이스 통합 집중 관리",
      "1:1 프라이빗 맞춤 케어",
      "프리미엄 아로마 오일 사용",
    ],
    durations: [120],
    price: 179000,
    thumbnail: "/images/program/program-signature.jpg",
    displayOrder: 1,
    isActive: true,
    isSignature: true,
    createdAt: "2026-05-20T10:00:00+09:00",
    updatedAt: "2026-05-20T10:00:00+09:00",
  },
  {
    id: "prog-relaxing",
    slug: "relaxing-body",
    title: "릴렉싱 바디 케어",
    shortDescription: "전신 피로 완화와 긴장 이완을 위한 프로그램",
    description:
      "전신의 피로를 완화하고 굳어진 근육의 긴장을 부드럽게 풀어주는 프로그램입니다. 목과 어깨, 등의 뭉침을 집중적으로 관리합니다.",
    benefits: [
      "전신 피로 완화",
      "목·어깨 집중 이완",
      "혈액순환 개선",
      "깊은 이완과 수면의 질 향상",
    ],
    durations: [60, 90],
    price: 89000,
    thumbnail: "/images/program/program-relaxing.jpg",
    displayOrder: 2,
    isActive: true,
    createdAt: "2026-05-20T10:00:00+09:00",
    updatedAt: "2026-05-20T10:00:00+09:00",
  },
  {
    id: "prog-aroma",
    slug: "aroma-therapy",
    title: "아로마 테라피",
    shortDescription: "아로마 오일을 활용한 심신 안정 프로그램",
    description:
      "엄선된 아로마 오일의 향과 부드러운 터치로 심신을 안정시키는 프로그램입니다. 스트레스 해소와 마음의 평온에 집중합니다.",
    benefits: [
      "심신 안정과 스트레스 해소",
      "엄선된 천연 아로마 오일",
      "부드러운 림프 순환 케어",
      "마음의 균형 회복",
    ],
    durations: [60, 90],
    price: 99000,
    thumbnail: "/images/program/program-aroma.jpg",
    displayOrder: 3,
    isActive: true,
    createdAt: "2026-05-20T10:00:00+09:00",
    updatedAt: "2026-05-20T10:00:00+09:00",
  },
  {
    id: "prog-face",
    slug: "face-care",
    title: "페이스 케어",
    shortDescription: "피부 컨디션 개선을 위한 집중 관리",
    description:
      "피부 컨디션을 개선하고 맑고 생기 있는 안색을 되찾아주는 집중 관리 프로그램입니다. 피부 타입에 맞춘 섬세한 케어를 제공합니다.",
    benefits: [
      "피부 컨디션 개선",
      "피부 타입별 맞춤 관리",
      "탄력과 생기 회복",
      "수분 집중 케어",
    ],
    durations: [50, 80],
    price: 79000,
    thumbnail: "/images/program/program-face.jpg",
    displayOrder: 4,
    isActive: true,
    createdAt: "2026-05-20T10:00:00+09:00",
    updatedAt: "2026-05-20T10:00:00+09:00",
  },
];

export function getProgramBySlug(slug: string): Program | undefined {
  return PROGRAMS.find((p) => p.slug === slug);
}
