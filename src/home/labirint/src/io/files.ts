import fs from 'node:fs/promises'
import path from 'node:path'

const savesDir = path.resolve(__dirname, `../../saves`)

export class SavesFile<T> {
	readonly #filePath: string
	constructor (playerName: string) {
		this.#filePath = path.resolve(savesDir, `${playerName}.json`)
	}

	async read(): Promise<T | null> {
		try {
			const json = await fs.readFile(this.#filePath, 'utf8')
			const data = JSON.parse(json)
			return data
		} catch (error) {
			return null
		}
	}

	async write(data: T): Promise<void> {
		try {
			const json = JSON.stringify(data, null , 2)
			await fs.writeFile(this.#filePath, json)
		} catch (error) {
			console.error(`Ошибка при записи в файл ${this.#filePath}`)
			throw error
		}
	}
}
