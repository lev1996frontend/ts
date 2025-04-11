export { }

const appleBasket: number = +input('введите количество яблок: ')

if (!isFinite(appleBasket) || appleBasket < 0) {
  print('Отказаться от мелочных материальных забот и по-философствовать о вечном...')
} else {
  if (!Number.isInteger(appleBasket)) {
    print('Извините, нужно использовать положительное целое количество яблок. Выкидываем огрызок.')
  }
  if (Math.trunc(appleBasket) % 2 === 0) {
    print('Еппиу, всем достанется поровну')
  } else {
    print('Вы вызываетесь на поединок за последнее яблоко, сэр!')
  }
}
