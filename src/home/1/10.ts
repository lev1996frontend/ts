export {}

const seconds = +input(`Введите количетсво секунд: `)

if (isFinite(seconds) && seconds > 0) {
	const hours = Math.floor(seconds / 3600)
	const minutes = Math.floor((seconds % 3600) / 60)
	const second = seconds % 60
	const formatTime = (
		(hours < 10 ? '0' : '') + hours + ':' +
		(minutes < 10  ? '0' : '') + minutes + ':' +
		(second < 10 ? '0' : '') + second
	)
	print(`${formatTime}`)
} else {
	print('Некорректное количество секунд')
}
