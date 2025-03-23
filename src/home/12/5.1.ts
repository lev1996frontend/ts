export {}
import fs from 'node:fs'
import path from 'node:path'
/*
5. Парсер заявок
В текстовом файле есть заявка с текстом:
***
Вам пришла новая заявка!
Номер заявки: 007
Клиент: Джеймс Бонд

Услуга
Наименование: провести мастер-класс по барбекю
Дата: 08.09.2025
***

Нужно прочитать значения файла в структуру данных и сохранить в другом файле в новом формате:
***
Заявка: №666
Имя: Джеймс
Фамилия: Бонд
Услуга: провести мастер-класс по барбекю
Срок: 2025-09-08
***
*/ 

const readFilePath = fs.readFileSync(path.resolve(__dirname, 'text.txt')).toString()
const application =  readFilePath
	.replace(/Вам пришла новая заявка!\nНомер заявки:\s(\d+)/g, 'Заявка: №$1')
  .replace(/Клиент:\s(.+)\s(.+)/g, 'Имя: $1\nФамилия: $2')
	.replace(/\sУслуга\nНаименование:\s(.+)/, 'Услуга: $1')
	.replace(/Дата:\s(?<day>\d{2})\.(?<month>\d{2})\.(?<year>\d{4})/, 'Срок: $3-$2-$1')

	// 2 команды лишние
const formattedFileStringify = JSON.stringify(application)
const formattedFileParse = JSON.parse(formattedFileStringify)

fs.writeFileSync(path.resolve(__dirname, 'saveText.txt'), formattedFileParse)

console.log(formattedFileStringify)
console.log(formattedFileParse)