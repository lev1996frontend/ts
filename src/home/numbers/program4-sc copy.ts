import { ScriptArgs, run } from "./run-signals"

// 2+3=1+3-2=
// 5 2
// 3 4 2

// TODO: -s

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

type OperatorStateData = {
  result: number
}

class OperatorState implements State {
  constructor(
    public data: OperatorStateData
  ) {}

  next(...[operator, send, error]: ScriptArgs): State {
    if (operator === 0) {
      send(this.data.result)
      return new NumberState()
    }

    if (!(operator in operation)) {
      throw error
    }

    return new NumberState({
      ...this.data,
      operator,
    })
  }
}


// 2

type NumberStateData = OperatorStateData & {
  operator: Operator
}

class NumberState implements State {
  constructor(
    public data?: NumberStateData
  ) {}
  next(...[value, _send, error]: ScriptArgs): State {
    if (!this.data) {
      return new OperatorState({ result: value })
    }
    try {
      const calculate = operation[this.data.operator]
      const result = calculate(this.data.result, value)
      return new OperatorState({ result })
    } catch {
      throw error
    }
  }
}

// main

let state: State = new NumberState()
run('program4.txt', (...args) => {
  state = state.next(...args)
})
