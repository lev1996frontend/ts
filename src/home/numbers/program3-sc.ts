import { run, ScriptArgs } from './run-signals'

// abstract state
type State = {
  next(...args: ScriptArgs): State
}

// state 1
class ReadN1 implements State {
  next(...[value]: ScriptArgs): State {
    return new ReadN2({
      n1: value
    })
  }
}

// state 2
type ReadN2Data = {
  n1: number
}

class ReadN2 implements State {
  constructor(
    public state: ReadN2Data
  ) {}

  next(...[value, send]: ScriptArgs): State {
    send(this.state.n1 + value)
    return new ReadN1()
  }
}

// main
let state: State = new ReadN1()
run('program3.txt', (...args) => {
  state = state.next(...args)
})


// in: "1 2 3 4 5"
// out: "3 7"
// in: "1 2 0 0 5"
// out: "3 -"

// in: 1 2 0 0 5 6
// out: 3 -
