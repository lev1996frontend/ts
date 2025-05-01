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
