export {}

const randomNumber = random(1, 10)
let answer

do {
	answer = +input('Введите число от 1 до 10:')
	if (answer === randomNumber) {
		print('Вы угадали!')
	} else { 
		print('Не угадали, попробуйте еще раз.')
	}
}
while (answer !== randomNumber)
