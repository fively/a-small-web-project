import { resolve, dirname } from 'node:path'
import { readdirSync } from 'fs'
import { fileURLToPath } from 'node:url'
import minimist from 'minimist' // 轻量级命令后参数解析工具
import { execa } from 'execa'

// 解析参数
const argvs = minimist(process.argv.slice(2))
const _dirname = dirname(fileURLToPath(import.meta.url))

// 校验是否输入需要启动的项目名称d
const buildAppName = argvs._[0] || ''

// 项目应用存放地址
const appPath = resolve(_dirname, '../apps')
// 获取项目名称列表
const appNames = readdirSync(appPath)

// 不存在或者等于all时，打所有的项目包
if (!buildAppName || buildAppName === 'all') {
  for (let appName of appNames) {
    if (appName === '.DS_Store' || appName === 'README.md') continue
    // 执行启动指令
    try {
      console.log(
        `------------------------ 【${appName}】打包开始 ------------------------`
      )
      await execa('pnpm', ['run', '--filter', appName, 'build'], {
        stdio: 'inherit'
      })
      console.log(
        `------------------------ 【${appName}】打包结束 ------------------------`
      )
    } catch (e) {
      console.error('error:', e)
      process.exit(1)
    }
  }

  process.exit(0)
}

// 单个时校验是否存在于列表中
if (!appNames.includes(buildAppName)) {
  console.warn(
    `项目名称【${buildAppName}】不存在于项目列表【${appNames.join(
      '、'
    )}】中，请核对！！`
  )
  process.exit(1)
}

// 执行启动指令
try {
  await execa('pnpm', ['run', '--filter', buildAppName, 'build'], {
    stdio: 'inherit'
  })
} catch (e) {
  console.error('error:', e)
}
