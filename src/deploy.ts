import {getProfile} from './profile.ts'
const profileMap = await getProfile()
import {checkArgs} from './vendor/validate-type.ts'
import {contextKey, contextFile} from './config.ts'

console.info = (function (originFunc) {
  return function (...arg: any[]) {
    originFunc('\x1b[32m%s\x1b[0m', ...arg)
  }
})(console.log)

console.error = (function (originFunc) {
  return function (...arg: any[]) {
    originFunc('\x1b[31m%s\x1b[0m', ...arg)
  }
})(console.error)

export const execDeploy = async (args: Record<string, unknown>) => {
  checkArgs(['orgId', 'appId', 'profile', 'appVersion'], args)
  const {orgId, appId, profile, appVersion} = args

  const value = JSON.stringify({orgId, appId, profile, appVersion})
  await Deno.writeTextFile(contextFile, value)

  Deno.env.set(contextKey, contextFile)

  const plugins = profileMap[profile as string]
  if (!plugins) return Promise.reject(Error(`invalid profile: ${profile}`))

  for (const item of plugins) {
    const {name, plugin} = item
    const first = Date.now()
    console.info(`exec plugin ${name} start...`)

    const cmd = [
      'deno',
      'run',
      '--allow-env',
      '--allow-read',
      '--allow-write',
      '--allow-net',
      '--allow-sys',
      '--reload',
      plugin,
    ]
    const process = Deno.run({cmd, stderr: 'piped'})
    const {code} = await process.status()
    const error = await process.stderrOutput()
    process.close()
    if (code === 0) {
      console.info(`exec plugin ${name} succ,use ${Date.now() - first} ms`)
    } else {
      console.error(`exec plugin ${name} fail`, new TextDecoder().decode(error))
      Deno.exit(code)
    }
  }
}
