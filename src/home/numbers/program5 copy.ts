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

type StackItem = {
  n: number
  operator: Operation
  count: number
}

const stack: StackItem[] = []
// {
//   n: 0,
//   operator: Operation.plus,
//   count: 1
// }

run('program5.txt', (nextValue, send, error) => {
  const operationsCount = nextValue()

  if (operationsCount < 0) {
    throw error
  }

  const n = nextValue()

  if (operationsCount > 0) {
    stack.push({
      n,
      operator: nextValue(),
      count: operationsCount,
    })
    return
  } else {

  }

  if (stack.length === 0) {
    send(n) // ?
  } else {
    let item = stack[-1]
    while (stack.length > 0) {
      const item = stack[-1]!
      item.n = calculate(item.n, item.operator, n)
      item.count--
      if (item.count === 0) {
        item.n
      }
    }
  }

  // send(calculateExpression())

  // functions

  // function calculateExpression(): number {
  //   const operationsCount = nextValue()

  //   if (operationsCount < 0) {
  //     throw error
  //   }

  //   let result = nextValue()

  //   if (operationsCount === 0) {
  //     return result
  //   }

  //   // TODO: цикл + рекурсия calculateExpression()

  //   return result
  // }

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
