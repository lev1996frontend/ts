import { run } from './run-signals'

let n1: number | undefined

run('program1.txt', (value, send, error) => {
  if (value === 0) {
    throw error
  }

  if (typeof n1 === 'undefined') {
    n1 = value
    return
  }

  send(n1 + value)
})

// in: "1 2 3 4 5"
// out: "3 7"
// in: "1 2 0 0 5"
// out: "3 -"

// in: 1 2 0 0 5 6
// out: 3 -
