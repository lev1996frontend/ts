export {}

const numbers: number[] = new Array(10).fill(0).map(() => random(0,100))
const strings: string[] = new Array(10).fill(0).map(() => String(random(0,100)))

// at
// const value1 = numbers.at(-2)
const at = <T>(arr: T[], index: number): T | undefined => {
	return (
    index >= 0 
      ? arr[index]
      : arr[arr.length + index]
  )
}
// const value2 = at(numbers, 0)
// console.log({value1, value2}, value1 === value2)
// console.log(at(numbers, 2))
// map
const value1: string[] = numbers.map((n, i) => String(n * i))

const map = <T, U>(arr: T[], callback: (item: T, index: number) => U): U[] => {
	const newArr: U[] = []
	newArr.length = arr.length // *
	for(let i = 0; i < arr.length; i++) {
		newArr[i] = callback(arr[i]!, i)
	}
	return newArr
}
const value2: string[] = map(numbers, (n, i) => String(n * i))
// console.log(map(numbers, n => n + ''));

// filter

const filter = <T>(arr: T[], callback: (item: T, index: number) => boolean): T[] => {
	const newFilter: T[] = []
	for(let i = 0; i < arr.length; i++) {
		if (callback(arr[i]!, i)){
			newFilter[newFilter.length] = arr[i]!
		}
	}
	return newFilter
}
// console.log(filter(numbers, n => n % 2 !== 0));

// const filter = <T>(arr: T[], callback: (item: T, index: number) => boolean): T[] => {
// 	const newFilter: T[] = []
// 	newFilter.length = arr.length // *
// 	let newFilterLength = 0
// 	for(let i = 0; i < arr.length; i++) {
// 		if (callback(arr[i]!, i)){
// 			newFilter[newFilterLength] = arr[i]!
// 			newFilterLength++
// 		}
// 	}
// 	newFilter.length = newFilterLength
// 	return newFilter
// }

// const value2: number[] = filter(numbers, (n, i) =>  i > 1 && n !== 0)
// console.log(value2);

strings.indexOf('', 2)


const indexOf = <T>(arr: T[], search: T, searchIndex: number = 0): number => {
	for(let i = searchIndex; i < arr.length; i++) {
		if(search === arr[i]) {
			return i
		}
	}
	return -1
}
console.log(indexOf(numbers, 2, 3))
indexOf(numbers, 12)

// find
const find = <T>(arr: T[], callback: (item: T, index: number) => unknown): T | undefined=> {
	for(let i = 0; i < arr.length; i++) {
		if(callback(arr[i]!, i)) {
			return arr[i]
		}
	}
	return undefined
}
// console.log(find(numbers, n => n % 2 === 0))
// findIndex
const findIndex = <T>(arr: T[], callback: (item: T, index: number) => unknown): number => {
	for(let i = 0; i < arr.length; i++) {
		if(callback(arr[i]!, i)) {
			return i
		}
	}
	return -1
}

// includes

const includes = <T>(arr: T[], item: T): boolean => {
	for(let i = 0; i < arr.length; i++) {
		if(arr[i] === item) {
			return true
		}
	}
	return false
}
// console.log(includes(numbers, 12))
// some

const some = <T>(arr: T[], callback: (item: T, index: number) => boolean): boolean => {
	for(let i = 0; i < arr.length; i++) {
		if(callback(arr[i]!, i)) {
			return true
		}
	}
	return false
}
// console.log(some(numbers, n => n > 50))

// every

const every = <T>(arr: T[], callback: (element: T, index: number) => boolean): boolean => {
	for(let i = 0; i < arr.length; i++) {
		if(!callback(arr[i]!, i)) {
			return false
		}
	}
	return true
}
// console.log(every(numbers, n => n > 0))
// join


const join = (arr: unknown[], separator: string = ','): string => {
	let arrString = ''
	for(let i = 0; i < arr.length; i++) {
		arrString += arr[i]
		if(i < arr.length - 1) {
			arrString += separator
		}
	}	
	return arrString
}
// console.log(join(numbers, ':'))

// push

