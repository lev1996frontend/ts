export {}

// const createCount = () => {
// 	let count = 0

// 	return () => {
// 		count++
// 	}
// }

const createCount = (): (() => number) => {
	let count = 0

	return () => {
		count++
		return count
	}
}

const counter = createCount()
const counter2 = createCount()
const n = counter()
print(n)
print(counter())
print(counter())

counter2()
print(counter2()) // 2

print(counter()) // 4
