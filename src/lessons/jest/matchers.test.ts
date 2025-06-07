
describe('sum', () => {
  // beforeAll(() => {})
  // beforeEach
  // afterEach
  // afterAll

  test('smth', (done) => {
    // expect(sum(1, 2)).toBe(3)

    // expect(fetch('')).rejects.toBeInstanceOf(Error)
    // expect(fetch('')).resolves.toBe(3)

    // expect(() => {
    //   throw new Error()
    // }).toThrow(Error)

    const printMock = jest.spyOn(global as any, 'print').mockImplementation((message) => {
      expect(message).toMatch('Hello')
    })
    // printMock.mockReturnValue(10)
    printMock.mockClear()

    // setTimeout(() => done(), 1000)
    // return new Promise()

    // test('toEqual example', () => {
    //   expect({ a: undefined }).toEqual({});
    //   // ✅ тест пройдет, потому что toEqual считает их эквивалентными
    // });

    // test('toStrictEqual example', () => {
    //   expect({ a: undefined }).toStrictEqual({});
    //   // ❌ тест не пройдет — свойства отличаются
    // });
  })
})

// пример: если приняли done - завершение после её вызова, иначе ждём промис/синхронную функцию
function superTest(test: (done?: () => void) => void | Promise<void>) {
  if (test.length === 0) {
    return test()
  } else {
    return new Promise<void>(test)
  }
}

superTest((done) => {
  // expect
  // done()
})
