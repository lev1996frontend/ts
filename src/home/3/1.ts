export {}

function sum(numOne: number, numTwo: number): number {
	return numOne + numTwo
}
const result = sum(sum(3,5), sum(2,7))
// (3 + 5) + (2 + 7)
print(result)
