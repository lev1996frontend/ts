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

let operationCount: number |  undefined



run('program5.txt', (nextValue, send, error) => {

})
