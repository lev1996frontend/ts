// import delay from 'delay'

// setTimeout(() => {
//   print(2)
//   setTimeout(() => {
//     print(3)
//   }, 1000)
// }, 1000)

// async function start() {
// // const start = async () => {
//   throw 'test error'
//   // print(1)
//   // await delay(1000)
//   // print(2)
//   // await delay(1000)
//   // print(3)
// }

// const start = () => {
//   return new Promise<string>((resolve, reject) => {
// 		return reject('test error')
// 		return resolve('txt')
// 	})
//   // return new Promise<string>(async (resolve, reject) => {
// 	// 	await dalay(1000)
// 	// 	return resolve('txt')
// 	// })
//   return new Promise<string>((resolve, reject) => {
//     setTimeout(() => {
// 			return resolve('txt')
// 		}, 1000)
//   })
// }

// const result = start()
// console.log(result)
// result
// .then((data) => {
//   console.log('data', data)
//   return 123
// })
// .then((data) => {
//   console.log('data', data)
// })
// .catch(console.error) 
// //.finally()

// new Promise<void>((resolve) => resolve())
// Promise.resolve()
// .then(() => new Promise<void>((resolve) => {
//   setTimeout(() => {
//     print('1')
//     resolve()
// 	}, 1000)
// }))
// .then(() => new Promise<void>((resolve) => {
//   setTimeout(() => {
//     print('2')
//     resolve()
// 	}, 1000)
// }))
// .then(() => print('3'))
// // .catch(console.error) 

const nextJoke = async (): Promise<string> => {
  const response = await fetch('https://api.chucknorris.io/jokes/random', { // ?q=asd&c=123
    // method: 'POST',
    // body: JSON.stringify({ data: '...' }),
    // headers: {},
  })
	const json = await response.json() // value
  const { value } = json as { value: string }
	return value
}

nextJoke().then(print)
