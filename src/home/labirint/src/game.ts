import { InputOutput } from './io/console'
import { SavesFile } from './io/files'
import { MazeGame } from './maze/MazeGame'
import { Player } from './player'
import { map } from './resources/map'
import { parseDirection, translateDirections } from './resources/texts'

export const startGame = async (consoleIO: InputOutput) => {
	const playerName = await consoleIO.input('Ваше имя: ')
	const file = new SavesFile<Player>(playerName)

	const player = await (async (): Promise<Player> => {
		const savedPlayer = await file.read()
		if (savedPlayer) {
			console.log({savedPlayer})

			const choice = await consoleIO.choiceMenu(
				'Начать с места остановки или сначала?',
				['продолжить', 'начать сначала']
			)
			if (choice === 'продолжить') {
				return savedPlayer
			}
		}

		return {
			name: playerName,
			row: map.start.row,
			column: map.start.column,
			lookDirection: map.getStartLookDirection(),
			keys: [],
			doorsOpened: [],
		}
	})()

	const maze = new MazeGame(map, player)

	if (maze.atStart) {
		await consoleIO.print('Добро пожаловать в лабиринт! Попробуй найти выход и не вернуться на старт ;)')
		const movingDescription = maze.movePlayer('forward')

		await file.write(player)

		await consoleIO.print(movingDescription)
	}
	else {
		const availableDirections = maze.getAvailableMoveDirections()

		if (!maze.inMaze) {
			return await consoleIO.print(
				maze.atFinish ?
					'Ты уже нашёл выход из лабиринта и выиграл!' :
					'Ты уже вышел из лабиринта на старте и проиграл!'
			)
		}

		await consoleIO.print(`С возвращением в лабиринт! Ты остановился ${
			availableDirections.length === 1 ? 'в тупике.' :
			availableDirections.length === 2 ? 'посреди коридора.' :
			'на развилке.'
		}`)
	}

  while (true) {
    console.log(maze.locationDescription()) // TODO: remove

		const availableDirections = maze.getAvailableMoveDirections()

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
