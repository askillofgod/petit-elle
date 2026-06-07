import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// OpenNext Cloudflare 설정.
// 현재 Mock 기반이라 기본 설정으로 충분.
// 추후 캐시(R2/KV) 또는 ISR 필요 시 incrementalCache 등을 추가한다.
export default defineCloudflareConfig({});
