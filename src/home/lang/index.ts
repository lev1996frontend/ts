// TODO
// 1. добавить отрицательные литералы в коде (пример в hello)
// 2. исправить age-test и factorial
// + задачи на даты 3-5

import fs from 'node:fs'
import path from 'node:path'

import { parse, SyntaxError } from './lexer'
import { run, RuntimeError } from './vm'

const scriptName = process.argv[2] ?? 'hello'
const filePath = path.resolve(__dirname, 'scripts', `${scriptName}.ma`)

if (!filePath ) {
	throw new Error(`Не указан исполняемый файл`)
}

if (!fs.existsSync(filePath)) {
	throw new Error(`Исполняемый файл не найден: ${filePath}`)
}

try {
  const source = fs.readFileSync(filePath).toString()
  const commands = parse(source)
  run(commands)
} catch (error) {
	if (error instanceof SyntaxError) {
		console.error('Syntax error:', error.message)
	}
	else if (error instanceof RuntimeError) {
		console.error('Runtime error:', error.message)
	}
	else {
  	throw error
	}
}
