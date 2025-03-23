export {}
import fs from 'node:fs'
import path from 'node:path'
/*
2. Создать файл с настройками settings.json (если файл не найден) и напечатать настройки на консоль. У настроек объект с единственным свойство readCount, где содержится количество запусков нашей программы - с каждым запуском нужно увеличивать это свойство на 1. 
*/

type Settings = { readCount: number }

const settingsPath = path.resolve(__dirname, 'settings.json')
if (fs.existsSync(settingsPath)) {

	const readFile = fs.readFileSync(settingsPath).toString()

	const parseJson: Settings = JSON.parse(readFile)

	parseJson.readCount++

	fs.writeFileSync(settingsPath, JSON.stringify(parseJson, null, 2))

} else {
	const obj: Settings = { readCount: 1 }

	fs.writeFileSync(settingsPath, JSON.stringify(obj, null, 2))
	
}
