export {}

/* 3. Сделать функции memoize и debounce, чтобы они работали с любыми функциями с любыми параметрами

Пример
const memoizedCalculation = memoize((a: string, b: string) => a + b)
memoizedCalculation('Hello', '!') // Вычисляю... Hello!
memoizedCalculation('Hello', '!') // Hello! (из кэша)
*/

type Cache<A extends unknown[], R> = {
	keys: A
	value: R
}

const memoize = <A extends unknown[], R>(func: (...args: A) => R, size: number = 1) => {
	const cache: Cache<A, R>[] = []
	return (...args: A): R => {
		const memory = cache.find(({keys}) => keys.every((p, i) => p === args[i]))
		
		if (memory) {
			console.log(`Кэш`, memory.value)
			return memory.value
		}

		if (cache.length >= size) {
			cache.unshift()
		}

		const value = func(...args)

		console.log(`Вычислено`, value)

		cache.push({
			keys: args,
			value,
		})

		return value
	}
}

const memoizedCalculation = memoize(
	(a: string, b: string) => a + b,
	3
)
const v = memoizedCalculation('Hello', '!') // Вычисляю... Hello!
memoizedCalculation('Hello', '!') // Hello! (из кэша)