export type UserColor = 'red' | 'black' 
export type Color = UserColor | 'green'

export const printStartMessage = () => {
	print('Мы приветсвуем тебя в нашем казино, где ты всегда весло проведешь время!')
}

export const inputStartBalance = (): number => {
	while(true) {
		const startBalance = +input('Введите баланс: ')
		if (isFinite(startBalance) && startBalance > 0) {
			return startBalance
		} else {
			print('Ваш баланс не пополнен или пополнен неправильно, попробуйте ввести сумму снова')
		}
	}
}

export const inputPlayerColor = (): UserColor => {
	while(true) {
		const chooseColor = input('Введите цвет фишки (r - красный, b - чёрный): ')
		if (chooseColor === 'r') {
			return 'red'
		} else if (chooseColor === 'b') {
			return 'black'
		} else {
			print('Неправильно выбран цвет, попробуйте снова')
		}
	}
} 

export const inputBet = (balance: number): number => {
	while(true) {
		const inputManyBet = +input('Введите сумму ставки: ')
		if (isFinite(inputManyBet) && inputManyBet > 0 && inputManyBet <= balance) {
			return inputManyBet
		}
		print('Сумма ставки введена неправильно, попробуйте ввести ещё раз')
	}
}

export const generateRandomColor = (): Color => {
	const sumRandom = random(0, 1)	
	const chipNumber = sumRandom 
	if (chipNumber <= 0.3) {
		print('Выиграли красные!')
		return 'red'
	} else if (chipNumber > 0.3 && chipNumber <= 0.6) {
		print('Выиграли чёрные!')
		return 'black'
	} else {
		print('Фишка попала на зелёное поле!')
		return 'green'
	} 
}

export const playerWantContinue = (): boolean => {
	while (true) {
		const closingGame = input('Хотите продолжать играть, введите (y - да, n - нет): ')
		if (closingGame === 'y') {
			return true
		} else if (closingGame === 'n') {
			return false
		} else {
			print('Вы ничего не выбрали!')
		}
	}
}

export const changeBalance = (playerBet: number, playerColor: string, randomColor: string ): number => {
	if (playerColor === randomColor) {
		print(`Поздравляю, ваша ставка сыграла, теперь сумма удваивается`)
		return playerBet
	} else {
		print(`К сожалению, ваша ставка проиграла`) 
		return -playerBet
	}
}

export const printMessageBalance = (balance: number) => {
	print(`Ваш баланс ${balance}`) 
}

export const printFinishMessage = (balance: number, startBalance: number) => {
	if (balance === startBalance) {
		print('Ваш баланс остался в нуле, а это значит, что можно всегда можно вернуться!')
	} else if (balance > 0 ) {
		print('Кажется, вы делаете большую ошибку, в следующий раз, вам будет отказано в играх!!!')
	} else {
		print('Не расстраивайтесь! Вы всегда можете вернуться к нам и попробовать снова. Мы будем рады видеть ваc!')
	}
}
