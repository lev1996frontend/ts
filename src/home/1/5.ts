export {}

const s0 = +input(`Введите начальную координату: `)
const v0 = +input(`Введите начальную скорость: `)
const a = +input(`Введите ускорение: `)
const t = +input(`Введите время: `)

const calculate = (s0 + v0 * t) + (a * t**2 * 0.5 )
print(Math.round(calculate * 100) / 100)

