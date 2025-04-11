import { testScript } from '../../tests'

// TODO

testScript(__dirname, '3.ts', [
  {
    description: 'яблоко',
    input: ['1'],
    print: ['Думаю ваши любимые фрукты: яблоко'],
    random: [10],
  },
  {
    description: 'груша',
    input: ['груша'],
    print: ['Думаю ваши любимые фрукты: груша'],
  },
])
