import { z } from "zod";

/** 관리자 일정(슬롯) 생성 검증 */
export const createSlotSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "날짜를 선택해주세요."),
  times: z
    .array(z.string().regex(/^\d{2}:\d{2}$/, "시간 형식이 올바르지 않습니다."))
    .min(1, "최소 한 개 이상의 시간을 선택해주세요."),
  maxCapacity: z.number().int().min(1).max(10).default(1),
});

export type CreateSlotInput = z.infer<typeof createSlotSchema>;

/** 단일 시간 추가 검증 (HH:mm) */
export const timeStringSchema = z
  .string()
  .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "올바른 시간(HH:mm)을 입력해주세요.");
