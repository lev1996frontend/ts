export {}

/*
5. парсер чисел
Написать функцию, которая принимает строку, где данные разделены запятыми.
Если строка пуста, выбрасывается ошибка: "Строка пуста".
Если хотя бы один элемент строки не удается преобразовать в число, выбрасывается ошибка с указанием номера неправильного значения.
Нужно словить ошибку преобразования и подчеркнуть первый неправильный элемент, например (_ считается пробелом):
1, 2, asd, 4, dsa
      ~~~
*/

abstract class ParseError extends Error {
	constructor(message: string) {
		super(message)
	}
}

class ParseEmptyStringError extends ParseError {
	constructor() {
		super('Строка пуста!')
	}
}

class ParseItemError extends ParseError {
	readonly source: string[]
	readonly index: number
	constructor(source: string[], index: number) {
		const underline = '  '.repeat(index + 1) + '~'.repeat(source[index]!.length)
		super(
			`Неправильный элемент ${source[index]} на позиции ${index + 1}:\n`+
			`${source.join(', ')}\n`+
			`${underline}`
		)
		this.source = source
		this.index = index
	}
}

const parserNumber = (str: string): number[] => {
	if (!str) {
		throw new ParseEmptyStringError()
	}
	const items = str.split(',').map(element => element.trim())
	for (let i = 0; i < items.length; i++) {
		const num = Number(items[i])
		if (isNaN(num) && items[i]) {
			throw new ParseItemError(items, i)
		}
	}
	return items.map(Number)
}

try {
	parserNumber('1, 2, asd, 4, dsa')
} catch (error) {
	if (error instanceof ParseError) {
		console.error(error.message)
	} else {
		console.error(error)
	}
}

/*
Error: Неправильный элемент asd на позиции 3:
1, 2, asd, 4, dsa
      ~~~
*/