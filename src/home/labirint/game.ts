import { SavesFile } from './files'
import { ConsoleInputOutput } from './io'
import { map } from './map'
import { Maze } from './Maze'
import { parseDirection, Player, translateDirections } from './types'

export const startGame = async () => {
	const consoleIO = new ConsoleInputOutput()

	const playerName = 'Лев' // await consoleIO.input('Ваше имя: ')
	const file = new SavesFile<Player>(playerName)

	const player = await (async (): Promise<Player> => {
		// const savedPlayer = await file.read()
		// if (savedPlayer) {
		// 	const choice = await consoleIO.choiceMenu(
		// 		'Начать с места остановки или сначала?',
		// 		['продолжить', 'начать сначала']
		// 	)
		// 	if (choice === 'продолжить') {
		// 		return savedPlayer
		// 	}
		// }
		return { name: playerName, row: 10, column: 1, lookDirection: 'right', keys: [] }
		// TODO: row и column вычислять автоматически
		// TODO: lookDirection вычислять автоматически
	})()

	const maze = new Maze(map, player)

	if (maze.atStart) { // TODO: определить, что мы начинаем на старте
		// TODO: moveDirection вычислять автоматически
		const movingDescription = maze.movePlayer('forward')

		await file.write(player)

		await consoleIO.print(movingDescription)
	}

  while (true) {
    await consoleIO.print(maze.locationDescription()) // TODO: remove

		const availableDirections = maze.getMoveDirections()

		const translatedChooseDirection = await consoleIO.choiceMenu(
			'Куда пойдёшь дальше?',
			translateDirections(availableDirections)
		)

		const chooseDirection = parseDirection(translatedChooseDirection)

		const movingDescription = maze.movePlayer(chooseDirection)

		await file.write(player)

		await consoleIO.print(movingDescription)

		if (!maze.inMaze) {
			break
		}
  }

	if (maze.atFinish) {
		await consoleIO.print('Поздравляю, ты выиграл и прошёл лабиринт!')
	} else {
		await consoleIO.print('Ты вышел из лабиринта на старте и проиграл...')
	}

	consoleIO.close()
}
