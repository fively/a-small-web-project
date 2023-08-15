
/**
 * 用pnpm进行包管理
 */
if (!/pnpm/.test(process.env.npm_execpath || "")) {
  console.warn("please use pnpm to package manager");
  process.exit(1);
}
