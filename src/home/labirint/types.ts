// есть ли препятствие или дверь с номером ключа
export type Obstacle = boolean | number

export const isDoor = (obstacle: Obstacle) => typeof obstacle === 'number'

export type Cell = Record<MapDirection, Obstacle> & {
	key?: number
}

type Position = {
	row: number
	column: number
}

export type MazeEntries = {
	start: Position
	finish: Position
}
// export type MazeMap = Cell[][] & MazeEntries


type ReadonlyMap = readonly (readonly Cell[])[]

export class MazeMap {
	readonly start: Position
	readonly finish: Position

	readonly #map: ReadonlyMap

	constructor(map: ReadonlyMap, entries: MazeEntries) {
		if (!map[0]?.length) {
			throw new Error('карта пустая')
		}

		this.#map = map
		this.start = entries.start
		this.finish = entries.finish
	}

	cell(position: Position): Cell | null {
		const row = position.row - 1
		const column = position.column - 1

		if (
			row < 0 || row >= this.#map.length ||
			column < 0 || column >= this.#map[0]!.length
		) {
			return null
		}

		return this.#map[row]![column]!

	}

	isStartCell(position: Position) {
		return  position.row === this.start.row && position.column === this.start.column
	}

	isFinishCell(position: Position) {
		return  position.row === this.finish.row && position.column === this.finish.column
	}

}

export const mapDirections = ['top', 'bottom', 'left', 'right'] as const
export type MapDirection = typeof mapDirections[number]

export const playerDirection = [ 'forward', 'back', 'left', 'right'] as const
export type PlayerDirection = typeof playerDirection[number]

export const translatedMoveDirection = ['прямо', 'назад', 'налево', 'направо'] as const
export type TranslatedMoveDirection = typeof translatedMoveDirection[number]

export const reverseDirection = (direction: MapDirection): MapDirection => {
	switch(direction) {
		case "top":
			return "bottom"
		case "bottom":
			return "top"
		case "left":
			return "right"
		case "right":
			return "left"
	}
}

export const translateDirections = (directions: PlayerDirection[]) => {
	return directions.map(dir => translatedDirections[dir])
}

export const parseDirection = (direction: TranslatedMoveDirection): PlayerDirection => {
	for (const key in translatedDirections) {
		const playerDirection = key as PlayerDirection
		if (translatedDirections[playerDirection] === direction) {
			return playerDirection
		}
	}
	throw new Error('Таких направлений нет')
}

export const translatedDirections = {
	forward: 'прямо',
	back: 'назад',
	left: 'налево',
	right: 'направо',
} satisfies Record<PlayerDirection, TranslatedMoveDirection>

export type Player = {
	readonly name: string // может не понадобится
	readonly keys: number[]
	readonly doorsOpened: number[]
	row: number
	column: number
	lookDirection: MapDirection
}

export interface InputOutput {
	input(question?: string): Promise<string>
	print(message?: string): Promise<void>
	close(): void
}

export const directionMapToPlayer = (
	mapDirection: MapDirection,
	lookDirection: MapDirection
): PlayerDirection => {
	switch (lookDirection) {
		case "top": switch (mapDirection) {
			case "top": return 'forward'
			case "bottom": return 'back'
			case "left": return 'left'
			case "right": return 'right'
		}
		case "bottom": switch (mapDirection) {
			case "top": return 'back'
			case "bottom": return 'forward'
			case "left": return 'right'
			case "right": return 'left'
		}
		case "right": switch (mapDirection) {
			case "top": return 'left'
			case "bottom": return 'right'
			case "left": return 'back'
			case "right": return 'forward'
		}
		case "left": switch (mapDirection) {
			case "top": return 'right'
			case "bottom": return 'left'
			case "left": return 'forward'
			case "right": return 'back'
		}
	}
}

export const directionPlayerToMap = (
	playerDirection: PlayerDirection,
	lookDirection: MapDirection
): MapDirection => {
	switch (lookDirection) {
		case "top": switch (playerDirection) {
			case "forward": return 'top'
			case "back": return 'bottom'
			case "left": return 'left'
			case "right": return 'right'
		}
		case "bottom": switch (playerDirection) {
			case "forward": return 'bottom'
			case "back": return 'top'
			case "left": return 'right'
			case "right": return 'left'
		}
		case "left": switch (playerDirection) {
			case "forward": return 'left'
			case "back": return 'right'
			case "left": return 'bottom'
			case "right": return 'top'
		}
		case "right": switch (playerDirection) {
			case "forward": return 'right'
			case "back": return 'left'
			case "left": return 'top'
			case "right": return 'bottom'
		}
	}
}

export const cellAvailableDirections = (cell: Cell, keys: number[]): MapDirection[] => {
	const directions: MapDirection[] = []

	for (const mapDir of mapDirections) {
		if (!cell[mapDir] || isDoor(cell[mapDir]) && keys.includes(cell[mapDir])) {
			directions.push(mapDir)
		}
	}

  return directions
}

export const stepsCase = (stepsForward: number): string => {
	const rigthDigit = stepsForward % 10
	if (rigthDigit === 1) {
		return 'шаг'
	} else if (rigthDigit >= 2 && rigthDigit <= 4) {
		return 'шага'
	} else if (rigthDigit >= 11 && rigthDigit <= 14) {
		return 'шагов'
	}	else {
		return 'шагов'
	}
}

