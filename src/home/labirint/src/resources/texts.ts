import {
  directionMapToPlayer,
  directionPlayerToMap,
   MapDirection,
   mapDirections,
   PlayerDirection,
   playerDirections
  } from '../maze/directions';
import {
  isDoor,
  Location
} from '../maze/location';
import { Player } from '../player';


// Move Player

export const exit = ' и выходишь из лабиринта'

export const doorPassed = (doorIsOpen: boolean): string => {
  return doorIsOpen
    ? ' (проходишь через открытую дверь)'
    : ' (открываешь ключом и проходишь закрытую дверь)'
}

export const deadEnd = ' и оказываешься в тупике.'
export const fork = ' и выходишь на развилку.'

export const keyFound = '\nПод ногами ты находишь ключ.'
export const keyFoundStop = ' и под ногами находишь ключ.'

const translatedNextDirections = {
  forward: 'перед тобой',
  left: 'слева',
  right: 'справа',
} satisfies Record<Exclude<PlayerDirection, 'back'>, string>

export const passedByClosedDoor = (currentCell: Location, lookDirection: MapDirection): string => {
  let description = ` мимо закрытой двери`

  for (const playerDirection of playerDirections) {
    const direction = directionPlayerToMap(playerDirection, lookDirection)
    if (playerDirection !== 'back' && isDoor(currentCell[direction])) {
      description += ` ${translatedNextDirections[playerDirection]} `
    }
  }

  return description
}

export const translatedMoveDirection = ['прямо', 'назад', 'налево', 'направо'] as const

export type TranslatedMoveDirection = typeof translatedMoveDirection[number]

export const translatedDirections = {
	forward: 'прямо',
	back: 'назад',
	left: 'налево',
	right: 'направо',
} satisfies Record<PlayerDirection, TranslatedMoveDirection>

export const closedDoorsFound = (currentCell: Location, player: Player): string => {
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

export const forwardSteps = (steps: number): string  => {
  let description = ', идешь '
  if (steps > 1) {
    description += `${steps} ${stepsCase(steps)} `
  }
  description += 'прямо'

  return description
}

export const turnStep = (direction: 'left' | 'right', repeat: boolean): string => {
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

