export {}
// TODO
// 3 + 5 = 8
// 99 + 23 = 1
// end

while (true) {
	const randomNumberOne = random(1, 99)
	const randomNumberTwo = random(1, 99)

	const enterNumber = +input(`${randomNumberOne} + ${randomNumberTwo} = `)
	const resultNumber = randomNumberOne + randomNumberTwo
	
	if (resultNumber === enterNumber) {
		print('Давай еще по одной')
	} else {
		print('Больше не наливаем')
		break
	}
}
