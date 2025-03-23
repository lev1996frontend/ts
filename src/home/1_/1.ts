export {}
// Задание 1.
const fruitsOne: string = input('введите ваш любимый фрукт: ')
const fruitsTwo: string = input('введите ваш любимый фрукт: ')

if (fruitsOne && fruitsTwo) {
  const message: string = `Ваши любимые фрукты: ${fruitsOne} и ${fruitsTwo}!`
  print(message)
} else {
  print('Вы ввели некорректные данные')
}
