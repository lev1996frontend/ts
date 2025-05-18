import { run, ScriptArgs } from './run-signals'

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

const enum VarOptions {
  primitive = 1,
  variable
}

// abstract state
interface State  {
  next(...args: ScriptArgs): State
}

// state 1
class N1State implements State {
  constructor(
    private _result: number = 0,
    private _varNumber: Record<number, number> = {}
  ) {}
  next(...[input]: ScriptArgs): State {
    const n1 = this._getValue(input)
    return new OperatorState({
      n1,
      _result: this._result,
      _varNumber: this._varNumber
    })
  }

  private _getValue(input: VarOptions) {
    return this._varNumber[VarOptions.primitive]
    ? input
    : this._varNumber[input]
  }
}

// state 2
type OperatorStateData = {
  n1: number,
  _result: number,
  _varNumber: Record<number, number>
}

class OperatorState implements State {
  constructor (
    public data: OperatorStateData
  ) {}
  next(...[operator, _send, error]: ScriptArgs): State {
    if (!(operator in operation)) {
      throw error
    }
    return new N2State({
      ...this.data,
      operator,
    })
  }
}
// state 3
type N2StateData = OperatorStateData & {
  operator: Operator,
}

class N2State implements State {
  constructor(
    public data: N2StateData
  ) {}

  next(...[input, send]: ScriptArgs): State {
    const n2 = this._getValue(input)
    const calculate = operation[this.data.operator]
    const result = calculate(this.data.n1, n2)
    send(result)

    return new N1State(result, this.data._varNumber)
  }

  private _getValue (input: VarOptions) {
    return this.data._varNumber[VarOptions.primitive]
    ? input
    : this.data._varNumber[input]
  }
}

// main
let state: State = new N1State()
run('program3.txt', (...args) => {
  state = state.next(...args)
})


// in: "1 2 3 4 5"
// out: "3 7"
// in: "1 2 0 0 5"
// out: "3 -"

// in: 1 2 0 0 5 6
// out: 3 -
