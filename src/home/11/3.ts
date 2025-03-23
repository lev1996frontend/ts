export {}
/*
3. Извлечение даты
Создать функцию, которая извлекает из строки список дат в форматах
- dd.mm.yy
- dd.mm.yyyy
- yyyy-mm-dd
Каждая дата должна быть кастомным объектом
*/


type ParsedDate = Record<'year'|'month'|'day', number>

const date = '234asdasdasdasasdasd 123_ 21.33.333 22.12.2200 2323-33-33 22.12.2401  22.12.21 year < 100 ? 2000 + year : year'

// const listDate = (str:string) => str.match(
//   /(?<=^|\s)((\d{2}\.\d{2}\.(\d{4}|\d{2}))|(\d{4}-\d{2}-\d{2}))(?=\s|$)/g
// )
const listDate = (str:string): ParsedDate[] => {
  return str.match(
    /(?<=^|\s)((\d{2}\.\d{2}\.(\d{4}|\d{2}))|(\d{4}-\d{2}-\d{2}))(?=\s|$)/g
  )?.map((match) => {
    if (match.includes('-')) {
      const [year, month, day] = match.split('-')
      return {
        day: Number(day),
        month: Number(month),
        year: Number(year),
      }
    }
		
		if (match.includes('.')) {
			const [day, month, year] = match.split('.')
			const yearCorrect = year?.length === 2 ? '20' + year : year
			return {
				day: Number(day),
        month: Number(month),
        year: Number(yearCorrect),
			}
		}

    throw new Error()
  }) ?? []
}

console.log(listDate(date))
