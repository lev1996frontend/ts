export{}
/*2. Замена всех чисел на звёздочки
Написать функцию, которая заменяет все цифры в строке на символы *.
Пример:
replaceNumbers('I have 2 apples and 10 bananas.') // 'I have * apples and ** bananas.'*/


const replaceNumbers3 = (str: string) => str.replace(/\b\w{4,}\b/g, '*$&*')
// const replaceNumbers3 = (str: string) => str.replace(/[(?<=\s)(?=\s|\.)]/g, '*')
const replaceNumbers2 = (str: string) => str.replace(/\d/g,'*')
const replaceNumbers = (str: string) => {

	return str
		.split('')
		.map((word) => 
			word >= '0' && word <= '9' 
				? '*' 
				: word
		)
		.join('')

	// v2
	// let result = ''
	// for (const char of str) {
	// 	if (char >= '0' && char <= '9' ) {
	// 		result += '*'
	// 	} else {
	// 		result += char
	// 	}
	// }
	// return result

	// v3 regexp
}

print(replaceNumbers3('I have 2 apples and 10 bananas.')) // 'I have * apples and ** bananas.'

