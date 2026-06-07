"use client";

import { useState } from "react";
import { Trash2, Plus, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Label } from "@/components/ui/input";
import { AdminCard } from "@/components/admin/admin-ui";
import { Badge } from "@/components/ui/badge";

type Notice = {
  id: string;
  title: string;
  content: string;
  isVisible: boolean;
  createdAt: string;
};

export function AdminNoticesManager({ initial }: { initial: Notice[] }) {
  const [notices, setNotices] = useState<Notice[]>(initial);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function add() {
    if (!title.trim()) return;
    setNotices((prev) => [
      {
        id: `n${prev.length + 1}-${title.length}`,
        title: title.trim(),
        content: content.trim(),
        isVisible: true,
        createdAt: "2026-06-07",
      },
      ...prev,
    ]);
    setTitle("");
    setContent("");
  }

  function toggle(id: string) {
    setNotices((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isVisible: !n.isVisible } : n))
    );
  }

  function remove(id: string) {
    setNotices((prev) => prev.filter((n) => n.id !== id));
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="space-y-3">
        {notices.map((n) => (
          <div key={n.id} className="rounded-card border border-line bg-white p-4 shadow-card">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-brown">{n.title}</h3>
                  {n.isVisible ? (
                    <Badge variant="success">노출</Badge>
                  ) : (
                    <Badge variant="muted">숨김</Badge>
                  )}
                </div>
                <p className="mt-1 text-sm text-muted">{n.content}</p>
                <p className="mt-1 text-xs text-muted/70">{n.createdAt}</p>
              </div>
              <div className="flex shrink-0 gap-1">
                <button
                  type="button"
                  onClick={() => toggle(n.id)}
                  className="flex h-9 w-9 items-center justify-center rounded-input text-muted hover:bg-beige-light/60"
                  aria-label="노출 전환"
                >
                  {n.isVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </button>
                <button
                  type="button"
                  onClick={() => remove(n.id)}
                  className="flex h-9 w-9 items-center justify-center rounded-input text-error hover:bg-error/10"
                  aria-label="삭제"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {notices.length === 0 && (
          <p className="py-12 text-center text-sm text-muted">등록된 공지사항이 없습니다.</p>
        )}
      </div>

      <div>
        <AdminCard title="공지 등록">
          <div className="space-y-4 p-5">
            <div>
              <Label>제목</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="공지 제목" />
            </div>
            <div>
              <Label>내용</Label>
              <Textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="공지 내용" />
            </div>
            <Button className="w-full" onClick={add}>
              <Plus className="h-4 w-4" /> 등록
            </Button>
          </div>
        </AdminCard>
      </div>
    </div>
  );
}
