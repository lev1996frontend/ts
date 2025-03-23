export {}
/*
6. Отложенное выполнение
Написать функцию, которая оборачивает другую функцию в таймаут. Каждый следующий вызов должен срабатывать после указанного количества миллисекунд после выполнения предыдущей функции (упрощённый вариант - просто после указанного интервала).

// Пример использования:
const debouncedPrint = debounce(print, 1000)
debouncedPrint('Hello') // выведется через 1 секунду
debouncedPrint('World') // выведется через 2 секунды (упрощённый вариант - тоже через 1 секунду)
*/

type DebounceCallback<T extends any[]> = (...args: T) => void

const debounce = <T extends any[]>(callback: DebounceCallback<T>, seconds: number): DebounceCallback<T> => {
	let count = 0
	return (...args) => {
		setTimeout(() => {
			count++
			callback(...args)
		}, seconds + count * 1000)
	}
}

const debouncedPrint = debounce(print, 1000)
debouncedPrint('Hello') // выведется через 1 секунду
debouncedPrint('World') // выведется через 2 секунды (упрощённый вариант - тоже через 1 секунду)
debouncedPrint('!') // выведется через 3 сек (пока что через 4)

// setTimeout(() => {
// 	debouncedPrint('!') // TODO: через 3 сек (пока что через 4)
// }, 1000)

const debouncedLog = debounce(console.log, 1000)
debouncedLog(true)
