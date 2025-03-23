export {}

// массивы (списки)
//               0  1  2
const numbers = [1, 3, 5]
// : number[]
//  as const 

numbers[0] = 7
print(numbers[0])

for (const n of numbers) {
  print(n)
}

for (let i = 0; i < numbers.length; i++) {
  const n = numbers[i]
  print(`${i + 1}: ${n}`)
  // 1: 7
  // 2: 3
  // 3: 5
}

numbers[10] // undefined
const n = ([1,2,3] as const)[0]
numbers.at(0) // numbers[0]
numbers.at(-1) // numbers[-1] - Error


type User = {
  name: string
  age: number
}

const users: User[] = [
  {name: 'Alex', age: 23},
  {name: 'Blue', age: 30}
]

// map
const names: string[] = users.map((user) => user.name) 

// filter
const oldUsers: User[] = users.filter((user) => user.age >= 30)
const oddUsers = users.filter((user, i) => i % 2 === 0)

// ищем число 3
// indexOf, find, findIndex
// lastIndexOf, findLast, findLastIndex
// includes

const threeIndex = numbers.indexOf(3) // -1 (не найден), [0, length) (индекс)
print(
  threeIndex === -1
    ? 'error' 
    : 'found'
)

const three = numbers.find((n) => n === 3)
print(
  typeof three === 'undefined'
    ? 'error' 
    : 'found'
)

const threeFoundIndex = numbers.findIndex((n) => n === 3) // -1 (не найден), [0, length) (индекс)
print(
  threeIndex === -1
    ? 'error' 
    : 'found'
)


const includesThree: boolean = numbers.includes(3)
const someIsThree: boolean = numbers.some((n) => n === 3)

const everyAreThree: boolean = numbers.every((n) => n === 3) // false


// numbers.sort() // немного устаревший метод
numbers.toSorted((n1, n2) => n1 - n2)

// numbers.reverse() // немного устаревший метод
numbers.toReversed() // новый массив в обратном порядке

numbers.join(' ') // по умолчанию разделитель ","

// добавить
numbers.push(0) // в конец
numbers.unshift(0) // в начало (лучше не использовать)

// удалить (undefined если массив был пустой)
const lastItem = numbers.pop() // с конца
numbers.shift() // с начала (лучше не использовать)

numbers.splice(1, 0, 4, 5) // по индексу 1 удалить 0 элементов и добавить числа 4 и 5
numbers.splice(1, 2) // по индексу 1 удалить 2 элемента

const subArray = numbers.slice(1, 2) // срез

// numbers.reduce
// numbers.forEach
// new Array(100).fill(0)

// numbers.concat
const numsOrUsers = [...numbers, ...users]

// - перегруппировать людей так, чтобы в результате получился объект, где ключ - название улицы, значение - имя:
// улица1: имя1, имя2
// улица2: имя3, имя4
// (выпускаем свидетелей иеговы)

// - вывести кол-во встречающихся имён, распечатать в формате:
// Аня: 2
// Петя: 3
// Вася: 1
// (готовим персонализированную рекламу)