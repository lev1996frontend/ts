import { run } from "./run"

// 5
// (2+3)
// (1+(3-(2*2)+2))

const enum Operation {
  plus = 1,
  minus,
  multiply,
  divide,
}

type Expression = {
  result: number
  operator?: Operation
  operationsCount: number
}

const stack: Expression[] = []
// {
//   n: 0,
//   operator: Operation.plus,
//   count: 1
// }

// (((2*3)+4)/2)

// (1+(3-(2*2)+2))

run('program5.txt', (nextValue, send, error) => {
  const operationsCount = nextValue()

  if (operationsCount < 0) {
    throw error
  }

  if (operationsCount > 0) {
    stack.push({
      result: 0,
      operationsCount,
    })
    return
  }

  const n = nextValue()

  const expr = stack.at(-1)

  if (!expr) {
    return send(n)
  }

  if (expr.operator) {
    expr.result = calculate(expr.result, expr.operator, n)
    expr.operationsCount--
  } else {
    expr.result = n
    expr.operator = nextValue()
  }

  if (expr.operationsCount) {
    return
  }

  let rightExpr = expr
  while (stack.length > 0 && rightExpr.operationsCount === 0) {
    stack.pop()
    const leftExpr = stack.at(-1)
    if (!leftExpr) {
      return send(rightExpr.result)
    }

    // TODO: function
    if (leftExpr.operator) {
      leftExpr.result = calculate(leftExpr.result, leftExpr.operator, rightExpr.result)
      leftExpr.operationsCount--
    } else {
      leftExpr.result = rightExpr.result
    }

    rightExpr = leftExpr
  }

  rightExpr.operator = nextValue()

  // functions

  function calculate(n1: number, operation: Operation, n2: number): number {
    switch (operation) {
      case Operation.plus: return n1 + n2
      case Operation.minus: return n1 - n2
      case Operation.multiply: return n1 * n2
      case Operation.divide: {
        if (n2 === 0) {
          throw error
        }
        return n1 / n2
      }
      default:
        throw error
    }
  }
})
