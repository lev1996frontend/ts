import { run } from './run'

const dictionaryVariables: Record<number, number> = {}

run('program3.txt', (nextValue, send, error) => {

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



  const input = nextValue()

  // TODO: const
  let n1: number | undefined
  let operator: number | undefined
  let n2: number | undefined

  if (input < 0) {
    n1 = dictionaryVariables[input]
  } else {
    n1 = input
  }

  operator = nextValue()

  const nextInput = nextValue()
  if (nextInput < 0) {
    n2 = dictionaryVariables[nextInput]
  } else {
    n2 = nextInput
  }

  const manipulation = operators[operator]

  if (!manipulation || !n1 || !n2) {
    throw error
  }

  const result = manipulation(n1,n2)

  const saveValue = nextValue()

  if (saveValue < 0) {
    dictionaryVariables[saveValue] = result
  }

  console.log(dictionaryVariables)
  console.log(Object.keys(dictionaryVariables).length)

  send(result)

})

/*
Калькулятор
поддерживает операторы: + - * /
при делении на 0 бросает ошибку
*/
