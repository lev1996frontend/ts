export {}
// TODO: 20+
const sheep = (count: number): string => {
	const rightDigit = count % 10
	if (count >= 11 && count <= 14) {
		return 'овец'
	}
	else if (rightDigit === 1) {
		return 'овца'
	}
	else if (rightDigit >= 2 && rightDigit <= 4) {
		return 'овцы'
	}
	else {
		return 'овец'
	}
}

const quantity = +input(`Введите, до скольки овец считаем: `)

let count = 1

const interval = setInterval(() => {
	print(`${count} ${sheep(count)}`)
	if (count === quantity) {
		clearInterval(interval)
		print('Засыпаем')
	} else {
		count++
	}
}, 1000)
