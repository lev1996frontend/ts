const date = new Date()
date.getDate()
date.setDate(12)

console.log(date.toISOString())
console.log(date.getTime())
Date.now()


moment.locale('ru')

const datetime = moment('10.01.25', 'DD.MM.YY')
// datetime.add(2, 'day')
datetime.hours(10).minutes(20).seconds(59)
// datetime.utcOffset(2)
// console.log(datetime.format('DD.MM.YYYY hh:mm:ss'))

console.log(datetime.format('D MMMM - dddd'))
