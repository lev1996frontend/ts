import { ScriptArgs, run } from "./run-signals"

// 2+3=1+3-2=
// 5 2
// 3 4 2

const enum Operator {
  plus = 1,
  minus,
  multiply,
  divide
}

const operation: Record<Operator, (n1: number, n2: number) => number> = {
  [Operator.plus]: (n1, n2) => n1 + n2,
  [Operator.minus]: (n1, n2) => n1 - n2,
  [Operator.multiply]: (n1, n2) => n1 * n2,
  [Operator.divide]: (n1, n2) => {
    if (n2 === 0) {
      throw new Error('zero divide')
    }
    return n1 / n2
  },
}

// abstract state
type State = {
  next(...args: ScriptArgs): State
}


// 1

class N1State implements State {
    next(...[value]: ScriptArgs): State {
    return new OperatorState({ operationCount: value, result: value  })
  }
}


// 2

type OperatorStateData = {
  operationCount: number,
  result: number
}

class OperatorState implements State {
  constructor(
    public data: OperatorStateData
  ) {}

  next(...[operator, send, error]: ScriptArgs): State {
    if (this.data.operationCount === 0) {
      send(this.data.result)
      return new N1State()
    }

    if (!(operator in operation)) {
      throw error
    }

    return new N2State({
      ...this.data,
      operator,
    })
  }
}


// 3

type N2StateData = OperatorStateData & {
  operator: Operator
}

class N2State implements State {
  constructor(
    public data: N2StateData & {operator?: Operator}
  ) {}
  next(...[value, _send, error]: ScriptArgs): State {
    try {
      const calculate = operation[this.data.operator]
      this.data.result = calculate(this.data.result, value)
      return new OperatorState({ operationCount: this.data.operationCount - 1, result: this.data.result })
    } catch {
      throw error
    }
  }
}

// main

let state: State = new N1State()
run('program5.txt', (...args) => {
  state = state.next(...args)
})
