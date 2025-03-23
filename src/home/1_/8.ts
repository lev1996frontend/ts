export {}
// Задание 8.

const numberOfOne: number = +input('введите число: ')
const numberOfTwo: number = +input('введите второе число: ')
const enterSign = input('введите оператор: ')

if (isFinite(numberOfOne) && isFinite(numberOfTwo)) {
  if (enterSign === '+') {
		const checkCalculate: number = numberOfOne + numberOfTwo
		print(`Сумма чисел ${numberOfOne} и ${numberOfTwo} равна ${checkCalculate}`)
	} else if (enterSign === '-') {
		const checkCalculate: number = numberOfOne - numberOfTwo
		print(`Разность чисел ${numberOfOne} и ${numberOfTwo} равна ${checkCalculate}`)
	} else if (enterSign === '*') {
		const checkCalculate: number = numberOfOne * numberOfTwo
		print(`Произведение чисел ${numberOfOne} и ${numberOfTwo} равно ${checkCalculate}`)
	} else if (enterSign === '/' && numberOfTwo !== 0) {
		const checkCalculate: number = numberOfOne / numberOfTwo
		print(`Частное чисел ${numberOfOne} и ${numberOfTwo} равно ${checkCalculate}`)
	} else if (enterSign === '/' && numberOfTwo === 0) {
		print('На ноль делить нельзя!')
	} else {
    print('Нет такого оператора')
  }
} else {
  print('Вы ввели некорректное значение')
}
