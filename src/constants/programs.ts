// 호환 shim — 데이터 원본은 src/lib/mock/programs.mock.ts 로 이동.
// 클라이언트 컴포넌트의 동기 import 를 위해 재export 한다.
// 서버 측에서는 가급적 services/program.service.ts 를 사용한다.
export { PROGRAMS, getProgramBySlug } from "@/lib/mock/programs.mock";
