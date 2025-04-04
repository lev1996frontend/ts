import { Player } from '../player'
import { directionMapToPlayer, directionPlayerToMap, mapDirections, PlayerDirection, playerDirections, reverseDirection } from './directions'
import { availableDirections, isDoor, Location, Obstacle } from './location'
import { MazeMap } from './MazeMap'
import { createDescription } from '../resources/texts'

export class OutError extends Error {
	constructor() {
		super('out of maze')
	}
}

export class MazeGame {
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
    const texts = createDescription()

    let description = ''

    let prevDirection: PlayerDirection | undefined

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

      const passedPlayerDirection = directionMapToPlayer(nextDirection, this.#player.lookDirection)

      if (passedPlayerDirection === 'left' || passedPlayerDirection === 'right') {
        description += texts.turnStep(
          passedPlayerDirection,
          prevDirection === passedPlayerDirection
        )
      }
      else if (passedPlayerDirection === 'forward') {
        description += texts.forwardSteps()
      }
      else {
        description += texts.moveBack
      }

      const currentLocation = this.#map.cell(this.#player)

      if (!currentLocation) {
        description += texts.exit
        break
      }

      const backDirection = reverseDirection(nextDirection)

      if (isDoor(currentLocation[backDirection])) {
        const door = currentLocation[backDirection]
        const doorIsOpen = this.#player.doorsOpened.includes(door)

        if (!doorIsOpen) {
          this.#player.doorsOpened.push(door)
        }

        description += texts.doorPassed(doorIsOpen)
      }

      const currentDirections = availableDirections(currentLocation, this.#player.keys)

      if (currentDirections.length === 1) {
        description += texts.deadEnd
        if (this.takeKeyIfExists(currentLocation)) {
          description += texts.keyFound
        }
        description += texts.closedDoorsFound(currentLocation, this.#player)
        break
      }

      if (currentDirections.length > 2) {
        description += texts.fork
        if (this.takeKeyIfExists(currentLocation)) {
          description += texts.keyFound
        }
        description += texts.closedDoorsFound(currentLocation, this.#player)
        break
      }

			if (this.takeKeyIfExists(currentLocation)) {
        description += texts.keyFoundStop
        description += texts.closedDoorsFound(currentLocation, this.#player)
				break
			}

      if (hasClosedDoor(currentLocation, this.#player)) {
        description += texts.passedByClosedDoor(currentLocation, this.#player.lookDirection)
      }

      this.#player.lookDirection = nextDirection

      nextDirection = currentDirections.filter(d => d !== backDirection)[0]!
    }

    this.#player.lookDirection = nextDirection

		return texts.withStartText(description)
	}

	takeKeyIfExists(currentLocation: Location): boolean { // boolean
		if (typeof currentLocation.key === 'number') {
			this.#player.keys.push(currentLocation.key)
			delete currentLocation.key
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
const hasClosedDoor = (cell: Location, player: Player) => {
  return mapDirections.some(direction =>
    isDoor(cell[direction])
    && isDoorClosed(player, cell[direction])
  )
}
