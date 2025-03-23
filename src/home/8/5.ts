export {}
/*
5. Кэш + факториал
Написать функцию, которая вычисляет факториал числа (про факториалы можно почитать). 
Нужно добавить обёртку, которая запоминает последний вызов и берёт результат из кэша, 
если параметр повторяется.

// Пример использования:
const memoizedCalculation = memoize(calculateFactorial)
memoizedCalculation(4) // Вычисляю... 24
memoizedCalculation(4) // 24 (из кэша)
memoizedCalculation(5) // Вычисляю... 120
*/

const calculateFactorial = (quantity: number) => {
	console.log('calculateFactorial')
	if (quantity === 0 || quantity === 1) {
		return 1
	}
	let result = 1
	for (let i = 2; i <= quantity; i++) {
		result *= i
	}
	return result
}

// const memoize = (func: (arg: number) => number) => {
// 	const cache: Record<number, number> = {}
// 	return (arg: number) => { 
// 		if (typeof cache[arg] === 'undefined') {
// 			cache[arg] = func(arg)
// 			print(`Вычисляю... ${cache[arg]}`)
// 		} else {
// 			print(`${cache[arg]} (из кеша)`)
// 		}
// 	}
// }

const memoize = (func: (arg: number) => number) => {
  let cachedValue: number | null = 0
  let lastArg: number | null = 0

  return (arg: number) => {
    if (arg === lastArg) {
      console.log(cachedValue, '(из кеша)')
      return cachedValue
    }
    const result = func(arg)
    console.log('Вычисляю...', result)
    cachedValue = result
    lastArg = arg
    return result
  }
}

const memoize1 = (func: (arg: number) => number) => {
  let cachedValue: number | null = 0
  let lastArg: number | null = 0

  return (arg: number) => {
    if (arg !== lastArg) {
      const result = func(arg)
      console.log('Вычисляю...', result)
      lastArg = arg
      cachedValue = result
    } else {
      console.log(cachedValue, '(из кеша)')
    }
    return cachedValue
  }
}

const memoize2 = (func: (arg: number) => number, storeSize = 1) => {
	const cache: Record<string, number> = {}
	return (arg: number) => { 
		if (typeof cache[arg] === 'undefined') {
			// if (Object.keys(cache).length >= storeSize) {
      //   for (const key in cache) {
			// 		delete cache[key]
      //     break
			// 	 }
      // }

      const keys = Object.keys(cache)
			if (keys.length >= storeSize) {
        const key = keys[0]!
				delete cache[key]
			}

			cache[arg] = func(arg)
			print(`Вычисляю... ${cache[arg]}`)
		} else {
			print(`${cache[arg]} (из кеша)`)
		}
	}
}

// const memoizedCalculation = memoize(calculateFactorial)
const memoizedCalculation = memoize2(n => n ** 2, 5)
memoizedCalculation(4) // Вычисляю... 24
memoizedCalculation(4) // 24 (из кэша)
memoizedCalculation(5) // Вычисляю... 120
memoizedCalculation(4) // Вычисляю... 24
memoizedCalculation(4) // 24 (из кэша)
memoizedCalculation(5) // Вычисляю... 120
memoizedCalculation(5) // Вычисляю... 120
memoizedCalculation(4) // Вычисляю... 24