import { run } from "./run"

// 5 = 5
// 0 5

// (2+3) = 5
// 1 0 2 1 0 3

// (1+(3-(2*2)+2)) = 2
// 1 0 1 1 2 0 3 2 1 0 2 3 0 2 1 0 2

// ((2*3)+4)/2 = 5
// 1 1 1 0 2 3 0 3 1 0 4 4 0 2

const enum Operation {
  plus = 1,
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

    if (operationsCount === 0) {
      return nextValue()
    }

    let result = calculateExpression()

    for (let i = 0; i < operationsCount; i++) {
      const operator = nextValue()
      const nextNumber = calculateExpression()

      switch (operator) {
        case Operation.plus: {
          result += nextNumber
          break
        }
        case Operation.minus: {
          result -= nextNumber
          break
        }
        case Operation.multiply: {
          result *= nextNumber
          break
        }
        case Operation.divide: {
          if (nextNumber === 0) {
            throw error
          }
          result /= nextNumber
          break
        }

        default:
          throw error
      }
    }
    return result
  }
})
