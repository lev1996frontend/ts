import { run } from './run'

run('program2.txt', (nextValue, send, error) => {

  const operators: Record <number, (a: number, b: number) => number>  = {
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

  const n1 = nextValue()
  const operator = nextValue()
  const n2 = nextValue()

  const manipulation = operators[operator]

  if (!manipulation) {
    throw error
  }

  const result = manipulation(n1,n2)

  send(result)

})

/*
Калькулятор
поддерживает операторы: + - * /
при делении на 0 бросает ошибку
*/
