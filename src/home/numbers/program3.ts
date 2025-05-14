import { run } from "./run";

// TODO: -s

const dictionaryVariables: Record<number, number> = {}

run('program3.txt', (nextValue, send, error) => {

  const getNumber = () => {
    const sources = getAction(source)
    const result = sources()
    return result
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

  const source: Record<number, () => number> = {
    1: nextValue,
    2: () => {
      const value = dictionaryVariables[nextValue()]
      if (typeof value === 'undefined') {
        throw error
      }
      return value
    }
  }

  const sourceAttachment: Record<number, () => number>= {
    1: nextValue,
    2: calculateOperation,
  }



  const commands: Record<number, () => void> = {
    1: () => {
      const result = calculateOperation()
      send(result)
    },
    2: () => {
      const varNumber = nextValue()
      const sources = getAction(sourceAttachment)
      dictionaryVariables[varNumber] = sources()
    }
  }

  const operations: Record<number, (a: number, b: number) => number> = {
    1: (a,b) => a + b,
    2: (a,b) => a - b,
    3: (a,b) => a * b,
    4: (a,b) => {
      if (b === 0) {
        throw error
      }
      return a / b
    },
  }

  const start = getAction(commands)
  start()
})