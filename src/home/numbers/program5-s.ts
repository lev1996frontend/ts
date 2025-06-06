import { ScriptArgs, run } from "./run-signals"

// 5 = 5
// 0 5

// (2+3) = 5
// 1 0 2 1 0 3

// (1+(3-(2*2)+2)) = 2
// 1 0 1 1 2 0 3 2 1 0 2 3 0 2 1 0 2

// ((2*3)+4)/2 = 5
// 1 1 1 0 2 3 0 3 1 0 4 4 0 2

const enum Operator {
  plus = 1,
  minus,
  multiply,
  divide
}

type Expression = {
  result: number
  operator?: Operator
  operationsCount: number
}

const stack: Expression[] = []

let operationsCount: number | undefined
let waitingOperator: boolean = false

run('program5.txt', (value, send, error) => {
  if (typeof operationsCount === 'undefined') {
    operationsCount = value

    if (operationsCount < 0) {
      throw error
    }

    if (operationsCount > 0) {
      stack.push({
        result: 0,
        operationsCount,
      })
      operationsCount = undefined
    }

    return
  }

  if (waitingOperator) {
    const expr = stack.at(-1)

    if (!expr) {
      throw new Error('unexpected operator')
    }

    expr.operator = value
    operationsCount = undefined
    waitingOperator = false
    return
  }

  const n = value

  const expr = stack.at(-1)

  if (!expr) {
    operationsCount = undefined
    return send(n)
  }

  calculateExpression(expr, n)

  let rightExpr = expr
  while (stack.length > 0 && rightExpr.operationsCount === 0) {
    stack.pop()
    const leftExpr = stack.at(-1)
    if (!leftExpr) {
      operationsCount = undefined
      return send(rightExpr.result)
    }

    calculateExpression(leftExpr, rightExpr.result)
    rightExpr = leftExpr
  }
  waitingOperator = true

  // functions

  function calculateExpression(expr: Expression, n: number) {
    if (expr.operator) {
      expr.result = calculate(expr.result, expr.operator, n)
      expr.operationsCount--
    } else {
      expr.result = n
    }
  }

  function calculate(n1: number, operator: Operator, n2: number): number {
    switch (operator) {
      case Operator.plus: return n1 + n2
      case Operator.minus: return n1 - n2
      case Operator.multiply: return n1 * n2
      case Operator.divide: {
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
