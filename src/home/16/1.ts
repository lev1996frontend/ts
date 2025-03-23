export {}
/*
1)аналог функции delay
*/
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const fetchDelay = async (): Promise<void> => {
	console.log('start')
	await delay(1000)
	console.log('🚀 ~ fetchDelay ~ delay(1000)')
}

// const fetchDelay = (): Promise<void> => {
// 	var r
// 	return new Promise<void>(() => {
// 		r = console.log('start')
// 		return delay(3000)
// 	}).then((data) => {
// 		r = 
// 		console.log('🚀 ~ fetchDelay ~ delay(3000)')
// 	})
// }

fetchDelay()
// ...
