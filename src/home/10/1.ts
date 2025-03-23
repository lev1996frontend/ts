export{}
/* 1. Мягкий поиск строки
Написать функцию includes, которая проверяет наличие подстроки в строке без учёта регистра.
Пример:
includes('JavaScript', 'script') // true
includes('Python', 'script') // false */

const includes = (str: string, subStr: string) => new RegExp(subStr, 'i').test(str)
// const includes = (str: string, subStr: string) => (
//   str
//     .toLowerCase()
//     .includes(
//       subStr.toLowerCase()
//     )
// )

console.log(includes('JavaScript', 'Script')) // true)
console.log(includes('Python', 'script')) // false */
