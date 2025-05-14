import { run } from './run-signals'

let n1: number | undefined
let operator: number | undefined

run('program2.txt', (value, send, error) => {
  const operators: Record <number, (a: number, b: number) => number> = {
    1: (a, b) => a + b,
    2: (a, b) => a - b,
    3: (a, b) => a * b,
    4: (a, b) => {
      if (b === 0) {
        throw error
      }
      return a / b
    },
  }

  if (typeof n1 === 'undefined') {
    n1 = value
    return
  }
  
  if (typeof operator === 'undefined') {
    operator = value
    return
  }

  const n2 = value
  const manipulation = operators[operator]

  if (!manipulation) {
    throw error
  }

  const result = manipulation(n1,n2)

  send(result)
  n1 = undefined
  operator = undefined
})

/*
Калькулятор
поддерживает операторы: + - * /
при делении на 0 бросает ошибку
*/
