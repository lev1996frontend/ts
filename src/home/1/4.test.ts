import { testScript } from '../../tests'

testScript(__dirname, '4.ts', [
  {
    description: '1 ребёнок и 5 конфет',
    input: ['1', '5'],
    print: ['Конфет достанется по 5, а в мешке нет больше конфет :('],
  },
  {
    description: '2 ребёнка и 5 конфет',
    input: ['2', '5'],
    print: ['Конфет достанется по 2, а в мешке еще осталось конфет в количестве 1'],
  },
  {
    description: 'неправильный ввод',
    input: ['-1', 'NaN'],
    print: [],
  },
])
