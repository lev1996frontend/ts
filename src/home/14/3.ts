import moment from "moment"
/*
3. Получение следующего понедельника

Написать функцию getNextMonday(date), которая принимает дату в формате строки и возвращает дату следующего понедельника.

Примеры:
getNextMonday("01.01.2023") // "02.01.2023"
getNextMonday("03.01.2023") // "09.01.2023"
*/

const formatDate = 'DD.MM.YYYY'
const getNextMonday = (date: string) => {
	const date1 = moment(date, formatDate)
	const diffDays = 7 - date1.isoWeekday() + 1
	const date2 = date1.add(diffDays, 'days')
	return date2.format(formatDate)
}

console.log(
	getNextMonday("01.01.2023"), // "02.01.2023"
	getNextMonday("03.01.2023"), // "09.01.2023"
)
