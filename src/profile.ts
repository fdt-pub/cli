import {getProfilePath} from './config.ts'

export const getProfile = async () => {
  const data = await Deno.readTextFile(await getProfilePath())
  try {
    const profile = JSON.parse(data.toString())
    return profile
  } catch (err) {
    console.error(err)
    return Promise.reject(Error(`profile invalid,need JSON Object`))
  }
}

export const execProfile = async (args: Record<string, unknown>) => {
  const profile = await getProfile()
  const name = args?.['name'] as string
  if (name && profile?.[name]) {
    console.log(`profile:${name} plugins`, JSON.stringify(profile[name], null, 2))
  } else {
    console.log(JSON.stringify(profile, null, 2))
  }
}
