export { }

type Vector<T> = {
  size: number
  first: number
  array: T[]
}
// очередь, стек

type ListItem<T> = {
  value: T
  prev: ListItem<T>
  next: ListItem<T>
}
// дерево, графы, гео

// ? скорость Vector+   ListItem-
// ? память   ListItem+ Vector-

// добавление, чтение (Vector), изменение, удаление (CRUD)




// call stack
// stack heap


function sum(n1: number, n2: number) {
  return n1 + n2
}

const result = sum(1, 2)
// [result=undefined, $return=3] [n1=1, n2=2]
// const result = sum(sum(1,2), sum(3,4))

// start

function fibonacci(n: number): number {
  if (n > 1) {
    return fibonacci(n - 1) * n
  }
  return n
}
fibonacci(2)
// [$return=undefined] [n=2] [n=1]
