export {}

const numberOfOne = +input(`Введите 1 число: `)
const numberOfTwo = +input(`Введите 2 число: `)
const enterSign = input(`Введите знак(+, -, /, *): `)

function calculate (numberOfOne: number, numberOfTwo: number, enterSign: string): number | undefined {
	switch(enterSign) {
		case '+' :
			return numberOfOne + numberOfTwo
		case '-' :
			return numberOfOne - numberOfTwo
		case '/' :
			return numberOfOne / numberOfTwo
		case '*' :
			return numberOfOne * numberOfTwo
		default:
			return undefined
	}
}

function calculateValue () {
	if (!isFinite(numberOfOne) || !isFinite(numberOfTwo)) {
		return print(`Введите корректные значения`)
	}
	if (numberOfTwo === 0 && enterSign === '/') {
		return print(`На ноль делить нельзя`)
	}
	const result = calculate(numberOfOne, numberOfTwo, enterSign)
	if (result === undefined) {
		print(`неизвестный оператор`)
	} else {
		print(`${numberOfOne} ${enterSign} ${numberOfTwo} = ${result}`)
	}
}

calculateValue()