export {}
/*
введите количество атакующих легионеров: 3
введите  количество легионов в провинции: 1
введите  количество крепостей в провинции: 1
Аттакующий: 3 + 2 = 9 (-1)
Обороняющийся: 1 + 7 + 2 = 10 (-2)
*/

const getPlayerInfo = (
  player: string,
  legions: number,
  fortress: number = 0
): string => {
  let score = 0
  let info = `${player}: `

  // крепости
  if (fortress > 0) {
    const fortressScore = fortress * 6
    score += fortressScore
    info += `${fortressScore} (крепости) ` + (
      legions > 0 ? '+ ' : ''
    )
  }

  // легионы
  for (let i = 1; i <= legions; i++) {
    const diceResult = random(1, 6)
    score += diceResult
    info += diceResult + (
      i < legions ? ' + ' : ' '
    )
  }

  // итог для обороны
  const deadUnitDefending = Math.floor(score / 5)

  if (legions > 0 || fortress > 0) {
    info += `= ${score} (-${deadUnitDefending} юнита)`
  } else {
    info += '-'
  }

  return info
}



const attackingLegions = +input('введите количество атакующих легионеров: ')
const defendingLegions = +input('введите количество легионов в провинции: ')
const defendingFortress = +input('введите количество крепостей в провинции: ')

print(getPlayerInfo('Атакующий', attackingLegions))
print(getPlayerInfo('Обороняющийся', defendingLegions, defendingFortress))
