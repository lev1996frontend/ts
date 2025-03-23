export {}

/*
3. numberInfo
Создать функцию, которая принимает число и возвращает информацию для будущих проверок, является ли оно:
- корректным
- целым, дробным или бесконечным
- положительным или отрицательным
- чётным или нечётным
а также
- целую часть
- на какое максимальное целое число можно поделить целую часть без остатка, кроме исходного числа
*/

type IncorrectNumber = {
	isCorrect: false
}

type CorrectNumber = {
	isCorrect: true
	type: 'integer' | 'fractional' | 'infinity'
	sign: 'positive' | 'negative' | 'zero'
}

type ZeroNumber = CorrectNumber & {
	type: 'integer'
	sign: 'zero'
	isEven: true
}

type NotZeroNumber = CorrectNumber & {
	sign: 'positive' | 'negative'
}

type InfinityNumber = NotZeroNumber & {
	type: 'infinity'
}

type IntegerNumber = NotZeroNumber & {
	type: 'integer'
	isEven: boolean
	largestDivisor: () => number
}

type FractionalNumber = NotZeroNumber & {
	type: 'fractional' 
	integerPart: number
}

type NumberInfo = IncorrectNumber | InfinityNumber | ZeroNumber | IntegerNumber | FractionalNumber

const numberInfo = (n: number): NumberInfo => {
	if (isNaN(n)) {
		return {
			isCorrect: false
		} satisfies IncorrectNumber
	}

	if (n === 0) {
		return {
			isCorrect: true,
			type: 'integer',
			sign: 'zero',
			isEven: true,
		} satisfies ZeroNumber
	}

	const sign = n > 0 ? 'positive' : 'negative'
	
	if (n === Infinity || n === -Infinity) {
		return {
			isCorrect: true,
			type: 'infinity',
			sign,
		} satisfies InfinityNumber
	}

	const integerPart = Math.trunc(n)

	if (n === integerPart) {
		return {
			isCorrect: true,
			type: 'integer',
			sign,
			isEven: integerPart % 2 === 0,
			largestDivisor: (): number => {
				let largestDivisor = 1;
				for (let i = 2; i <= Math.floor(n); i++) {
					if (Math.floor(n) % i === 0) {
						largestDivisor = i
					}
				}
				return largestDivisor
			},
		} satisfies IntegerNumber
	}
	
	return {
		integerPart,
		type: 'fractional',
		isCorrect: true,
		sign,
	} satisfies FractionalNumber
}

const n = +input('Введите число: ')
const info = numberInfo(n) // NaN

if (info.isCorrect && info.type === 'integer' && info.sign === 'positive'  && info.largestDivisor()) {
	print('Ура')
} else {
	print('Не ура...')
}
