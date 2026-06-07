import { z } from "zod";

const phoneRegex = /^01[016789]-?\d{3,4}-?\d{4}$/;

/** 고객 정보(마이페이지) 검증 */
export const customerProfileSchema = z.object({
  name: z.string().trim().min(1, "이름을 입력해주세요.").max(50),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, "올바른 휴대폰 번호를 입력해주세요. (예: 010-1234-5678)"),
  email: z
    .union([z.string().trim().email("올바른 이메일을 입력해주세요."), z.literal("")])
    .optional(),
  marketingAgreement: z.boolean().optional(),
});

export type CustomerProfileValues = z.infer<typeof customerProfileSchema>;
