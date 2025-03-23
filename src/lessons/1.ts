export {}
// однострочный комментарий (подсказки и отключать код ctrl+/)
/*
  многострочный
  комментарий
  (только для документации)
  JSDoc
*/

// ПЕРЕМЕННЫЕ: (var) let const
// camelCase
const zeroNumber = 0

// ТИПЫ ДАННЫХ

/*
ЧИСЛА number
12 2.2 0.01 Infinity NaN (not a number - неправильно преобразованное число)
Number(value)
+ - * / 
** (степень, например в квадрате)
% (остаток от деления)

< > <= >= 
(== !=)
=== !==
*/

const correctNumber = Number('123') // 123
const invalidNumber: number = Number('asd') // NaN

const negativeNumber = -correctNumber // -1 * correctNumber
const shortConvertation = +'123' // так делать не будем

// остаток от деления
1 % 2 // 1
3 % 2 // 1
12 % 5 // 2
20 % 5 // 0

// операторы присваивания
let num = 2

num = num + 1
num += 1
num++

num = num - 1
num -= 1
num--

// число в квадрате
num *= num
num **= 2
// num** // так нельзя



/*
СТРОКИ string
'' "" ``
String(value)
+
=== !==
*/

const str1 = 'Строка 1\nСтрока 2' // \n - перенос строки
const str2 = `text ${str1}... ${num + 1}`
const str3 = `
multi
line
text
`

let str4 = ''
str4 += str2 + '\n' + str3



// КОНСОЛЬ: ввод/вывод
const name = input('Input name: ') // ввод с консоли (учебная библиотека)
print(name) // вывод на консоль (учебная библиотека)
console.log('name', name) // вывод на консоль для отладки (не для решения задач)



// ОТСУТСТВУЮЩИЙ тип undefined
let variable
console.log('variable', variable) // undefined
variable = 1
console.log('variable', variable) // 1



/*
ЛОГИКА boolean
true false
Boolean(value)

false: 0 '' undefined null
true: всё остальное

&& и
|| или
! не
*/

const isBigNumber: boolean = (num >= 100)

// УСЛОВИЯ
if (num >= 100) {

}

if (isBigNumber) {
  
} else {

}

if (isBigNumber || (num >= 5 && num <= 10)) {
  
} 
else if (!isBigNumber) {

}
else {

}

// ПРОВЕРКИ
if (isFinite(invalidNumber)) { // не NaN и не Infinity - нормальное число
  
}
if (!isNaN(invalidNumber) && invalidNumber > -Infinity && invalidNumber < Infinity) {
  
}

// тернарный оператор (возвращает значение в зависимости от условия)
const answer: string = (num < 18) ? 'y' : 'n'



// МАТЕМАТИКА

// округление по правилам математики
Math.round(2.5)  // 3
Math.round(-2.5) // -2

Math.round(2.4)  // 2
Math.round(-2.4) // -2

// вверх
Math.ceil(2.5)  // 3
Math.ceil(-2.5) // -2

Math.ceil(2.4)  // 3
Math.ceil(-2.4) // -2

// вниз
Math.floor(2.5)  // 2
Math.floor(-2.5) // -3

Math.floor(2.4)  // 2
Math.floor(-2.4) // -3

// отбросить дробную часть
Math.trunc(2.5)  // 2
Math.trunc(-2.5) // -2

Math.trunc(2.4)  // 2
Math.trunc(-2.4) // -2

// модуль
Math.abs(2.5)  // 2.5
Math.abs(-2.5) // 2.5

// Случайные числа
Math.random() // (0..1)
random(1, 10) // [1..10] (учебная библиотека)
