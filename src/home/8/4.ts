export {}

// const inputNumber = (header?: string, validation?: (item: number) => boolean | string): number => {
// 	while(true) {
// 		const inputNum = +input(header)
// 		const result = validation?.(inputNum)
// 		if (isFinite(inputNum) && result === true) {
// 			return inputNum
// 		} else {
// 			print(
// 				typeof result === 'string' && result
// 					? result 
// 					: 'Введите корректное число'
// 			)
// 		}
// 	}
// }

const inputNumber = (header?: string, validation?: (item: number) => boolean | string): number => {
	while (true) {
		const inputStr = input(header)
		const inputNum = +inputStr

		const result = validation?.(inputNum) ?? true // validation ? validation(inputNum) : undefined

		if (inputStr !== '' && result === true && isFinite(inputNum)) {
			return inputNum
		}
		
		print(
			typeof result === 'string' && result !== ''
				? result
				: 'Введите корректное число!'
		)
	}
}

const enterNumber1 = inputNumber('enterNumber1: ')
const enterNumber2 = inputNumber('enterNumber2: ', (number) => number > 0) // !

const enterNumber3 = inputNumber('enterNumber3: ', (number) => {
	if (number <= 0) {
		return 'число должно быть больше 0' // !
  }
  if (number % 2 !== 0) {
    // print('число должно быть четным')
    return false
  }
  return true
})


console.log({enterNumber1,enterNumber2,enterNumber3})
