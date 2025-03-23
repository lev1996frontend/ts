export {}

const myTimeout = (seconds: number, callback: () => void): void => {
	setTimeout(callback, seconds * 1000)
}

myTimeout(1, () => {
	print('Hello, world!')
})
