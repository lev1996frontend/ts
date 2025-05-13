// 1+2-3*4/5

import { run } from "./run-signals";

// left, operator, right
// заполняем дерево, потом вычисляем

const TreeResult= <T extends object, U extends keyof T> (obj: T, key: U): T[U] => {
  return obj[key]
}

type Tree = Record<'left' | 'operator' | 'right' | 'result', undefined | number>

const tree: Tree = {
  left: undefined,
  operator: undefined,
  right: undefined,
  result: undefined
}

run('program6.txt',(value, send, error) => {
  const operators: Record <number, (a: number, b: number) => number>  = {
    1: (a, b) => a + b,
    2: (a, b) => a - b,
    3: (a, b) => a * b,
    4: (a, b) => {
      if (b === 0) {
        throw error
      }
      return a / b
    },
  }

  if (value === 0) {
    throw error
  }

  if (tree.left === undefined) {
    tree['left'] = value
    return
  }
  
  if (tree['right'] === undefined) {
    tree['right'] = value
    return
  }

  if (tree['operator'] === undefined) {
    tree['operator'] = value
    return
  }
  const operatorCheck = TreeResult(tree, 'operator')

  if (typeof operatorCheck === 'undefined') {
    throw error
  }

  const manipulation = operators[operatorCheck]
  if (typeof manipulation === 'undefined') {
    throw error
  }
  const left = TreeResult(tree, 'left')

  if (typeof left === 'undefined') {
    throw error
  }
  const right = TreeResult(tree, 'right')

  if (typeof right === 'undefined') {
    throw error
  }

  tree['result'] = manipulation(left, right)

  send(tree['result'])

  tree['operator'] = undefined
  tree['left'] = undefined
  tree['right'] = undefined
})

