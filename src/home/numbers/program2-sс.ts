import { run, ScriptArgs } from './run-signals'

const enum Operator {
  plus = 1,
  minus,
  multiply,
  divide,
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
  next(...[n1]: ScriptArgs): State {
    return new OperatorState({ n1 })
  }
}


// 2

type OperatorStateData = {
  n1: number
}

class OperatorState implements State {
  constructor(
    public data: OperatorStateData
  ) {}

  next(...[operator, _send , error]: ScriptArgs): State {
    if (!(operator in operation)) {
      throw error
    }
    return new N2State({
      // n1: this.data.n1,
      ...this.data,
      operator,
    })
  }
}


// 3

type N2StateData = OperatorStateData & {
  // n1: number
  operator: Operator
}

class N2State implements State {
  constructor(
    public data: N2StateData
  ) {}
  next(...[n2, send]: ScriptArgs): State {
    const calculate = operation[this.data.operator]
    const result = calculate(this.data.n1, n2)
    send(result)

    return new N1State()
  }
}


// main

let state: State = new N1State()
run('program2.txt', (...args) => {
  state = state.next(...args)
})


// in: "1 2 3 4 5"
// out: "3 7"
// in: "1 2 0 0 5"
// out: "3 -"

// in: 1 2 0 0 5 6
// out: 3 -
