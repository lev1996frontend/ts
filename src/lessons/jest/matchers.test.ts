
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
  })
})

// TODO: если приняли done - завершение после её вызова, иначе ждём промис/синхронную функцию
async function superTest(test: (done?: () => void) => void | Promise<void>) {
  if (test.length === 0) {
    await test()
  } else {
    return new Promise<void>(test)
  }
}

superTest((done) => {
  // expect
  // done()
})

/*
В следующий раз:
-таймеры
-снимки (snapshot)
-клссы
*/
