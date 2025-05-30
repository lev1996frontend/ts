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

function calculate(n1: number, operator: Operator, n2: number): number {
  switch (operator) {
    case Operator.plus: return n1 + n2
    case Operator.minus: return n1 - n2
    case Operator.multiply: return n1 * n2
    case Operator.divide: {
      if (n2 === 0) {
        throw new Error('divide by zero')
      }
      return n1 / n2
    }
    default:
      throw new Error('unknown operator')
  }
}

// abstract state
type State = {
  next(...args: ScriptArgs): State
}


class OperationCountState implements State {
  constructor (
    public stack: Expression[]
  ) {}
  next(...[operationsCount, _send, error]: ScriptArgs): State {
    if (operationsCount < 0) {
      throw error
    }
    if (operationsCount === 0) {
      return new NumberState(this.stack)
    }
    return new OperationCountState([...this.stack, {
      operationsCount,
      result: NaN,
    }])
  }
}

class NumberState implements State {
  constructor(
    public stack: Expression[]
  ) {}
  next(...[n, send, error]: ScriptArgs): State {
    const _calculate: typeof calculate = (...args) => {
      try {
        return calculate(...args)
      } catch {
        throw error
      }
    }

    const expr = this.stack.at(-1)

    if (!expr) {
      send(n)
      return new OperationCountState([])
    }

    if (!expr.operator) {
      expr.result = n
      return new OperatorState(this.stack)
    }

    expr.result = _calculate(expr.result, expr.operator, n)
    expr.operationsCount--

    let rightExpr = expr
    while (this.stack.length > 0 && rightExpr.operationsCount === 0) {
      this.stack.pop()
      const leftExpr = this.stack.at(-1)
      if (!leftExpr) {
        send(rightExpr.result)
        return new OperationCountState([])
      }

      if (leftExpr.operator) {
        leftExpr.result = _calculate(leftExpr.result, leftExpr.operator, rightExpr.result)
        leftExpr.operationsCount--
      } else {
        leftExpr.result = rightExpr.result
      }

      rightExpr = leftExpr
    }

    return new OperatorState(this.stack)
  }
}

class OperatorState implements State {
  constructor(
    public stack: Expression[]
  ) {}

  next(...[operator]: ScriptArgs): State {
    const expr = this.stack.at(-1)

    if (!expr) {
      throw new Error('empty stack')
    }

    expr.operator = operator
    return new OperationCountState(this.stack)
  }
}

// main

let state: State = new OperationCountState([])

run('program5.txt', (...args) => {
  state = state.next(...args)
})
