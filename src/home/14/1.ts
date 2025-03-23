/*
  1. Проверка високосного года

Написать функцию isLeapYear(year), которая принимает год и возвращает true, если год високосный, и false, если нет. Год високосный, если он делится на 4, но не делится на 100, за исключением тех лет, которые делятся на 400.

Примеры:

*/

// const isLeapYear = (num: number) => {
// 	if(num % 4 === 0 && 
// 		num % 100 !== 0 || 
// 		num % 400 === 0) {
// 		return true
// 	} else {
// 		return false
// 	}
// }

import moment from 'moment'

const isLeapYear = (year: number) => moment(year, 'YYYY').isLeapYear()

console.log(isLeapYear(2020)) // true
console.log(isLeapYear(2021)) // false
console.log(isLeapYear(2000)) // true
console.log(isLeapYear(1900)) // false
