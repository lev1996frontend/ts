import readline from 'node:readline'

import { InputOutput } from './types'


export class ConsoleInputOutput implements InputOutput {
	readonly #terminal: readline.Interface

	constructor()	{
		this.#terminal = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		})
	}

	async print(message: string = ''): Promise<void> {
		this.#terminal.write(message + '\n')
	}

	input(question: string = ''): Promise<string> {
		return new Promise((resolve) => {
			this.#terminal.question(question, (answer) => {
				resolve(answer)
			})
		})
	}

	async choiceMenu<TChoice extends string>(
		question: string,
		choice: readonly TChoice[]
	): Promise<TChoice> {
		const formattedChoice = choice.map((variant, index) => {
			return `${index + 1}. ${variant}`
		})

		while(true) {
			const answer = await this.input(
				`${question}\n`+
				`${formattedChoice.join('\n')}\n`+
				`Выберите номер: `
			)

			const index = Number(answer)
			if (isFinite(index) && index > 0 && index <= choice.length) {
				return choice[index - 1]!
			}

			await this.print('Ошибка!')
		}
	}

	close(): void {
		this.#terminal.close()
	}
}

class TelegramOutputInput implements InputOutput {
	print(message?: string): Promise<void> {
		throw new Error('not implemented')
	}
	input(question?: string): Promise<string> {
		throw new Error('not implemented')
	}
	close(): void {
		throw new Error('not implemented')
	}
}
