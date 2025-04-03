import { MapDirection } from "./directions"
import { Location } from "./location"

type ReadonlyMap = readonly (readonly Location[])[]

type Position = {
	row: number
	column: number
}

export type MazeEntries = {
	start: Position
	finish: Position
}

export class MazeMap {
	readonly start: Position
	readonly finish: Position

	readonly #map: ReadonlyMap

	constructor(map: ReadonlyMap, entries: MazeEntries) {
		if (!map[0]?.length) {
			throw new Error('empty map')
		}

		this.#map = map
		this.start = entries.start
		this.finish = entries.finish
	}

	cell(position: Position): Location | null {
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

  // не хватает проверок кординаты
  getStartLookDirection(): MapDirection {
    if (this.start.column === 0) {
      return 'right'
    }

    if (this.start.row === 0) {
      return 'bottom'
    }

    if (this.start.column > this.start.row) {
      return 'left'
    }

    return 'top'
  }
}
