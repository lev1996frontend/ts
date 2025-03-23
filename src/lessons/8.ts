export {}

type User = {
  name: string
  age: number
}

const numbers = [1, 3, 5]

const users: User[] = [
  {name: 'Alex', age: 23},
  {name: 'Blue', age: 30}
]

const names: string[] = users.map((user) => user.name) 



// Reduce

// console.log({numbers})

const sum = numbers.reduce((counter, n) => {
  // console.log({counter})
  return counter + n
})

// console.log({sum})

const usersNames: string = names.reduce((str, name, i) => {
  if (i === 0) {
		return name
	} 
  return str + ' ' + name
}, '')

// аналог join
const usersNames2: string = names.reduce((str, name2) => str + ' ' + name2)

// console.log({usersNames})

type UsersInfo = {
  names: string[]
  ages: number[]
}

const usersInfo: UsersInfo = users.reduce((info, user) => {
	info.names.push(user.name)
	info.ages.push(user.age)
	return info
}, {
  names: [],
  ages: [],
} as UsersInfo)



// - перегруппировать людей так, чтобы в результате получился объект, где ключ - название улицы, значение - имя:
// улица1: имя1, имя2
// улица2: имя3, имя4
// (выпускаем свидетелей иеговы)

// - вывести кол-во встречающихся имён, распечатать в формате:
// Аня: 2
// Петя: 3
// Вася: 1
// (готовим персонализированную рекламу)



// Сопоставления

type ClassJournal = {
  [key: string]: number | undefined // name -> rating
}

const journal: Record<string, number> = {} // ClassJournal
journal['Tom'] = 5
// print(journal['Tom'])
delete journal['Tom']

print('Tom' in journal ? 'есть' : 'нету')
print(typeof journal['Tom'] !== 'undefined' ? 'есть' : 'нету')

for (const student in journal) {
  // print(`${student} -> ${journal[student]} rating`)
}

const students: string[] = Object.keys(journal)
console.log(students)


// Шаблоны

type Container<T> = {
  value: T
  index: number
}

const studentsNames: Container<string>[] = [
  {
    index: 0,
    value: 'Jerry',
  }
]

const takeValue = <T>(container: Container<T>): T => {
	return container.value
}

const value = takeValue({
  index: 0,
  value: true
})

type SimpleContainer = Container< number | string | boolean | User | Record<string, number> | number[] >

const f = (container: SimpleContainer) => {
	return container.index
}
f({
  index: 0,
  value: []
})


const usersStats = users.reduce((stats, user) => {
	stats[user.name] = user.age
	return stats
}, {} as Record<string, number>)


// Кортежи

const calculate = (numbers: number[]): [number, number] => {
  const min = Math.min(...numbers)
  const max = Math.max(...numbers)
	return [min, max]
}

const [n1, n2] = calculate(numbers)
// print(n1)



