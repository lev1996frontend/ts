import { run } from "./run-signals"

const enum Operation {
  equals,
  plus,
  minus,
  multiply,
  divide,
}

let result: number | undefined
let operation: Operation | undefined

run('program4.txt', (value, send, error) => {
  if (typeof result === 'undefined') {
    result = value
    return
  }

  if (typeof operation === 'undefined') {
    if (value === Operation.equals) {
      send(result)
      result = undefined
    } else {
      operation = value
    }
    return
  }

  try {
    result = calculate(result, operation, value)
    operation = undefined
  } catch {
    throw error
  }
})

function calculate(n1: number, operation: Operation, n2: number): number {
  switch (operation) {
    case Operation.plus: return n1 + n2
    case Operation.minus: return n1 - n2
    case Operation.multiply: return n1 * n2
    case Operation.divide:
      if (n2 === 0) {
        throw new Error('zero divide')
      }
      return n1 / n2
    default:
      throw new Error('unknown operation')
  }
}
