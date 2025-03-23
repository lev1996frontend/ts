export {}

function inputNumber(): number {
	while (true) {
		const number = +input('Введите число ')
		if (isFinite(number)) {
			return number
		} else {
			print('Введите корректное число ')
		} 
	}
}

const enterNumber = inputNumber()

print(`Вы ввели число: ${enterNumber}`)