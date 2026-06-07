import { z } from "zod";

const phoneRegex = /^01[016789]-?\d{3,4}-?\d{4}$/;

/** 예약 폼(클라이언트) — 고객 정보 입력 단계 검증 */
export const reservationFormSchema = z.object({
  name: z.string().trim().min(1, "이름을 입력해주세요.").max(50, "이름이 너무 깁니다."),
  phone: z
    .string()
    .trim()
    .min(1, "연락처를 입력해주세요.")
    .regex(phoneRegex, "올바른 휴대폰 번호를 입력해주세요. (예: 010-1234-5678)"),
  note: z.string().trim().max(500, "요청사항은 500자 이내로 입력해주세요.").optional(),
  agree: z.literal(true, { message: "개인정보 수집·이용에 동의해주세요." }),
});

export type ReservationFormValues = z.infer<typeof reservationFormSchema>;

/** 예약 생성(서버 액션) 입력 — 선택 정보 포함 전체 */
export const createReservationSchema = z.object({
  programId: z.string().min(1, "프로그램을 선택해주세요."),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "날짜를 선택해주세요."),
  time: z.string().regex(/^\d{2}:\d{2}$/, "시간을 선택해주세요."),
  customerName: z.string().trim().min(1, "이름을 입력해주세요.").max(50),
  customerPhone: z.string().trim().regex(phoneRegex, "올바른 휴대폰 번호를 입력해주세요."),
  requestNote: z.string().trim().max(500).optional(),
});

export type CreateReservationInput = z.infer<typeof createReservationSchema>;
