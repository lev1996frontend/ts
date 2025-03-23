/*
Задание 4: безопасные числа

Создать обёртку над объектом, чтобы проверять работу с числами. 
Если присваивается NaN или Infinity, вместо присваивания нужно бросать ошибку. 
Также, нужно делать проверку при чтении, на случай если в объекте уже были некорректные числа. 
Если оборачивается функция, нужно проверять все входящие и возвращаемые числовые параметры при вызове. 
*/

const safeNumbers = <T extends object>(target: T) => {
	const validateNumber = (value: unknown) => {
		if (typeof value === 'number' && !isFinite(value)) {
			throw new Error(`invalid number`)
		}
	}
  return new Proxy(target as Record<keyof any, unknown> & ((...args: unknown[]) => unknown), {
		get(target, p) {
			const value = target[p]
			validateNumber(value)
			return value
		},
		set(target, p, newValue: unknown) {
			validateNumber(newValue)
			target[p] = newValue
			return true
		},
		apply(target, _, args) {
			for (const arg of args) {
				validateNumber(arg)
			}
			const result = target(...args)
			validateNumber(result)
			return result
		},
	}) as T
}

// Примеры

const safeObject = safeNumbers({
  name: "Alice",
  age: 30,
  rating: NaN,
})

safeObject.age = 35 // Работает
console.log(safeObject.age) // 35
// safeObject.age = NaN // Ошибка
// safeObject.age = Infinity // Ошибка
// safeObject.rating // Ошибка

const safeFunction = safeNumbers((n: number) => n ** 2 / n)
console.log(safeFunction(5)) // 5
// safeFunction(NaN) // Ошибка
// safeFunction(0) // Ошибка
