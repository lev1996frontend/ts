export type Header = string | (() => string)

export const menu = (
	...args: (
		[items: Record<string, () => void>] |
		[header: Header, items: Record<string, () => void>]
	)
): void => {
	if(args.length === 1) {
		_menu('', ...args)
	} else {
		_menu(...args)
	}
}

const _menu = (header: Header, items: Record<string, () => void>): void => {
	while (true) {
		console.clear()
		if (header) {
			print(
				typeof header === 'string'
					? header
					: header()
			)
		}
		const itemsString = Object.keys(items)
		for (let i = 0; i < itemsString.length; i++) {
			print(`${i + 1}. ${itemsString[i]}`)
		}
		print('0. выйти')

    const commandIndex = +input()

		if (commandIndex === 0) {
			return 
		}

		const key = itemsString[commandIndex - 1]
		const action = key ? items[key] : undefined

		if (action) {
			console.clear()
			action()
		}
	}
}

export function select(arr: unknown[]): number | undefined
export function select(header: string, arr: unknown[]): number | undefined
export function select<T extends object>(obj: T): keyof T | undefined
export function select<T extends object>(header: string, obj: T): keyof T | undefined
export function select<T extends object>(
	...args: (
		[arr: unknown[]] | [header: string, arr: unknown[]] 
		| [obj: T] | [header: string, obj: T]
	)
) {
	if (args.length === 1) {
		return _select('', args[0])
	}
	return _select(args[0], args[1])
}

const _select = <T extends object>(header: string, obj: T | unknown[]): string | number | undefined => {
	while (true) {
		console.clear()
		
		if (header) {
			print(header)
		}

		const isArray = Array.isArray(obj)
		const array = isArray ? obj : Object.keys(obj)
		if (!isArray) {
			print()
			array.forEach((key, index) => {
				print(`${index + 1}: ${key}`)
			})
			print()
		}
		const n = inputFromRange(0, array.length, {
			message: 'Выберите значение',
			hint: '0 - отмена',
		})
		if (n === 0) {
			return undefined
		}
		console.clear()
		return (
			isArray
				? n - 1
				: array[n - 1] as string
		)
	}
}

export const inputNumber = (header?: string, validation?: (item: number) => boolean | string): number => {
	while (true) {
		const inputStr = input(header)
		const inputNum = +inputStr

		const result = validation?.(inputNum) ?? true

		if (inputStr !== '' && result === true && isFinite(inputNum)) {
			return inputNum
		}
		
		print(
			typeof result === 'string' && result !== ''
				? result
				: 'Введите корректное число!'
		)
	}
}

type RangeOptions = {
	message: string
	showRange: boolean
	hint: string
}

export const inputFromRange = (
	min: number,
	max: number,
	options?: Readonly<Partial<RangeOptions>>
): number => {
	const message = options?.message ?? 'Введите число'
	const showRange = options?.showRange ?? true
	const hint = options?.hint ?? ''
	if (min < max) {
		const text = (
			message +
			`${showRange ? ` от ${min} до ${max}` : ''}`+
			`${hint ? ` (${hint})` : ''}`
		)
		return inputNumber(text, (value) => {
			if(value < min || value > max) {
				return `Error: число должно быть от ${min} до ${max}`
			}
			return true
		})
	}
	throw new Error(`Error: inputFromRange(${min}, ${max})`)
}
