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

// let root: ExpressionNode | undefined

// 1+2-3*4/6+2*3= 7
run('program6.txt', (nextValue, send, error) => {
  let rootExpression: ExpressionNode = {
    left: nextValue(),
    operator: nextValue(),
    right: nextValue(),
  }

  while (true) {
    const operator = nextValue()
    if (operator === Operation.equals) {
      break
    }

    const value = nextValue()

    if (operator === Operation.plus || operator === Operation.minus) {
      rootExpression = {
        left: rootExpression,
        operator,
        right: value,
      }
    } else {
      rootExpression.right = {
        left: rootExpression.right,
        operator,
        right: value,
      }
    }
  }

  try {
    const result = calculate(rootExpression)
    send(result)
  } catch {
    throw error
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
