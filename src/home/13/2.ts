import fs from 'node:fs'
import path from 'node:path'
/*
2. чтение настроек
Нужно создать функцию для чтения файла с настройками.
Функция принимает путь к файлу и возвращает объект с настройками.
Если файл отсутствует, выбрасывается ошибка.
Если содержимое файла не является валидным JSON, выбрасывается другая ошибка.*/

const readSettings = (filePath: string): object => {
	if (!fs.existsSync(filePath)) {
		throw new Error(`Файл не найден: ${filePath}`)
	}
	try {
		const fileContent = fs.readFileSync(filePath).toString()
		const settings: object = JSON.parse(fileContent)
		return settings
	} catch (error) {
		throw new Error(`Ошибка при чтении файла: ${error}` )
	}
}
