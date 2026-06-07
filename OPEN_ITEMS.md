# OPEN_ITEMS.md — 실제 오픈 전 필요한 정보/작업

> 현재 코드의 더미값을 실제 값으로 교체해야 오픈 가능. 값이 정해지면 해당 파일 수정.

---

## 1. 사업자/매장 정보 (현재 모두 임시)
출처 파일: `src/constants/site.ts` (+ `src/lib/mock/settings.mock.ts`, `supabase/seed.sql`)

| 항목 | 현재(임시) | 실제 값 필요 |
|---|---|---|
| 상호 | Petit Elle (쁘띠엘) | (확정) |
| 대표자 | 정영순 | ☐ |
| 주소 | 서울특별시 강북구 도봉로 315 (임시) | ☐ |
| 전화 | 02-900-1234 | ☐ |
| 이메일 | contact@petit-elle.co.kr | ☐ |
| 운영시간 | 월~토 11:00~21:00 / 일 휴무 | ☐ 확인 |
| 주차 | 주차 가능 | ☐ 확인 |
| 사업자등록번호 | (미기재) | ☐ (푸터/약관 표기 권장) |

## 2. SNS / 채널 (현재 임시 URL)
| 항목 | 현재 | 실제 |
|---|---|---|
| 인스타그램 | instagram.com/petit.elle | ☐ |
| 네이버 블로그 | blog.naver.com/petit-elle | ☐ |
| 카카오 채널 | pf.kakao.com/_petitelle | ☐ |

## 3. 프로그램/가격 (현재 임시)
출처: `src/lib/mock/programs.mock.ts`
- 시그니처 케어 179,000원/120분, 릴렉싱 89,000~/60·90분, 아로마 99,000~/60·90분, 페이스 79,000~/50·80분
- ☐ 실제 가격/구성/소요시간 확정 (※ 기획서 간 시그니처 가격 159k↔179k 불일치 → 179k 적용 중, 확정 필요)

## 4. 이미지 (현재 AI/샘플)
- Hero/공간/프로그램/브랜드 이미지: `public/images/*` (샘플). ☐ 실제 매장 촬영본 교체
- ☐ 전용 OG 이미지(`public/images/og/og-image.jpg`, 1200×630, 텍스트 포함)
- ☐ 파비콘/로고(현재 텍스트 워드마크 사용, `public/logo/*.svg` 보유)

## 5. 도메인 / 배포
- ☐ 실제 도메인 확정 → `src/constants/site.ts` `SITE.url`, `.env`(`NEXT_PUBLIC_SITE_URL`), `wrangler.jsonc` 반영
- ☐ Cloudflare Workers 배포(OpenNext) + 기존 Pages 정적 프로젝트 정리 (DEPLOYMENT.md)
- ☐ 커스텀 도메인 연결

## 6. Supabase (DB) — 연동 시 필요
출처: `.env.example`, `SUPABASE_SETUP_GUIDE.md`
- ☐ `NEXT_PUBLIC_SUPABASE_URL`
- ☐ `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- ☐ `SUPABASE_SERVICE_ROLE_KEY` (서버 전용)
- ☐ 스키마/시드/RLS 적용

## 7. 인증
- ☐ 카카오 디벨로퍼스 앱: `KAKAO_CLIENT_ID`, `KAKAO_CLIENT_SECRET`, Redirect URI
- ☐ 관리자 계정(이메일/비번) 및 `admins` 매핑

## 8. 분석/마케팅
- ☐ `GA_MEASUREMENT_ID` (GA4)
- ☐ Google Search Console 등록 + sitemap 제출
- ☐ 네이버 서치어드바이저(선택)

## 9. 법무/정책
- ☐ 이용약관/개인정보처리방침 실제 문구 검토(현재 예시 문안)
- ☐ 개인정보 보호책임자/연락처 확정

## 10. 접근성 결정 사항
- ☐ 골드 버튼/텍스트 대비(AA 미달) — 톤 보정 vs 브랜드 유지 결정 (ACCESSIBILITY_REPORT 참고)

---

### 우선순위 제안
1. (필수) 사업정보·전화·주소·가격 실값 → 잘못된 정보 노출 방지
2. (오픈 핵심) Supabase 연동 → 실제 예약 접수/인증
3. 도메인/배포 확정 + 기존 Pages 정리
4. 이미지·OG·파비콘 실물 교체
5. GA4/Search Console, 약관 검토, 접근성 결정
