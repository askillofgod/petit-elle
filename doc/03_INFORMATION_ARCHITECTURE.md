# 03_INFORMATION_ARCHITECTURE.md

# Petit Elle Information Architecture
## Sitemap & Navigation Structure

Version: 1.0

---

# 1. 문서 목적

본 문서는 Petit Elle 서비스의 전체 사이트 구조와 페이지 관계를 정의한다.

개발자, 디자이너, 기획자는 본 문서를 기준으로 화면 구조를 설계한다.

---

# 2. 사이트 구조

Petit Elle

├── 홈페이지
├── 프로그램
├── 공간 소개
├── 예약하기
├── FAQ
├── 오시는 길
├── 로그인
├── 마이페이지
└── 관리자

---

# 3. Public Sitemap

비회원 및 일반 사용자

/

홈페이지

---

/programs

프로그램 목록

---

/programs/[slug]

프로그램 상세

---

/space

공간 소개

---

/reservation

온라인 예약

---

/reservation/complete

예약 완료

---

/faq

자주 묻는 질문

---

/location

오시는 길

---

/login

카카오 로그인

---

/privacy

개인정보처리방침

---

/terms

이용약관

---

# 4. Member Sitemap

회원 전용

---

/mypage

마이페이지

---

/mypage/reservations

예약 내역

---

/mypage/reservations/[id]

예약 상세

---

/mypage/profile

내 정보

---

# 5. Admin Sitemap

관리자 전용

---

/admin

대시보드

---

/admin/login

관리자 로그인

---

/admin/reservations

예약 관리

---

/admin/reservations/[id]

예약 상세

---

/admin/calendar

일정 관리

---

/admin/customers

고객 관리

---

/admin/programs

프로그램 관리

---

/admin/notices

공지사항 관리

---

/admin/settings

사이트 설정

---

# 6. Header Navigation

Desktop

---

Logo

---

프로그램

---

공간소개

---

예약하기

---

FAQ

---

오시는길

---

로그인

---

예약하기 버튼

강조

---

# 7. Mobile Navigation

햄버거 메뉴

---

프로그램

공간소개

예약하기

FAQ

오시는길

로그인

---

# 8. Footer Navigation

브랜드 정보

---

인스타그램

---

네이버 블로그

---

카카오 채널

---

전화번호

---

운영시간

---

이용약관

---

개인정보처리방침

---

사업자정보

---

# 9. 예약 플로우

홈페이지

↓

예약하기

↓

프로그램 선택

↓

날짜 선택

↓

시간 선택

↓

고객 정보 입력

↓

예약 신청

↓

예약 완료

↓

관리자 승인

↓

예약 확정

---

# 10. 로그인 플로우

로그인 버튼

↓

카카오 로그인

↓

회원 생성

또는

기존 회원 로그인

↓

마이페이지 이동

---

# 11. 마이페이지 플로우

마이페이지

↓

예약 내역

↓

예약 상세

↓

예약 취소 요청

또는

재예약

---

# 12. 관리자 플로우

관리자 로그인

↓

대시보드

↓

예약 확인

↓

승인 또는 거절

↓

예약 상태 변경

---

# 13. URL 규칙

모든 URL은

소문자 사용

---

공백 사용 금지

---

SEO Friendly URL 사용

---

예시

/programs/signature-care

/programs/aroma-therapy

/programs/relaxing-body

---

# 14. Breadcrumb 구조

프로그램 상세

홈

>

프로그램

>

프로그램 상세

---

예약

홈

>

예약하기

---

마이페이지

홈

>

마이페이지

---

# 15. 접근 권한

Public

모든 사용자

---

Member

로그인 사용자

---

Admin

관리자만 접근 가능

---

# 16. 404 페이지

존재하지 않는 페이지

---

문구

요청하신 페이지를 찾을 수 없습니다.

---

버튼

홈으로 이동

---

# 17. Error 페이지

시스템 오류 발생

---

문구

잠시 후 다시 시도해주세요.

---

버튼

홈으로 이동

---

# 18. Success 페이지

예약 완료

---

문구

예약 신청이 완료되었습니다.

관리자 승인 후 예약이 확정됩니다.

---

버튼

홈으로 이동

마이페이지

---

# 19. Future Pages

Version 2

---

/membership

멤버십

---

/reviews

고객 후기

---

/events

이벤트

---

/packages

패키지 상품

---

# 20. IA 성공 기준

고객은

3번 이하 클릭으로

예약 페이지에 진입 가능해야 한다.

---

모든 주요 페이지는

모바일에서도 쉽게 접근 가능해야 한다.

---

예약하기 버튼은

항상 쉽게 찾을 수 있어야 한다.

---

End of Document