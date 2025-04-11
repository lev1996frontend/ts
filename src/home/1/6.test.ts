import { testScript } from '../../tests'

testScript(__dirname, '6.ts', [
  {
    description: '17 лет',
    input: ['17'],
    print: ['Доступ закрыт'],
  },
  {
    description: '19 лет',
    input: ['19'],
    print: [':)'],
  },
  {
    description: '61 год',
    input: ['61'],
    print: [':)'],
  },
  {
    description: 'неправильный ввд',
    input: ['NaN'],
    print: ['Кажется, что вы жульник!'],
  },
])
