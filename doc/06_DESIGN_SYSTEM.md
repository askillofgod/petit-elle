# 06_DESIGN_SYSTEM.md

# Petit Elle Design System
## Brand & UI Design Guideline

Version: 1.0

---

# 1. 문서 목적

본 문서는 Petit Elle 홈페이지와 예약 플랫폼의 디자인 기준을 정의한다.

모든 화면, 컴포넌트, 컬러, 타이포그래피, 이미지 스타일은 본 문서를 기준으로 제작한다.

---

# 2. 브랜드 디자인 방향

Petit Elle은 단순한 마사지샵이 아니다.

여성 고객이 몸과 마음을 회복할 수 있는 프리미엄 힐링 스튜디오이다.

---

## Core Concept

Private Healing Studio For Women

---

## Visual Direction

호텔 스파

프리미엄 에스테틱

프라이빗 여성 공간

따뜻한 치유 공간

---

## Design Keywords

Healing

Private

Warm

Luxury

Comfort

Elegant

Soft

Natural

---

# 3. 브랜드 무드

고객이 홈페이지에서 느껴야 하는 감정

1. 편안함
2. 신뢰감
3. 따뜻함
4. 프라이빗함
5. 예약하고 싶은 마음

---

# 4. 참고 이미지 기반 디자인 방향

참고 이미지의 핵심 특징을 디자인에 반영한다.

---

## 공간 느낌

은은한 간접조명

부드러운 아이보리 톤

웜 베이지 인테리어

샴페인 골드 포인트

자연광

곡선형 공간감

정돈된 호텔 스파 분위기

---

## 피해야 할 느낌

병원 같은 차가운 느낌

저가 마사지샵 느낌

과한 네온 컬러

복잡한 배너

강한 블랙 배경

과한 할인 광고

과장된 효과

---

# 5. Color System

## Primary Color

Warm Beige

`#D8BFB2`

사용 위치

- 주요 배경
- 섹션 포인트
- 카드 강조
- 예약 CTA 영역

---

## Secondary Color

Soft Ivory

`#F7F3EF`

사용 위치

- 전체 배경
- Hero 배경
- 예약 페이지 배경

---

## Accent Color

Champagne Gold

`#B88D7A`

사용 위치

- 예약 버튼
- 링크 강조
- 아이콘
- 가격 강조

---

## Deep Text Color

Warm Brown

`#6A5A52`

사용 위치

- 제목
- 주요 텍스트
- Footer

---

## Light Beige

`#EADCD2`

사용 위치

- 보조 배경
- 카드 배경
- 구분 영역

---

## Text Primary

`#2E2926`

---

## Text Secondary

`#7A6D66`

---

## Border Color

`#E6D8CF`

---

## Success

`#5F8A65`

---

## Warning

`#C98A3A`

---

## Error

`#C35A5A`

---

# 6. Color Usage Ratio

전체 화면에서 컬러 비율은 아래 기준을 따른다.

---

Soft Ivory

60%

---

Warm Beige

25%

---

Champagne Gold

10%

---

Deep Brown

5%

---

# 7. Typography

## Korean Font

Pretendard

---

## English Accent Font

Cormorant Garamond

또는

Playfair Display

---

## Font Style Direction

한글은 읽기 편하고 단정하게 유지한다.

영문 브랜드명과 큰 타이틀은 우아한 세리프 느낌을 사용할 수 있다.

---

# 8. Font Scale

## Hero Title

Desktop

72px ~ 96px

---

Tablet

56px ~ 72px

---

Mobile

40px ~ 48px

---

## Section Title

Desktop

48px ~ 64px

---

Tablet

40px ~ 48px

---

Mobile

28px ~ 36px

---

## Card Title

Desktop

24px

---

Mobile

20px

---

## Body Text

Desktop

18px

---

Mobile

16px

---

## Caption

14px

---

# 9. Responsive Typography

반드시 `clamp()` 사용을 권장한다.

---

## Hero Title

```css
font-size: clamp(40px, 6vw, 96px);
```

---

## Section Title

```css
font-size: clamp(28px, 4vw, 64px);
```

---

## Body Text

```css
font-size: clamp(15px, 1.3vw, 18px);
```

---

# 10. Layout System

## Container

Desktop

1280px

---

Large Desktop

1440px max

---

Tablet

100%

Padding 40px

---

Mobile

100%

Padding 24px

---

# 11. Grid System

## Desktop

12 Column Grid

---

## Tablet

6 Column Grid

---

## Mobile

4 Column Grid

---

# 12. Spacing System

## XS

8px

---

## SM

16px

---

## MD

24px

---

## LG

40px

---

## XL

80px

---

## XXL

120px

---

# 13. Border Radius

## Button

999px

둥근 필 형태

---

## Card

24px

---

## Image

28px

---

## Modal

32px

---

## Input

14px

---

# 14. Shadow System

그림자는 강하게 사용하지 않는다.

전체적으로 부드럽고 얕은 그림자를 사용한다.

---

## Card Shadow

```css
box-shadow: 0 16px 40px rgba(80, 60, 50, 0.08);
```

---

## Hover Shadow

