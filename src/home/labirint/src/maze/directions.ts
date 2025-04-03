
export const mapDirections = ['top', 'right', 'bottom', 'left'] as const
export type MapDirection = typeof mapDirections[number]

export const playerDirections = [ 'left', 'forward', 'right', 'back'] as const
export type PlayerDirection = typeof playerDirections[number]

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
