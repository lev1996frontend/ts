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

  const first = nextValue()
  const operator = nextValue()
  const third = nextValue()
  const fourth = nextValue()

  const firstOperations: ExpressionNode = {
    left: first,
    operator: operator,
    right: third
  }

  const secondOperations: ExpressionNode = {
    left: firstOperations,
    operator: fourth,
    right: nextValue()
  }

  root = secondOperations

  if (nextValue() === 0) {
    const result = calculate(root)
    send(result)
    root = undefined
  }

})

// function

function calculate(node: ExpressionNode): number {

  const leftValue = typeof node.left === 'number' ? node.left : calculate(node.left)

  const rightValue = typeof node.right === 'number' ? node.right : calculate(node.right)

    switch (node.operator) {
      case Operation.plus: return leftValue + rightValue
      case Operation.minus: return leftValue - rightValue
      case Operation.multiply: return leftValue * rightValue
      case Operation.divide: {
        if (rightValue === 0) {
          throw new Error("division zero")
        }
        return leftValue / rightValue
      }
      default:
        throw new Error("unknow operator")
    }
}
