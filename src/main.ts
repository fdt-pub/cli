import {Command} from 'cliffy/command/mod.ts'
import {execDeploy} from './deploy.ts'
import {execProfile} from './profile.ts'

const cmd = new Command()
  .name('fdt-cli')
  .version('0.1.0')
  .description('fdt-pub 命令行工具')
  .globalOption('-d, --debug', 'Enable debug output.')
  .action(() => {
    throw new Error()
  })

  .command('deploy', '发布应用')
  .option('-o, --org-id <orgId:string>', '组织 id', {
    required: true,
  })
  .option('-a, --app-id <appId:string>', '应用 id', {
    required: true,
  })
  .option('-p, --profile <profile:string>', 'app 使用的 profile', {
    required: true,
  })
  .option('-v, --app-version <appVersion:string>', 'app 版本,仅限 [a-z0-9_.-]', {
    required: true,
  })
  .action(async options => await execDeploy(options))

  .command('profile', '查看 profile')
  .option('-n,--name [name:string]', 'profile 名称,只显示该 profile 内容')
  .action(async options => await execProfile(options))

try {
  await cmd.parse()
} catch (error) {
  cmd.showHelp()
  Deno.exit(error.exitCode)
}
