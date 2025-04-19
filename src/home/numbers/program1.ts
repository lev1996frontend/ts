import { run } from './run'

run('program1.txt', (nextValue, send, error) => {
  const n1 = nextValue()
  const n2 = nextValue()
  if (n1 === 0 && n2 === 0) {
    throw error
  }
  send(n1 + n2) // одной строкой через пробел
})

// in: "1 2 3 4 5"
// out: "3 7"

// in: 1 2 0 0 5 6
// out: 3 -
