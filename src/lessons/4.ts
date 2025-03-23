export {}

// --- ПОЛЬЗОВАТЕЛЬСКИЕ ТИПЫ ---

type AlliasType = number
const v1: AlliasType = 1
// const v11: AlliasType = 'a' // другие типы - ошибка

type LiteralType = 12
const v2: LiteralType = 12
// const v22: LiteralType = 3 // другие типы и числа - ошибка


// --- ВАРИАТИВНЫЕ ТИПЫ ---

let value: number | string | undefined // = undefined
print(`value ${value}`) // undefined
value = 10
value = 'some text'
// value = true // Error

if (typeof value === 'number') {
  value = value - 1
}


const checkType = (value: unknown) => {
  if (typeof value === 'string') {
    print('в переменной строка')
  }
  else if (typeof value === 'number') { // иначе если ...
    print('в переменной число')
  }
  else if (typeof value === 'undefined') {
    print('в переменной ничего нет')
  }
  else {
    print('в переменной что-то непонятное')
  }
}



// --- ОПАСНОСТИ JS ---

// undefined
{
  let withoutValue // undefined

  print(
    withoutValue === undefined
      ? 'ожидаемо выведется'
      : 'ожидаемо не выведется'
  )
  {
    let undefined = 'surprise'

    print(
      withoutValue === undefined
        ? 'как же так?'
        : 'сюрприз)))'
    )

    print(
      typeof withoutValue === 'undefined'
        ? 'вот теперь правильно'
        : '...'
    )
  }
}



// перечисление литеральных значений
type Variant = 1 | 2 | 3 | 'hi' | ':)'
const v: Variant = 'hi'

// комбинация различных типов
type Combination = boolean | Variant
const combination: Combination = ':)'

// enum
// enum Fruits {
//   apple,
//   pear,
// }
type Fruits = 'apple' | 'pear' // | 'melone'
const fruit: Fruits = 'apple'

const printFruit = (fruit: Fruits): string => {
  // if (fruit === 'apple') {
  //   return 'яблоко'
  // }
  // if (fruit === 'pear') {
  //   return 'груша'
  // }

  switch (fruit) {
    case 'apple':
      return 'яблоко'

    case 'pear':
      return 'груша'
  }
}
