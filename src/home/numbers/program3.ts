import { run } from './run'

const dictionaryVariables: Record<number, number> = {}

run('program3.txt', (nextValue, send, error) => {

  const getNumber = (): number => {
    const source = getAction(sources)
    const n = source()
    return n
  }

  const getAction = <T extends Function>(
    actions: Record<number, T>
  ): T => {
    const action = actions[nextValue()]
    if (typeof action === 'undefined') {
      throw error
    }
    return action
  }

  const calculateOperation = () => {
    const n1 = getNumber()
    const calculate = getAction(operations)
    const n2 = getNumber()
    const result = calculate(n1, n2)
    return result
  }

  const commands: Record <number, () => void> = {
    // отправить результат вычисления
    1: () => {
      const result = calculateOperation()
      send(result)
    },
    // запомнить число или результат вычисления
    2: () => {
      const varNumber = nextValue()
      const source = getAction(sourceAttachment)
      dictionaryVariables[varNumber] = source()
    },

  }

  const sourceAttachment: Record<number, () => number> = {
    1: nextValue,
    2: calculateOperation,
  }

  const sources: Record<number, () => number> = {
    1: nextValue,
    2: () => {
      const n = dictionaryVariables[nextValue()]
      if (typeof n === 'undefined') {
        throw error
      }
      return n
    },
  }

  const operations: Record<number, (a: number, b: number) => number>  = {
    1: (a, b) => a + b,
    2: (a, b) => a - b,
    3: (a, b) => a * b,
    4: (a, b) => {
      if (b === 0) {
        throw error
      }
      return a / b
    },
  }

  // start

  const command = getAction(commands)
  command()
})
// src/home/numbers/program3.ts