import moment from 'moment'
import 'moment-duration-format'

/*
5. Обратный отсчёт

Написать функцию getRemainingTime(date), которая будет вычислять оставшееся время до указанной целевой даты и времени.

Пример:
getRemainingTime("01.01.2026 12:00") // "15.11 04:23:59"
*/

const getRemainingTime = (date: string) => {
	const now = moment()
	const endDate = moment(date, 'DD.MM.YYYY hh:mm') 
	const difference = moment.duration(endDate.diff(now))
	return difference.format('DD.MM hh:mm:ss', {
    trim: false
	})
}

console.log(
	getRemainingTime("20.01.2025 12:00") // "01.01 08:22:00"
)
