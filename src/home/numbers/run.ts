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

import fs from 'node:fs'
import path from 'node:path'

export function run(
  scriptName: string,
  scriptLogic: (nextValue: () => number, send: (num: number) => void, error: string) => void
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

  // TODO
  scriptLogic(
    () => inputs[0]!,
    (num: number) => {
      print(num)
    },
    'error'
  )
}

run('program1.txt', (nextValue, send, error) => {
  const n1 = nextValue()
  const n2 = nextValue()
  if (n1 === 0 && n2 === 0) {
    throw error
  }
  send(n1 + n2)
})
