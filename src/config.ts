import {resolve} from 'std/path/mod.ts'

const cmd = Deno.args[0]

const root = Deno.cwd()
const work = resolve(new URL(Deno.mainModule).pathname, '..', '..')

const remoteProfileUrl = 'https://asset-17lt.obs.cn-north-1.myhuaweicloud.com/plugin/profile-prod.json'
const localProfile = resolve(work, 'profile-dev.json')
const remoteProfile = resolve(work, 'profile-prod.json')

const getProfilePath = async () => {
  if (Deno.env.get('NODE_ENV') !== 'dev') {
    const response = await fetch(`${remoteProfileUrl}?v=${Date.now()}`)
    await Deno.writeTextFile(remoteProfile, await response.text())
    return remoteProfile
  } else return localProfile
}

const contextFile = resolve(root, `context-${Date.now()}.json`)
const contextKey = 'FDT_CONTEXT_FILE'

export {cmd, contextKey, contextFile, getProfilePath, root}
