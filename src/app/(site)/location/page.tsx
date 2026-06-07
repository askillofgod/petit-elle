import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { LocationSection } from "@/components/sections/location-section";

export const metadata: Metadata = {
  title: "오시는 길",
  description: "서울 강북구 Petit Elle 오시는 길. 주차 가능, 운영시간 안내.",
};

export default function LocationPage() {
  return (
    <>
      <PageHeader
        eyebrow="Location"
        title="오시는 길"
        breadcrumbs={[{ label: "홈", href: "/" }, { label: "오시는길" }]}
      />
      <LocationSection />
    </>
  );
}
