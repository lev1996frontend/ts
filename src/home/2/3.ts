export {}
/*
введите количество атакующих легионеров: 3
введите  количество легионов в провинции: 1
введите  количество крепостей в провинции: 1
Аттакующий: 3 + 2 = 9 (-1)
Обороняющийся: 1 + 7 + 2 = 10 (-2)


введите количество атакующих легионеров: 3
введите количество легионов в провинции: 0
введите количество крепостей в провинции: 2
Атакующий: 6 + 1 + 6 = 13 (-2 юнита)
Обороняющийся:  12 очков(2 крепости) +
*/

const attackingPlayer = +input('введите количество атакующих легионеров: ')
const defendingPlayer = +input('введите количество легионов в провинции: ')
const defendingFortress = +input('введите количество крепостей в провинции: ')

if (attackingPlayer <= 1 || defendingPlayer < 0 || defendingFortress < 0) {
  print('Некорректные данные, повторите попытку')
} else {
  // Атакующий
  let attackingScore = 0
  let defendingScore = 0

  let attackingResult = 'Атакующий: '

  for (let i = 1; i <= attackingPlayer; i++) {
    const diceResult = random(1, 6)
    attackingScore += diceResult

    if (i === attackingPlayer) {
      attackingResult += `${diceResult}`
    } else {
      attackingResult += `${diceResult} + `
    }
  }
  const deadUnitAttacking = Math.floor(attackingScore / 5)
  attackingResult += ` = ${attackingScore} (-${deadUnitAttacking} юнита)`

  // Обороняющийся
  let defendingResult = 'Обороняющийся: '
  // крепости
	const fortressScore = defendingFortress * 6
	defendingScore+= fortressScore
		if(defendingFortress > 0 && defendingPlayer > 0) {
			defendingResult += ` ${defendingScore} очков(${defendingFortress} крепости) + `
		 } else if(defendingPlayer > 0 && defendingFortress === 0) {
			defendingResult += ''
		 } else {
			defendingResult += `${defendingScore}`
		}
  // легионы
	for (let i = 1; i <= defendingPlayer; i++) {
		const diceResult = random(1, 6)
		defendingScore += diceResult

		if (i === defendingPlayer) {
			defendingResult += `${diceResult}`
		} else {
			defendingResult += `${diceResult} + `
		}
	}

  // итог для обороны
  let deadUnitDefending = 0
	deadUnitDefending = Math.floor(defendingScore / 5)
  if (defendingPlayer > 0 || defendingFortress > 0) {
    defendingResult += ` = ${defendingScore} (-${deadUnitDefending} юнита)`
  }
  // print
  print(attackingResult)
  print(defendingResult)
}

/*
введите количество атакующих легионеров: 3
введите  количество легионов в провинции: 1
введите  количество крепостей в провинции: 2
Атакующий: 3 + 17 = 17 (-3)
Обороняющийся: 1 + 12 + 18 = 18 (-3)

Атакующий: 6 + 6 + 5 = 17 (-3)
Обороняющийся: 12 (крепость) + 6 = 18 (-3)
*/
