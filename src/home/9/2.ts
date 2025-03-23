export {}
/* 2. объединитель объектов
Написать функцию merge, которая объединяет свойства двух объектов в один большой объект

Пример:
const obj1 = { name: 'Alice' }
const obj2 = { age: 30 }
const user = merge(obj1, obj2) // тип: { name: string, age: number }
*/

function merge <T extends object, U extends object>(obj1: T, obj2: U): T & U {
	return { ...obj1, ...obj2 }
}

const obj1 = { name: 'Alice', test: true }
const obj2 = { age: 30 }

const user = merge(obj1, obj2)

console.log( user.name )
