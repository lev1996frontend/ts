import { testScript } from '../../tests'

testScript(__dirname, '8.ts', [
  {
    description: 'сложение',
    input: ['5', '3', '+'],
    print: ['5 + 3 = 8'],
  },
  {
    description: 'вычитание',
    input: ['10', '4', '-'],
    print: ['10 - 4 = 6'],
  },
  {
    description: 'умножение',
    input: ['7', '6', '*'],
    print: ['7 * 6 = 42'],
  },
  {
    description: 'деление',
    input: ['8', '2', '/'],
    print: ['8 / 2 = 4'],
  },
  {
    description: 'деление на ноль',
    input: ['5', '0', '/'],
    print: ['На ноль делить нельзя'],
  },
  {
    description: 'некорректный ввод: число 1',
    input: ['qwerty', '3', '*'],
    print: ['Введите корректные значения'],
  },
  {
    description: 'некорректный ввод: число 2',
    input: ['5', 'qwerty', '+'],
    print: ['Введите корректные значения'],
  },
  {
    description: 'некорректный ввод: оператор',
    input: ['5', '3', 'qwerty'],
    print: ['неизвестный оператор'],
  },
])
