// --- СОЗДАНИЕ ФУНКЦИИ --- 

// function - не используется без надобности (* замыкает this, область видимости)

f1() // вызов функции перед её объявлением - нет ошибки
function f1() {

}
f1()


// стрелочная функция
// f2() // ошибка
const f2 = () => {

}
f2()


const f22 = () => {
  return 1
}

const f23 = () => 1



// --- ОСНОВЫ ДЕКОМПОЗИЦИИ ---

// Напечатать 2 раза текст 'Hello!'

// вариант 1
print('Hello!')
print('Hello!')

// вариант 2
const printHello = () => {
  print('Hello!')
  // ...
}
printHello()
printHello()



// --- ПАРАМЕТРЫ (отличие от локальных переменных) ---

const printGreeting = (name: string) => {
  const message = `Hello, ${name}!`
  print(message)
}
printGreeting('Vit')
printGreeting('noname')



// const sum = function () {
// 	// code
// }


// --- ВОЗВРАТ ЗНАЧЕНИЯ (отличие от вывода на консоль) ---

const loudNumber = (num: number): string => {
  return `${num}!`
}
const newNumber = loudNumber(111) // s1 = '111!'
print(loudNumber(123)) // 123!

/*
IO - input / output
in / out -> put
относительно программы

in - в программу, откуда-то из-вне, например от пользователя или генератора случайных чисел
out - из программы, куда-то наружу, например в консоль
*/

const sum1 = (n1: number, n2: number) => {
  return n1 + n2
}
const sum2 = (n1: number, n2: number) => n1 + n2

print(sum1(2, 3)) // 5
print(sum2(2, 3)) // 5

const sum3 = (n1: number, n2: number): number => n1 + n2
// const sum4 = (n1: number, n2: number): number => String(n1 + n2) // ошибка



// --- ОПЦИОНАЛЬНЫЕ параметры, значения по умолчанию ---
const printMessage = (message?: string) => {
  const name = message ? message : 'anonymous'
  print(`Hello, ${name}!`)
}
printMessage() // 'Hello, anonymous!'
printMessage('Vit') // 'Hello, Vit!'


const sqrt = (n: number, degree: number = 2) => n ** degree
sqrt(3) // 9 (3**2)
sqrt(3, 3) // 27 (3**3)




// --- ЗАМЫКАНИЯ ---

const user = 'admin'
let authorizationsCount = 0

const authorize = (username: string) => {
  authorizationsCount++
  if (username === user) {
    print(`Добро пожаловать!`)
  } else {
    print(`Доступ запрещён!`)
  }
}

authorize(`user`)
authorize(`admin`)

print(`Количество попыток: ${authorizationsCount}`)

// НЕ использовать замыкания глобальных let-переменных вне колбэков (антипаттерн "глобальные переменные")
// можно использовать замыкания const



// --- HOF (функции высшего порядка) ---
// функция, которая в результате выполнения возвращает функцию
// или которая принимает колбэк в качестве параметра

type PrintMessageType = (newUserName?: string) => void

const greetingMessage = (firstUserName: string): PrintMessageType => {
  let savedName = firstUserName
  const result: PrintMessageType = (newUserName?: string) => {
    if (newUserName) {
      savedName = newUserName
    }
    print(`Hello, ${savedName}!`)
  }
  return result
}
const printGreetingMessage = greetingMessage(`noname`)
printGreetingMessage() // `Hello, noname!`
printGreetingMessage(`Vit`) // `Hello, Vit!`
printGreetingMessage() // `Hello, Vit!`


// --- CALLBACK (функции обратного вызова) ---
// функция, которая принимает функцию в качестве значения параметра (подробнее изучим позже)

const repeat = (n: number, action: () => void) => {
  // i = i + 1
  for (let i = 0; i < n; i++) {
    action()
  }
}
repeat(3, printHello) // 3 раза напишет 'Hello!'




// --- концепция ПОТОК (источник -> назначение) ---
/*
ИСТОЧНИК
1. литерал
2. переменная
3. выражение
4. результат выполнения функции

НАЗНАЧЕНИЕ
1. управляющая конструкция
2. переменная
3. выражение
4. параметр функции
*/
