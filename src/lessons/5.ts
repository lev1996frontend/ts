export {}

// AS (уточнение подмножества, лучше не использовать)

const hi: string = 'hi'
const hello: 'hello' = hi as 'hello' // поломанная типизация

if (hi === 'hello') {

}

// НЕОПРЕДЕЛЁННЫЕ ТИПЫ (any, unknown, void, never)
// any (любой тип)
// unknown/void (неизвестный тип, unknown проверяем, void отбрасываем)
// never (никакой, чаще всего показывает недостижимый код)

// any VS unknown
{
  let a1: any = '1'
  let a2: unknown = '1'

  // a1++ // runtime error
  // a2++ // compile error

  if (typeof a2 === 'number') {
    a2++ // теперь можно работать как с числом
  }

  console.log(print()) // undefined, он же void
}
// unknown - для универсального программирования
// void - для использования внутри функций, которая ничего не возвращает
// any - для использования js внутри ts (в идеале лучше вообще не использовать)

if (typeof hello === 'number') {
  hello // never
}


// ОПЕРАТОРЫ ВЫБОРА ( && || ?? )
// как тернарый ?: оператор возвращают значение в зависимости от условия
// && - возвращает правый операнд, если левый операнд true
// || - возвращает правый операнд, если левый операнд false.
const test0 = 10 && 'test string'
const test1 = 10 && false // false
const test00 = 0 && true // false
const test21 = Boolean(10) && true // boolean

const test3 = 0 && 'test' // 0
const test4 = 10 && 'test' // 'test'

const test5 = 0 || 'test' // 'test'
const test6 = 10 || 'test' // 10

const test7 = (10 > 0) && 'yes' // false | "yes" // WTF?

// TS/ES2020 operator "??"
// не делает преобразование в boolean
// отсекает только: undefined null, пропускает все остальные
// обычно используется для установки значения по умолчанию

// (0 !== undefined && 0 !== null) ? 0 : 'test'
const test8 = 0 ?? 'test' // 0
// const test5 = 0 || 'test' // 'test'

const test9 = 10 ?? 'test' // 10
const test10 = false ?? 10 // false
const test13 = NaN ?? 10 // number (NaN)

const test11 = undefined ?? 10 // 10
const test12 = null ?? 10 // 10

// print(typeof (5===7)) // 'boolean'
