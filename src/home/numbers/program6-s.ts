import { run } from "./run-signals"

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

let rootExpression: ExpressionNode | undefined
let firstExpression: Partial<ExpressionNode> = {}
let operator: Operation | undefined

run('program6.txt', (value, send, error) => {
  if (!rootExpression) {
    if (typeof firstExpression.left === 'undefined') {
      firstExpression.left = value
    }
    else if (typeof firstExpression.operator === 'undefined') {
      firstExpression.operator = value
    }
    else {
      firstExpression.right = value
      rootExpression = firstExpression as ExpressionNode
    }
    return
  }
  else {
    if (typeof operator === 'undefined') {
      if (value !== Operation.equals) {
        operator = value
      }
      else {
        try {
          const result = calculate(rootExpression)
          send(result)

          rootExpression = undefined
          firstExpression = {}
          operator = undefined
        } catch {
          throw error
        }
      }
      return
    }

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
    operator = undefined
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
      throw new Error("unknown operator")
  }
}
