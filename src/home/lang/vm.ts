import { Command, isIO, isArithmetics, isGoto, isGotoIf, GotoIf }  from './ast'

export class RuntimeError extends Error {
	constructor(message:string) {
		super(message)
	}
}

type Variables = Record<string, number>

export const run = (commands: Command[]): void => {
  const variables: Variables = {}
  let ip = 0 // instruction pointer

	const checkVariable = (identifier: string) => {
		if (!(identifier in variables)) {
			throw new RuntimeError(`Попытка получить значение переменной $${identifier} до инициализации`)
		}
	}

	const readVariable = (identifier: string): number => {
		checkVariable(identifier)
		return variables[identifier]!
	}

	const getValue = <T extends { [key: string]: string }> (
		command: T,
		identifier: keyof T,
		literal?: keyof T,
	): number => {
		if(command[identifier]) {
			return readVariable(command[identifier])
		}
		if(literal && command[literal]) {
			return +command[literal]
		}
		throw new RuntimeError('unknow value type')
	}

	const setValue = (key: string, newValue: (oldValue: number) => number) => {
		if (newValue.length > 0) {
			checkVariable(key)
		}
		variables[key] = newValue(variables[key]!)
	}

  while (ip < commands.length) {
    const command = commands[ip]!
    ip++

    if (isIO(command)) {
      switch (command.io_type) {
				case 'input': {
					const value = +input(`$${command.io_identifier} = `)
					if (isNaN(value)) {
						throw new RuntimeError('Недопустимое значение')
					}
					variables[command.io_identifier] = value
					break
        }
				case 'print': {
					if (command.io_message) {
						print(command.io_message)
					} else {
						const value = getValue(command, 'io_identifier')
						print(`$${command.io_identifier} = ${value}`)
					}
					break
				}
			}
    }

    if (isArithmetics(command)) {
      const value = getValue(command, 'arithmetics_right_identifier', 'arithmetics_right_literal')
			const modifyValue = (newValue: Parameters<typeof setValue>[1]) => (
				setValue(command.arithmetics_left_identifier, newValue)
			)
			switch (command.arithmetics_operator) {
				case '=': {
					modifyValue(() => value)
					break
				}
				case '+=': {
					modifyValue((oldValue) => oldValue + value)
					break
				}
				case '-=': {
					modifyValue((oldValue) => oldValue - value)
					break
				}
				case '*=': {
					modifyValue((oldValue) => oldValue * value)
					break
				}
				case '/=': {
					if (value === 0) {
						throw new RuntimeError(`Деление на ноль`)
					}
					modifyValue((oldValue) => oldValue / value)
					break
				}
			}
		}

    if (isGoto(command)) {
			const conditionIsTrue = (command: GotoIf): boolean => {
				const left = readVariable(command.goto_left_identifier)
				const right = getValue(command, 'goto_right_identifier', 'goto_right_literal')

				switch(command.goto_compare_operator) {
					case '=':  return left === right
					case '<>': return left !== right
					case '<':  return	left < right
					case '>':  return	left > right
					case '<=': return	left <= right
					case '>=': return	left >= right
				}
			}

			const index = commands.findIndex((c) => c.label === command.goto_label)

			if (index === -1) {
				throw new RuntimeError(`Не найдена метка перехода ${command.goto_label}`)
			}
			
			if (!isGotoIf(command) || conditionIsTrue(command)) {
				ip = index
			}
    }
  }
}
