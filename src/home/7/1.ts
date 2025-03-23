export {}
// 1. Числа
// Создать массив, положить в него 10 случайных чисел от 0 до 100
// Затем вывести:
// - все числа через пробел
// - минимальное и максимальное число
// - сумму чисел
// - количество чётных и нечётных чисел

const arr: number[] = []

for(let i = 0; i < 10; i++) {
	arr.push(random(0, 100))
}

print(arr.join(' '))

const oddArray = arr.filter((i) => i % 2 === 0)
const notOddArray = arr.filter((i) => i % 2 !== 0)
const sum = arr.reduce((arr, i) => arr + i)
print(`Сумма: ${sum}, чётных ${oddArray.length}, нечётных ${notOddArray.length}`)

const numberMaxMin = arr.toSorted((n1, n2) => n1 - n2)
print(`Минимальное число: ${numberMaxMin[0]}, максимальное число: ${numberMaxMin.at(-1)}`)
