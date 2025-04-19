import { testScript } from '../../tests'

// describe('home 1', () => {
//   afterEach(() => {
//     jest.resetModules()
//   })
//   test('груша', () => {
//     mock({
//       input: ['груша'],
//       print: ['Думаю ваши любимые фрукты: груша'],
//     })
//     require('./1')
//   })
//   test('яблоко', () => {
//     mock({
//       input: ['яблоко'],
//       print: ['Думаю ваши любимые фрукты: яблоко'],
//     })
//     require('./1')
//   })
// })

testScript(__dirname, '1.ts',[
  {
    description: 'яблоко',
    // skip: true,
    // only: true, // TODO
    input: ['яблоко'],
    print: ['Думаю ваши любимые фрукты: яблоко'],
  },
  {
    description: 'груша',
    input: ['груша'],
    print: ['Думаю ваши любимые фрукты: груша'],
  },
])
