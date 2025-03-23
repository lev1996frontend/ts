export {}
// Задание 7.

const appleBasket: number = +input('введите количество яблок: ')

if (!isFinite(appleBasket) || appleBasket < 0) {
  print('Отказаться от мелочных материальных забот и пофилософствовать о вечном.')
} else {
  if (!Number.isInteger(appleBasket)) {
    print('Извините, нужно использовать положительное целое количество яблок. Выкидываем огрызок.')
  }
  if (Math.trunc(appleBasket) % 2 === 0) {
    print('Порадуемся, что всем досталось поровну!')
  } else {
    print('Вы вызваны на поединок за последнее яблоко!')
  }
}
