import { sum } from './sum'

// console.log(sum(1, 2))

describe('sum', () => {
  // beforeAll(() => {})
  // beforeEach
  // afterEach
  // afterAll
  test('1 + 2', () => {
    expect(sum(1, 2)).toBe(3)
  })
  test.skip('1 + (-2)', () => {
    expect(sum(1, -2)).toBe(-1)
  })
})
