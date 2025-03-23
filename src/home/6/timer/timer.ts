// таймер на 10 сек, каждые 2 секунды выводить номер итерации с первого запуска, в конце написать "конец"
// через 5 сек остановить таймер (+ вывести статистику)
// ещё через 1 сек запустить таймер заново
// в конце снова вывести статистику
// статистика: запущен ли таймер, количество срабатываний с последнего запуска

type TimerSettings = {
	readonly seconds: number
	readonly quantity: number
	readonly onTimeout: (i: number) => void
	readonly onFinish: () => void
}

type Timer = {
	readonly isActive: boolean
	readonly start: () => void
	readonly stop: () => void
}

export const createTimer = (settings: TimerSettings): Timer => {
	let id: NodeJS.Timeout | undefined
	let iterationsCount = 0
	const timer = {
		isActive: false,
		start: () => {
			clearInterval(id)
			iterationsCount = 0 
			timer.isActive = true
      id = setInterval(() => {
				if (iterationsCount >= settings.quantity) {
					timer.stop()
					settings.onFinish()
					return
				}
				iterationsCount++ 
				settings.onTimeout(iterationsCount)
			}, settings.seconds * 1000)
    },
		stop: () => {
			clearInterval(id)
			timer.isActive = false
		},
	}
	return timer
}
