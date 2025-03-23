export{}
/*3. Счётчик слов
Написать функцию, которая принимает строку и возвращает количество слов в строке. 
Слово определяется как последовательность непробельных символов, разделённая пробелами.
Нужно считать слова, разделенные пробелами (игнорируя дополнительные пробелы).
Пример:
countWords('Hello world, this is a test.') // 6
countWords('   JavaScript  is  awesome!  ') // 3 */

// const countWords = (str: string) => {
// 	const strTrim = str.trim()
// 	const strSub = strTrim.split(' ')
// 	let count = 0
// 	for(let i = 0; i < strSub.length; i++) {
// 		if(strSub[i])
// 			count++
// 	} 
// 	return count
// }

const countWords = (str: string) => str.match(/\w+/g)?.filter(Boolean).length
// const countWords = (str: string) => (
// 	str
// 		.trim()
// 		.split(' ')
// 		.filter(Boolean)
// 		.length
// )

print(countWords('Hello world, this is a test.')) // 6
print(countWords('   JavaScript  is  awesome!  ')) // 3 */
