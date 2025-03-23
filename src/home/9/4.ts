/* 4. хранилище состояние
Нужно написать функцию, которая возвращает 2 функции для получения и установки значения. Можно передать начальное значение. Тип должен выводиться автоматически по начальному значению или указываться явно.

Примеры:
const [name, setName] = store<string>()
name() // undefined
setName('Vit')
name() // 'Vit'
setName(undefined)
name() // undefined

const [checked, setChecked] = store(false)
checked() // false
// setChecked(undefined) // ошибка - нельзя передать undefined
*/

// const calculate = (numbers: number[]): [number, number] => {
//   const min = Math.min(...numbers)
//   const max = Math.max(...numbers)
// 	return [min, max]
// }

// const [n1, n2] = calculate(numbers)
function store<T>(): [() => T | undefined, (value: T | undefined) => void]
function store<T>(value: T): [() => T, (value: T) => void]
function store<T>(value?: T): [() => T | undefined, (value: T | undefined) => void] {
	let memory: T | undefined = value
	function getValue (): T | undefined {
		return memory
	} 
	function setValue (newValue: T | undefined): void {
		memory = newValue
	}
	// if(typeof setValue !== 'undefined') {
	// 	return memory
	// }
	return [getValue, setValue]
}

const [getValue, setValue] = store<string>()
getValue() // undefined
setValue('Vit')
getValue() // 'Vit'
setValue(undefined)
getValue() // undefined

const [getChecked, setChecked] = store(false)
getChecked() // false
// setChecked(undefined) // ошибка - нельзя передать undefined
