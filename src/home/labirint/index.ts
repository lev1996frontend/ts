import { startGame } from './src/game'
import { ConsoleInputOutput } from './src/io/console'

const consoleIO = new ConsoleInputOutput()
startGame(consoleIO)
