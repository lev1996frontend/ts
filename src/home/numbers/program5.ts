import { run } from "./run"

// 5
// (2+3)
// (1+(3-(2*2)+2))

const enum Operation {
  plus,
  minus,
  multiply,
  divide,
}

run('program5.txt', (nextValue, send, error) => {
  send(calculateExpression())

  // functions

  function calculateExpression(): number {
    const operationsCount = nextValue()

    if (operationsCount < 0) {
      throw error
    }

    let result = nextValue()

    if (operationsCount === 0) {
      return result
    }

    // TODO: цикл + рекурсия calculateExpression()

    return result
  } 

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
