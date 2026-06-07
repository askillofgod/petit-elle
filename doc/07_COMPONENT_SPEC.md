# 07_COMPONENT_SPEC.md

# Petit Elle Component Specification
## UI Component & Reusable Module Guide

Version: 1.0

---

# 1. 문서 목적

본 문서는 Petit Elle 웹사이트와 예약 플랫폼에서 사용하는 공통 컴포넌트의 구조와 역할을 정의한다.

모든 컴포넌트는 재사용 가능해야 하며, 디자인 시스템을 준수해야 한다.

---

# 2. 컴포넌트 개발 원칙

## 기본 원칙

- 재사용 가능한 구조로 개발한다.
- 중복 컴포넌트 생성을 피한다.
- TypeScript 타입을 명확히 정의한다.
- 모바일 우선으로 설계한다.
- 접근성을 고려한다.
- 디자인 시스템 컬러와 간격 규칙을 따른다.

---

# 3. 컴포넌트 분류

## Layout Components

- Header
- Footer
- MobileNavigation
- PageContainer
- Section
- AdminLayout

---

## Section Components

- HeroSection
- BrandStorySection
- ProgramSection
- SignatureProgramSection
- SpaceGallerySection
- ReservationCTASection
- FAQSection
- LocationSection

---

## UI Components

- Button
- Card
- Badge
- Modal
- Toast
- Input
- Textarea
- Select
- Checkbox
- Tabs
- Accordion

---

## Reservation Components

- ReservationStepper
- ProgramSelector
- ReservationCalendar
- TimeSlotSelector
- CustomerInfoForm
- ReservationSummary
- ReservationStatusBadge

---

## Admin Components

- AdminSidebar
- AdminHeader
- AdminStatCard
- AdminReservationTable
- AdminCalendar
- AdminProgramForm
- AdminCustomerTable

---

# 4. Header Component

## Component Name

Header

---

## Purpose

사이트 전역 상단 네비게이션을 제공한다.

---

## Desktop 구성

- Logo
- Navigation Menu
- Login Link
- Reservation CTA Button

---

## Mobile 구성

- Logo
- Hamburger Menu
- Mobile Drawer

---

## Navigation Items

- 프로그램
- 공간소개
- 예약하기
- FAQ
- 오시는길
- 로그인

---

## Behavior

- 스크롤 전에는 투명 또는 Soft Ivory 배경
- 스크롤 후에는 반투명 배경과 blur 적용
- 예약하기 버튼은 항상 강조
- 모바일에서는 햄버거 메뉴 사용

---

# 5. Footer Component

## Component Name

Footer

---

## Purpose

브랜드 정보, 연락처, SNS, 정책 링크를 제공한다.

---

## 구성

- Logo
- 브랜드 소개
- 전화번호
- 운영시간
- 주소
- 인스타그램 링크
- 네이버 블로그 링크
- 카카오 채널 링크
- 이용약관
- 개인정보처리방침
- 사업자 정보

---

# 6. HeroSection Component

## Component Name

HeroSection

---

## Purpose

첫 화면에서 브랜드 인상과 예약 전환을 만든다.

---

## Layout

Desktop

- Left: Text Content
- Right: Hero Image

Mobile

- Image Top
- Text Bottom

또는 Background Image + Overlay

---

## 구성

- Eyebrow Text
- Main Title
- Subtitle
- Primary CTA
- Secondary CTA
- Hero Image

---

## CTA

Primary

온라인 예약하기

Secondary

프로그램 보기

---

# 7. BrandStorySection Component

## Component Name

BrandStorySection

---

## Purpose

Petit Elle의 브랜드 철학과 치유 중심 가치를 설명한다.

---

## 구성

- Section Title
- Brand Story Text
- Image
- Small CTA

---

## 내용 방향

- 여성 전용
- 프라이빗
- 치유
- 편안한 휴식

---

# 8. SignatureProgramSection Component

## Component Name

SignatureProgramSection

---

## Purpose

대표 프로그램을 가장 강하게 노출한다.

---

## 구성

- 대표 이미지
- 프로그램명
- 설명
- 소요시간
- 가격
- 예약하기 버튼

---

## 추천 프로그램

시그니처 케어

120분

