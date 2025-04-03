import { MapDirection, mapDirections } from "./directions"

export type Obstacle = boolean | number // есть ли препятствие или дверь с номером ключа

export const isDoor = (obstacle: Obstacle) => typeof obstacle === 'number'

export type Location = Record<MapDirection, Obstacle> & {
	key?: number
}

export const availableDirections = (location: Location, keys: number[]): MapDirection[] => {
	const directions: MapDirection[] = []

	for (const mapDir of mapDirections) {
		if (!location[mapDir] || isDoor(location[mapDir]) && keys.includes(location[mapDir])) {
			directions.push(mapDir)
		}
	}

  return directions
}
