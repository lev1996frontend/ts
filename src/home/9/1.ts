export {}
/* 1. рандомайзер
Написать функцию randomN, которую можно вызвать тремя вариантами:
randomN(): от 1 до 1_000_000_000
randomN(10): от 1 до 10
randomN(2, 10): от 2 до 10
randomN(-2, 5): от 1 до 5
*/

function randomN(): number
function randomN(max: number): number 
function randomN(min: number, max: number): number 
function randomN(...args: [] | [max: number] | [min: number, max: number]): number {
	if (args.length === 0) {
		return random(1, 1_000_000_000)
	}
	if (args.length === 1) {
		const [max] = args
		// const max = args[0]
		return random(1, max < 1 ? 1 : max)
	}

	const [p1, p2] = args
	const min = p1 < 1 ? 1 : p1
	const max = p2 < min ? min : p2
	return random(min, max)
}

print(randomN()) // TODO: Нужно сделать так, чтобы это было максивальное условие
