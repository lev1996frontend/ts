export {}
// Задание 5.

const s0: number = +input('Введите начальную координату (s0): ')
const v0: number = +input('Введите начальную скорость (v0): ')
const a: number = +input('Введите ускорение (a): ')
const t: number = +input('Введите время (t): ')

const finalPosition = s0 + (v0 * t) + ((a * t**2) / 2)
const formattedFinalPosition = Math.round(finalPosition * 100) / 100

print(`Позиция через ${t} секунд: ${formattedFinalPosition}`)
