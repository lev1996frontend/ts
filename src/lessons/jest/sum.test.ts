import { sum } from './sum'

describe('sum', () => {
  test('1 + 2', () => {
    expect(sum(1, 2)).toBe(3)
  })
  test('1 + (-2)', () => {
    expect(sum(1, -2)).toBe(-1)
  })
})
