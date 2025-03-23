import fs  from 'node:fs'
import { Command, isGoto }  from './ast'

export class SyntaxError extends Error {
	readonly lineNumber: number
	readonly lineText: string
	constructor(lineNumber: string | number, lineText: string, reason: string) {
		super(
      `${reason}\n`+
      `Line: ${lineNumber}\n`+ 
      lineText
    )
		this.lineNumber = +lineNumber
		this.lineText = lineText
	}
}

const identifier = '[a-zA-Z_]\\w*'

const commandRegExp = new RegExp(
  '^\\s*' +
  `((?<label>${identifier}):)?` +
  '('+ // command
    `(?<io_type>input|print)\\s+`+`((\\$(?<io_identifier>${identifier}))|("(?<io_message>[^"]*)"))` +
    `|(` + // переход
      `goto\\s+(?<goto_label>${identifier})` +
      `(\\s+if\\s+`+
        `\\$(?<goto_left_identifier>${identifier})` +
        `\\s*(?<goto_compare_operator>=|<>|<|>|<=|>=)\\s*` +
        `(\\$(?<goto_right_identifier>${identifier})|(?<goto_right_literal>\\d+(\\.\\d+)?))` +
      `)?` +
    `)` +
    '|(' + // арифметика
      `\\$(?<arithmetics_left_identifier>${identifier})` +
      `\\s*(?<arithmetics_operator>[+*/-]?=)\\s*` +
      `(\\$(?<arithmetics_right_identifier>${identifier})|(?<arithmetics_right_literal>-?\\d+(\\.\\d+)?))` +
    ')' +
  ')?\\s*(;[^\\n\\r]*)?$', // ?<comment>
)

export const parse = (source: string): Command[] => {
  const commands = (
    source
      .split(/\r?\n/)
      .map((lineText, index) => {
        const match = lineText.match(commandRegExp)
        const line = index + 1
        if (!match) {
          throw new SyntaxError(line, lineText, 'неизвестный синтаксис')
        }
        if (!lineText.trim()) {
          return null
        }
        return { ...match.groups, source: lineText, line: String(line) } as Command
      })
      .filter(Boolean)
      .map((groups) => {
        const filtered = {} as Record<string, string>
        for (const key in groups) {
          const value = groups[key as keyof Command]
          if (typeof value !== 'undefined') {	
            filtered[key] = value
          }
        }
        return filtered as Command
      })
  )

	commands.filter(isGoto).forEach((command) => {
		const count = commands.filter((c) => c.label === command.goto_label).length
    
    if (!count) {
			throw new SyntaxError(command.line, command.source, `метка ${command.goto_label} не найдена`)
		}

    if (count > 1) {
			throw new SyntaxError(command.line, command.source, `метка ${command.goto_label} определена несколько раз`)
		}
	})

  return commands
}
