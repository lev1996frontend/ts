import { test, testScript } from '../tests'
import { inputNumber } from './lib'

// describe
testScript(__dirname, 'lib.ts', [
  test('3')
  .input('3')
  .print(3)
  .build(),

  test('abc')
  .input('abc')
  .print('Введите корректное число!'),

  test('-5')
  .input('-5')
  .print(-5)
  .build(),

  test('3.14')
  .input('3.14')
  .print(3.14)
  .build(),
])
