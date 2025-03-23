import { inputFromRange, inputNumber, menu, select } from "../lib"


export {}

/* 5: база данных (на рекурсии)
Нужно создать консольное приложение, которое позволяет вносить или удалять значения типов: число, строка, логический, объект-сопоставление, массив. Значения можно просматривать, если ввести его ключ. Если выбрано простое значение, оно сразу отображается. Если выбран объект, показывается список ключей через запятую и предлагается ввести выбор. Если выбран массив, показывается количество элементов и предлагается ввести номер.
*/

type Value = SimpleValue | ArrayValue | ObjectValue
type SimpleValue = number | string | boolean
type ArrayValue = Value[]
type ObjectValue = {
	[key in string]: Value
}

/*
Object
  [количество ключей]
  просмотреть список ключей
  посмотреть значение (по ключу)
	добавть
	удалить
	изменить (значение)
	переименовать (изменить ключ*)
*/

/*
Array
  [количество элементов]
  посмотреть значение (по индексу)
	добавть
	удалить
	изменить значение по индексу
	переместить
*/

const objectMenu = (database: ObjectValue) => {
	menu(() => `Количество ключей: ${Object.keys(database).length}`, {
		'посмотреть значение': () => {
			const selectedKey = select(`Выберите ключ `, database)
			if (!selectedKey) {
				return
			}
			const value = database[selectedKey]!
			seeValue(value)
		},
		'добавить': () => {
			const newKey = input(`Введите ключ: `)
			if (!newKey) {
				return
			}
			if (newKey in database) {
				print(`Такой ключ уже существует`)
				input()
				return
			}
			const value = inputValue()
			if (typeof value !== 'undefined') {
				database[newKey] = value
			}
		},
		'изменить': () => {
			const change = select('Что изменить? ', database)
			if(!change) {
				return
			}
			const value = inputValue()
			if(typeof value !== 'undefined') {
				database[change] = value
			}
		},
		'переименовать': () => {
			const oldKey = select(`Что переименовать?`, database)
			if(!oldKey) {
				return
			}
			const newKey = input(`Введите новый ключ: `)
			if(!newKey || newKey === oldKey) {
				return
			}
			
			const keys = Object.keys(database)
			const index = keys.findIndex((key) => key === oldKey)
			
			database[newKey] = database[oldKey]!
			delete database[oldKey]
			
			for (let i = index + 1; i < keys.length; i++) {
				const key = keys[i]!
				const value = database[key]!
				delete database[key]
				database[key] = value
			}
		},
		'удалить': () => {
			const delKey = select(`Что удалить?`, database)
			if (!delKey) {
				return
			}
			delete database[delKey]
		},
	})
}

const arrayMenu = (database: ArrayValue) => {
	const keysCount = database.length
	const arrMenu = menu(`Количество значений: ${keysCount}`, {
		'посмотреть значение': () => {
			const selectedKey = select(`Выберите элемент списка`, database)
			if (!selectedKey) {
				return
			}
			const value = database[selectedKey]!
			seeValue(value)
		},
		'добавить': () => {
			const change = {
				'В начало': 'unshift',
				'По индексу': 'splice',
				'В конец': 'push',
			} as const
			const listChange = select(`Выберите куда хотите поместить элемент`, change)
			if(typeof listChange === 'undefined') {
				return
			}
			
			const value = inputValue()
			if (typeof value === 'undefined') {
				return
			}

			switch(change[listChange]) {
				case 'unshift':
					return database.unshift(value)
				case 'splice':
					const index = inputFromRange(0, database.length)
					return database.splice(index,0,value)
				case 'push':
					return database.push(value)
			}
		},
		'изменить': () => {
			const change = select(`изменить значение`, database)
			if(typeof change === 'undefined'){
				return
			}
			const value = inputValue()
			if (typeof value !== 'undefined') {
				database[change] = value
			}
		},
		'удалить': () => {
			const index = select(`Удалить элемент №`, database)
			if (index === undefined) {
				return
			}
			database.splice(index, 1)
		},
	})
}

const inputValue = (): Value | undefined => {
	const typesVariants = {
		'число': 'number',
		'строка': 'string',
		'переключатель': 'boolean',
		'папка': 'object',
		'список': 'array',
	} as const
	const choice = select(`Выберите тип данных`, typesVariants)
	if (typeof choice === 'undefined') {
		return
	}

	switch(typesVariants[choice]) {
		case 'string':
			return input('Введите значение: ')
		case 'object':
			return {}
		case 'array':
			return []
		case 'number':
			return inputNumber('Введите число: ')
		case 'boolean':
			const typeBool = {
				'включен' : 'true',
				'выключен' : 'false',
			} as const
			const choice = select('Выберите значение', typeBool)
			if (typeof choice === 'undefined') {
				return
			}
			const inputBool = typeBool[choice]
			switch(inputBool) {
				case 'true': 
					return true
				case 'false': 
					return false
			}
	}
}

objectMenu({
	n: 123,
	f: false, // flag
	arr: ['a', 'b', 'c', ['a', 'b']],
	obj: {
		arr: ['a', 'b', 'c'],
	},
})

const seeValue = (value: Value): void => {
	if (typeof value === 'object') {
		if(Array.isArray(value)) {
			arrayMenu(value)
		} else {
			objectMenu(value)
		}
	} else {
		print(`${value}`)
		input()
	}
}
	
// const objValueSee = Object.values(database)// просмотреть список ключей
// const getValue = ( key: string, obj: ObjectValue) => {
// 	return database !== undefined ? database[key] : null
// }
// const removeDatabase = (key: string, obj: ObjectValue) => {
// 	delete database[key]
// }
// const objClone = Object.assign(database, next)


// const arrayMenu = (databaseArray: ArrayValue) => {
// 	const arrMenu = menu(databaseArray,'Количество ключей')

// 	const findElement = (element: Value) => {
// 		databaseArray.findIndex((i) => i === element)
// 	}
// 	const addElement = (element: number) => databaseArray.push(element)
// 	const deleteElement = (index: number) => databaseArray.splice(index, 1)
	
// }