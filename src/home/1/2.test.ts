import { testScript } from '../../tests'

testScript(__dirname, '2.ts', [
  {
    description: 'Квадрат числа 2',
    input: ['2'],
    print: ['2 в квадрате = 4'],
  },
  {
    description: 'Квадрат числа 3',
    input: ['3'],
    print: ['3 в квадрате = 9'],
  },
  {
    description: 'Квадрат числа -4',
    input: ['-4'],
    print: ['-4 в квадрате = 16'],
  },
])
