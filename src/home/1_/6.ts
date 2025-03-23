export {}
// Задание 6.

const agePerson = +input('введите ваш возраст: ')

if (agePerson < 18) {
  print('Вы еще молоды, доступ закрыт')
} else if (agePerson >= 18 ) {
  print(':)')
} else {
  print('Вы ввели некорректное значение возраста')
}
