export {}
/*
Линейка
Написать программу, которая проверяет, можно ли из трех введенных сторон построить треугольник. 
Условие треугольника: сумма любых двух сторон должна быть больше третьей стороны.
*/

const writeSideOne = +input('Введите сторону один: ') 
const writeSideTwo = +input('Введите сторону два: ')
const writeSideThree = +input('Введите сторону три: ')

if (
	isFinite(writeSideOne) && isFinite(writeSideTwo) && isFinite(writeSideThree) 
	&& writeSideOne > 0 && writeSideTwo > 0 && writeSideThree > 0
) {
	if (
		writeSideThree < (writeSideOne + writeSideTwo) 
		|| writeSideTwo < (writeSideOne + writeSideThree)
		|| writeSideOne < (writeSideTwo + writeSideThree)
	) {
		print('Поздравляю, вы можете построить из этих чисел треугольник') 
	} else {
		print('Вы не можете построить треугольник!')
	}
} else {
	print('Введите корректные числа')
}