const push = <T>(arr: T[], ...items: T[]): number => {
	// arr[arr.length] = item
	arr.length += items.length // *
	for(let i = 0; i < items.length; i++) {
		// arr[arr.length] = items[i]!
		arr[arr.length - items.length + i] = items[i]! // *
	}
	return arr.length
}
// console.log(push(numbers, 2,3,41212,2))

// unshift

// 10
// +2
// 12 <- 10, 11 <- 9
const unshift = <T>(arr: T[], ...items: T[]) => {
	arr.length += items.length

	for(let i = arr.length - 1; i >= items.length; i--) {
		arr[i] = arr[i - items.length]!
	}
	for (let i = 0; i < items.length; i++) {
		arr[i] = items[i]!
	}
	// console.log(arr)
	return arr.length
	
}
// console.log(unshift(numbers, 2,3,41212,2,1231))

// console.log(unshift(numbers, 21))
// numbers.unshift(10)
// console.log('unshift 1', numbers)

// unshift(numbers, 20)
// console.log('unshift 2', numbers)


// pop

const pop = <T>(arr: T[]): T | undefined => {
	const lastItem = arr[arr.length - 1]
	arr.length--
	return lastItem
}
console.log(pop(numbers))
// shift

const shift = <T>(arr: T[]): T | undefined => {
	if(arr.length === 0) {
		return undefined
	}
	const firstElement = arr[0]
	for(let i = 0; i < arr.length - 1; i++) {
		arr[i] = arr[i + 1]!
	}
	arr.length--
	return firstElement 
}


// splice


// arr.length 15, startIndex 5, deletedCount 2
// endIndex 7 (не включительно)
// items.length === 3
const splice = <T>(arr: T[], startIndex: number, deletedCount: number, ...items: T[]): T[] => {
	const deleteItems: T[] = []
	
	// delete
	for (let i = startIndex; i < (startIndex + deletedCount); i++) {
		deleteItems[i - startIndex] = arr[i]!
	}
	for(let i = startIndex + deletedCount; i < arr.length; i++) {
		arr[i - deletedCount] = arr[i]!
	}
	arr.length -= deletedCount

	// insert
	arr.length += items.length
	for (let i = arr.length - 1; i >= items.length + startIndex; i--) {
		arr[i] = arr[i - items.length]!
	}
	for (let i = startIndex; i < items.length + startIndex; i++) {
		arr[i] = items[i - startIndex]!
	}
	// console.log(arr)
	return deleteItems
	
}

// numbers.splice() 
// console.log(splice(numbers, 3, 2, 223,224,225))
// slice

// slice(start?: number, end?: number): number[]
const slice = <T>(arr: T[], start: number, end: number) => {
	const newArray = new Array(end - start)

	for(let i = start; i <= end ; i++) {
		newArray[i] = arr[start]
	}
	return newArray
}
// console.log(slice(numbers, 2, 6))
// toSorted * (пузырьковая сортировка) 

const toSorted = <T>(arr: T[]) => {
	const newArr = new Array(arr.length)
	for (let i = 0; i < arr.length; i++) {
		newArr[i] = arr[i]
	}

	for (let i = 0; i < arr.length - 1; i++) {
		for (let j = 0; j < arr.length - 1 - i; j++) {
			if (newArr[j] > newArr[j + 1]) {
				const item = newArr[j]
				newArr[j] = newArr[j + 1]
				newArr[j + 1] = item
			}
		}
	}
	return newArr
}

console.log(toSorted(numbers))

// 5,2,3,1

// 2,2,3,1
// 2,5,3,1

// 2,3,1,5
// 2,1,3,5
// 1,2,3,5


// https://upload.wikimedia.org/wikipedia/commons/c/c8/Bubble-sort-example-300px.gif?20131109191607

// toReversed
// идея правильная, нужно доделать
const toReversed = <T>(arr: T[]): T[] => {
	const newArr = new Array(arr.length)

	for(let i = 0; i < arr.length; i++) {
		newArr[i] = arr[arr.length - 1 - i]
	}
	
	return newArr
}

