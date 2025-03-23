export {}

const kidGifts = +input(`Введите, сколько детей ждут подарков: `)
const candyPresents = +input(`Введите, сколько конфет в мешке: `)

if (kidGifts > 0 && candyPresents > 0) {
	const happyNewYear = Math.floor(candyPresents / kidGifts)
	const balanceGifts = (candyPresents % kidGifts)
	if (balanceGifts > 0) {
		print(`Конфет достанется по ${happyNewYear}, а в мешке еще осталось конфет в количестве ${balanceGifts}`)
	} else {
		print(`Конфет достанется по ${happyNewYear}, а в мешке нет больше конфет :(`)
	}
}


