import { inputFromRange } from "../lib"

// declare const menu: any
export {}
/*
const mainMenu = (contacts: ContactsList) => {
	while(true) {
    console.clear()
		print('Главное меню')
		print('1. новый контакт')
		print('2. просмотреть контакты')
		print('3. найти контакт')
		print('0. выйти')

		const command = +input()
		
		if (command === 1) {
			addContacts(contacts)
		} else if(command === 2) {
			listContacts(contacts)
		} else if (command === 3) {
			findContacts(contacts)
		}
		else if (command === 0) {
			return
		}
	}
}
*/

const menu = (header: string, items: Record<string, () => void>) => {
	while (true) {
		console.clear()
		print(header)
		const itemsString = Object.keys(items)
		for (let i = 0; i < itemsString.length; i++) {
			print(`${i + 1}. ${itemsString[i]}`)
		}
		print('0. выйти')

    const commandIndex = +input()

		if (commandIndex === 0) {
			return 
		}

		const action = items[commandIndex - 1]

    if (action) {
			action()
		}
	}
}

menu('Главное меню', {
  'новый контакт': () => print('addContacts(contacts)'),
  'просмотреть контакты': () => print('listContacts(contacts)'),
  'найти контакт': () => print('findContacts(contacts)'),
})


const names = ['Вася', 'Петя', 'Аня']

export const select = <T>(header: string, sequence: T[]): T | undefined => {
	while(true) {
		console.clear()
		print(header)
		for (let i = 0; i < sequence.length; i++) {
			print(`${i + 1}. ${sequence[i]}`)
		}
		print('0. выйти')
		const command = +input()
		if(command === 0) {
			return
		}
		if(command >= 1 && command <= sequence.length) {
			const printIndex = sequence[command - 1]
			return printIndex
		}
	}
}


const name: string | undefined = select('Выберите имя пользователя', names)
console.log({name})
/*
Выберите имя пользователя
1. Вася
2. Петя
3. Аня
0. отмена
*/

export function select2(arr: unknown[]): number | undefined
export function select2(header: string, arr: unknown[]): number | undefined
export function select2<T extends object>(obj: T): keyof T | undefined
export function select2<T extends object>(header: string, obj: T): keyof T | undefined
export function select2<T extends object>(
	...args: (
		[arr: unknown[]] | [header: string, arr: unknown[]] 
		| [obj: T] | [header: string, obj: T]
	)
) {
	if (args.length === 1) {
		return _select2('', args[0])
	}
	return _select2(args[0], args[1])
}

const _select2 = <T extends object>(header: string, obj: T | unknown[]): keyof T | number | undefined => {
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
				: array[n - 1] as keyof T
		)
		
		// if (Array.isArray(obj)) {
		// 	const n = inputFromRange(0, obj.length, '0 - отмена')
		// 	if(n === 0) {
		// 		return undefined
		// 	}
		// 	return n - 1

 		// } else {
		// 	const keys = Object.keys(obj)
		// 	print(`Ключи: `)
		// 	keys.forEach((key, index) => {
		// 		print(`${index + 1}: ${key}`)
		// 	})
		// 	const n = inputFromRange(0, keys.length, '0 - отмена')
		// 	if (n === 0) {
		// 		return undefined
		// 	}
		// 	return keys[n - 1] as keyof T
		// }
	}
}
