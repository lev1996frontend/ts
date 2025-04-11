import { testScript } from '../../tests'

testScript(__dirname, '10.ts', [
  {
    description: 'некорректное ввод',
    input: ['false'],
    print: ['Некорректное количество секунд'],
  },
  {
    description: 'ноль секунд',
    input: [0],
    print: ['Некорректное количество секунд'],
  },
  {
    description: '00:01:01',
    input: [62],
    print: ['00:01:02'],
  },
  {
    description: '01:01:01',
    input: [3661],
    print: ['01:01:01'],
  },
  {
    description: '02:02:02',
    input: [7322],
    print: ['02:02:02'],
  },
])