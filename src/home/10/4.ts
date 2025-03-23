export{}
/*4. Title Case
Написать функцию, который делает каждое слово в стрке с большой буквы
Пример:
toTitleCase('hello world') // 'Hello World' */

const toTitleCase = (str: string) => str.replace(/(?<= ^|\s)\w/g, (char) => char.toUpperCase())

// const toTitleCase = (str: string) => {
// 	return (
// 		str
// 			.split(' ')
// 			.map((word) => (
// 				word.slice(0,1).toUpperCase() + 
// 				word.slice(1).toLowerCase()
// 			))
// 			.join(' ')
// 	)
// }

console.log(toTitleCase('hello world')) // 'Hello World' */
