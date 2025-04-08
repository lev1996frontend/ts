import path from "path"

export {}

// globalThis.Number
// globalThis === global
// globalThis === window
// globalThis === self

type Test = {
  description?: string
  input: (string | number)[]
  print: (string | number | undefined)[]
  random?: number[]
}

const mock = (test: Test) => {
  ;(global as any).input = (): string => {
    const value = test.input.shift()!
    expect(value).toBeDefined()
    return String(value)
  }
  ;(global as any).print = (message?: string | number): void => {
    const value = test.print.shift()!
    expect(message).toBe(value)
  }
  ;(global as any).random = (min: number, max: number): number => {
    const value = test.random?.shift()!
    expect(value).toBeDefined()
    expect(min).toBeLessThanOrEqual(value)
    expect(max).toBeGreaterThanOrEqual(value)
    return value
  }
}

export const testScript = (scriptDir: string, scriptName: string, tests: Test[]) => {
  const scriptPath = path.resolve(scriptDir, scriptName)
  describe(scriptPath, () => {
    afterEach(() => {
      jest.resetModules()
    })
    tests.forEach((t, i) => {
      test(t.description ?? `test ${i + 1}`, () => {
        mock(t)
        require(scriptPath)
      })
    })
  })
}