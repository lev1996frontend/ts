import { Player } from './../src/player';
import { MazeMap } from '../src/maze/MazeMap'

import { MazeGame } from '../src/maze/MazeGame';
import { ConsoleInputOutput, InputOutput } from '../src/io/console'
import { startGame } from '../src/game'

// console.log(sum(1, 2))

class Exit extends Error {}

const input = [
  'A',
  '2',
]

const mockConsoleInputOutput = jest.mock('../src/io/console', () => {
  return {
    ConsoleInputOutput: jest.fn().mockImplementation(() => {
      console.log('MOCK ConsoleInputOutput')
      return {
        close() {},
        async input(question) {
          const inputText = input.shift()
          if (!inputText) {
            throw new Exit()
          }
          return inputText
        },
        async print(message) {},
      } satisfies InputOutput
    }),
  }
})

describe('MazeGame', () => {
  test('player moving', async () => {

    let player: Player | undefined

    const mockMazeGame = jest.mock('../src/maze/MazeGame', () => {
      return {
        [MazeGame.name]: jest.fn().mockImplementation((_map: MazeMap, _player: Player) => {
          player = _player
          return new MazeGame(_map, _player)
        }),
      }
    })

    try {
      await startGame()
    } catch (error) {
      if (error instanceof Exit) {
        expect(player).toEqual({
          // "name": "A",
          "row": 9,
          "column": 4,
          "lookDirection": "right",
          "keys": [],
          "doorsOpened": []
        })
      } else {
        throw error
      }
    }

    mockConsoleInputOutput.clearAllMocks()
    mockMazeGame.clearAllMocks()
  })
})
