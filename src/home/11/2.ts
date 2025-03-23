export {}
/*
  2. Поиск хэштегов
Создать функцию, которая возвращает массив хэштегов из строки
*/

// затем повторить с regexp
const str = 'sdf s #fasdas #212 #sdff'

const hashtag = (str: string) => str.match(/((?<=\#)\w+)/g)

// const hashtag = (str: string) => {
// 	const arrStr = str.split(' ')
// 	const findHastag = arrStr.filter(findWord => findWord.startsWith('#')).map(hash => hash.slice(1))
// 	return findHastag
// }
const result = hashtag(str)

console.log(result)
