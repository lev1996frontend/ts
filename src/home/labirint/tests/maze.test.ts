import { map } from '../src/resources/map'
import { MazeGame } from './../src/maze/MazeGame'
import { Player } from '../src/player'

// MazeGame Player map

describe('лабиринт - перемещение игрока', () => {
  test('на стартовую локацию', () => {

    const player = createPlayer()
    const maze = new MazeGame(map, player)
    const movingDescription = maze.movePlayer('forward')

    expect(movingDescription).toMatchSnapshot()
    expect(player.row).toBe(9)
    expect(player.column).toBe(4)
    // TODO: getAvailableMoveDirections
  })

  // TODO: Ты поворачиваешь направо, "затем снова" поворачиваешь направо...
  test.skip('к закрытой двери без ключа', () => {
    const player = createPlayer({
      row: 8,
      column: 6,
      lookDirection: 'top',
    })
    const maze = new MazeGame(map, player)
    const movingDescription = maze.movePlayer('right')

    expect(movingDescription).toMatchSnapshot()
    expect(player.row).toBe(10)
    expect(player.column).toBe(9)
    // TODO: getAvailableMoveDirections
  })

  test.skip('к закрытой двери с ключом', () => {
    const player = createPlayer({
      row: 8,
      column: 6,
      lookDirection: 'top',
      keys: [1],
    })
    const maze = new MazeGame(map, player)
    const movingDescription = maze.movePlayer('right')

    expect(movingDescription).toMatchSnapshot()
    expect(player.row).toBe(10)
    expect(player.column).toBe(10)
    // TODO: getAvailableMoveDirections

    expect(player.doorsOpened).toContain(1)
    expect(player.keys).toContain(2)
  })

  // TODO: выход из лабиринта на старте (проигрыш)
  // TODO: выход из лабиринта в конце (выигрыш)
})

function createPlayer(player: Partial<Player> = {}): Player {
  return {
    name: 'playerName',
    row: map.start.row,
    column: map.start.column,
    lookDirection: map.getStartLookDirection(),
    keys: [],
    doorsOpened: [],
    ...player,
  }
}

const n1 = [1,2,3]
const n2 = [4,5,6]
const n3 = [...n1, ...n2]
