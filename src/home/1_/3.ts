export {}
// Задание 3.

const startBalance = Number(input('введите сумму, которую не жалко: '))
const month = Number(input('введите на сколько месяцев хотите их вернуть: '))

if (startBalance > 0 && month > 0 && month <= 6) {
  const sumEnd = startBalance * 0.1 * month
  print(`Ваша прибыль ${sumEnd} руб. за ${month} месяцев`)
}
else if (startBalance > 0 && month > 0 && month > 6 && month <= 12) {
  const randomPercent = random(1, 10)
  const sumEnd = startBalance * (randomPercent / 100) * month
  print(`Ваша прибыль ${sumEnd} руб. за ${month} месяцев, так как вы оставили вклад под ${randomPercent}%`)
}
else {
  print('С такими числами мы не работаем.')
}
