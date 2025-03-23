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

const file = fs.readFileSync(path.resolve(__dirname, 'text.txt')).toString()

const data = file.match(new RegExp(
	'Номер заявки: (?<id>\\d+)\n' +
	'Клиент: (?<name>.*)\\s+(?<lastname>.*)\n' +
	'Наименование: (?<nickname>.*)\n' +
	'Дата: (?<day>\\d{2})\\.(?<month>\\d{2})\\.(?<year>\\d{4})'
))?.groups

if (!data) {
	throw new Error()
}

const {
	id,
	name,
	lastname,
	nickname,
	day,
	month,
	year,
} = data

const newFile = (
	`***\n` +
	`Заявка: ${id}\n` +
	`Имя: ${name}\n` +
	`Фамилия: ${lastname}\n` +
	`Наименование: ${nickname}\n` +
	`Срок: ${year}-${month}-${day}\n` + 
	`***\n`
)

fs.writeFileSync(path.resolve(__dirname, 'saveText.txt'), newFile)
