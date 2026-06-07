# 04_SYSTEM_ARCHITECTURE.md

# Petit Elle System Architecture
## Technical Architecture Specification

Version: 1.0

---

# 1. 문서 목적

본 문서는 Petit Elle 서비스의 전체 시스템 구조를 정의한다.

Frontend, Backend, Database, Authentication, Hosting 구조를 명확히 정의하여 개발 시 일관성을 유지한다.

---

# 2. 프로젝트 구조

Petit Elle

Client (Browser)

↓

Next.js Application

↓

Supabase

↓

PostgreSQL Database

---

# 3. Technology Stack

## Frontend

Next.js 15

App Router

TypeScript

---

## UI

Tailwind CSS

shadcn/ui

Lucide React

---

## State Management

React Server Components

Server Actions

React Hooks

---

## Backend

Supabase

---

## Database

PostgreSQL

---

## Authentication

Supabase Auth

Kakao OAuth

---

## Hosting

Cloudflare Pages

---

## Analytics

Google Analytics 4

Google Search Console

---

## Package Manager

pnpm

---

## Node Version

22+

---

# 4. System Diagram

Client

↓

Next.js

↓

Supabase Auth

↓

Supabase Database

↓

PostgreSQL

---

# 5. Authentication Architecture

## 사용자 로그인

카카오 로그인

↓

Supabase OAuth

↓

회원 생성

↓

Session 생성

↓

로그인 유지

---

## 관리자 로그인

이메일 로그인

↓

관리자 인증

↓

Admin Dashboard

---

# 6. User Roles

## Guest

비회원

---

가능 기능

홈페이지 열람

프로그램 확인

예약 신청

FAQ

오시는 길

---

## Member

회원

---

예약 조회

예약 취소 요청

마이페이지

---

## Admin

관리자

---

예약 승인

예약 거절

일정 생성

프로그램 관리

사이트 설정

---

# 7. 예약 시스템 구조

관리자

↓

예약 가능 시간 생성

↓

Reservation Slot 생성

↓

고객 예약 가능

---

고객

↓

예약 신청

↓

Pending 상태

↓

관리자 승인

↓

Approved 상태

---

# 8. 예약 상태값

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

# 9. 프로젝트 폴더 구조

src

├── app
├── components
├── features
├── services
├── hooks
├── lib
├── types
├── constants
├── styles
└── utils

---

# 10. App Router 구조

app

├── page.tsx
├── programs
├── reservation
├── space
├── faq
├── location
├── login
├── mypage
└── admin

---

# 11. Features 구조

features

├── auth
├── reservation
├── program
├── customer
├── admin
└── common

---

# 12. Component 구조

components

├── layout
├── ui
├── sections
├── reservation
├── program
└── admin

---

# 13. Service Layer

services

├── auth.service.ts
├── reservation.service.ts
├── program.service.ts
├── customer.service.ts
└── admin.service.ts

---

모든 DB 접근은 Service Layer를 통해 처리한다.

---

# 14. API Architecture

Server Actions 우선 사용

---

필요 시 Route Handler 사용

---

직접 Database 접근 금지

---

Service Layer 경유 필수

---

# 15. Database Access Flow

UI

↓

Server Action

↓

Service Layer

↓

Supabase

↓

Database

---

# 16. Environment Variables

NEXT_PUBLIC_SITE_URL

---

NEXT_PUBLIC_SUPABASE_URL

---

NEXT_PUBLIC_SUPABASE_ANON_KEY

---

SUPABASE_SERVICE_ROLE_KEY

---

KAKAO_CLIENT_ID

---

KAKAO_CLIENT_SECRET

---

GA_MEASUREMENT_ID

---

# 17. Security Rules

환경변수 노출 금지

---

Service Role Key Client 노출 금지

---

관리자 페이지 보호

---

RBAC 적용

(Role Based Access Control)

---

# 18. Logging

예약 생성

---

예약 수정

---

예약 승인

---

예약 취소

---

관리자 변경사항 기록

---

# 19. Performance Strategy

Next Image 사용

---

Lazy Loading

---

Code Splitting

---

Server Components 우선

---

# 20. SEO Strategy

Metadata API 사용

---

Open Graph 적용

---

Sitemap 자동 생성

---

Robots 생성

---

Canonical 적용

---

# 21. Responsive Strategy

Mobile First

---

360px+

---

768px+

---

1024px+

---

1440px+

---

# 22. Deployment Flow

Local Development

↓

GitHub

↓

Cloudflare Pages

↓

Production

---

# 23. Backup Strategy

Supabase Daily Backup

---

Database Export

주 1회

---

# 24. Error Handling

예약 실패

↓

Toast 표시

↓

재시도 유도

---

서버 오류

↓

Error Page

↓

홈 이동

---

# 25. Future Architecture

Version 2

---

Payment

토스페이먼츠

---

Membership

---

CRM

---

알림톡

---

Review System

---

# 26. Architecture Success Criteria

고객은

3분 이내 예약 가능

---

관리자는

1분 이내 예약 승인 가능

---

모든 페이지

모바일 최적화

---

Lighthouse 90+

---

End of Document