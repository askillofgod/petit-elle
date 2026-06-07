/**
 * Mock 전용 공유 스토어.
 *
 * Next.js dev 에서는 라우트별 서버 번들이 모듈 인스턴스를 분리할 수 있어
 * 일반 모듈 변수로는 라우트 간 상태가 공유되지 않는다.
 * globalThis 에 보관해 같은 Node 프로세스 내에서 Mock 변경이 페이지 간 반영되게 한다.
 *
 * ⚠️ Mock 한정. Supabase 연동 후에는 사용하지 않는다(영속성은 DB가 담당).
 */
declare global {
  // eslint-disable-next-line no-var
  var __PE_MOCK_STORE__: Record<string, unknown> | undefined;
}

export function mockStore<T>(key: string, factory: () => T): T {
  const g = globalThis as typeof globalThis;
  g.__PE_MOCK_STORE__ ??= {};
  if (!(key in g.__PE_MOCK_STORE__)) {
    g.__PE_MOCK_STORE__[key] = factory();
  }
  return g.__PE_MOCK_STORE__[key] as T;
}
