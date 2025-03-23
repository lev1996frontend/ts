// npx ts-jest config:init

// sum.ts
export const sum = (a: number, b: number): number => {
  return a + b
}

// import { sum } from './sum'
describe('sum', () => {
  it('1 + 2', () => {
    expect(sum(1, 2)).toBe(3)
  })
  it('1 + (-2)', () => {
    expect(sum(1, -2)).toBe(-1)
  })
})
