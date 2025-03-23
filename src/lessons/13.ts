export {}
import fs from 'node:fs'

// exception error

const readFile = (fileName: string) => {
  try {
    fs.readFileSync(fileName)
    // throw new Error('Test Error')
    // throw 1 // лучше так НЕ делать
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.startsWith('ENOENT')) {
        console.log(`Файл "${fileName}" не найден`)
      } else {
        // console.log(error.stack)
        throw error
      }
    } else {
      console.log('Error!', error)
    }
  }
}

readFile('...')
readFile('package.json')

class CustomError extends Error {
	
}

class SuperError extends Error {
  readonly id: number
  constructor(id: number) {
    super()
    this.id = id
  }
}

try {
  throw new SuperError(12)
  console.log('не выведется')
} 
catch (err) {
  if (err instanceof SuperError) {
    console.log(err.id)
  }
  else if (err instanceof Error) {
    console.log(err.message)
  }
  else {
    throw err
  }
}
finally {
  // выполнится в любом случае
}
