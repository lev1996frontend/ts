import path from 'path'

// globalThis.Number
// globalThis === global
// globalThis === window
// globalThis === self

type Test = {
  description?: string
  skip?: boolean
  questions?: (string | undefined)[]
  input: (string | number)[]
  print: (string | number | undefined)[]
  random?: number[]
}

const mock = (test: Test) => {
  ;(global as any).input = (question?: string): string => {
    const value = test.input.shift()!
    expect(value).toBeDefined()

    const questionValue = test.questions?.shift()
    if (typeof questionValue !== 'undefined') {
      expect(question).toBe(questionValue)
    }

    return String(value)
  }
  ;(global as any).print = (message?: string | number): void => {
    const value = test.print.shift()
    if (typeof value === 'undefined') {
      expect(message).toBeUndefined()
    } else {
      expect(String(message)).toBe(String(value))
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

export const testScript = (scriptDir: string, scriptName: string, tests: (Test | TestBuilder)[], skip = false) => {
  const scriptPath = path.resolve(scriptDir, scriptName)
  const runTests = skip ? describe.skip : describe

  runTests(scriptPath, () => {
    afterEach(() => {
      jest.resetModules()
    })

    tests.map(t => (
      t instanceof TestBuilder
        ? t.build()
        : t
    )).forEach((t, i) => {
      // console.log(i, t)
      const runTest = t.skip ? test.skip : test
      runTest(t.description ?? `test ${i + 1}`, () => {
        mock(t)
        require(scriptPath)
      })
    })
  })
}

testScript.skip = (scriptDir: string, scriptName: string, tests: (Test | TestBuilder)[]) => {
  testScript(scriptDir, scriptName, tests, true)
}

// TODO

class TestBuilder {
  #test: Test & Required<Omit<Test, 'description'>>

  constructor(description?: string) {
    this.#test = {
      description,
      skip: false,
      input: [],
      print: [],
      random: [],
      questions: [],
    }
  }

  input(value: number | string): this
  input(question: string, value: number | string): this
  input(
    ...args:
      [value: number | string]
      | [question: string, value: number | string]
  ): this {
    if (args.length === 1) {
      const [value] = args
      this.#test.input.push(value)
      this.#test.questions.push(undefined)
    } else {
      const [question, value] = args
      this.#test.input.push(value)
      this.#test.questions.push(question)
    }
    return this
  }

  print(...messages: (string | number | undefined)[]): this {
    this.#test.print.push(...messages)
    return this
  }

  random(...numbers: number[]): this  {
    this.#test.random.push(...numbers)
    return this
  }

  skip(): this {
    this.#test.skip = true
    return this
  }

  build() {
    return this.#test
  }
}

const testBuilder = (description?: string) => {
  return new TestBuilder(description)
}

export {
  testBuilder as test
}

// testScript(__dirname, 'test.ts', [
//   testBuilder('description 1').skip()
//     .input('Введите первое число: ', 5)
//     .input('Введите второе число: ', 10)
//     .input(2)
//     .random(2, 5, 6)
//     .print('5 + 10 = 15')
//     .print(
//       '  *',
//       ' ***',
//       '*****'
//     )
// ] satisfies TestBuilder[])


// TODO: протестировать 2.3 и inputNumber
// + user test для лабиринта (полный процесс игры)
// позже будет unit test (Maze), integrity test (сохранение/загрузка с файлом)
