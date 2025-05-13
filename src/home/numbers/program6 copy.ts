import { run } from "./run";

// left, operator, right
// заполняем дерево, потом вычисляем

const enum Operation {
  equals,
  plus,
  minus,
  multiply,
  divide,
}

type ExpressionNode = {
  left: number | ExpressionNode
  operator: Operation
  right: number | ExpressionNode
}

// 1+2-3*4/5+2*3=
// ((1+2)-((3*4)/5))+2*3

// [1]: 1 + 2

// [2]: [1] - 3

// [3~]: 3 * 4
// [2]: [1] - [3~]

// [4~]: [3~] / 5
// [2]: [1] - [4~]

// [5]: [2] + 2

// [6~]: 2 * 3
// [5]: [2] + [6~]

let root: ExpressionNode | undefined

run('program6.txt', (nextValue, send, error) => {



  // functions

  function calculate(left: number, operator: number, right: number) {
    switch (operator) {
      case Operation.plus: return left + right
      case Operation.minus: return left - right
      case Operation.multiply: return left * right
      case Operation.divide: {
        if (right === 0) {
          throw error
        }
        return left / right
      }
      default:
        throw error
    }
  }
})

