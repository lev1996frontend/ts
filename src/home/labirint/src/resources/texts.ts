import {
  directionMapToPlayer,
  directionPlayerToMap,
  MapDirection,
  mapDirections,
  PlayerDirection,
  playerDirections
} from '../maze/directions'

import {
  isDoor,
  Location
} from '../maze/location'

import { Player } from '../player'

// TODO: ?
export const translatedMoveDirection = ['прямо', 'назад', 'налево', 'направо'] as const
export type TranslatedMoveDirection = typeof translatedMoveDirection[number]
export const translatedDirections = {
	forward: 'прямо',
	back: 'назад',
	left: 'налево',
	right: 'направо',
} satisfies Record<PlayerDirection, TranslatedMoveDirection>
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

// Move Player

const exit = ' и выходишь из лабиринта'

const doorPassed = (doorIsOpen: boolean): string => {
  return doorIsOpen
    ? ' (проходишь через открытую дверь)'
    : ' (открываешь ключом и проходишь закрытую дверь)'
}

const deadEnd = ' и оказываешься в тупике.'
const fork = ' и выходишь на развилку.'

const keyFound = '\nПод ногами ты находишь ключ.'
const keyFoundStop = ' и под ногами находишь ключ.'

const translatedNextDirections = {
  forward: 'перед тобой',
  left: 'слева',
  right: 'справа',
} satisfies Record<Exclude<PlayerDirection, 'back'>, string>

const passedByClosedDoor = (currentCell: Location, lookDirection: MapDirection): string => {
  let description = ` мимо закрытой двери`

  for (const playerDirection of playerDirections) {
    const direction = directionPlayerToMap(playerDirection, lookDirection)
    if (playerDirection !== 'back' && isDoor(currentCell[direction])) {
      description += ` ${translatedNextDirections[playerDirection]} `
    }
  }

  return description
}

const closedDoorsFound = (currentCell: Location, player: Player): string => {
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

const stepsCase = (stepsForward: number): string => {
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

const forwardSteps = (): string  => {
  return ''
}

const forwardStepsText = (steps: number): string  => {
  let description = ', идешь '
  if (steps > 1) {
    description += `${steps} ${stepsCase(steps)} `
  }
  description += 'прямо'

  return description
}

const turnStep = (direction: 'left' | 'right', repeat: boolean): string => {
  let description = ', '
  if (repeat) {
    description += 'затем снова '
  }
  description += (
    `поворачиваешь ` +
    (direction === "left" ? "налево" : "направо")
  )

  return description
}

const moveBack = ' разворачиваешься назад'

const withStartText = (text: string) => {
  return 'Ты' + text.replace(/^,/, '')
}

export const createDescription = () => {
  let forwardStepsCount = 0

  return new Proxy({
    exit,
    doorPassed,
    deadEnd,
    fork,
    keyFound,
    keyFoundStop,
    passedByClosedDoor,
    closedDoorsFound,
    forwardSteps,
    turnStep,
    moveBack,
    withStartText,
  } satisfies Record<string, string | ((...args: any[]) => string)>, {
    get(target, key) {
      let description = ''

      if (key === forwardSteps.name) {
        forwardStepsCount++
      } else if (forwardStepsCount) {
        description += forwardStepsText(forwardStepsCount)
        forwardStepsCount = 0
      }

      const text = (target as any)[key]

      if (typeof text === 'function') {
        return (...args: any[]) => {
          return description + text(...args)
        }
      }
      return description + text
    }
  })
}
