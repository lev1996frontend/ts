import moment from "moment"
/*
4. Напоминание

Написать функцию addHoursToDate(hours), которая будет сообщать конечную дату спустя указанное количество часов в читаемом формате. Возвращаемая дата должна включать также часы.

Пример:
addHoursToDate(1000) // "3 февраля 2025 года, 08:00"
*/

// moment.locale('ru')

const formatDate = 'D MMMM YYYY года, HH:mm'
const addHoursToDate = (hours: number) => {
	const rightNow = moment().locale('ru').add(hours, 'hours')
	return rightNow.format(formatDate)
}

console.log(
	addHoursToDate(1000) // "3 февраля 2025 года, 08:00"
)