/*
run('program1.txt', (nextValue, send, error) => {
  const n1 = nextValue()
  const n2 = nextValue()
  if (n1 === 0 && n2 === 0) {
    throw error
  }
  send(n1 + n2)
})
*/

import fs from 'node:fs';
import path from 'node:path';

const program_finished = Symbol('program_finished')
const program_crashed = Symbol('program_crashed')

export type ScriptArgs = [value: number, send: (num: number) => void, error: typeof program_crashed]

export function run(
  scriptName: string,
  scriptLogic: (value: number, send: (num: number) => void, error: typeof program_crashed) => void
) {
  const inputs: number[] = (
    fs.readFileSync(path.resolve(__dirname, scriptName), 'utf8')
      .trim()
      .split(/\s+/)
      .map(Number)
  )
  inputs.forEach((n, i) => {
    if (!isFinite(n)) {
      throw new Error(`Unexpected input value #${i + 1}`)
    }
  })

  // let currentValue = 0 // TODO: без внешнего счётчика
  // const nextValue = (): number => {
  //   if (currentValue >= inputs.length) {
  //     throw program_finished
  //   }
  //   return inputs[currentValue++]!
  // }
  const nextValue = (): number => {
    if (inputs.length === 0) {
      throw program_finished
    }
    const value = inputs.shift()
    if (typeof value === 'undefined') {
      throw new Error('array is undefined')
    }
    return value
  }


  let wasError = false

  const result: number[] = []
  const send = (n: number) => {
    if (!isFinite(n)) {
      throw new Error(`Unexpected output value`)
    }
    result.push(n)
  }

  try {
    while(true) {
      scriptLogic(
        nextValue(),
        send,
        program_crashed
      )
    }
  } catch (error) {
    // TODO: program_finished и program_crashed не выводим, остальные выводим new Error('test')
    if (error === program_crashed) {
      wasError = true
    } else if (error !== program_finished) {
      throw error
    }
  } finally {
    console.log(result.join(' ') + (wasError ? ' -' : ''))
  }
}
