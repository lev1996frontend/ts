import { run } from './run'

const dictionaryVariables: Record<number, number> = {}

run('program3.txt', (nextValue, send, error) => {

  const errorRun = (num: number | (() => number) | undefined ): number => {
    if (typeof num === 'undefined') {
      throw error
    }
    return typeof num === 'function' ? num() : num
  }


  // TODO: команды (отправить, запомнить)
  const command: Record < number, (a: number) => void | number> = {
    1: a => send(a),
    2: a => {
      const value = dictionaryVariables[a]
      errorRun(dictionaryVariables[a])
      return value
    }
  }

  // TODO: источник присаивания (число, результат выражения)

  const sourceAttachment: Record<number, () => number > = {
    1:  () => nextValue(),
    2:  () => {
      const index = nextValue()
      const value = dictionaryVariables[index]
      return errorRun(value)
    }
  }

  const sources: Record <number, () => number> = {
    1: nextValue,
    2: () => {
      const value = dictionaryVariables[nextValue()]
      return errorRun(value)
    }, // TODO: избавиться от ослабления типизации
  }

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

  // script

  const source1 = sources[nextValue()]

  const n1: number = errorRun(source1)


})

/*
Калькулятор
поддерживает операторы: + - * /
при делении на 0 бросает ошибку
*/