```css
box-shadow: 0 24px 60px rgba(80, 60, 50, 0.12);
```

---

# 15. Button System

## Primary Button

사용 위치

- 온라인 예약하기
- 예약 신청하기
- 카카오 상담하기

---

Style

배경

`#B88D7A`

글자

`#FFFFFF`

Border Radius

999px

높이

52px 이상

---

Hover

배경을 조금 어둡게 변경

---

## Secondary Button

사용 위치

- 프로그램 보기
- 더 알아보기
- 뒤로가기

---

Style

배경

Transparent

Border

`#B88D7A`

글자

`#6A5A52`

---

## Text Button

사용 위치

- 링크 이동
- 상세 보기

---

Style

밑줄 또는 화살표 사용

---

# 16. Card System

## Program Card

구성

이미지

프로그램명

간단 설명

소요시간

가격

예약 버튼

---

Style

White 또는 Soft Ivory 배경

Radius 24px

Soft Shadow

Hover 시 살짝 상승

---

## Reservation Card

구성

선택한 프로그램

예약 날짜

예약 시간

고객 정보

예약 상태

---

예약 상태 Badge 필수

---

# 17. Image Style

## 전체 이미지 방향

따뜻한 자연광

은은한 간접조명

베이지 공간

고급스러운 소재감

차분한 인물 표정

---

## Hero Image

여성 고객이 편안하게 쉬는 장면

프리미엄 스파 공간

자연광

부드러운 표정

---

## Space Gallery

리셉션

관리실

복도

파우더룸

샤워룸

공간 디테일

---

## Program Image

관리 장면

타월

오일

베드

손의 디테일

---

# 18. Icon Style

Lucide React 사용

---

아이콘은 얇고 단정한 라인 스타일

---

Stroke Width

1.5px ~ 2px

---

아이콘 컬러

`#B88D7A`

또는

`#6A5A52`

---

# 19. Header Design

## Desktop Header

높이

72px

---

배경

투명 또는 Soft Ivory

---

스크롤 후

반투명 배경 + blur

---

구성

Logo

Navigation

예약하기 버튼

---

## Mobile Header

Logo

Hamburger Button

---

예약 버튼은 하단 고정 CTA로 분리

---

# 20. Hero Section

## 높이

100vh

---

## Layout

Desktop

좌측 텍스트

우측 이미지

---

Mobile

상단 이미지

하단 텍스트

또는

배경 이미지 + 오버레이

---

## 필수 요소

브랜드명

메인 카피

서브 카피

온라인 예약 버튼

프로그램 보기 버튼

---

# 21. Reservation CTA

예약 CTA는 모든 페이지에서 가장 잘 보여야 한다.

---

## Desktop

Header 예약 버튼

Hero 예약 버튼

중간 CTA 섹션

Footer CTA

---

## Mobile

하단 고정 예약 버튼

---

# 22. Floating UI

## Top Button

위치

오른쪽 하단

---

노출 조건

스크롤 300px 이상

---

동작

상단으로 부드럽게 이동

---

## Mobile Reservation Button

위치

하단 고정

---

문구

온라인 예약하기

---

항상 노출

단, 예약 페이지에서는 숨김 가능

---

# 23. Form Design

## Input

높이

52px

---

Radius

14px

---

Border

`#E6D8CF`

---

Focus

`#B88D7A`

---

## Label

작고 명확하게 표시

---

## Error

붉은색 텍스트 사용

---

# 24. Calendar Design

## Calendar Background

White

---

## Available Date

Champagne Gold Dot

---

## Selected Date

Champagne Gold Background

White Text

---

## Disabled Date

Opacity 40%

---

# 25. Reservation Status Badge

## PENDING

승인 대기

Color

Warning

---

## APPROVED

예약 확정

Color

Success

---

## REJECTED

예약 거절

Color

Error

---

## CANCELLED

예약 취소

Color

Text Secondary

---

## COMPLETED

방문 완료

Color

Warm Beige

---

# 26. Animation

애니메이션은 절제해서 사용한다.

---

## Allowed

Fade In

Fade Up

Smooth Scroll

Subtle Scale

---

## Duration

0.3s ~ 0.6s

---

## Not Allowed

Bounce

Flash

Shake

Excessive Parallax

---

# 27. Accessibility

## Contrast

WCAG AA 기준 준수

---

## Button Size

최소 44px 이상

---

## Alt Text

모든 이미지에 Alt 작성

---

## Keyboard

키보드 이동 가능

---

# 28. SEO Design Rule

H1은 페이지당 1개만 사용

---

H2, H3 순서 유지

---

이미지 Alt는 서비스 키워드를 자연스럽게 포함

---

# 29. Responsive Breakpoints

## Mobile

360px ~ 767px

---

## Tablet

768px ~ 1023px

---

## Desktop

1024px ~ 1439px

---

## Large Desktop

1440px 이상

---

# 30. Final Design Principle

Petit Elle의 디자인은 고급스러움을 과시하지 않는다.

대신 고객이 화면을 보는 순간

편안함과 신뢰감을 느껴야 한다.

---

핵심은 Luxury가 아니라 Healing이다.

---

End of Document