export {}
//Задание 4.

const babyGifts = Number(input('Введите сколько детей ждет подарков: '))
const totalCandy = Number(input('Введите сколько конфет: '))

if (babyGifts > 0 && totalCandy > 0) {
  const totalNumber = Math.floor(totalCandy / babyGifts)
  print(
    `Всего ${totalNumber} конфет на ${babyGifts} детей\n` +
    `Осталось ${totalCandy % babyGifts} конфеты в мешке`
  )
}
