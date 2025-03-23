export {}
import fs from 'node:fs'
import path from 'node:path'
/*
4. Ревизия
Нужно прочитать все папки и файлы в проекте (за исключением node_modules), а затем сохранить в project.json информацию о размере каждого файла примерно в таком виде:
{"package.json": 100, "src": { "main.ts": 30 }}
Простой вариант размера - в символах, усложнённый - в байтах 
*/ 

type Directory = {
	[key in string]: number | Directory
}

const revision = (dir: string): Directory => {
	const dirItems = fs.readdirSync(dir)
	const exceptionsFolder = ['node_modules']
	const result: Directory = {}
	for (const item of dirItems) {
		if(exceptionsFolder.includes(item)) {
			continue
		}
		const itemPath = path.resolve(dir, item)
    const stat = fs.statSync(itemPath) // это текущий item, может быть директорией или файлом, потом его проверяю
		
		if(stat.isDirectory()) {
			// если директория - рекурсия
			result[item] = revision(itemPath)
		} else {
			// если файл - узнать его размер `./`
			result[item] = stat.size
		}
	}
	return result
}

const structure = revision('.')

fs.writeFileSync(path.resolve(__dirname, 'project.json'), JSON.stringify(structure, null, 2))
