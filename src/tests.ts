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
    if (typeof value === 'undefined') {
      expect(message).toBeUndefined()
    } else {
      expect(String(message)).toBe(String((value)))
    }
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
  // const runTest = describe || describe.skip
  // runTest(scriptPath, () => {

  // describe || describe.skip
  ;(describe)(scriptPath, () => {
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

// TODO

// testScript(__dirname, 'test.ts')
//   .input('Введите первое число: ', 5)
//   .input('Введите второе число: ', 10)
//   .random(2, 5, 6)
//   .print('5 + 10 = 15')
  // .print(
  //   '  *',
  //   ' ***',
  //   '*****'
  // )
