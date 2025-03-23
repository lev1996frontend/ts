export {}

const heigthTriangle = +input('введите высоту треугольника: ')

if (heigthTriangle <= 5) {
	for (let i = 0; i < heigthTriangle; i++) {
		let line = '' 
		
		for (let j = 0; j <= i; j++) {
			line += (i + j + 1)
		}
		
		print(line)
	}
} else {
	print('Для получения равнобедренного треугольника введите число 5 или меньше.')
}
