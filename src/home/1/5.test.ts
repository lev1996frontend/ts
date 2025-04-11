import { testScript } from '../../tests'

testScript(__dirname, '5.ts', [
  {
    input: [2, 3, 3, 6],
    print: [74],
  },
  {
    input: [1, 13, 3, 8],
    print: [201],
  },
  {
    description: 'неправильный ввод',
    input: [0, 0, 0, 'NaN'],
    print: ['NaN'],
  },
])
