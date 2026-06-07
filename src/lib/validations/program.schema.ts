import { z } from "zod";

/** 관리자 프로그램 등록/수정 폼 검증 */
export const programFormSchema = z.object({
  title: z.string().trim().min(1, "프로그램명을 입력해주세요.").max(100),
  shortDescription: z
    .string()
    .trim()
    .min(1, "간단 설명을 입력해주세요.")
    .max(200, "간단 설명은 200자 이내로 입력해주세요."),
  // "60,90" 형태 입력 → number[] 로 변환
  durations: z
    .string()
    .trim()
    .min(1, "소요시간을 입력해주세요. (예: 60,90)")
    .transform((s) =>
      s
        .split(",")
        .map((v) => parseInt(v.trim(), 10))
        .filter((n) => !Number.isNaN(n))
    )
    .refine((arr) => arr.length > 0, "올바른 소요시간을 입력해주세요.")
    .refine((arr) => arr.every((n) => n > 0 && n <= 300), "소요시간은 1~300분 사이여야 합니다."),
  price: z.coerce
    .number({ message: "가격을 숫자로 입력해주세요." })
    .int("가격은 정수여야 합니다.")
    .min(0, "가격은 0 이상이어야 합니다."),
});

export type ProgramFormValues = z.input<typeof programFormSchema>;
export type ProgramFormParsed = z.output<typeof programFormSchema>;
