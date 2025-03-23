export {}

const numbers = [
  [1,2,3],  // i = 0
  [4,5,6],  // i = 1
  [7,8,9],  // i = 2
]

const fillArr = (size: number): number[][] => {
	const result: number[][] = [] // это общий массив для строк, сюда хочу складывать все строки
	// let count = 1
	for (let i = 0; i < size; i++) {
		const row: number[] = [] // это строка, куда буду складывать текущие элементы
		for (let j = 0; j < size; j++) {
			row[j] = (i * size) + (1 + j)
			// row[j] = count
			// count++
		}
		result[i] = row
	}
	return result
}

console.log({value: fillArr(4)})
