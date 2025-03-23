export {}

const numberSqrt = +input(`Введите число, которое нужно возвести в квадрат: `)

if (isFinite(numberSqrt) && numberSqrt > 0) {
	const sqrtResult = numberSqrt ** 2
	print(`${numberSqrt} в квадрате = ${sqrtResult}`)
}