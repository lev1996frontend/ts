import { testScript } from '../../tests'

// TODO

testScript(__dirname, '3.ts', [
  {
    description: '6',
    input: [100, 6],
    print: ['Вы получите прибыль с фиксированным процентом (10%) в размере: 60'
    ],
    random: [10],
  },
  {
    description: '11',
    input: [100, 11],
    print: ['Вы получите прибыль со случайным процентом (10%), она составит: 110'
    ],
    random: [10],
  },
  {
    description: 'null',
    input: [50, -1],
    print: [],
    random: [],
  },
])
