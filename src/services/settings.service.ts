/**
 * Settings & Notice Service Layer
 * 사이트 설정 / 운영시간 / 공지사항. 현재 Mock.
 */
import {
  SITE_SETTINGS,
  BUSINESS_HOURS,
} from "@/lib/mock/settings.mock";
import { NOTICES } from "@/lib/mock/notices.mock";
import { mockStore } from "@/lib/mock/store";
import type { BusinessHour, Notice, SiteSettings } from "@/types";

const settingsHolder = mockStore<{ value: SiteSettings }>("settings", () => ({
  value: { ...SITE_SETTINGS },
}));
const notices = mockStore<Notice[]>("notices", () => [...NOTICES]);

export async function getSettings(): Promise<SiteSettings> {
  return settingsHolder.value;
}

export async function updateSettings(
  patch: Partial<SiteSettings>
): Promise<SiteSettings> {
  settingsHolder.value = { ...settingsHolder.value, ...patch };
  return settingsHolder.value;
}

export async function getBusinessHours(): Promise<BusinessHour[]> {
  return BUSINESS_HOURS;
}

export async function listNotices(opts?: {
  visibleOnly?: boolean;
}): Promise<Notice[]> {
  const all = [...notices].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return opts?.visibleOnly ? all.filter((n) => n.isVisible) : all;
}

export async function createNotice(input: {
  title: string;
  content: string;
}): Promise<Notice> {
  const notice: Notice = {
    id: `n-${Date.now()}`,
    title: input.title,
    content: input.content,
    isVisible: true,
    createdAt: new Date().toISOString().slice(0, 10),
  };
  notices.unshift(notice);
  return notice;
}

export async function setNoticeVisible(
  id: string,
  isVisible: boolean
): Promise<void> {
  const n = notices.find((x) => x.id === id);
  if (n) n.isVisible = isVisible;
}

export async function deleteNotice(id: string): Promise<void> {
  const idx = notices.findIndex((n) => n.id === id);
  if (idx >= 0) notices.splice(idx, 1);
}
