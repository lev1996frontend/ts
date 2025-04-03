import { MapDirection } from "./maze/directions"

export type Player = {
	readonly name: string // может не понадобится
	readonly keys: number[]
	readonly doorsOpened: number[]
	row: number
	column: number
	lookDirection: MapDirection
}
