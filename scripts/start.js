import { resolve, dirname } from "node:path";
import { readdirSync } from "fs";
import { fileURLToPath } from "node:url";
import minimist from "minimist"; // 轻量级命令后参数解析工具
import { execa } from "execa";

// 解析参数
const argvs = minimist(process.argv.slice(2));
const _dirname = dirname(fileURLToPath(import.meta.url));

// 校验是否输入需要启动的项目名称d
const startAppName = argvs._[0] || "";
if (!startAppName) {
  console.warn("请输入需要启动的项目名称！！");
  process.exit(1);
}

// 项目应用存放地址
const appPath = resolve(_dirname, "../apps");

// 获取项目名称列表，并进行名称校验
const appNames = readdirSync(appPath);
if (!appNames.includes(startAppName)) {
  console.warn(
    `项目名称【${startAppName}】不存在于项目列表【${appNames.join(
      "、"
    )}】中，请核对！！`
  );
  process.exit(1);
}

// 执行启动指令
try {
  await execa("pnpm", ["run", "--filter", startAppName, "start"], {
    stdio: "inherit",
  });
} catch (e) {
  console.error("error:", e);
}
