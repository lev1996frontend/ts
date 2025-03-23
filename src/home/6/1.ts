export {}

type Point = {
	x: number,
  y: number,
}

const coordinates = (p1: Point, p2: Point) => {
	if (!isFinite(p1.x) && !isFinite(p1.y) || !isFinite(p2.x) && !isFinite(p2.y)) {
		return undefined
	}
	const dx = Math.abs(p1.x) + Math.abs(p1.y)
	const dy = Math.abs(p2.x) + Math.abs(p2.y)
	const actual = dx + dy
	const projections = Math.sqrt(dx ** 2 + dy ** 2)
	return { 
		actual, 
		projections,
	}
}

const x: Point = { x: 1,  y: 2}
const y: Point = { x: 2, y: 3}

const distance = coordinates(x,y)

if (typeof distance === 'undefined') {
	print('Некоррректное значение!') 
} else {
	print(`Прямое расстояние между точками будет: ${distance.actual}`)
	print(`Расстояние по x и y проекциям будет: ${distance.projections}`)
}
