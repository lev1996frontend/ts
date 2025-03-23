export {}
// числа
const n = 1.123
n.toFixed(2) // '1.12'
n.toPrecision(2)  // '1.1'

// строки

const zero = ''.length
const text = 'Hello'

text[0] // 'H'
text.at(0) // 'H' string -> String
text.at(-1) // 'o'
// text.charAt
text.includes('h') // false
text.indexOf('l') // 2
text.lastIndexOf('l') // 3
'"Hello"'.slice(1, -1) // 'Hello'

const stringArray = text.split('') // [H,e,l,l,o]
'Hello world'.split(' ') // ['Hello', 'world']
text.split(/ /) 

// true
text.startsWith('H')
text.endsWith('lo')

text.match(/ /)

text.substr(text.indexOf('l'), 2) // ll
'Hello world'.substr(-5) // world
'Hello world'.substr(-5, 1) // w
text.substring(0, 4) // Hell [0..4)
'Text "Hello"'.substring(0, 4) // Hello

text.replace('H', 'h') // hello
text.replaceAll('l', 'L') // HeLLo

text.replace(/ /, '')
text.replaceAll(/ /, '')
text.match(/ /)

text.toUpperCase() // HELLO
text.toLowerCase() // hello

text.charCodeAt(0) // числовой код символа в кодировке Unicode
text.localeCompare('е', 'ё') // 1 0 -1
text.toLocaleUpperCase
text.toLocaleLowerCase

text.trim() // обрезать пробелы до и после
text.repeat(2) // повторить
