export {}

function calculate(numberOfOne: number, numberOfTwo: number, enterSign: string): number | undefined {
	switch (enterSign) {
		case '+':
			return numberOfOne + numberOfTwo
		case '-':
			return numberOfOne - numberOfTwo
		case '*':
			return numberOfOne * numberOfTwo
		case '/':
			return numberOfOne / numberOfTwo;
		default:
			return undefined
	}
}

function start() {
	const numberOfOne = +input('введите первое число: ')
	const numberOfTwo = +input('введите второе число: ')
	const enterSign = input('введите оператор: ')

	if (!isFinite(numberOfOne) || !isFinite(numberOfTwo)) {
		return print('Вы ввели некорректное значение')
	}
	
	if (enterSign === '/' && numberOfTwo === 0) {
		return print('На ноль делить нельзя!')
	}
	
	const result = calculate(numberOfOne, numberOfTwo, enterSign)
	
	if (result === undefined) {
		return print('Нет такого оператора')
	}

	print(`${numberOfOne} ${enterSign} ${numberOfTwo} = ${result}`)
}

start()