179,000원

---

# 9. ProgramCard Component

## Component Name

ProgramCard

---

## Purpose

프로그램 정보를 카드 형태로 보여준다.

---

## Props

```ts
type ProgramCardProps = {
  title: string
  description: string
  duration: string
  price: string
  imageUrl: string
  slug: string
}
```

---

## 구성

- Thumbnail Image
- Title
- Description
- Duration
- Price
- Reservation Button

---

## Behavior

- Hover 시 카드가 살짝 상승
- 클릭 시 프로그램 상세 또는 예약 페이지 이동
- 모바일에서는 1열 표시

---

# 10. SpaceGallerySection Component

## Component Name

SpaceGallerySection

---

## Purpose

매장의 프리미엄 공간감을 이미지로 전달한다.

---

## 구성

- Section Title
- Gallery Grid
- Image Card

---

## 이미지 종류

- 리셉션
- 관리실
- 복도
- 파우더룸
- 샤워룸
- 공간 디테일

---

# 11. ReservationCTASection Component

## Component Name

ReservationCTASection

---

## Purpose

예약 전환을 유도한다.

---

## 구성

- 강한 예약 유도 문구
- 온라인 예약 버튼
- 카카오 상담 버튼
- 전화 상담 버튼

---

## 위치

- Home 중간
- Home 하단
- Program 상세 하단
- Footer 이전

---

# 12. FAQSection Component

## Component Name

FAQSection

---

## Purpose

고객의 주요 질문을 빠르게 해결한다.

---

## 구성

Accordion

---

## 기본 질문

- 예약은 어떻게 진행되나요?
- 주차가 가능한가요?
- 남성도 이용 가능한가요?
- 당일 예약도 가능한가요?
- 예약 변경은 가능한가요?

---

# 13. LocationSection Component

## Component Name

LocationSection

---

## Purpose

매장 위치와 방문 정보를 제공한다.

---

## 구성

- 지도 영역
- 주소
- 전화번호
- 운영시간
- 주차 안내
- 길찾기 버튼

---

# 14. TopButton Component

## Component Name

TopButton

---

## Purpose

스크롤 후 상단으로 빠르게 이동한다.

---

## Position

오른쪽 하단

---

## Behavior

- 스크롤 300px 이상에서 노출
- 클릭 시 smooth scroll로 상단 이동
- 모바일 하단 예약 버튼과 겹치지 않게 위치 조정

---

# 15. FloatingReservationButton Component

## Component Name

FloatingReservationButton

---

## Purpose

모바일에서 예약 접근성을 높인다.

---

## Position

모바일 하단 고정

---

## Text

온라인 예약하기

---

## Behavior

- 모바일에서만 노출
- 예약 페이지에서는 숨김 가능
- 클릭 시 /reservation 이동

---

# 16. ReservationStepper Component

## Component Name

ReservationStepper

---

## Purpose

예약 진행 단계를 시각적으로 표시한다.

---

## Steps

1. 프로그램 선택
2. 날짜 선택
3. 시간 선택
4. 정보 입력
5. 예약 확인
6. 완료

---

# 17. ProgramSelector Component

## Component Name

ProgramSelector

---

## Purpose

예약 과정에서 프로그램을 선택한다.

---

## 구성

- 프로그램 카드
- 가격
- 소요시간
- 선택 상태 표시

---

# 18. ReservationCalendar Component

## Component Name

ReservationCalendar

---

## Purpose

예약 가능한 날짜를 선택한다.

---

## 구성

- 월간 달력
- 예약 가능 날짜
- 예약 불가 날짜
- 선택한 날짜

---

## Behavior

- 예약 가능 날짜만 활성화
- 휴무일 비활성화
- 과거 날짜 비활성화

---

# 19. TimeSlotSelector Component

## Component Name

TimeSlotSelector

---

## Purpose

선택한 날짜의 예약 가능 시간을 선택한다.

---

## 상태

- Available
- Selected
- Disabled

---

## 예시 시간

- 11:00
- 12:30
- 14:00
- 15:30
- 17:00
- 18:30
- 20:00

---

# 20. CustomerInfoForm Component

## Component Name

CustomerInfoForm

---

## Purpose

