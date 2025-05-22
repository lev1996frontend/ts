import { run, ScriptArgs } from './run-signals'

const enum Command {
  send = 1,
  assign,
}

const enum Operator {
  plus = 1,
  minus,
  multiply,
  divide
}

const enum VarOptions {
  primitive = 1,
  variable
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
    public variables: Variables = {}
  ) {}
  next(...[command, _send, error]: ScriptArgs): State {
    switch (command) {
      case Command.send: return new Number1TypeState(this.variables, { command })
      case Command.assign: return new AssignState(this.variables)
      default: throw error
    }
  }
}

class AssignState implements State {
  constructor (
    public variables: Variables
  ) {}
  next(...[variable]: ScriptArgs): State {
    const data: CommandAssignData = {
      command: Command.assign,
      variable,
    }
    return new Number1TypeState(this.variables, data)
  }
}
// Expression

type CommandData = {
  command: Command
}
type CommandAssignData = {
  command: Command.assign,
  variable: number
}
function isCommandAssignData(data: CommandData): data is CommandAssignData {
  return (
    data.command === Command.assign
    && typeof (data as CommandAssignData).variable === 'number'
  )
}

// N1

class Number1TypeState implements State {
  constructor (
    public variables: Variables,
    public data: CommandData
  ) {}
  next(...[type, _send, error]: ScriptArgs): State {
    switch( type) {
      case VarOptions.primitive: return new Primitive1State(this.variables, this.data)
      case VarOptions.variable: return new Variable1State(this.variables, this.data)
      default: throw error
    }
  }
}

class Primitive1State implements State {
  constructor(
    public variables: Variables,
    public data: CommandData
  ) {}

  next(...[n1]: ScriptArgs): State {
    return new OperatorState(this.variables, { ...this.data, n1 })
  }
}

class Variable1State implements State {
  constructor(
    public variables: Variables,
    public data: CommandData
  ) {}
  next(...[variable, _send, error]: ScriptArgs): State {
    const n1 = this.variables[variable]
    if (typeof n1 === 'undefined') {
      throw error
    }
    return new OperatorState(this.variables, { ...this.data, n1 })
  }
}

// Operator

type OperatorStateData = CommandData & {
  n1: number
}
class OperatorState implements State {
  constructor (
    public variables: Variables,
    public data: OperatorStateData
  ) {}
  next(...[operator, _send, error]: ScriptArgs): State {
    if (!(operator in operation)) {
      throw error
    }
    return new Number2TypeState(this.variables, {
      ...this.data,
      operator,
    })
  }
}

// N2

type Number2StateData = OperatorStateData & {
  operator: Operator
}

class Number2TypeState implements State {
  constructor (
    public variables: Variables,
    public data: Number2StateData
  ) {}
  next(...[type, _send, error]: ScriptArgs): State {
    switch( type) {
      case VarOptions.primitive: return new Primitive2State(this.variables, this.data)
      case VarOptions.variable: return new Variable2State(this.variables, this.data)
      default: throw error
    }
  }
}

class Primitive2State implements State {
  constructor(
    public variables: Variables,
    public data: Number2StateData
  ) {}

  next(...args: ScriptArgs): State {
    const [n2] = args
    doAction(args, this.variables, {
      ...this.data,
      n2
    })
    return new CommandState(this.variables)
  }
}

class Variable2State implements State {
  constructor(
    public variables: Variables,
    public data: Number2StateData
  ) {}
  next(...args: ScriptArgs): State {
    const [variable, _send, error] = args
    const n2 = this.variables[variable]
    if (typeof n2 === 'undefined') {
      throw error
    }
    doAction(args, this.variables, {
      ...this.data,
      n2
    })
    return new CommandState(this.variables)
  }
}

// Action
type ExpressionData = Number2StateData & {
  n2: number
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
function doAction([_value, send, error]: ScriptArgs, variables: Variables, data: ExpressionData) {
  try {
    const calculate = operation[data.operator]
    const result = calculate(data.n1, data.n2)
    switch (data.command) {
      case Command.send: {
        send(result)
        break
      }
      case Command.assign: {
        if (isCommandAssignData(data)) {
          variables[data.variable] = result
        } else {
          throw new Error('data.variable is undefined')
        }
      }
      default: throw error
    }
  } catch {
    throw error
  }
}

// main
let state: State = new CommandState()
run('program3.txt', (...args) => {
  state = state.next(...args)
})


// in: "1 2 3 4 5"
// out: "3 7"
// in: "1 2 0 0 5"
// out: "3 -"

// in: 1 2 0 0 5 6
// out: 3 -
