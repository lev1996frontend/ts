import { run } from "./run-signals"

const enum Operation {
  equals,
  plus,
  minus,
  multiply,
  divide,
}

let n1: number | undefined
let operation: Operation = Operation.plus
let result: number = 0

run('program2.txt', (value, send, error) => {
  if (value === Operation.equals) {
    if (result !== undefined) {
      send(result)
    }
    n1 = undefined
    result = 0
    operation = Operation.plus
    return
  }

  if (n1 === undefined) {
    n1 = value
    return
  }

  if (operation === undefined) {
    operation = value
    return
  }

  const n2 = value
  if (result === 0) {
    result = calculate(n2)
  }

  function calculate(n: number): number {
    switch (operation) {
      case Operation.plus: return result + n
      case Operation.minus: return result - n
      case Operation.multiply: return result * n
      case Operation.divide:
        if (n === 0) {
          throw error
        }
        return result / n
      default:
        throw error
    }
  }
})
