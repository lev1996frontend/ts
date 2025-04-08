import { startGame } from '../src/game'

class Exit extends Error {}

const input = [
  'A',
  '2',
]

describe('MazeGame', () => {
  test('player moving', async () => {
    await startGame({
      close() {},
      async input(question) {
        const inputText = input.shift()
        if (!inputText) {
          throw new Exit()
        }
        return inputText
      },
      async print(message) {},
    })
  })
})
