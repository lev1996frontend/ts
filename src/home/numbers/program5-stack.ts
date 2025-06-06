import { run } from "./run"

// 5 = 5
// (2+3) = 5
// (1+(3-(2*2)+2)) = 2
// (((2*3)+4)/2) = 5

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

  calculateExpression(expr, n)

  let rightExpr = expr
  while (stack.length > 0 && rightExpr.operationsCount === 0) {
    stack.pop()
    const leftExpr = stack.at(-1)
    if (!leftExpr) {
      return send(rightExpr.result)
    }

    calculateExpression(leftExpr, rightExpr.result)
    rightExpr = leftExpr
  }

  rightExpr.operator = nextValue()

  // functions

  function calculateExpression(expr: Expression, n: number) {
    if (expr.operator) {
      expr.result = calculate(expr.result, expr.operator, n)
      expr.operationsCount--
    } else {
      expr.result = n
    }
  }

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
