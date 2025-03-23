export {}

const myTimer = (quantity: number, callback: (count: number) => void): void => {
	let count = 1
	const interval = setInterval(() => {
		callback(count)
		if (count === quantity) {
			clearInterval(interval)
		} else {
			count++
		}
	}, 1000)
}

myTimer(3, (count) => {
	print(count)
})
