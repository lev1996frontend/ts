export {}
// Задание 10.

const lastSecond = +input('введите время в секундах: ')

const hours: number = Math.floor(lastSecond / 3600)
const minutes: number = Math.floor((lastSecond % 3600) / 60)
const seconds: number = lastSecond % 60

const formattedTime = (
  (hours < 10 ? '0' : '') + hours + ':' +
  (minutes < 10 ? '0' : '') + minutes + ':' +
  (seconds < 10 ? '0' : '') + seconds
)

// hh:mm:ss
print(`${formattedTime}`)
