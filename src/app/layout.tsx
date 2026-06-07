import type { Metadata, Viewport } from "next";
import { SITE } from "@/constants/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "쁘띠엘 | 강북구 여성전용 프리미엄 힐링 스튜디오",
    template: "%s | Petit Elle 쁘띠엘",
  },
  description: SITE.description,
  keywords: [
    "강북구 마사지",
    "여성전용 마사지",
    "강북구 에스테틱",
    "프리미엄 힐링 스튜디오",
    "쁘띠엘",
    "Petit Elle",
    "아로마 테라피",
    "페이스 케어",
  ],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE.url,
    siteName: SITE.name,
    title: "쁘띠엘 | 강북구 여성전용 프리미엄 힐링 스튜디오",
    description: SITE.description,
    images: [
      {
        url: "/images/og/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Petit Elle 프라이빗 힐링 공간",
      },
    ],
  },
  alternates: { canonical: SITE.url },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F7F3EF",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <head>
        {/*
          폰트는 의도적으로 CDN <link>로 로딩한다 (DECISIONS D-011: 빌드 네트워크 의존 회피).
          App Router 루트 레이아웃의 <link>는 전역 적용되므로 아래 규칙을 비활성화한다.
        */}
        {/* eslint-disable @next/next/no-page-custom-font */}
        {/* Pretendard (한글 본문) */}
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
        {/* Cormorant Garamond (영문 액센트) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
        />
        {/* eslint-enable @next/next/no-page-custom-font */}
      </head>
      <body>{children}</body>
    </html>
  );
}
