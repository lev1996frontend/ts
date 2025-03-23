export {}

// нельзя использовать методы массива

const arr: number[] = new Array(10)

for (let i = 0; i < arr.length; i++) {
	arr[i] = random(0,100)
}

let min = arr[0]!

for (const item of arr) {
	if(item < min) {
		min = item
	}
}	

print(`min = ${min}`)

let max = arr[0]!

for (const item of arr) {
	if(item > max) {
		max = item
	}
}

print(`max = ${max}`)

let odd = ''

for (let i = 0; i < arr.length; i++) {

	const item = arr[i]!

	if (item % 2 === 0) {
		if (odd) {
		odd += ', '
	}
		odd += item 
	} 
}

print(`odd = ${odd}`)

let notOdd = ''

for (let i = 0; i < arr.length; i++) {

	const item = arr[i]!

	if (item % 2 !== 0) {
		if (notOdd) {
		notOdd += ', '
	}
		notOdd += item 
	} 
}

print(`NotOdd = ${notOdd}`)

let sum = 0

for(const item of arr) {
	sum += item
}
console.log(sum)
