export {}
// TODO
// Object.assign()

const delay = (ms: number) => {
	let id: NodeJS.Timeout | undefined
	const promise = new Promise((resolve) => {
		id = setTimeout(resolve, ms)
	})
	return Object.assign(promise, {
		clear() {
			clearTimeout(id)
		}
	})
}

const fetchDelay = async (): Promise<void> => {
	console.log('start')
	await delay(1000)
	console.log('🚀 delay(1000)')
	const timeout = delay(2000)
	try {
		if (random(0, 1)) {
			await timeout
			console.log('🚀 delay(2000)')
		} else {
			timeout.clear()
			console.log('🚀 delay(0)')
		}
	} catch (error)	{
		console.error(error)
	}
}

fetchDelay()
