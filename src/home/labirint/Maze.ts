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
	reverseDirection,
	stepsCase
} from './types'

export class OutError extends Error {
	constructor() {
		super('Невозможно переместиться за пределами лабиринта')
	}
}

// dead end, fork, exit, key.
type StepsEvent = 'dead_end' | 'fork' | 'exit' | 'key' | 'closed_door'

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

		const isKey = (obstacle: Obstacle) => typeof obstacle === 'number'
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
    const steps: (PlayerDirection | StepsEvent)[] = [moveDirection]

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
        steps.push('exit')
        break
      }

      const currentDirections = cellAvailableDirections(currentCell)

			/*
				- пройти мимо или подходить к закрытой двери (добавить к маршруту)
				- пройти через доступную дверь первый или не первый раз (добавить к маршруту)
				-
			*/

			if (hasDoor(currentCell)) {
				steps.push('door')
			}

      if (currentDirections.length === 1) {
        steps.push('dead_end')
        if (this.takeKeyIfExists(currentCell)) {
          steps.push('key')
        }
        break
      }

      if (currentDirections.length > 2) {
        steps.push('fork')
        if (this.takeKeyIfExists(currentCell)) {
          steps.push('key')
        }
        break
      }

			if (this.takeKeyIfExists(currentCell)) {
				steps.push('key')
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
      // const translatedPassedDirection = translatedDirections[passedDirection]
      steps.push(passedDirection)

    } // while end

    this.#player.lookDirection = nextDirection

    let description = 'Ты'

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i]!

      switch(step) {
        case 'forward':
          let stepsForward = 1
          while (steps[i + 1] === 'forward') {
            stepsForward++
            i++
          }
          description += ', идешь '
          if (stepsForward > 1) {
            description +=  `${stepsCase(stepsForward)} ` // TODO: stepsCase(stepsForward)
				}
          description += 'прямо'
          break

        case 'back':
          description += ' возвращаешься назад'
          break

        case 'left':
          description += ', '
          if (steps[i - 1] === 'left') {
            description += 'затем снова '
          }
          description += 'поворачиваешь налево'
          break

        case 'right':
          description += ', '
          if (steps[i - 1] === 'right') {
            description += 'затем снова '
          }
          description += 'поворачиваешь направо'
          break

        case 'closed_door':
          // TODO
          const currentCell = this.#map.cell(this.#player)

          if (!currentCell) {
            throw new Error('неожиданный выход из лабиринта')
          }

          const isDoor = (obstacle: Obstacle) => (
            typeof obstacle === 'number'
          )

          if (isDoor(currentCell.top)) {
            const positionPlayer = nextDirection

            // 1. перевести положение двери с взгляда сверху на взгляд игрока
            // 2. перевести направление на русский
            // 3. приклеить постоянный текст
          }

          // закрытая дверь, от которой у тебя нет ключа.

          // switch (currentCell) {

          //   case 'bottom':
          //     description += 'Слева от тебя {ещё одна} закрытая дверь, от которой у тебя нет ключа.'
          //     break
          //   case 'right':
          //     description += 'Cправа от тебя закрытая дверь, от которой у тебя нет ключа.'
          //     break
          //   case 'top':
          //     description += 'Перед тобой закрытая дверь, от которой у тебя нет ключа.'
          //     break
          //   }

          // (Перед тобой/Сбрава/Слева от тебя) закрытая дверь, от которой у тебя нет ключа.
          break

        case 'dead_end':
          description += ' и оказываешься в тупике.'
          break
        case 'fork':
          description += ' и выходишь на развилку.'
          break
        case 'exit':
          description += ' и выходишь из лабиринта'
          break

        case 'key':
          description += `\nПод ногами ты находишь ключ.`
          break
      }
    }
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
			`directions = ${this.getMoveDirections()}, ` +
			`keys = ${this.#player.keys}`
		)
	}
}

