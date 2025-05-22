import { run, ScriptArgs } from './run-signals'

const enum Command {
  send = 1,
  assign,
}

const enum ValueSource {
  primitive = 1,
  variable
}

const enum Operator {
  plus = 1,
  minus,
  multiply,
  divide
}

// abstract state
type Variables = Record<number, number>
interface State  {
  readonly variables: Variables
  readonly data?: object

  next(...args: ScriptArgs): State
}

// command (send, assign) -> source (n, expr)
// send -> n/expr -> send(result)
// assign -> v -> n/expr -> var=result

// n -> t, n|v -> действие
// expr -> t1, n1|v1, operator, t2, n2|v2 -> действие

// send expr l 1 plus l 2
// assign 1 n l 5
// assign 2 expr v 1 1 l 2
// send n v 2

class CommandState implements State {
  constructor (
    public variables: Variables
  ) {}
  next(...[command, _send, error]: ScriptArgs): State {
    switch (command) {
      case Command.send: return new SendState(this.variables, {})
      case Command.assign: return new VarTypeState(this.variables)
      default: throw error
    }
  }
}

// Send
type Expression = {
  source1?: ValueSource
  number1?: number
  operator?: Operator
  source2?: ValueSource
  number2?: number

  result?: number
}
class SendState implements State {
  constructor (
    public variables: Variables,
    public data: Expression
  ) {}
  next(...args: ScriptArgs): State {
    const [_value, send, _error] = args

    calculate(this.variables, this.data, args)

    if (typeof this.data.result === 'undefined') {
      return new SendState(this.variables, this.data)
    }

    send(this.data.result)
    return new CommandState(this.variables)
  }
}

// Assign

class VarTypeState implements State {
  constructor (
    public variables: Variables
  ) {}
  next(...[variable]: ScriptArgs): State {
    return new AssignState(this.variables, { variable, expression: {} })
  }
}

// AssignState

type AssignData = {
  variable: number
  expression: Expression
}

class AssignState implements State {
  constructor (
    public variables: Variables,
    public data: AssignData
  ) {}

  next(...args: ScriptArgs): State {
    const [_value, send, _error] = args

    calculate(this.variables, this.data.expression, args)

    if (typeof this.data.expression.result === 'undefined') {
      return new AssignState(this.variables, this.data)
    }

    this.variables[this.data.variable] = this.data.expression.result
    return new CommandState(this.variables)
  }
}

// Calculate

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

function calculate(
  variables: Variables,
  data: Expression,
  args: ScriptArgs
): void {
  try {
    const [value] = args

    if (typeof data.source1 === 'undefined') {
      data.source1 = value
    }
    else if (typeof data.number1 === 'undefined') {
      data.number1 = getValue(data.source1, value, variables)
    }
    else if (typeof data.operator === 'undefined') {
      if (value in operation) {
        data.operator = value
      } else {
        throw new Error('unknown operation ' + value)
      }
    }
    else if (typeof data.source2 === 'undefined') {
      data.source2 = value
    }
    else if (typeof data.number2 === 'undefined') {
      data.number2 = getValue(data.source2, value, variables)
      data.result = operation[data.operator](data.number1, data.number2)
    }
    else {
      console.warn('Calculate called with result')
    }
  }
  catch (error) {
    console.error('Calculate error', error)
    throw error
  }
}

function getValue(source: ValueSource, value: number, variables: Variables): number {
  switch (source) {
    case ValueSource.primitive: return value
    case ValueSource.variable: {
      if (typeof variables[value] === 'undefined') {
        throw new Error('unknown variables')
      }
      return variables[value]
    }
  }
}

// main
let state: State = new CommandState({})
run('program3.txt', (...args) => {
  state = state.next(...args)
})


// in: "1 2 3 4 5"
// out: "3 7"
// in: "1 2 0 0 5"
// out: "3 -"

// in: 1 2 0 0 5 6
// out: 3 -
