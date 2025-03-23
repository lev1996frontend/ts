export {}
// 2. Жилой комплекс
// Сперва для всех следующих заданий создай массив с пользователями (штук 10): 
// - имя (должны иногда повторяться)
// - возраст (10..40)
// - пол (м/ж - логично)
// - женат/неженат
// - список любимых книг (массив строк)
// - адрес (название улицы и номер дома, улицы должны иногда повторяться)

// Дальше собираем информацию о жителях:
// - вывести кол-во холостяков 18+ (будем рекламировать сайты для взрослых)
// - определить, все ли наши жители имеют любимые книги в списке (планируем строить кижный клуб)
// - проверить, есть ли любители учебников по программированию (будем впаривать курсы)
// - убрать чела по имени Вася (он мне по-крупному задолжал)
// - посчитать средний возраст (собираем статистику для пенсионного фонда)
// - вернуть Васю обратно (пора откопать, он обещал исправиться)
// - поставить за Васей Петю (будет за ним присматривать)

// - отсортировать жителей по имени в обратном порядке, распечатать в формате:
// Яна: замужем
// Юля: не замужем
// Генадий: женат
// Анатолий: не женат
// (список продадим в программу "давай поженимся")

type Person = {
	name: string
	age: number
	gender: 'M' | 'Ж'
	married: boolean
	books: string[]
	address: {
		street: string
		house: number
	}
}

const persons: Person[] = [
	{ 
		name: 'Алексей', 
		age: 25, 
		gender: 'M', 
		married: false, 
		books: ['1984', 'Учебник по программированию для чайников', 'Неделя занятий по программированию и ты сеньор'], 
		address: { street: 'Ленина', house: 12 } 
	},
	{ 
		name: 'Мария', 
		age: 30, 
		gender: 'Ж', 
		married: true, 
		books: ['Гордость и предубеждение', 'Убить пересмешника'], 
		address: { street: 'Пушкина', house: 5 } 
	},
	{ 
		name: 'Алексей', 
		age: 28, 
		gender: 'M', 
		married: true, 
		books: ['Над пропастью во ржи'], 
		address: { street: 'Ленина', house: 12 } 
	},
	{ 
		name: 'Ольга', 
		age: 22, 
		gender: 'Ж', 
		married: false, 
		books: ['Маленький принц', 'Собачье сердце'], 
		address: { street: 'Пушкина', house: 8 } 
	},
	{ 
		name: 'Геннадий', 
		age: 35, 
		gender: 'M', 
		married: false, 
		books: ['Война и мир'], 
		address: { street: 'Ленина', house: 15 } 
	},
	{ 
		name: 'Вася', 
		age: 27, 
		gender: 'Ж', 
		married: false, 
		books: [], 
		address: { street: 'Садовая', house: 3 } 
	},
	{ 
		name: 'Анатолий', 
		age: 40, 
		gender: 'M', 
		married: false, 
		books: ['451 градус по Фаренгейту'], 
		address: { street: 'Пушкина', house: 5 } 
	},
	{ 
		name: 'Елена', 
		age: 33, 
		gender: 'Ж', 
		married: true, 
		books: ['Три товарища'], 
		address: { street: 'Садовая', house: 10 } 
	},
	{ 
		name: 'Петя', 
		age: 29, 
		gender: 'M', 
		married: true, 
		books: ['Мастер и Маргарита'], 
		address: { street: 'Ленина', house: 12 } 
	},
	{ 
		name: 'Светлана', 
		age: 31, 
		gender: 'Ж', 
		married: false, 
		books: ['Гарри Поттер'], 
		address: { street: 'Садовая', house: 4 } 
	}
]


const noMarried: Person[] = persons.filter((male) => (
	male.gender === 'M' 
	&& !male.married
	&& male.age >= 18
))

const noMarriedNames = noMarried.map((person) => person.name).join(', ')
print(`Холостяки: ${noMarriedNames}`)

const allLoveBooks = persons.every((person) => person.books.length !== 0)
print(`Все любят книги: ${allLoveBooks ? 'да' : 'нет'}`)

const haveLoveProgramBooks = persons.some((person => 
	// person.books.includes('JavaScript') || person.books.includes('C++')
	person.books.some(
		book => book.includes('программированию'))
	)
)
print(`Есть любители книг по программированию: ${haveLoveProgramBooks ? 'да' : 'нет'}`)

const deleteVasyaIndex = persons.findIndex((firstName) => firstName.name === 'Вася')

const deletedPersons: Person[] = (
	(deleteVasyaIndex !== -1)
		? persons.splice(deleteVasyaIndex, 1)
		: []
)

// console.log(persons.map((person) => person.name))

const averageAge = persons.reduce((sum, people) => sum + people.age, 0) / persons.length
const resultAverageAge = Math.floor(averageAge)
print(`Средний возраст: ${resultAverageAge}`)


const vasya: Person | undefined = deletedPersons[0]

if (vasya) {
	const petya: Person = {
		name: 'Петя', 
		age: 29, 
		gender: 'M', 
		married: true, 
		books: ['Мастер и Маргарита'], 
		address: { street: 'Ленина', house: 12 } 
	}
	
	const updateTodo = persons.splice(deleteVasyaIndex, 0, vasya, petya)
}

// console.log(persons.map((person) => person.name))

// 'женат' | 'не женат' | 'замужем' | 'не замужем'
print()
print(
	persons
		.map(person => 
			`${person.name}: ` + (
				person.gender === 'Ж' 
					? (person.married ? 'замужем' : 'не замужем')
					: (person.married ? 'женат' : 'не женат')
			)
		)
		.toSorted()
		.toReversed()
		.join('\n')
)
print()


const personStreet = persons.reduce(
	(accumulator, currentValue) => {
		const street = currentValue.address.street
		if(!accumulator[street]) {
			accumulator[street] = []
		}
		accumulator[street].push(currentValue.name)
		return accumulator
	}, {} as Record<string, string[]>)

console.log({personStreet})

const arrNames = persons.reduce(
	(acc, currVal) => {
		const name = currVal.name
		if(!acc[name]) {
			acc[name] = 0
		} 
		acc[name]++
		return acc
	}, {} as Record<string, number>
)
console.log({arrNames})
