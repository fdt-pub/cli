export function checkType(name: string, key: string, keys: readonly string[]): void {
  const ret = new Set(keys).has(key)
  if (!ret) throw new Error(`${name} value: ${key} invalid,need in ${keys}`)
}

export const validateType = (key: string, keys: readonly string[]): boolean => new Set(keys).has(key)

export const validateTypeOnArray = (args: [string, readonly string[]][]) => {
  const errList: Array<string> = []
  for (const [key, keyConst] of args) {
    if (!new Set(keyConst).has(key)) {
      errList.push(`${key} invalid,need in ${keyConst}`)
    }
  }
  if (errList.length) throw Error(errList.join(`\n`))
}

export const validateTypeOnObject = (context: Record<string, string>, itemList: Record<string, readonly string[]>) => {
  const errList: Array<string> = []
  for (const key of Object.keys(itemList)) {
    const value = context[key]
    if (value && new Set(itemList[key]).has(value)) {
      continue
    } else {
      errList.push(`${key} value: ${value} invalid,need in ${itemList[key]}`)
    }
  }
  if (errList.length) throw Error(errList.join(`\n`))
  //   return errList
}

export const checkArgs = function (args: readonly string[], context: {[x: string]: unknown}) {
  if (!context) return `checkArgs context invalid`
  if (!Array.isArray(args)) return 'checkArgs args need array'

  const errList: Array<string> = []
  for (const arg of args) {
    if (context[arg] === undefined || context[arg] === null) {
      errList.push(`param ${arg} invalid`)
    }
  }

  if (errList.length) throw Error(errList.join(`\n`))
}
