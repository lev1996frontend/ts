export {}

// Регулярные выражения

const regexp = / \n \\/
const r2 = new RegExp(` \\n ` + `\\\\`)

regexp.test('\\ ') // false
const match = 'Hello'.match(/Hell/)
if (match !== null) {
  match[0] // совпадение

  match[1] // первая скобка

  match.length // обычная длина массива
  match.index // indexOf
  // match.input // исходная строка (бесполезное свойство)
  match.groups // именованные скобки
}

// console.log(match)

// флаги
// i - игнорировать регистр
// g - глобальный многоразовый поиск
// ...

// console.log('Hello'.match(/h/i))


// matchAll - для всех совпадений (с флагом g)
// console.log('Hello'.matchAll(/l/)) // Error: matchAll called with a non-global RegExp argument
// console.log([...'Hello'.matchAll(/l/g)])


// специальные символы
// ^ начало строки
// $ конец строки

// console.log('Hello'.match(/^h/i))

// . любой символ

// console.log('Hello'.match(/.$/))

// количество
// * [0..Infinity)
// + [1..Infinity)
// ? [0..1]
// {count} = count
// {min,max} [min..max]
// {min,} [min..Infinity)

// console.log('Hello'.match(/.{3}$/))
// console.log('Hello'.match(/^.{3,}/))
// console.log('Hi'.match(/^.{3,}/))

// \w word латинские буквы, цифры и _ 
// \b граница слова
// \d любая цифра
// \s любой пробельный символ, вкл. \n \t
// \W \D \S - обратный диапазон совпадений (не указанные символы)
// Спецсимволы	Действие в строке замены
// $&	вставляет всё найденное совпадение
// $`	вставляет часть строки до совпадения
// $'	вставляет часть строки после совпадения
// $n	если n это 1-2 значное число, то вставляет содержимое n-й скобки (см. главу Скобочные группы)
// $<name>	вставляет содержимое скобки с указанным name (см. главу Скобочные группы)
// $$	вставляет "$"
// console.log('Hello, world!'.match(/^\w+/))
// console.log('Привет'.match(/^\w+/))

// ["'!,. ^] - любой символ в скобках
// [^"'!,. ] - если ^ первый, то это исключающие символы
// [a-z] [A-Z] [0-9] [а-Я]

// (?=.*[a-zA-Z])(?=.*[0-9])

// console.log('Hello, world!'.match(/[a-zA-Z]+/g))

// (вариант 1|вариант 2) - выбор из строк с несколькими символами
// (?<name>) - именованные скобочные группы

// console.log('Hello, world!'.match(/((Hello|Hi)(, (\w+))?)!/))
// console.log('Hello, world!!!'.match(/((Hello|Hi)(, (\w+))?)!/))
console.log('Hello, world!!!'.match(/(?<message>(Hello|Hi)(, (?<name>\w+))?)!/))
// groups: [Object: null prototype] { message: 'Hello, world', name: 'world' }

// console.log('Hello, world!'.match(/[^a-zA-Z]/g))
// console.log('Hello, world!'.match(/[a-zA-Z0-9]/g))

// (?=) (?<=) (?:)
// console.log('Hello, world!0'.match(/(?=.*[a-zA-Z])(?=.*[0-9])/))

// console.log('Hello, world!0'.match(/\w(?=\W)/g)) // o, d
// console.log('Hello, world!0'.match(/(?<=\W)\w/g)) // w, 0

console.log([...'Price: 20USD 15EUR'.matchAll(/\d+(?:USD|EUR)/g)]) // '20USD', '15EUR' 
