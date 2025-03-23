import {
	Cell,
	MazeMap,
	Obstacle,
	Player,
	PlayerDirection,
	cellAvailableDirections,
	directionMapToPlayer,
	directionPlayerToMap,
	reverseDirection,
	translatedDirections,
} from './types'

export class OutError extends Error {
	constructor() {
		super('Невозможно переместиться за пределами лабиринта')
	}
}

export class Maze {
  #map: MazeMap
  #player: Player

	constructor(map: MazeMap, player: Player) {
		this.#map = map
		this.#player = player
	}

	get inMaze(): boolean {
		return !!this.#map.cell(this.#player)
	}

	get atFinish(): boolean {
		return (
			this.#player.row === this.#map.finish.row
			&& this.#player.column === this.#map.finish.column
		)
	}

	get atStart(): boolean {
		return (
			this.#player.row === this.#map.start.row
			&& this.#player.column === this.#map.start.column
		)
	}

	getMoveDirections(): PlayerDirection[] {
		const currentCell = this.#map.cell(this.#player)

		if (!currentCell) {
			throw new OutError()
		}

		const lookDirection = this.#player.lookDirection
		const directions: PlayerDirection[] = []

		const isKey = (obstacle: Obstacle): obstacle is number => typeof obstacle === 'number'
		const canPass = (obstacle: Obstacle) => (
			!obstacle
			|| isKey(obstacle) && this.#player.keys.includes(obstacle)
		)

		const forwardObstacle = currentCell[directionPlayerToMap('forward', lookDirection)]

		if (canPass(forwardObstacle)) {
			directions.push('forward')
		}

		const leftObstacle = currentCell[directionPlayerToMap('left', lookDirection)]

		if (canPass(leftObstacle))  {
			directions.push('left')
		}

		const rightObstacle = currentCell[directionPlayerToMap('right', lookDirection)]

		if (canPass(rightObstacle)) {
			directions.push('right')
		}

		directions.push('back')

		return directions
	}

	// TODO: перемещение игрока
	movePlayer(moveDirection: PlayerDirection): string {
		let description = `Ты идёшь ${translatedDirections[moveDirection]}`

		let stepsForward = 0
		let moves: string[] = []

		let nextDirection = directionPlayerToMap(moveDirection, this.#player.lookDirection)

		while (true) {
			switch (nextDirection) {
				case 'left':
					this.#player.column--
					break
				case 'right':
					this.#player.column++
					break
				case 'top':
					this.#player.row--
					break
				case 'bottom':
					this.#player.row++
					break
			}

			const currentCell = this.#map.cell(this.#player)

			if (!currentCell) {
				description += ' и выходишь из лабиринта.'
				break
			}

			const currentDirections = cellAvailableDirections(currentCell)

			if (currentDirections.length === 1) {
				description += ' и оказываешься в тупике.'
				description += this.takeKeyIfExists(currentCell)
				break
			}

			if (currentDirections.length > 2) {
				description += ' и выходишь на развилку.'
				description += this.takeKeyIfExists(currentCell)
				break
			}

			const backDirection = reverseDirection(nextDirection)
			const lookDirection = nextDirection

			nextDirection = currentDirections.filter(d => d !== backDirection)[0]!

			// TODO: исправить описание текста
			// Ты идёшь 2 шага прямо, поворачиваешь налево, поворачиваешь направо, идёшь 2 шага прямо и выходишь на развилку.
			// Ты поровачиваешь направо, затем снова поворачиваешь направо и оказываешься в тупике.
			// Ты возвращаешься назад,поворачиваешь налево и выходишь на развилку.
			// В комнате ты находишь ключ.

			/*
				Задачи (лучше использовать цикл)
				- прямой путь отмечаем "идёшь" и "возвращаешься"
				- повороты отмечаем "поворачиваешь" и "затем снова поворачиваешь"
				- сворачиваем шаги в направлении прямо

				Пригодится: массив пройденных направлений, ключ подобран (да/нет), завершение (тупик, развилка, выход)
			*/

			// + Ты идёшь прямо, направо, направо, назад и выходишь на развилку.
			// + Ты идёшь направо, направо и оказываешься в тупике.

			const passedDirection = directionMapToPlayer(nextDirection, lookDirection)
			const translatedPassedDirection = translatedDirections[passedDirection]
			if (translatedPassedDirection === 'прямо') {
				stepsForward++
			} else {
				if (stepsForward > 0) {
					description += `, идёшь ${stepsForward} шаг${stepsForward > 1 ? 'а' : ''} `
					stepsForward = 0
				}
			}

			if (moves[moves.length - 1] === translatedPassedDirection) {
				moves[moves.length - 1] = `затем снова поворачиваешь ${translatedPassedDirection}`
		} else {
				moves.push(`поворачиваешь ${translatedPassedDirection}`)
		}

		if(moves.length > 0) {
			description += `, ${moves.join(', ')}`
		}

			description += `, ${translatedPassedDirection}`
		}

		this.#player.lookDirection = nextDirection


		// <-

		// const descriptionArray = description.split(' ')
		// const turnsLeft = description.replaceAll(/налево/g, 'поворачиваешь налево')
		// for (let i = 0; i < descriptionArray.length; i++) {
		// 	// let forwardSteps = 0
		// 	const currentDirection = descriptionArray[i]
		// 	if (currentDirection === 'прямо' && !currentDirection) {
		// 		stepsForward.push(currentDirection)
		// 	}
		// 	if (currentDirection === 'налево' && !currentDirection) {
		// 		turnsLeft
		// 	}
		// 	if (currentDirection === 'направо' && !currentDirection) {
		// 		stepsForward.push(currentDirection)
		// 	}
		// 	if (currentDirection === 'назад' && !currentDirection) {
		// 		stepsForward.push(currentDirection)
		// 	}
		// }

		// if (stepsForward.length > 1) {
		// 	description.replaceAll(/прямо/g, `${stepsForward.length} шага прямо`)
		// }

		return description

	}

	takeKeyIfExists(currentCell: Cell): boolean { // boolean
		if (typeof currentCell.key === 'number') {
			this.#player.keys.push(currentCell.key)
			delete currentCell.key
			return true
		}
		return false
	}
	// takeKeyIfExists(currentCell: Cell): string { // boolean
	// 	if (typeof currentCell.key === 'number') {
	// 		this.#player.keys.push(currentCell.key)
	// 		delete currentCell.key

	// 		return `\nВ комнате ты находишь ключ.`
	// 	}

	// 	return ''
	// }

	// TODO: remove
	locationDescription(): string {
		// ...
		return (
			`row = ${this.#player.row}, `+
			`column = ${this.#player.column}, `+
			`look direction = ${this.#player.lookDirection}, `+
			`directions = ${this.getMoveDirections()}, ` +
			`keys = ${this.#player.keys}`
		)
	}
}