예약에 필요한 고객 정보를 입력받는다.

---

## Fields

- 이름
- 연락처
- 요청사항
- 개인정보 동의 체크박스

---

## Validation

- 이름 필수
- 연락처 필수
- 개인정보 동의 필수

---

# 21. ReservationSummary Component

## Component Name

ReservationSummary

---

## Purpose

예약 신청 전 선택한 정보를 요약해서 보여준다.

---

## 표시 정보

- 프로그램
- 날짜
- 시간
- 고객명
- 연락처
- 요청사항
- 예상 가격

---

# 22. ReservationStatusBadge Component

## Component Name

ReservationStatusBadge

---

## Purpose

예약 상태를 명확하게 표시한다.

---

## Status

PENDING

승인 대기

---

APPROVED

예약 확정

---

REJECTED

예약 거절

---

CANCELLED

예약 취소

---

COMPLETED

방문 완료

---

NO_SHOW

노쇼

---

# 23. AdminSidebar Component

## Component Name

AdminSidebar

---

## Purpose

관리자 페이지의 주요 메뉴를 제공한다.

---

## Menu

- 대시보드
- 예약 관리
- 일정 관리
- 고객 관리
- 프로그램 관리
- 공지사항
- 설정

---

# 24. AdminStatCard Component

## Component Name

AdminStatCard

---

## Purpose

관리자 대시보드에서 주요 지표를 보여준다.

---

## 표시 정보

- 오늘 예약
- 승인 대기
- 예약 완료
- 노쇼
- 신규 고객

---

# 25. AdminReservationTable Component

## Component Name

AdminReservationTable

---

## Purpose

예약 목록을 표 형태로 관리한다.

---

## Columns

- 예약번호
- 고객명
- 연락처
- 프로그램
- 예약일
- 예약시간
- 상태
- 액션

---

## Actions

- 상세보기
- 승인
- 거절
- 취소
- 방문완료
- 노쇼

---

# 26. AdminCalendar Component

## Component Name

AdminCalendar

---

## Purpose

관리자가 예약 가능 일정을 관리한다.

---

## 기능

- 예약 가능 시간 생성
- 예약 가능 시간 수정
- 휴무일 등록
- 시간 슬롯 비활성화

---

# 27. AdminProgramForm Component

## Component Name

AdminProgramForm

---

## Purpose

프로그램 등록 및 수정을 처리한다.

---

## Fields

- 프로그램명
- 설명
- 소요시간
- 가격
- 이미지
- 노출 여부
- 정렬 순서

---

# 28. Modal Component

## Component Name

Modal

---

## Purpose

확인, 취소, 안내 메시지를 제공한다.

---

## 사용 예시

- 예약 취소 확인
- 예약 승인 확인
- 삭제 확인
- 개인정보 안내

---

# 29. Toast Component

## Component Name

Toast

---

## Purpose

작업 결과를 짧게 안내한다.

---

## Types

- Success
- Error
- Warning
- Info

---

# 30. EmptyState Component

## Component Name

EmptyState

---

## Purpose

데이터가 없을 때 안내 문구를 표시한다.

---

## 사용 위치

- 예약 내역 없음
- 검색 결과 없음
- 공지사항 없음

---

# 31. LoadingState Component

## Component Name

LoadingState

---

## Purpose

데이터 로딩 중 상태를 표시한다.

---

## 사용 위치

- 예약 조회
- 프로그램 조회
- 관리자 목록

---

# 32. ErrorState Component

## Component Name

ErrorState

---

## Purpose

오류 발생 시 안내한다.

---

## 기본 문구

잠시 후 다시 시도해주세요.

---

# 33. 컴포넌트 네이밍 규칙

컴포넌트명은 PascalCase를 사용한다.

예시

ProgramCard

ReservationCalendar

AdminSidebar

---

파일명은 kebab-case를 사용한다.

예시

program-card.tsx

reservation-calendar.tsx

admin-sidebar.tsx

---

# 34. 컴포넌트 성공 기준

- 중복 컴포넌트 최소화
- 모바일 대응 필수
- 접근성 고려
- TypeScript 타입 명확화
- 디자인 시스템 준수
- 예약 전환을 방해하지 않는 구조

---

End of Document