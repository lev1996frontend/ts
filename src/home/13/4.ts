export {}

/*
4. Логирование времени выполнения функции
Написать функцию-обертку, которая выполняет другую функцию и логирует время ее выполнения с помощью Date.now()
Если функция завершается ошибкой, время выполнения все равно должно быть выведено в лог.
Ошибка из исходной функции должна быть проброшена наружу после логирования времени.

*/ 

const timeLogging = <T extends (...args: any[]) => any>(func: T): ReturnType<T> => {
	const startTime = Date.now()
	
	try {
		return func()
	} finally {
		const timeEnd = Date.now() - startTime
		console.log(`Общее выполнении функции: ${timeEnd}`)
	}
}


const testfunction = () => {
	// throw new Error('Стоп, кажется тут ошибка:)')
	return 1
}

try {
	const n: number = timeLogging(testfunction)
} catch (error) {
	console.error('Функция выполнилась с ошибкой', error)
}
