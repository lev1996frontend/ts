/*2. Разница между датами

Написать функцию dateDifference(date1, date2), которая принимает две даты (в формате строк, например "2023-01-01") и возвращает количество дней между ними.

Примеры:
*/

import moment from 'moment'

const dateFormat = 'DD.MM.YYYY'

const dateDifference = (date1: string, date2: string) => {
	const d1 = moment(date1, dateFormat)
	const d2 = moment(date2, dateFormat)
	return d2.diff(d1, 'days')
}

console.log(
	dateDifference("01.01.2023", "10.01.2023"), // 9
	dateDifference("31.12.2022", "01.01.2023"), // 1
	dateDifference("01.01.2020", "01.01.2021"), // 366 (високосный год)
)
