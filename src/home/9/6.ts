export {}

const getValue = <T extends object, K extends keyof T>(obj: T, key: K): T[K] => {
  return obj[key]
}

const r = getValue({ s: 'text', n: 123, b: true } as const, 'b')
