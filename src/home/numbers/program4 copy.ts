import { run } from "./run"

// 2+3=1+3-2=
// TODO: повторить самостоятельно через цикл

const enum Operation {
  equals,
  plus,
  minus,
  multiply,
  divide,
}

run('program4.txt', (nextValue, send, error) => {
  let result = 0

  while (true) {
    const operator = nextValue()

    if (operator === Operation.equals) {
      return send(result)
    }

    const n = nextValue()

    result = calculate(result, operator, n)
  }

  // functions

  function calculate(n1: number, operation: Operation, n2: number): number {
    switch (operation) {
      case Operation.plus: n1 + n2
      case Operation.minus: n1 - n2
      case Operation.multiply: n1 * n2
      case Operation.divide: {
        if (n1 === 0) {
          throw error
        }
        return n1 / n2
      }

      default:
        throw error
    }
  }
})
