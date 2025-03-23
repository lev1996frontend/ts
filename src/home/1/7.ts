export {}

const numberOfApples = +input(`Введите количество яблок: `)

if (!isFinite(numberOfApples) || numberOfApples < 0) {
	print(`Отказаться от мелочных материальных забот и по-философствовать о вечном`)
} else if (Number.isInteger(numberOfApples) && numberOfApples % 2 !== 0) {
	print(`Прошу прощения, но количество яблок не является целым, поэтому необходимо выбросить огрызок.`)
} else if (numberOfApples % 2 === 0) {
	print(`Еппиу, всем достанется поровну`)
} else {
	print(`Вы вызываетесь на поединок за последнее яблоко, сэр!`)
}


 