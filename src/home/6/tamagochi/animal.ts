export type AnimalInfo = {
	readonly name: string
	// ...
}

export abstract class Animal {
	readonly name: string
	#isFeed: boolean
	#isSleeping: boolean
	#energyTimer: number

	get isSleeping() {
		return this.#isSleeping
	}
	get isFeed() {
		return this.#isFeed
	}

	constructor(info: AnimalInfo) {
		this.name = info.name
		this.#isSleeping = false
		this.#isFeed = false // изначально голодный
		this.#energyTimer = 0 // таймер равен нулю
	}
	
	eat(): void {
		if (this.#isSleeping) {
			return this.#printSleeping()
		}
		if(this.#isFeed) {
			return print(`${this.name} наелся`)
		}
		this.#energyTimer = random(1, 3) // запас энергии случайно задаётся
		this.#isFeed = true
	}
	
	voice(): void {
		if (this.#isSleeping) {
			return this.#printSleeping()
		} 
		if (this.#energyTimer > 0) {
			this.#energyTimer--
			print(this.voiceMessage)
		} else {
			this.#isFeed = false
			print(`${this.name} проголодался :( будь человеком, накорми!`)
		}
	}

	sleep(): void {
		this.#isSleeping = true
		this.#printSleeping()
	}

	abstract readonly voiceMessage: string
	
	#printSleeping(): void {
		print(`${this.name} спит`)
	}
}


export class Cat extends Animal {
	get voiceMessage(): string {
		const randomVoice = random(0, 2) >= 1 ? `Meow))`: 'RRrrrrrr - rrrrr'
		return (
			this.isFeed 
				? `${this.name} издаёт ${randomVoice}` 
				: 'Быть или не быть??'
		)
	}
}


export class Dog extends Animal {
	get voiceMessage(): string {
		const randomVoice = random(0, 2) >= 1 ? 'Aww-awwww))' : 'RRrrrrrr - rrrrr'
		return (
			this.isFeed 
				? `${this.name} издаёт ${randomVoice}` 
				: 'Приносит тапочки хозяину'
		)
	}
}	
