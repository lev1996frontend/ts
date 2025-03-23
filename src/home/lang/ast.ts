export type Command = {
  line: string
  source: string
  label?: string
}

export type IO = Command & {
	io_type: 'input' | 'print'
  io_identifier: string
  io_message?: string
}

export type Goto = Command & {
	goto_label: string
}

export type GotoIf = Goto & {
  goto_left_identifier: string
  goto_compare_operator: '=' | '<>' | '<' | '>' | '<=' | '>='
  goto_right_identifier: string
  goto_right_literal: string
}

export type Arithmetics = Command & {
  arithmetics_left_identifier: string
  arithmetics_operator: '=' | '+=' | '-=' | '*=' | '/='
  arithmetics_right_identifier?: string
  arithmetics_right_literal?: string
}

const checkType = (
	<T extends Command>(key: keyof T) => 
		(command: Command): command is T =>
  		key in command
)

export const isIO = checkType<IO>('io_type')
export const isArithmetics = checkType<Arithmetics>('arithmetics_operator')
export const isGoto = checkType<Goto>('goto_label')
export const isGotoIf = checkType<GotoIf>('goto_compare_operator')
