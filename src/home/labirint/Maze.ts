import {
  Cell,
  MapDirection,
  MazeMap,
  Obstacle,
  Player,
  PlayerDirection,
  cellAvailableDirections,
  directionMapToPlayer,
  directionPlayerToMap,
  isDoor,
  mapDirections,
  playerDirections,
  reverseDirection,
  stepsCase,
  translatedDirections,
} from './types'

// import * as texts from './texts'

export class OutError extends Error {
	constructor() {
		super('Невозможно переместиться за пределами лабиринта')
	}
}

// dead end, fork, exit, key.
type StepsEvent = 'dead_end' | 'fork' | 'exit' | 'key' | 'open_door' | 'closed_door'

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

	getAvailableMoveDirections(): PlayerDirection[] {
		const currentCell = this.#map.cell(this.#player)

		if (!currentCell) {
			throw new OutError()
		}

		const lookDirection = this.#player.lookDirection
		const availableDirections: PlayerDirection[] = []

    // ?
		const canPass = (obstacle: Obstacle) => (
			!obstacle
			|| isDoor(obstacle) && this.#player.keys.includes(obstacle)
		)

    for (const direction of playerDirections) {
      const mapDirection = directionPlayerToMap(direction, lookDirection)
      const obstacle = currentCell[mapDirection]
      if (canPass(obstacle)) {
        availableDirections.push(direction)
      }
    }

		return availableDirections
	}

	// TODO: перемещение игрока
  movePlayer(moveDirection: PlayerDirection): string {
    // const steps: (PlayerDirection | StepsEvent)[] = [moveDirection]
    // const passedDoors: number[] = []
    let description = 'Ты'

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
        description += exitText
        break
      }

      const backDirection = reverseDirection(nextDirection)

      if (isDoor(currentCell[backDirection])) {
        const door = currentCell[backDirection]
        const doorIsOpen = this.#player.doorsOpened.includes(door)

        if (!doorIsOpen) {
          this.#player.doorsOpened.push(door)
        }

        description += doorPassedText(doorIsOpen)
      }

      const currentDirections = cellAvailableDirections(currentCell, this.#player.keys)

      if (currentDirections.length === 1) {
        description += deadEndText
        if (this.takeKeyIfExists(currentCell)) {
          description += keyFoundText
        }
        description += closedDoorsFoundText(currentCell, this.#player)
        break
      }

      if (currentDirections.length > 2) {
        description += forkText
        if (this.takeKeyIfExists(currentCell)) {
          description += keyFoundText
        }
        description += closedDoorsFoundText(currentCell, this.#player)
        break
      }

			if (this.takeKeyIfExists(currentCell)) {
        description += keyFoundStopText
        description += closedDoorsFoundText(currentCell, this.#player)
				break
			}

      if (hasClosedDoor(currentCell, this.#player)) {
        description += passedByClosedDoorText(currentCell, this.#player.lookDirection)
      }

      const lookDirection = nextDirection

      nextDirection = currentDirections.filter(d => d !== backDirection)[0]!

      const passedDirection = directionMapToPlayer(nextDirection, lookDirection)

      nextDirection += passedDirectionText(passedDirection)
    }

    this.#player.lookDirection = nextDirection

		return description.replace(/((?<=^Ты),)/, '')
	}



	takeKeyIfExists(currentCell: Cell): boolean { // boolean
		if (typeof currentCell.key === 'number') {
			this.#player.keys.push(currentCell.key)
			delete currentCell.key
			return true
		}
		return false
	}

	// TODO: remove
	locationDescription(): string {
		// ...
		return (
			`row = ${this.#player.row}, `+
			`column = ${this.#player.column}, `+
			`look direction = ${this.#player.lookDirection}, `+
			`directions = ${this.getAvailableMoveDirections()}, ` +
			`keys = ${this.#player.keys || 0}`
		)
	}
}

//

const isDoorClosed = (player: Player, door: number) => {
  return !player.keys.includes(door)
}
const hasClosedDoor = (cell: Cell, player: Player) => {
  return mapDirections.some(direction =>
    isDoor(cell[direction])
    && isDoorClosed(player, cell[direction])
  )
}

// TEXT

const exitText = ' и выходишь из лабиринта'

const doorPassedText = (doorIsOpen: boolean): string => {
  return doorIsOpen
    ? ' (проходишь через открытую дверь)'
    : ' (открываешь ключом и проходишь закрытую дверь)'
}

const deadEndText = ' и оказываешься в тупике.'
const forkText = ' и выходишь на развилку.'

const keyFoundText = '\nПод ногами ты находишь ключ.'
const keyFoundStopText = ' и под ногами находишь ключ.'

const translatedNextDirections = {
  forward: 'перед тобой',
  left: 'слева',
  right: 'справа',
} satisfies Record<Exclude<PlayerDirection, 'back'>, string>
// const currentCell = this.#map.cell(this.#player)! // !
const passedByClosedDoorText = (currentCell: Cell, lookDirection: MapDirection): string => {
  let description = ` мимо закрытой двери`

  for (const playerDirection of playerDirections) {
    const direction = directionPlayerToMap(playerDirection, lookDirection)
    if (playerDirection !== 'back' && isDoor(currentCell[direction])) {
      description += ` ${translatedNextDirections[playerDirection]} `
    }
  }

  return description
}

const closedDoorsFoundText = (currentCell: Cell, player: Player): string => {
  let hasDoors = false
  let description = ' '

  for (const direction of mapDirections) {
    if (isDoor(currentCell[direction]) && !player.keys.includes(currentCell[direction])) {
      const doorDirection = directionMapToPlayer(direction, player.lookDirection)
      const translatedDoorDirection = translatedDirections[doorDirection]
      description += (
        translatedDoorDirection.charAt(0).toUpperCase() + translatedDoorDirection.slice(1) +
        ' от тебя' +
        (hasDoors ? ` ещё одна` : '') +
        ` закрытая дверь, от которой у тебя нет ключа.`
      )
      hasDoors = true
    }
  }
  return description
}

// TODO: passedDirectionText

// const forwardStepText = ( index: number): string  => {
//   let stepsForward = 1
//   while (steps[index + 1] === 'forward') {
//     stepsForward++
//     index++
//   }
//   return `, идешь ${stepsForward > 1 ? `${stepsForward} ${stepsCase(stepsForward)} ` : ''}прямо`
// }

// const turnStepText = (index: number, direction: 'left' | 'right'): string => {
//   let description = ', ';
//   if (steps[index - 1] === direction) {
//     description += "затем снова "
//   }
//   return (
//     description +
//     `поворачиваешь ${direction === "left" ? "налево" : "направо"}`
//   )
// }




// for (let i = 0; i < steps.length; i++) {
//   const step = steps[i]!

//   switch(step) {
//     case 'forward':
//       let stepsForward = 1
//       while (steps[i + 1] === 'forward') {
//         stepsForward++
//         i++
//       }
//       description += ', идешь '
//       if (stepsForward > 1) {
//         description += `${stepsForward} ${stepsCase(stepsForward)} `
//       }
//       description += 'прямо'
//       break

//     case 'back':
//       description += ' возвращаешься назад'
//       break

//     case 'left':
//       description += ', '
//       if (steps[i - 1] === 'left') {
//         description += 'затем снова '
//       }
//       description += 'поворачиваешь налево'
//       break

//     case 'right':
//       description += ', '
//       if (steps[i - 1] === 'right') {
//         description += 'затем снова '
//       }
//       description += 'поворачиваешь направо'
//       break
//   }
// }
