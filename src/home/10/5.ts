export{}
/*5. Проверка на палиндром
Написать функцию, которая проверяет, является ли строка палиндромом 
(строка читается одинаково слева направо и справа налево), 
игнорируя пробелы и регистр.

Пример:
isPalindrome('Шалаш') // true
isPalindrome('A man a plan a canal "Panama"!') // true
isPalindrome('Hello') // false*/

const isPalindrome = (str: string) => {
	const direct = str.replace(/\W/g, '').toLowerCase()
	const reversed = direct.split('').reverse().join('')
	return direct === reversed
}
// str.match(/(?<=^|\s)[\wА-Яа-я]+/g)?.reverse().join('').toLowerCase()
// v1
// const strSub = str.toLowerCase().trim().replaceAll(' ', '')
// const arrStr = strSub.split('').reverse().join('')
// return strSub === arrStr
// v2
console.log(isPalindrome('Шалаш')) // true
console.log(isPalindrome('A man a plan a canal "Panama"!')) // true
console.log(isPalindrome('Hello')) // false

/*
шалаш
true
amanap lanac a nalp a nam a
false
olleh
false
*/
