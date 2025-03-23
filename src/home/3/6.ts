export {}

function  fillRows(n:number): void {
	let count = 1
	for (let i = 0; i < n; i++) {
		let row = ''
		for(let j = 0; j < n; j++) {
			row += count++ + ' '
		}
		print(row)
	}
}

// fillRows(5)

function  fillColums(n:number): void {
	for (let i = 0; i < n; i++) {
		let row = ''
		for(let j = 0; j < n; j++) {
			row += (i + j * n + 1) + ' '
		}
		print(row)
	}
}

// fillColums(3)

function  fillSnake(n: number): void {
  let count = 1
  for (let i = 0; i < n; i++) {
    let row = ''
    if (i % 2 === 0) {
      // Для четных строк - заполняем слева направо
      for (let j = 0; j < n; j++) {
        row += count++ + ' '
      }
    } else {
      // Для нечетных строк - заполняем справа налево
      for (let j = 0; j < n; j++) {
        row = (count++ + ' ') + row
      }
    }
		print(row)
  }
}

fillSnake(5)

