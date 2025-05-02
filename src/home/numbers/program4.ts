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

let result: number = 0
let operation: Operation = Operation.plus

run('program4.txt', (nextValue, send, error) => {
  const n = nextValue()
  const nextOperator = nextValue()

  result = calculate()

  if (nextOperator === Operation.equals) {
    send(result)
    result = 0
    operation = Operation.plus
  } else {
    operation = nextOperator
  }

  // functions

  function calculate(): number {
    switch (operation) {
      case Operation.plus: result + n
      case Operation.minus: result - n
      case Operation.multiply: result * n
      case Operation.divide: {
        if (n === 0) {
          throw error
        }
        return result / n
      }

      default:
        throw error
    }
  }
})
